"use client";

import { useState } from "react";
import useSWR from "swr";
import { calculateUserStats } from "../lib/polymarket";
import { WalletInput } from "./WalletInput";
import { StatsCard } from "./StatsCard";
import { TradeHistory } from "./TradeHistory";
import { StatsCardSkeleton, TradeHistorySkeleton } from "./Skeleton";
import { Activity, BarChart3, Wallet, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Dashboard() {
    const [address, setAddress] = useState<string>("");
    const { data, error, isLoading, mutate } = useSWR(
        address ? address : null,
        calculateUserStats,
        { refreshInterval: 15000 }
    );

    const showSkeleton = isLoading && !data;

    return (
        <div className="min-h-screen bg-black text-white p-8 font-sans selection:bg-purple-500/30">
            <div className="max-w-7xl mx-auto space-y-12">
                <header className="text-center space-y-4 pt-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 tracking-tight"
                    >
                        PolyStats
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-lg"
                    >
                        Real-time Polymarket Wallet Analytics
                    </motion.p>
                </header>

                <WalletInput onSearch={setAddress} isLoading={isLoading && !data} />

                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center text-red-400 bg-red-500/10 p-6 rounded-lg border border-red-500/20 max-w-2xl mx-auto space-y-3"
                        >
                            <p>{error?.message ?? "Failed to fetch data. Check the address and try again."}</p>
                            <button
                                type="button"
                                onClick={() => mutate()}
                                className="px-4 py-2 text-sm rounded-md bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 transition-colors"
                            >
                                Retry
                            </button>
                        </motion.div>
                    )}

                    {showSkeleton && (
                        <motion.div
                            key="skeleton"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-8"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <StatsCardSkeleton key={i} />
                                ))}
                            </div>
                            <TradeHistorySkeleton />
                        </motion.div>
                    )}

                    {data && (
                        <motion.div
                            key="dashboard-content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-8"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <StatsCard
                                    title="Total Volume"
                                    value={`$${data.totalVolume.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                                    icon={<BarChart3 size={24} />}
                                    delay={0.1}
                                />
                                <StatsCard
                                    title="Total Trades"
                                    value={data.totalTrades}
                                    icon={<Activity size={24} />}
                                    delay={0.2}
                                />
                                <StatsCard
                                    title="Invested (Buy Volume)"
                                    value={`$${data.totalInvested.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                                    icon={<Wallet size={24} />}
                                    delay={0.3}
                                />
                                <StatsCard
                                    title="Last Activity"
                                    value={data.lastTrade ? new Date(data.lastTrade.timestamp * 1000).toLocaleDateString() : "N/A"}
                                    icon={<Clock size={24} />}
                                    delay={0.4}
                                />
                            </div>
                            <TradeHistory trades={data.trades} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="fixed inset-0 -z-10 h-full w-full bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
            <div className="fixed left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]" />
        </div>
    );
}
