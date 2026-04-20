import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

// The rate limiter keeps its sliding-window state in module-level Map.
// We reset the module between tests so each test gets a fresh bucket store,
// and we freeze time with fake timers to make the window deterministic.

describe("checkRate", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows the first request and decrements remaining", async () => {
    const { checkRate } = await import("@/lib/rate-limit");
    const res = checkRate("1.1.1.1");
    expect(res.allowed).toBe(true);
    expect(res.remaining).toBe(19);
    expect(res.retryAfter).toBeUndefined();
  });

  it("allows exactly MAX_REQUESTS (20) and blocks the 21st", async () => {
    const { checkRate } = await import("@/lib/rate-limit");
    const ip = "2.2.2.2";
    for (let i = 0; i < 20; i++) {
      const r = checkRate(ip);
      expect(r.allowed).toBe(true);
      expect(r.remaining).toBe(19 - i);
    }
    const blocked = checkRate(ip);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.retryAfter).toBeGreaterThan(0);
    expect(blocked.retryAfter).toBeLessThanOrEqual(60);
  });

  it("isolates buckets per IP", async () => {
    const { checkRate } = await import("@/lib/rate-limit");
    for (let i = 0; i < 20; i++) checkRate("3.3.3.3");
    const other = checkRate("4.4.4.4");
    expect(other.allowed).toBe(true);
    expect(other.remaining).toBe(19);
  });

  it("lets requests in again after the window expires", async () => {
    const { checkRate } = await import("@/lib/rate-limit");
    const ip = "5.5.5.5";
    for (let i = 0; i < 20; i++) checkRate(ip);
    expect(checkRate(ip).allowed).toBe(false);

    // Advance past the 60s window.
    vi.advanceTimersByTime(60_001);

    const r = checkRate(ip);
    expect(r.allowed).toBe(true);
    expect(r.remaining).toBe(19);
  });

  it("correctly implements a sliding (not fixed) window", async () => {
    const { checkRate } = await import("@/lib/rate-limit");
    const ip = "6.6.6.6";
    // 10 requests at t=0
    for (let i = 0; i < 10; i++) checkRate(ip);
    // 10 more at t=30s — now at the cap
    vi.advanceTimersByTime(30_000);
    for (let i = 0; i < 10; i++) checkRate(ip);
    // At t=45s the window still covers all 20 → blocked
    vi.advanceTimersByTime(15_000);
    expect(checkRate(ip).allowed).toBe(false);
    // At t=61s the first 10 have aged out → should allow again
    vi.advanceTimersByTime(16_000);
    const r = checkRate(ip);
    expect(r.allowed).toBe(true);
    // 10 still in window + the new one = 11, so remaining = 20 - 11 = 9
    expect(r.remaining).toBe(9);
  });

  it("returns retryAfter based on the oldest timestamp in window", async () => {
    const { checkRate } = await import("@/lib/rate-limit");
    const ip = "7.7.7.7";
    for (let i = 0; i < 20; i++) checkRate(ip);
    // 10 seconds later, should still be blocked for ~50 more seconds
    vi.advanceTimersByTime(10_000);
    const r = checkRate(ip);
    expect(r.allowed).toBe(false);
    expect(r.retryAfter).toBeGreaterThanOrEqual(49);
    expect(r.retryAfter).toBeLessThanOrEqual(51);
  });
});

describe("getClientIp", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("prefers x-forwarded-for (first hop)", async () => {
    const { getClientIp } = await import("@/lib/rate-limit");
    const req = new Request("http://x", {
      headers: { "x-forwarded-for": "9.9.9.9, 10.10.10.10, 11.11.11.11" },
    });
    expect(getClientIp(req)).toBe("9.9.9.9");
  });

  it("falls back to x-real-ip when x-forwarded-for is absent", async () => {
    const { getClientIp } = await import("@/lib/rate-limit");
    const req = new Request("http://x", {
      headers: { "x-real-ip": "8.8.8.8" },
    });
    expect(getClientIp(req)).toBe("8.8.8.8");
  });

  it('returns "anonymous" when no IP headers are set', async () => {
    const { getClientIp } = await import("@/lib/rate-limit");
    const req = new Request("http://x");
    expect(getClientIp(req)).toBe("anonymous");
  });

  it("trims whitespace from header values", async () => {
    const { getClientIp } = await import("@/lib/rate-limit");
    const req = new Request("http://x", {
      headers: { "x-forwarded-for": "  1.2.3.4  ,5.6.7.8" },
    });
    expect(getClientIp(req)).toBe("1.2.3.4");
  });
});
