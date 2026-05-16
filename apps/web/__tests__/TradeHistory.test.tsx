import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TradeHistory } from "../components/TradeHistory";
import type { Trade } from "../lib/polymarket";

const makeTrade = (id: string): Trade => ({
    id,
    timestamp: Number(id),
    price: "0.5",
    size: "100",
    side: "BUY",
    asset: `Asset-${id}`,
    market: "test",
    outcomeIndex: 0,
    transactionHash: "0x",
    takerOrder: "0x",
    makerOrder: "0x",
});

const twentyTrades = Array.from({ length: 20 }, (_, i) => makeTrade(String(i + 1)));

describe("TradeHistory", () => {
    it("renders an empty state when there are no trades", () => {
        render(<TradeHistory trades={[]} />);
        expect(screen.getByText(/no trades found/i)).toBeInTheDocument();
    });

    it("shows only 10 rows initially", () => {
        render(<TradeHistory trades={twentyTrades} />);
        expect(screen.getAllByText(/Asset-/)).toHaveLength(10);
    });

    it("shows more rows after clicking Show more", async () => {
        render(<TradeHistory trades={twentyTrades} />);
        await userEvent.click(screen.getByRole("button", { name: /show more/i }));
        expect(screen.getAllByText(/Asset-/)).toHaveLength(20);
    });

    it("hides Show more button when all trades are visible", async () => {
        render(<TradeHistory trades={twentyTrades} />);
        await userEvent.click(screen.getByRole("button", { name: /show more/i }));
        expect(screen.queryByRole("button", { name: /show more/i })).not.toBeInTheDocument();
    });
});
