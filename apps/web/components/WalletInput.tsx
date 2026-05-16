"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

const ETH_ADDRESS_RE = /^0x[0-9a-fA-F]{40}$/;

interface WalletInputProps {
    onSearch: (address: string) => void;
    isLoading: boolean;
}

export function WalletInput({ onSearch, isLoading }: WalletInputProps) {
    const [value, setValue] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = value.trim();
        if (!ETH_ADDRESS_RE.test(trimmed)) {
            setError("Must be a valid Ethereum address (0x followed by 40 hex chars).");
            return;
        }
        setError(null);
        onSearch(trimmed);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-2xl mx-auto space-y-2"
        >
            <form onSubmit={handleSubmit} className="relative">
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                    <div className="relative flex items-center bg-black rounded-lg">
                        <div className="absolute left-4 text-gray-400">
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                                if (error) setError(null);
                            }}
                            placeholder="Enter Polymarket wallet address (0x...)"
                            className="w-full bg-transparent text-white placeholder-gray-500 py-4 pl-12 pr-32 rounded-lg border-2 border-transparent focus:border-white/10 focus:outline-none transition-all"
                            disabled={isLoading}
                            aria-label="Wallet address"
                            aria-describedby={error ? "wallet-error" : undefined}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !value.trim()}
                            className={cn(
                                "absolute right-2 px-6 py-2 rounded-md font-medium text-white shadow-lg transition-all",
                                isLoading || !value.trim()
                                    ? "bg-gray-800 cursor-not-allowed text-gray-500"
                                    : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 active:scale-95"
                            )}
                        >
                            {isLoading ? "Searching..." : "Analyze"}
                        </button>
                    </div>
                </div>
            </form>
            {error && (
                <p id="wallet-error" className="text-sm text-red-400 pl-1">
                    {error}
                </p>
            )}
        </motion.div>
    );
}
