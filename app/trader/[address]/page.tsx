import StatCard from "@/components/StatCard"
import {
  fetchPositions,
  fetchActivity,
  fetchLeaderboard,
} from "@/lib/polymarket"

interface Props {
  params: {
    address: string
  }
}

export default async function TraderPage({
  params,
}: {
  params: Promise<{ address: string }>
}) {
  const { address } = await params

  if (!address || !address.startsWith("0x")) {
    throw new Error("Invalid address param")
  }

  // Fetch data
  const [positions, trades, leaderboard ] =
  await Promise.all([
    fetchPositions(address),
    fetchActivity(address),
    fetchLeaderboard(),

  ])

  // Total Volume
const totalVolume = trades.reduce(
  (acc: number, trade: any) => acc + trade.usdcSize,
  0
)

// Open Positions Value
const openValue = positions.reduce(
  (acc: number, pos: any) =>
    acc + Number(pos.currentValue ?? 0),
  0
)

// Realized PnL
const realizedPnL = positions.reduce(
  (acc: number, pos: any) =>
    acc + Number(pos.cashPnl ?? 0),
  0
)

// Unrealized PnL
const unrealizedPnL = positions.reduce(
  (acc: number, pos: any) =>
    acc + (Number(pos.currentValue ?? 0) - Number(pos.initialValue ?? 0)),
  0
)

// Total Trades
const totalTrades = trades.length

// Wins (temporary logic - until proper pnl mapping)
const wins = trades.filter(
  (trade: any) => Number(trade.usdcSize ?? 0) > 0
).length

// Win Rate
const winRate =
  totalTrades > 0
    ? (wins / totalTrades) * 100
    : 0

// Average Trade Size
const avgTradeSize =
  totalTrades > 0
    ? totalVolume / totalTrades
    : 0

// Total Portfolio Value (for now open positions only)
const totalPortfolioValue = openValue

// Total PnL
const totalPnl = realizedPnL + unrealizedPnL

  // Rank
  const traderRank =
    leaderboard.find(
      (user: any) =>
        user.proxyWallet?.toLowerCase() ===
        address.toLowerCase()
    )?.rank || "Unranked"

  return (
  
    <div className="p-8 space-y-8">
      {/* HERO PnL Section */}
<div className="rounded-2xl p-8 bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-800 shadow-xl">
  <p className="text-zinc-400 text-sm">Total PnL</p>

  <h1
    className={`text-4xl font-bold mt-2 ${
      totalPnl >= 0 ? "text-green-400" : "text-red-400"
    }`}
  >
    ${totalPnl.toFixed(2)}
  </h1>

  <div className="flex gap-6 mt-4 text-sm text-zinc-400">
    <span>Win Rate: {winRate.toFixed(1)}%</span>
    <span>Total Trades: {totalTrades}</span>
    <span>Avg Trade: ${avgTradeSize.toFixed(2)}</span>
  </div>
</div>


      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        <StatCard
          label="Total Volume"
          value={`$${totalVolume.toFixed(2)}`}
        />

        <StatCard
          label="Open Positions Value"
          value={`$${openValue.toFixed(2)}`}
        />

        <StatCard
        label="Portfolio Value"
        value={`$${totalPortfolioValue.toFixed(2)}`}
        />


        <StatCard
          label="Open Positions"
          value={positions.length}
        />
        <StatCard
        label="Win Rate"
        value={`${winRate.toFixed(1)}%`}
        />

        <StatCard
        label="Avg Trade Size"
        value={`$${avgTradeSize.toFixed(2)}`}
        />

        <StatCard
        label="Total Trades"
        value={totalTrades}
        />

        <StatCard
        label="Total PnL"
        value={
        <span className={totalPnl >= 0 ? "text-green-400" : "text-red-400"}>
        ${totalPnl.toFixed(2)}
        </span>
        }
        />


        <StatCard
          label="Realized PnL"
          value={
            <span
              className={
                realizedPnL >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              ${realizedPnL.toFixed(2)}
            </span>
          }
        />
      </div>

      {/* Recent Trades */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Recent Trades</h2>

        {trades.length === 0 && (
          <p className="text-zinc-500">No trades found.</p>
        )}

        {trades.slice(0, 10).map((trade: any, index: number) => (
          <div
            key={index}
            className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-5 rounded-2xl flex justify-between items-center hover:border-zinc-700 transition-all"

          >
            {/* <div>
              <p className="font-semibold">{trade.title}</p>
              <p className="text-sm text-zinc-400">
                {trade.side}
              </p>
            </div> */}
            <span
            className={`text-xs px-2 py-1 rounded-full ${
            trade.side === "BUY"
            ? "bg-green-500/20 text-green-400"
            : "bg-red-500/20 text-red-400"
            }`}
            >
  {trade.side}
</span>


            <div className="text-right">
              <p className="font-bold">
                ${Number(trade.usdcSize).toFixed(2)}
              </p>
              <p className="text-xs text-zinc-500">
                {new Date(
                  trade.timestamp
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
 )
}