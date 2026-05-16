export interface Position {
  conditionId: string
  title: string
  outcome: string
  size: number
  currentValue: number
  cashPnl: number
  percentPnl: number
}

export interface Trade {
  timestamp: number
  side: "BUY" | "SELL"
  title: string
  usdcSize: number
}

export interface TraderStats {
  address: string
  totalVolume: number
  portfolioValue: number
  rank: string | number
  lastTrade: Trade | null
  openPositions: Position[]
}
