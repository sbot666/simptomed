const buckets = new Map<string, number[]>();

const MAX_REQUESTS = 20;
const WINDOW_MS = 60_000;
const CLEANUP_INTERVAL_MS = 5 * 60_000;

let lastCleanup = Date.now();

function cleanup(now: number) {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  const cutoff = now - WINDOW_MS;
  for (const [ip, times] of buckets) {
    const live = times.filter((t) => t > cutoff);
    if (live.length === 0) buckets.delete(ip);
    else buckets.set(ip, live);
  }
}

export function checkRate(ip: string): {
  allowed: boolean;
  retryAfter?: number;
  remaining: number;
} {
  const now = Date.now();
  cleanup(now);

  const cutoff = now - WINDOW_MS;
  const timestamps = (buckets.get(ip) ?? []).filter((t) => t > cutoff);

  if (timestamps.length >= MAX_REQUESTS) {
    const oldest = timestamps[0];
    return {
      allowed: false,
      retryAfter: Math.ceil((oldest + WINDOW_MS - now) / 1000),
      remaining: 0,
    };
  }

  timestamps.push(now);
  buckets.set(ip, timestamps);
  return { allowed: true, remaining: MAX_REQUESTS - timestamps.length };
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "anonymous";
}
