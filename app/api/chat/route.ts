import { SYSTEM_PROMPT } from "@/lib/system-prompt";
import { checkRate, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;

type ChatMessage = { role: "user" | "assistant"; content: string };

const MAX_MESSAGE_LENGTH = 8000;
const MAX_MESSAGES = 20;
const DEFAULT_BASE_URL = "https://api.anthropic.com";

function jsonError(status: number, error: string, extra?: Record<string, unknown>) {
  return new Response(JSON.stringify({ error, ...extra }), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

function validateMessages(value: unknown): ChatMessage[] | string {
  if (!Array.isArray(value)) return "Поле messages должно быть массивом";
  if (value.length === 0) return "Поле messages не может быть пустым";
  if (value.length > MAX_MESSAGES) return `Максимум ${MAX_MESSAGES} сообщений`;

  const result: ChatMessage[] = [];
  for (const raw of value) {
    if (!raw || typeof raw !== "object") return "Каждое сообщение должно быть объектом";
    const m = raw as { role?: unknown; content?: unknown };
    if (m.role !== "user" && m.role !== "assistant")
      return 'Поле role должно быть "user" или "assistant"';
    if (typeof m.content !== "string") return "Поле content должно быть строкой";
    const content = m.content.trim();
    if (content.length === 0) continue;
    result.push({
      role: m.role,
      content: content.slice(0, MAX_MESSAGE_LENGTH),
    });
  }

  if (result.length === 0) return "Нет непустых сообщений";
  if (result[0].role !== "user")
    return "Первое сообщение должно быть от пользователя";

  return result;
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return jsonError(
      500,
      "Сервис не настроен. Администратор не задал ANTHROPIC_API_KEY."
    );
  }
  const baseURL = (process.env.ANTHROPIC_BASE_URL || DEFAULT_BASE_URL).replace(/\/+$/, "");
  const model = process.env.ANTHROPIC_MODEL || "claude-opus-4-7";

  const ip = getClientIp(req);
  const rate = checkRate(ip);
  if (!rate.allowed) {
    return new Response(
      JSON.stringify({
        error: `Слишком много запросов. Попробуйте через ${rate.retryAfter ?? 60} сек.`,
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Retry-After": String(rate.retryAfter ?? 60),
        },
      }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError(400, "Некорректный JSON");
  }

  const parsed = (body as { messages?: unknown })?.messages;
  const validated = validateMessages(parsed);
  if (typeof validated === "string") {
    return jsonError(400, validated);
  }

  const payload = {
    model,
    max_tokens: 4096,
    stream: true,
    // Adaptive thinking: Claude dynamically decides when/how much to reason.
    // Recommended default for Opus 4.7. No budget_tokens, no temperature.
    thinking: { type: "adaptive" as const },
    system: [
      {
        type: "text",
        text: SYSTEM_PROMPT,
        // Prompt caching on the (large, stable) triage system prompt.
        // ~85–90% token cost reduction on cache hits.
        cache_control: { type: "ephemeral" as const },
      },
    ],
    messages: validated,
  };

  let upstream: Response;
  try {
    upstream = await fetch(`${baseURL}/v1/messages`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        accept: "text/event-stream",
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Сбой сети";
    console.error("[chat-api] network:", msg);
    return jsonError(502, `Не удалось связаться с моделью: ${msg}`);
  }

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => "");
    console.error("[chat-api] upstream not ok:", upstream.status, text.slice(0, 500));
    return jsonError(
      upstream.status >= 500 ? 502 : upstream.status,
      `Модель вернула ошибку ${upstream.status}`,
      { detail: text.slice(0, 500) }
    );
  }

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        const reader = upstream.body!.getReader();
        const decoder = new TextDecoder();
        let buf = "";

        // Extract `data:` lines that follow an `event: content_block_delta` header.
        // Works with both strict SSE (blank-line-separated) and the proxy's single-newline variant.
        let pendingEvent: string | null = null;
        const flushLine = (line: string) => {
          if (line.startsWith("event:")) {
            pendingEvent = line.slice(6).trim();
          } else if (line.startsWith("data:")) {
            const data = line.slice(5).trimStart();
            if (pendingEvent === "content_block_delta" && data) {
              try {
                const obj = JSON.parse(data);
                if (obj?.delta?.type === "text_delta" && typeof obj.delta.text === "string") {
                  controller.enqueue(encoder.encode(obj.delta.text));
                }
              } catch { /* ignore */ }
            }
          } else if (line === "") {
            pendingEvent = null;
          }
        };

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });
          buf = buf.replace(/\r\n/g, "\n");
          let idx: number;
          while ((idx = buf.indexOf("\n")) !== -1) {
            flushLine(buf.slice(0, idx));
            buf = buf.slice(idx + 1);
          }
        }
        if (buf.length > 0) flushLine(buf);
        controller.close();
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Ошибка потока";
        console.error("[chat-api] stream:", msg);
        controller.enqueue(
          encoder.encode(
            `\n\n_Извините, не удалось завершить ответ: ${msg}. Попробуйте ещё раз._`
          )
        );
        controller.close();
      }
    },
    cancel() {
      upstream.body?.cancel().catch(() => {});
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
      "X-RateLimit-Remaining": String(rate.remaining),
    },
  });
}
