"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import MedicalResponse from "./MedicalResponse";

type Message = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "simptomed:chat:v1";
const STORAGE_TTL_MS = 24 * 60 * 60 * 1000;
const MAX_INPUT_LENGTH = 2000;

const EXAMPLES = [
  "Уже 3 дня сухой кашель, температура 37.4, немного болит горло",
  "Болит живот справа снизу со вчера, усиливается при ходьбе",
  "Внезапно закружилась голова, потемнело в глазах, тошнит",
  "Ноющая боль в пояснице уже неделю, после долгой работы за столом",
];

function loadMessages(): Message[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { savedAt: number; messages: Message[] };
    if (Date.now() - parsed.savedAt > STORAGE_TTL_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
    return parsed.messages;
  } catch {
    return [];
  }
}

function saveMessages(messages: Message[]) {
  if (typeof window === "undefined") return;
  try {
    if (messages.length === 0) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ savedAt: Date.now(), messages })
      );
    }
  } catch {
    // storage full or disabled — silently ignore
  }
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    setMessages(loadMessages());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) saveMessages(messages);
  }, [messages, mounted]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 180) + "px";
  }, [input]);

  async function sendMessage(overrideText?: string) {
    const trimmed = (overrideText ?? input).trim();
    if (!trimmed || isStreaming) return;
    if (trimmed.length > MAX_INPUT_LENGTH) return;

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setInput("");
    setIsStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
        signal: controller.signal,
      });

      if (!res.ok) {
        let errorMsg = `Ошибка (${res.status})`;
        try {
          const data = await res.json();
          if (data?.error) errorMsg = data.error;
        } catch {
          // response wasn't JSON
        }
        throw new Error(errorMsg);
      }

      if (!res.body) throw new Error("Пустой ответ сервера");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((curr) => {
          const copy = [...curr];
          copy[copy.length - 1] = {
            role: "assistant",
            content: accumulated,
          };
          return copy;
        });
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        setMessages((curr) => {
          const copy = [...curr];
          if (copy[copy.length - 1]?.content === "") {
            copy[copy.length - 1] = {
              role: "assistant",
              content: "_Запрос отменён._",
            };
          }
          return copy;
        });
      } else {
        const msg = err instanceof Error ? err.message : "Неизвестная ошибка";
        setMessages((curr) => {
          const copy = [...curr];
          copy[copy.length - 1] = {
            role: "assistant",
            content: `Не удалось получить ответ: ${msg}\n\nПопробуйте ещё раз через минуту.`,
          };
          return copy;
        });
      }
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  }

  function stopStreaming() {
    abortRef.current?.abort();
  }

  function clearChat() {
    if (isStreaming) stopStreaming();
    setMessages([]);
  }

  async function copyMessage(content: string, index: number) {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch {
      // clipboard API unavailable
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const remainingChars = MAX_INPUT_LENGTH - input.length;
  const isEmpty = messages.length === 0;

  return (
    <div className="flex-1 flex flex-col bg-ink-800 rounded-2xl border border-ink-700 shadow-sm overflow-hidden min-h-[500px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-ink-700 bg-slate-50/50">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-medium text-ink-200">
            {isStreaming ? "ИИ отвечает…" : "Ассистент онлайн"}
          </span>
        </div>
        {messages.length > 0 && (
          <button
            type="button"
            onClick={clearChat}
            className="text-xs text-ink-300 hover:text-ink-50 transition flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V4a1 1 0 011-1h6a1 1 0 011 1v3" />
            </svg>
            Очистить
          </button>
        )}
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 min-h-[400px] max-h-[60vh]"
      >
        {isEmpty && (
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="py-6"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-cyan-500 text-white mb-3 shadow-lg">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-ink-50 text-lg mb-1">
                Опишите, что вас беспокоит
              </h3>
              <p className="text-sm text-ink-200 max-w-md mx-auto">
                Укажите, как давно, где именно, что усиливает или ослабляет и
                какие ещё симптомы. Или попробуйте пример:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-2 max-w-2xl mx-auto">
              {EXAMPLES.map((ex, i) => (
                <motion.button
                  key={ex}
                  type="button"
                  onClick={() => sendMessage(ex)}
                  initial={reduced ? undefined : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                  whileHover={reduced ? undefined : { y: -2 }}
                  className="text-left bg-ink-850 hover:bg-ink-800 border border-ink-700 hover:border-brand-300 hover:shadow-md rounded-xl p-3 text-sm text-ink-100 transition-all"
                >
                  <span className="text-brand-500 mr-1">›</span>
                  {ex}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <MessageBubble
              key={i}
              message={msg}
              index={i}
              isStreaming={
                isStreaming &&
                i === messages.length - 1 &&
                msg.role === "assistant"
              }
              onCopy={() => copyMessage(msg.content, i)}
              isCopied={copiedIndex === i}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="border-t border-ink-700 p-3 md:p-4 bg-slate-50/60">
        <div className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT_LENGTH))}
              onKeyDown={handleKeyDown}
              disabled={isStreaming}
              placeholder="Опишите симптомы…"
              rows={1}
              className="w-full resize-none rounded-xl border border-ink-600 bg-ink-800 px-4 py-3 pr-16 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 disabled:opacity-50 disabled:bg-ink-750 transition"
              aria-label="Сообщение ассистенту"
            />
            {input.length > MAX_INPUT_LENGTH * 0.8 && (
              <span
                className={`absolute bottom-2 right-3 text-xs ${
                  remainingChars < 100 ? "text-red-400" : "text-ink-400"
                }`}
              >
                {remainingChars}
              </span>
            )}
          </div>

          {isStreaming ? (
            <button
              type="button"
              onClick={stopStreaming}
              className="bg-ink-950 hover:bg-ink-900 text-white font-medium px-4 py-3 rounded-xl transition text-sm h-fit flex items-center gap-1.5"
              aria-label="Остановить"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <rect x="5" y="5" width="10" height="10" rx="1" />
              </svg>
              Стоп
            </button>
          ) : (
            <button
              type="button"
              onClick={() => sendMessage()}
              disabled={!input.trim()}
              className="bg-brand-600 hover:bg-brand-700 disabled:bg-ink-600 disabled:cursor-not-allowed text-white font-medium px-4 py-3 rounded-xl transition text-sm h-fit flex items-center gap-1.5 shadow-sm"
              aria-label="Отправить"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span className="hidden sm:inline">Отправить</span>
            </button>
          )}
        </div>
        <p className="mt-2 text-[11px] text-ink-400 text-center sm:text-left">
          Enter — отправить, Shift+Enter — новая строка. Simptomed не заменяет врача.
        </p>
      </div>
    </div>
  );
}

function MessageBubble({
  message,
  index,
  isStreaming,
  onCopy,
  isCopied,
}: {
  message: Message;
  index: number;
  isStreaming: boolean;
  onCopy: () => void;
  isCopied: boolean;
}) {
  const reduced = useReducedMotion();

  if (message.role === "user") {
    return (
      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="flex justify-end"
      >
        <div className="max-w-[85%] bg-gradient-to-br from-brand-600 to-brand-700 text-white rounded-2xl rounded-br-md px-4 py-2.5 text-sm whitespace-pre-wrap shadow-sm">
          {message.content}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex justify-start group"
    >
      <div className="max-w-[95%] bg-ink-850 border border-ink-700 rounded-2xl rounded-bl-md px-4 py-3 text-sm relative">
        {message.content ? (
          <>
            <MedicalResponse content={message.content} isStreaming={isStreaming} />
            {!isStreaming && (
              <button
                type="button"
                onClick={onCopy}
                aria-label="Скопировать ответ"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-ink-800 text-ink-400 hover:text-ink-100"
              >
                {isCopied ? (
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            )}
          </>
        ) : (
          <div className="flex gap-1 py-1">
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
            <span
              className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.15s" }}
            />
            <span
              className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.3s" }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
