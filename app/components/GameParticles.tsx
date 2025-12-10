'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Simple confetti burst effect
export default function GameParticles() {
    const particles = Array.from({ length: 20 });

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        opacity: 1,
                        scale: 0,
                        x: '50%',
                        y: '50%'
                    }}
                    animate={{
                        opacity: 0,
                        scale: 1,
                        x: `${Math.random() * 100}%`,
                        y: `${Math.random() * 100}%`,
                        rotate: Math.random() * 360
                    }}
                    transition={{
                        duration: 1.5,
                        ease: "easeOut",
                        delay: Math.random() * 0.2
                    }}
                    className="absolute text-2xl"
                >
                    {['❤️', '✨', '🎉', '🌸'][Math.floor(Math.random() * 4)]}
                </motion.div>
            ))}
        </div>
    );
}
