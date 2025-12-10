'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WishLantern() {
    const [wish, setWish] = useState("");
    const [lanterns, setLanterns] = useState<{ id: number; text: string; x: number }[]>([]);

    const releaseLantern = () => {
        if (!wish.trim()) return;
        const newLantern = {
            id: Date.now(),
            text: wish,
            x: Math.random() * 80 + 10 // Random position 10-90%
        };
        setLanterns(prev => [...prev, newLantern]);
        setWish("");
    };

    return (
        <div className="w-full max-w-md mx-auto text-center relative h-96">
            <h3 className="text-2xl font-bold text-amber-200 mb-4 drop-shadow-md">Make a Wish ✨</h3>
            <div className="flex gap-2 mb-8 relative z-50">
                <input
                    type="text"
                    value={wish}
                    onChange={(e) => setWish(e.target.value)}
                    placeholder="I wish for..."
                    className="flex-1 px-4 py-2 rounded-full bg-white/20 border border-amber-200/50 text-white placeholder-amber-100/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                    onClick={releaseLantern}
                    className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full font-bold shadow-lg hover:scale-105 active:scale-95 transition-transform"
                >
                    Release
                </button>
            </div>

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <AnimatePresence>
                    {lanterns.map(l => (
                        <motion.div
                            key={l.id}
                            initial={{ bottom: -50, left: `${l.x}%`, opacity: 0, scale: 0.5 }}
                            animate={{ bottom: '120%', opacity: [0, 1, 1, 0], scale: 1 }}
                            transition={{ duration: 10, ease: "linear" }}
                            className="absolute flex flex-col items-center"
                        >
                            <div className="w-16 h-20 bg-gradient-to-t from-orange-600 via-amber-500 to-yellow-200 rounded-t-2xl rounded-b-md shadow-[0_0_20px_rgba(255,165,0,0.6)] animate-pulse opacity-90 flex items-center justify-center">
                                <span className="text-xs text-amber-900 font-bold px-1 text-center leading-tight truncate w-full">{l.text}</span>
                            </div>
                            <div className="w-12 h-2 bg-amber-900/30 rounded-full mt-1 blur-sm" />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
