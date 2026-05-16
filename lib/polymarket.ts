import { Position, Trade } from "@/types/trader"

const BASE = "https://data-api.polymarket.com"

export async function fetchPositions(
  address: string
): Promise<Position[]> {
  const res = await fetch(
    `${BASE}/positions?user=${address}`,
    {
      headers: {
        "Accept": "application/json",
      },
      cache: "no-store",
    }
  )

  if (!res.ok) {
    const text = await res.text()
    console.error("Positions API Error:", text)
    throw new Error("Failed to fetch positions")
  }

  const data = await res.json()

  return data.map((p: any) => ({
    conditionId: p.conditionId,
    title: p.title,
    outcome: p.outcome,
    size: Number(p.size),
    currentValue: Number(p.currentValue),
    cashPnl: Number(p.cashPnl),
    percentPnl: Number(p.percentPnl),
  }))
}


export async function fetchActivity(
  address: string
): Promise<Trade[]> {
  const res = await fetch(
    `${BASE}/activity?user=${address}&limit=100`,
    {
      headers: {
        "Accept": "application/json",
      },
      cache: "no-store",
    }
  )

  if (!res.ok) {
    const text = await res.text()
    console.error("Activity API Error:", text)
    throw new Error("Failed to fetch activity")
  }

  const data = await res.json()

  return data
    .filter((t: any) => t.type === "TRADE")
    .map((t: any) => ({
      timestamp: t.timestamp,
      side: t.side,
      title: t.title,
      usdcSize: Number(t.usdcSize),
    }))
}

export async function fetchLeaderboard() {
  const res = await fetch(
    `${BASE}/v1/leaderboard?category=OVERALL&timePeriod=ALL`,
    {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    }
  )

  if (!res.ok) {
    const text = await res.text()
    console.error("Leaderboard API Error:", text)
    throw new Error("Failed to fetch leaderboard")
  }

  return res.json()
}

