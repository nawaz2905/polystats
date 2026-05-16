"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trade } from "../lib/polymarket";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

const PAGE_SIZE = 10;

interface TradeHistoryProps {
    trades: Trade[];
}

export function TradeHistory({ trades }: TradeHistoryProps) {
    const [visible, setVisible] = useState(PAGE_SIZE);

    if (trades.length === 0) {
        return (
            <div className="text-center text-gray-500 py-10 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                No trades found.
            </div>
        );
    }

    const shown = trades.slice(0, visible);
    const hasMore = visible < trades.length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full space-y-4"
        >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                Recent Activity
                <span className="text-xs font-normal text-gray-400 bg-white/10 px-2 py-0.5 rounded-full">
                    {shown.length} of {trades.length}
                </span>
            </h2>
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
                <div className="grid grid-cols-5 p-4 text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-white/10 bg-white/5">
                    <div className="col-span-2">Asset</div>
                    <div>Side</div>
                    <div className="text-right">Size</div>
                    <div className="text-right">Price</div>
                </div>
                <div className="divide-y divide-white/10">
                    {shown.map((trade, index) => (
                        <motion.div
                            key={trade.id || index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 * (index % PAGE_SIZE) }}
                            className="grid grid-cols-5 p-4 items-center hover:bg-white/5 transition-colors group"
                        >
                            <div className="col-span-2 font-medium text-white truncate pr-2 group-hover:text-blue-400 transition-colors" title={trade.asset}>
                                {trade.asset}
                            </div>
                            <div className={`text-sm font-semibold ${trade.side === "BUY" ? "text-green-400" : "text-red-400"}`}>
                                <span className="flex items-center gap-1">
                                    {trade.side === "BUY" ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                                    {trade.side}
                                </span>
                            </div>
                            <div className="text-right text-gray-300 font-mono">{parseFloat(trade.size).toFixed(2)}</div>
                            <div className="text-right text-gray-300 font-mono">${parseFloat(trade.price).toFixed(3)}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
            {hasMore && (
                <div className="text-center pt-2">
                    <button
                        type="button"
                        onClick={() => setVisible((v) => v + PAGE_SIZE)}
                        className="px-6 py-2 text-sm rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 transition-colors"
                    >
                        Show more ({trades.length - visible} remaining)
                    </button>
                </div>
            )}
        </motion.div>
    );
}
