import { describe, it, expect, vi, beforeEach } from "vitest";
import { calculateUserStats } from "../lib/polymarket";
import type { Trade } from "../lib/polymarket";

const makeTrade = (overrides: Partial<Trade> = {}): Trade => ({
    id: "1",
    timestamp: 1000,
    price: "0.5",
    size: "100",
    side: "BUY",
    asset: "YES",
    market: "test-market",
    outcomeIndex: 0,
    transactionHash: "0xabc",
    takerOrder: "0x1",
    makerOrder: "0x2",
    ...overrides,
});

beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
});

describe("calculateUserStats", () => {
    it("returns zero values for an empty trade list", async () => {
        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            json: async () => [],
        } as Response);

        const stats = await calculateUserStats("0xabc");
        expect(stats.totalTrades).toBe(0);
        expect(stats.totalVolume).toBe(0);
        expect(stats.totalInvested).toBe(0);
        expect(stats.lastTrade).toBeNull();
    });

    it("computes volume and invested correctly for mixed BUY/SELL", async () => {
        const trades: Trade[] = [
            makeTrade({ id: "1", price: "0.6", size: "100", side: "BUY", timestamp: 1 }),
            makeTrade({ id: "2", price: "0.8", size: "50", side: "SELL", timestamp: 2 }),
        ];
        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            json: async () => trades,
        } as Response);

        const stats = await calculateUserStats("0xabc");
        expect(stats.totalTrades).toBe(2);
        expect(stats.totalVolume).toBeCloseTo(0.6 * 100 + 0.8 * 50);
        expect(stats.totalInvested).toBeCloseTo(0.6 * 100);
    });

    it("does not bleed NaN into totals when price/size are non-numeric", async () => {
        const trades: Trade[] = [
            makeTrade({ id: "1", price: "bad", size: "100", side: "BUY" }),
            makeTrade({ id: "2", price: "0.5", size: "200", side: "BUY" }),
        ];
        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            json: async () => trades,
        } as Response);

        const stats = await calculateUserStats("0xabc");
        expect(stats.totalVolume).toBeCloseTo(0.5 * 200);
        expect(isNaN(stats.totalVolume)).toBe(false);
    });

    it("sets lastTrade to the most recent trade by timestamp", async () => {
        const trades: Trade[] = [
            makeTrade({ id: "1", timestamp: 100 }),
            makeTrade({ id: "2", timestamp: 999 }),
        ];
        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            json: async () => trades,
        } as Response);

        const stats = await calculateUserStats("0xabc");
        expect(stats.lastTrade?.id).toBe("2");
    });
});
