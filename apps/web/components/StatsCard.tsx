"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
    delay?: number;
    className?: string;
}

export function StatsCard({ title, value, icon, delay = 0, className }: StatsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className={cn(
                "relative overflow-hidden rounded-2xl bg-white/5 p-6 backdrop-blur-lg border border-white/10 shadow-xl",
                className
            )}
        >
            <div className="absolute top-0 right-0 -mr-4 -mt-4 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/0 blur-xl" />

            <div className="relative z-10 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-400">{title}</p>
                    <h3 className="mt-2 text-3xl font-bold text-white tracking-tight">{value}</h3>
                </div>
                <div className="rounded-full bg-white/10 p-3 text-white shadow-inner">
                    {icon}
                </div>
            </div>
        </motion.div>
    );
}
