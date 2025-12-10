'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';

interface GameProps {
    onWin: () => void;
}

interface Item {
    id: number;
    x: number;
    y: number;
    type: 'heart' | 'gift' | 'bomb';
    speed: number;
}

export default function LoveCatcherGame({ onWin }: GameProps) {
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [basketX, setBasketX] = useState(50); // Percentage 0-100

    // Refs for game loop to avoid re-renders
    const requestRef = useRef<number>(0);
    const itemsRef = useRef<Item[]>([]);
    const scoreRef = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Audio Refs - Removed in favor of sound utility


    const startGame = () => {
        setIsPlaying(true);
        setScore(0);
        scoreRef.current = 0;
        itemsRef.current = [];
        setGameOver(false);
        requestRef.current = requestAnimationFrame(gameLoop);
    };

    const spawnItem = () => {
        if (Math.random() > 0.05) return; // Spawn rate

        const types: ('heart' | 'gift' | 'bomb')[] = ['heart', 'heart', 'heart', 'gift', 'bomb'];
        const type = types[Math.floor(Math.random() * types.length)];

        itemsRef.current.push({
            id: Date.now() + Math.random(),
            x: Math.random() * 90 + 5, // 5% to 95%
            y: -10,
            type,
            speed: Math.random() * 0.5 + 0.5
        });
    };

    const gameLoop = () => {
        if (scoreRef.current >= 100) {
            handleWin();
            return;
        }

        spawnItem();

        // Update items
        itemsRef.current = itemsRef.current
            .map(item => ({ ...item, y: item.y + item.speed }))
            .filter(item => item.y < 110); // Remove if off screen

        // Collision Detection
        // Basket is approx 15% width at bottom 10%
        const basketLeft = basketX - 10;
        const basketRight = basketX + 10;
        const basketTop = 85;

        itemsRef.current = itemsRef.current.filter(item => {
            if (item.y > basketTop && item.y < 95 && item.x > basketLeft && item.x < basketRight) {
                // Caught!
                if (item.type === 'bomb') {
                    scoreRef.current = Math.max(0, scoreRef.current - 20);
                    sound.playBonk();
                } else {
                    scoreRef.current += (item.type === 'gift' ? 20 : 10);
                    // Play sound (debounced ideally)
                    sound.playPop();
                }
                return false; // Remove item
            }
            return true; // Keep item
        });

        setScore(scoreRef.current); // Sync for UI
        requestRef.current = requestAnimationFrame(gameLoop);
    };

    const handleWin = () => {
        setIsPlaying(false);
        cancelAnimationFrame(requestRef.current);
        onWin();
        sound.playWin();
    };

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        let clientX = 0;

        if ('touches' in e) {
            clientX = e.touches[0].clientX;
        } else {
            clientX = (e as React.MouseEvent).clientX;
        }

        const x = ((clientX - rect.left) / rect.width) * 100;
        setBasketX(Math.max(10, Math.min(90, x)));
    };

    // Cleanup
    useEffect(() => {
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[500px] bg-sky-900/50 rounded-3xl overflow-hidden border-2 border-white/20 touch-none select-none cursor-none"
            onMouseMove={handleMouseMove}
            onTouchMove={handleMouseMove}
        >
            {/* Background Decor */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute top-10 left-10 text-4xl animate-pulse">✨</div>
                <div className="absolute top-40 right-20 text-2xl animate-spin-slow">⭐</div>
            </div>

            {/* Start Overlay */}
            {!isPlaying && score === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-50 backdrop-blur-sm">
                    <h3 className="text-4xl font-black text-rose-400 mb-4 drop-shadow-lg text-center">Love Catcher</h3>
                    <p className="text-white mb-8 text-center max-w-sm">Drag the basket to catch Hearts (❤️) and Gifts (🎁). Avoid Bombs (💣)! <br /> Reach 100 points!</p>
                    <button
                        onClick={startGame}
                        className="px-8 py-3 bg-rose-500 text-white font-bold rounded-full text-xl shadow-[0_0_20px_rgba(244,63,94,0.6)] hover:scale-110 transition-transform"
                    >
                        Start Game 🎮
                    </button>
                </div>
            )}

            {/* Score */}
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 z-40">
                <span className="font-mono font-bold text-2xl text-yellow-300">{score}</span>
                <span className="text-sm text-white/70"> / 100</span>
            </div>

            {/* Items */}
            {itemsRef.current.map(item => (
                <div
                    key={item.id}
                    className="absolute text-4xl drop-shadow-md"
                    style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        transform: 'translateX(-50%)'
                    }}
                >
                    {item.type === 'heart' && '💖'}
                    {item.type === 'gift' && '🎁'}
                    {item.type === 'bomb' && '💣'}
                </div>
            ))}

            {/* Basket */}
            <div
                className="absolute bottom-4 w-20 h-16 transition-all duration-75 ease-linear pointer-events-none"
                style={{ left: `${basketX}%`, transform: 'translateX(-50%)' }}
            >
                <div className="w-full h-full text-6xl flex justify-center items-end drop-shadow-2xl filter brightness-110">
                    🛒
                </div>
            </div>
        </div>
    );
}
