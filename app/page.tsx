'use client';

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./globals.css";

// Components
import ParticleBackground from "./components/ParticleBackground";
import MemoryGallery from "./components/MemoryGallery";
import WishLantern from "./components/WishLantern";
import AudioVisualizer from "./components/AudioVisualizer";
import Cake from "./components/Cake";
import Teddy from "./components/Teddy";
import LoveCatcherGame from "./components/LoveCatcherGame";

export default function BirthdayPage() {
  const [step, setStep] = useState(0); // 0:Intro, 1:Cake, 2:Game, 3:Memories, 4:Teddy+Wishes

  // Game States
  const [cakeCut, setCakeCut] = useState(false);

  // Audio
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Auto-play music on first interaction (cake cut)
    if (cakeCut && audioRef.current && !isPlaying) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
    }
  }, [cakeCut]);

  return (
    <main className="page-wrap bg-[#1a1025] relative overflow-hidden min-h-screen">
      <ParticleBackground />
      <audio ref={audioRef} src="/happy-birthday-short.mp3" loop preload="auto" />

      {/* HEADER */}
      <motion.header className="hero flex flex-col items-center py-8 z-20" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="title text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-red-500 drop-shadow-lg font-serif">
          Happy Birthday, Anu 💖
        </h1>
        <div className="flex items-center gap-4 mt-2">
          <p className="subtitle text-rose-200/80 tracking-widest text-sm uppercase">A magical surprise just for you</p>
          <AudioVisualizer isPlaying={isPlaying} />
        </div>
      </motion.header>

      {/* MAIN CONTENT AREA */}
      <div className="flex-grow w-full max-w-7xl mx-auto flex items-center justify-center z-10 p-4 relative min-h-[600px]">
        <AnimatePresence mode="wait">

          {/* STEP 0: CEREMONY (Cake & Girl) */}
          {step === 0 && (
            <motion.section key="step0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="scene w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">

              {/* Girl Column (Desktop: Left) */}
              <div className="order-2 md:order-1 flex justify-center">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="relative"
                >
                  {/* Floating Hearts BG for Girl */}
                  <div className="absolute -top-10 -left-10 text-4xl animate-bounce delay-100 opacity-50">💖</div>
                  <div className="absolute top-20 -right-10 text-3xl animate-pulse delay-75 opacity-50">✨</div>

                  <img
                    src="/girl.png"
                    alt="Birthday Girl"
                    className="w-64 md:w-80 object-contain drop-shadow-[0_0_20px_rgba(255,100,150,0.5)] animate-[float_6s_ease-in-out_infinite]"
                  />
                </motion.div>
              </div>

              {/* Cake Column (Center) */}
              <div className="order-1 md:order-2 flex flex-col items-center gap-8">
                <div className="relative group">
                  <Cake isCut={cakeCut} onCut={() => setCakeCut(true)} />
                </div>

                <div className="flex flex-col items-center gap-4 h-24">
                  <p className="text-xl text-rose-200 font-bold bg-black/40 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md">
                    {cakeCut ? "Yay! Let's Party! 🎉" : "Tap the Cake to Cut! 🎂"}
                  </p>
                  {cakeCut && (
                    <motion.button
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setStep(1)}
                      className="px-8 py-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full font-bold shadow-[0_0_20px_rgba(52,211,153,0.6)] text-white border-2 border-white/50 text-lg uppercase tracking-wide"
                    >
                      Play Game! 🎮
                    </motion.button>
                  )}
                </div>
              </div>

            </motion.section>
          )}

          {/* STEP 1: LOVE CATCHER GAME */}
          {step === 1 && (
            <motion.section key="step1" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: -100 }} className="flex flex-col items-center w-full max-w-4xl">
              <LoveCatcherGame onWin={() => setStep(2)} />
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                whileHover={{ opacity: 1 }}
                onClick={() => setStep(2)}
                className="mt-4 text-white/30 text-sm hover:underline"
              >
                (Skip Level)
              </motion.button>
            </motion.section>
          )}

          {/* STEP 2: MEMORY GALLERY */}
          {step === 2 && (
            <motion.section key="step2" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.8 }} className="w-full flex flex-col items-center">
              <h2 className="text-3xl md:text-4xl text-white font-bold mb-8 drop-shadow-md">Our Beautiful Memories 📸</h2>

              <MemoryGallery />

              <motion.button
                whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(244, 63, 94, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(3)}
                className="mt-12 px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full font-bold text-2xl shadow-xl text-white border-2 border-white/30"
              >
                One Last Surprise... 🎁
              </motion.button>
            </motion.section>
          )}

          {/* STEP 3: TEDDY & WISHES */}
          {step === 3 && (
            <motion.section key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-8 w-full p-4 text-center">

              <Teddy />

              <div className="glass p-6 md:p-10 rounded-3xl max-w-2xl border border-white/20 bg-black/20">
                <p className="text-2xl md:text-3xl text-rose-100 font-serif italic mb-8 leading-relaxed">
                  "May your year be filled with as much joy as you bring to my life. You are my universe. Happy Birthday!"
                </p>
                <WishLantern />
              </div>

              <button
                onClick={() => window.location.reload()}
                className="text-white/50 hover:text-white mt-8 text-sm uppercase tracking-widest hover:underline transition-colors"
              >
                ↻ Replay from start
              </button>
            </motion.section>
          )}

        </AnimatePresence>
      </div>

      <footer className="footer glass z-10 w-full text-center py-2 text-rose-200/50 text-xs">Made with ❤️ for Anu</footer>
    </main>
  );
}

