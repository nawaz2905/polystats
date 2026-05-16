"use client";

import { cn } from "../lib/utils";

export function Skeleton({ className }: { className?: string }) {
    return (
        <div className={cn("animate-pulse rounded-md bg-white/10", className)} />
    );
}

export function StatsCardSkeleton() {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-white/5 p-6 border border-white/10">
            <Skeleton className="h-4 w-24 mb-4" />
            <Skeleton className="h-8 w-32" />
        </div>
    );
}

export function TradeHistorySkeleton() {
    return (
        <div className="w-full space-y-4">
            <Skeleton className="h-6 w-40" />
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                <div className="p-4 border-b border-white/10 bg-white/5">
                    <Skeleton className="h-3 w-full" />
                </div>
                <div className="divide-y divide-white/10">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="grid grid-cols-5 p-4 gap-4">
                            <div className="col-span-2"><Skeleton className="h-4 w-full" /></div>
                            <Skeleton className="h-4 w-12" />
                            <Skeleton className="h-4 w-16 ml-auto" />
                            <Skeleton className="h-4 w-16 ml-auto" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
