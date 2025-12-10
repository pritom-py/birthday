'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CakeProps {
    onCut?: () => void;
    isCut: boolean;
}

export default function Cake({ onCut, isCut }: CakeProps) {
    // We can use a pure CSS approach or SVG. CSS is often cuter for "cartoon" style.
    // This cake will be a 2-tier cake with candles.

    return (
        <div className="relative w-64 h-64 flex items-end justify-center cursor-pointer group" onClick={onCut}>
            {/* Plate */}
            <div className="absolute bottom-0 w-72 h-4 bg-white rounded-full shadow-lg z-0" />

            {/* Bottom Tier */}
            <div className="relative w-56 h-24 bg-rose-300 rounded-lg shadow-inner z-10 flex items-center justify-center border-b-4 border-rose-400">
                {/* Icing Drips */}
                <div className="absolute top-0 left-0 w-full h-8 flex">
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className="w-8 h-8 bg-pink-100 rounded-full -ml-1 first:ml-0 shadow-sm" />
                    ))}
                </div>
            </div>

            {/* Top Tier */}
            <div className="absolute bottom-24 w-40 h-20 bg-rose-200 rounded-lg shadow-sm z-20 flex items-center justify-center border-b-4 border-rose-300">
                {/* Icing Drips */}
                <div className="absolute top-0 left-0 w-full h-6 flex justify-center">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-8 h-6 bg-pink-100 rounded-full -ml-1 first:ml-0 shadow-sm" />
                    ))}
                </div>

                {/* Candles */}
                <div className="absolute -top-8 flex gap-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="relative w-2 h-8 bg-yellow-100 rounded-sm shadow-sm group-hover:scale-110 transition-transform">
                            {/* Stripe */}
                            <div className="absolute top-2 w-full h-1 bg-red-400 rotate-12 opacity-50" />
                            <div className="absolute top-5 w-full h-1 bg-red-400 rotate-12 opacity-50" />

                            {/* Flame */}
                            {!isCut && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-6 bg-orange-400 rounded-[50%] blur-[1px] animate-[candleFlicker_1s_infinite_alternate] origin-bottom">
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-3 bg-yellow-200 rounded-full blur-[2px]" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Decorations around bottom */}
            <div className="absolute bottom-0 z-30 flex justify-between w-60 px-2">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-6 h-6 bg-white rounded-full shadow-md" />
                ))}
            </div>

            {/* Cut Animation Layer */}
            {isCut && (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute z-50 text-6xl drop-shadow-2xl"
                    style={{ top: '30%' }}
                >
                    🍰
                </motion.div>
            )}
        </div>
    );
}
