'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Teddy() {
    return (
        <div className="relative w-64 h-80 flex items-center justify-center">
            <motion.div
                className="relative w-48 h-60"
                initial={{ y: 0 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
                {/* Body */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-36 bg-[#8B5A2B] rounded-[40%_40%_45%_45%] shadow-lg border-2 border-[#5C3A1A]">
                    {/* Belly */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-20 bg-[#D4A373] rounded-full opacity-80" />
                </div>

                {/* Head */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-36 h-32 bg-[#8B5A2B] rounded-[45%] shadow-md border-2 border-[#5C3A1A] z-10">
                    {/* Ears */}
                    <div className="absolute -top-4 -left-2 w-12 h-12 bg-[#8B5A2B] rounded-full border-2 border-[#5C3A1A]" />
                    <div className="absolute -top-4 -right-2 w-12 h-12 bg-[#8B5A2B] rounded-full border-2 border-[#5C3A1A]" />
                    {/* Inner Ears */}
                    <div className="absolute -top-2 left-0 w-8 h-8 bg-[#D4A373] rounded-full" />
                    <div className="absolute -top-2 right-0 w-8 h-8 bg-[#D4A373] rounded-full" />

                    {/* Eyes */}
                    <div className="absolute top-10 left-8 w-4 h-4 bg-black rounded-full animate-[blink_4s_infinite]" />
                    <div className="absolute top-10 right-8 w-4 h-4 bg-black rounded-full animate-[blink_4s_infinite]" />

                    {/* Muzzle */}
                    <div className="absolute top-14 left-1/2 -translate-x-1/2 w-16 h-12 bg-[#D4A373] rounded-full">
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-4 bg-[#3E2723] rounded-[40%]" /> {/* Nose */}
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[2px] h-3 bg-[#3E2723]" />
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-8 h-4 border-b-2 border-[#3E2723] rounded-full" /> {/* Smile */}
                    </div>

                    {/* Cheeks */}
                    <div className="absolute top-12 left-2 w-6 h-4 bg-pink-300 rounded-full opacity-40 blur-sm" />
                    <div className="absolute top-12 right-2 w-6 h-4 bg-pink-300 rounded-full opacity-40 blur-sm" />
                </div>

                {/* Legs */}
                <div className="absolute bottom-0 left-0 w-16 h-12 bg-[#8B5A2B] rounded-full border-2 border-[#5C3A1A] translate-y-4" />
                <div className="absolute bottom-0 right-0 w-16 h-12 bg-[#8B5A2B] rounded-full border-2 border-[#5C3A1A] translate-y-4" />

                {/* Arms */}
                <div className="absolute top-28 -left-4 w-12 h-20 bg-[#8B5A2B] rounded-full border-2 border-[#5C3A1A] rotate-[30deg]" />
                <motion.div
                    className="absolute top-28 -right-4 w-12 h-20 bg-[#8B5A2B] rounded-full border-2 border-[#5C3A1A] origin-top-left"
                    animate={{ rotate: [-30, -10, -30] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />

                {/* Heart */}
                <motion.div
                    className="absolute top-32 left-1/2 -translate-x-1/2 text-4xl drop-shadow-lg z-20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                >
                    ❤️
                </motion.div>
            </motion.div>
        </div>
    );
}
