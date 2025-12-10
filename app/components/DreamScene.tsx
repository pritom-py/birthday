'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// ... (Top of file remains)

export default function DreamScene() {
    // Audio refs
    const bonkSound = useRef<HTMLAudioElement | null>(null);
    const crySound = useRef<HTMLAudioElement | null>(null);
    const kickSound = useRef<HTMLAudioElement | null>(null);
    const wooshSound = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        bonkSound.current = new Audio('/bonk.mp3');
        crySound.current = new Audio('/funny-cry.mp3');
        kickSound.current = new Audio('/kick.mp3'); // Need to map or use generic
        wooshSound.current = new Audio('/woosh.mp3');
    }, []);

    const [action, setAction] = useState<'idle' | 'punch' | 'kick'>('idle');
    const [boyState, setBoyState] = useState<'idle' | 'crying' | 'flying'>('idle');
    const [clickCount, setClickCount] = useState(0); // To force re-renders if needed

    const triggerPunch = () => {
        if (action !== 'idle' && action !== 'punch') return; // Don't interrupt kick

        // Reset Logic
        setAction('idle');
        setBoyState('idle');

        // Slight delay to allow 'idle' to render (frame reset)
        setTimeout(() => {
            setAction('punch');
            setClickCount(c => c + 1);

            // Audio & Impact
            setTimeout(() => {
                if (bonkSound.current) {
                    bonkSound.current.currentTime = 0;
                    bonkSound.current.play().catch(() => { });
                }
                setBoyState('crying');

                setTimeout(() => {
                    if (crySound.current) {
                        crySound.current.currentTime = 0;
                        crySound.current.play().catch(() => { });
                    }
                }, 100);

            }, 300); // Sync with punch arm

            // Reset to idle after animation
            setTimeout(() => {
                setAction('idle');
                // Keep boy crying until next action? Or reset? 
                // User wants "hit every time", so keeping him crying is fine, 
                // but we need to ensure the punch animation plays again. 
                // The logic above resets action to 'idle' then 'punch', so it should replay.
            }, 800);
        }, 10);
    };

    const triggerKick = () => {
        if (action !== 'idle') return;

        setAction('kick');
        setBoyState('idle'); // Stop crying to be kicked

        // 1. Kick Hit Time
        setTimeout(() => {
            if (kickSound.current) kickSound.current.play().catch(() => { }); // Optional sound
            if (wooshSound.current) wooshSound.current.play().catch(() => { });

            setBoyState('flying');
        }, 400);

        // Reset
        setTimeout(() => {
            setAction('idle');
            // Bring boy back after a while?
            setTimeout(() => {
                setBoyState('idle');
            }, 2000);
        }, 1000);
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-black/60 rounded-3xl border-2 border-pink-500/50 backdrop-blur-xl max-w-2xl w-full shadow-[0_0_50px_rgba(236,72,153,0.3)] min-h-[500px]">
            <h3 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-12 text-center drop-shadow-sm">
                ✨ The Dream Reality ✨
            </h3>

            {/* Remove overflow hidden to allow flying/hitting limbs to be seen */}
            <div className="relative w-full h-80 flex items-end justify-center gap-16 overflow-visible px-4">

                {/* --- GIRL (ANU) --- */}
                <div className="relative flex flex-col items-center z-20">
                    <div className="mb-4 px-4 py-1 bg-pink-500 text-white font-bold rounded-full shadow-lg border border-white/20">Anu 😈</div>
                    <div className="relative w-32 h-40">
                        {/* Body */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-24 bg-pink-500 rounded-t-3xl z-10 shadow-inner" />

                        {/* Head */}
                        <div className="relative z-20 w-24 h-24 bg-[#ffdbc5] rounded-full border-2 border-[#eebb99] flex flex-col items-center justify-center overflow-hidden shadow-md">
                            {/* Hair */}
                            <div className="absolute top-0 w-full h-10 bg-gray-900 rounded-b-xl" />
                            <div className="absolute top-0 -left-2 w-8 h-20 bg-gray-900 rotate-12" />
                            <div className="absolute top-0 -right-2 w-8 h-20 bg-gray-900 -rotate-12" />

                            {/* Eyes */}
                            <div className="flex gap-4 mt-2">
                                <div className="w-3 h-1 bg-black rotate-12 rounded-full" />
                                <div className="w-3 h-1 bg-black -rotate-12 rounded-full" />
                            </div>
                            {/* Grin */}
                            <div className="w-6 h-3 border-b-2 border-red-500 rounded-full mt-1" />
                        </div>

                        {/* PUNCHING ARM - Higher Z-Index and Exaggerated Rotation */}
                        <motion.div
                            className="absolute top-16 -right-8 w-32 h-8 bg-[#ffdbc5] border-2 border-[#eebb99] rounded-full z-40 origin-left shadow-lg"
                            initial={{ rotate: 70 }}
                            animate={action === 'punch' ? { rotate: [70, -45, 70], x: [0, 20] } : { rotate: 70, x: 0 }} /* -45 is higher up */
                            transition={{ duration: 0.2, ease: "circIn" }} /* Faster punch */
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-[#ffdbc5] rounded-full border-2 border-[#eebb99] shadow-sm flex items-center justify-center">
                                <span className="text-3xl -rotate-90">🥊</span>
                            </div>
                        </motion.div>

                        {/* KICKING LEG - Ensure Visibility */}
                        <motion.div
                            className="absolute bottom-6 right-0 w-10 h-32 bg-pink-600 rounded-full z-40 origin-top border-2 border-pink-700"
                            initial={{ rotate: 0, opacity: 0, scale: 0 }}
                            animate={action === 'kick' ? { rotate: [0, -110, 0], opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="absolute bottom-0 w-full h-10 bg-black rounded-b-full shadow-md"></div> {/* Shoe */}
                        </motion.div>
                    </div>
                </div>

                {/* --- BOY (PRITOM) --- */}
                <motion.div
                    className="relative flex flex-col items-center z-10 cursor-pointer group"
                    onClick={triggerPunch}
                    animate={
                        boyState === 'flying' ? { x: 500, y: -200, rotate: 720, opacity: 0 } :
                            boyState === 'idle' ? { x: 0, y: 0, opacity: 1, rotate: 0 } : {}
                    }
                    transition={boyState === 'flying' ? { duration: 0.8, ease: "anticipate" } : { type: "spring", stiffness: 300, damping: 20 }}
                >
                    <div className="mb-4 px-4 py-1 bg-blue-500 text-white font-bold rounded-full shadow-lg border border-white/20 group-hover:scale-110 transition-transform">
                        Pritom 🥺
                    </div>

                    <motion.div
                        className="relative w-32 h-40 group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                        animate={boyState === 'crying' ? { y: [0, 20, 0], scaleY: [1, 0.8, 1], x: [0, -5, 5, 0] } : {}}
                        key={clickCount} // FORCE RE-RENDER ANIMATION ON HIT
                        transition={{ duration: 0.5 }}
                    >
                        {/* Body */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-24 bg-blue-600 rounded-t-3xl z-10 shadow-inner" />

                        {/* Head */}
                        <div className="relative z-20 w-24 h-24 bg-[#ffdbc5] rounded-full border-2 border-[#eebb99] flex flex-col items-center justify-center shadow-md">
                            {/* Hair */}
                            <div className="absolute -top-2 w-28 h-12 bg-[#2c1a0f] rounded-full" />

                            {/* Face Content */}
                            <div className="relative w-full h-full flex flex-col items-center justify-center mt-2">
                                {boyState !== 'crying' ? (
                                    // Normal Face (Fearful)
                                    <>
                                        <div className="flex gap-4">
                                            <div className="w-2 h-2 bg-black rounded-full" />
                                            <div className="w-2 h-2 bg-black rounded-full" />
                                        </div>
                                        <div className="w-4 h-2 border-t border-black rounded-full mt-3 opacity-50" />
                                    </>
                                ) : (
                                    // Crying Face
                                    <>
                                        <div className="flex gap-4 relative">
                                            <div className="text-2xl font-black text-black tracking-widest">&gt;&lt;</div>
                                            {/* Tears */}
                                            <motion.div className="absolute top-4 -left-6 w-4 h-16 bg-blue-400 rounded-full opacity-80" animate={{ height: [10, 40, 10] }} transition={{ repeat: Infinity, duration: 0.2 }} />
                                            <motion.div className="absolute top-4 -right-8 w-4 h-16 bg-blue-400 rounded-full opacity-80" animate={{ height: [10, 40, 10] }} transition={{ repeat: Infinity, duration: 0.2, delay: 0.05 }} />
                                        </div>
                                        {/* Mouth */}
                                        <motion.div className="w-10 h-8 bg-black rounded-t-none rounded-b-[2rem] border-4 border-red-500 mt-1 relative overflow-hidden" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 0.3 }}>
                                            <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-6 h-4 bg-red-400 rounded-full" />
                                        </motion.div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* HIT EFFECT */}
                        {boyState === 'crying' && (
                            <motion.div className="absolute -top-10 left-1/2 -translate-x-1/2 text-4xl w-full flex justify-center" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                                <span className="absolute -top-4 left-0">⭐</span>
                                <span className="absolute top-4 right-0">💫</span>
                            </motion.div>
                        )}
                        {boyState === 'crying' && (
                            <motion.div initial={{ scale: 0, opacity: 1 }} animate={{ scale: 3, opacity: 0 }} className="absolute top-0 right-0 text-6xl font-black text-red-500 z-50 pointer-events-none">BONK!</motion.div>
                        )}
                    </motion.div>
                </motion.div>

            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-8">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={triggerPunch}
                    className="px-8 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold rounded-full shadow-lg border-2 border-white/20"
                >
                    👊 Punch Him!
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={triggerKick}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full shadow-lg border-2 border-white/20"
                >
                    🦵 Kick Out!
                </motion.button>
            </div>
            <p className="text-white/40 text-sm mt-4 italic">{boyState === 'flying' ? "He's gone... wait for him..." : "Tap buttons or click him!"}</p>
        </div>
    );
}
