import { NextResponse } from "next/server"
import {
  fetchPositions,
  fetchActivity,
  fetchLeaderboard,
} from "@/lib/polymarket"
import { TraderStats } from "@/types/trader"

export async function GET(
  request: Request,
  { params }: { params: { address: string } }
) {
  const { address } = params

  try {
    const [positions, trades, leaderboard] =
      await Promise.all([
        fetchPositions(address),
        fetchActivity(address),
        fetchLeaderboard(),
      ])

    const totalVolume = trades.reduce(
      (acc, trade) => acc + trade.usdcSize,
      0
    )

    const portfolioValue = positions.reduce(
      (acc, pos) => acc + pos.currentValue,
      0
    )

    const openPositions = positions.filter(
      (p) => p.size > 0
    )

    const lastTrade = trades[0] || null

    const userRankData = leaderboard.find(
      (u: any) =>
        u.proxyWallet?.toLowerCase() ===
        address.toLowerCase()
    )

    const rank = userRankData?.rank || "Unranked"

    const response: TraderStats = {
      address,
      totalVolume,
      portfolioValue,
      rank,
      lastTrade,
      openPositions,
    }

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch trader data" },
      { status: 500 }
    )
  }
}
