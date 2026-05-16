export interface Trade {
    id: string;
    timestamp: number;
    price: string;
    size: string;
    side: "BUY" | "SELL";
    asset: string;
    market: string;
    outcomeIndex: number;
    transactionHash: string;
    takerOrder: string;
    makerOrder: string;
}

export interface UserStats {
    totalTrades: number;
    totalVolume: number;
    totalInvested: number;
    lastTrade: Trade | null;
    trades: Trade[];
}

export async function fetchUserTrades(address: string): Promise<Trade[]> {
    const res = await fetch(`/api/trades?address=${encodeURIComponent(address)}`);
    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Failed to fetch trades.");
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
}

export async function calculateUserStats(address: string): Promise<UserStats> {
    const trades = await fetchUserTrades(address);

    let totalVolume = 0;
    let totalInvested = 0;

    trades.forEach((trade) => {
        const price = parseFloat(trade.price);
        const size = parseFloat(trade.size);
        const value = price * size;

        if (!isNaN(value)) {
            totalVolume += value;
            if (trade.side === "BUY") {
                totalInvested += value;
            }
        }
    });

    trades.sort((a, b) => b.timestamp - a.timestamp);
    const lastTrade: Trade | null = trades.length > 0 ? trades[0]! : null;

    return {
        totalTrades: trades.length,
        totalVolume,
        totalInvested,
        lastTrade,
        trades,
    };
}
