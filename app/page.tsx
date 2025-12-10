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
import Girl from "./components/Girl";
import DreamScene from "./components/DreamScene";

export default function BirthdayPage() {
  const [step, setStep] = useState(0); // 0:Intro, 1:Cake, 2:Game, 3:Memories, 4:Teddy+Wishes

  // Game States
  const [cakeCut, setCakeCut] = useState(false);
  const [isCutting, setIsCutting] = useState(false);
  const [showDream, setShowDream] = useState(false);

  // Audio
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const clapRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Initialize Clap sound
    clapRef.current = new Audio('/clap.mp3');
  }, []);

  const handleCeremony = useCallback(async () => {
    if (cakeCut || isCutting) return;

    // 1. Start Cutting Animation
    setIsCutting(true);

    // 2. Wait for knife down (approx 300ms)
    await new Promise(r => setTimeout(r, 400));

    // 3. Cut Cake
    setCakeCut(true);

    // 4. Play Sounds
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.6;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
    }
    if (clapRef.current) {
      clapRef.current.volume = 1.0;
      clapRef.current.play().catch(() => { });
    }

    // 5. Stop Cutting Animation after a bit
    setTimeout(() => setIsCutting(false), 1000);
  }, [cakeCut, isCutting]);


  return (
    <main className="page-wrap bg-[#1a1025] relative overflow-hidden min-h-screen font-sans">
      <ParticleBackground />
      <audio ref={audioRef} src="/happy-birthday-short.mp3" loop preload="auto" />

      {/* HEADER */}
      <motion.header className="hero flex flex-col items-center py-4 md:py-8 z-20 relative" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="title text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-red-500 drop-shadow-lg font-serif text-center px-4">
          Happy Birthday, Anu 💖
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mt-2">
          <p className="subtitle text-rose-200/80 tracking-widest text-xs md:text-sm uppercase bg-black/30 px-3 py-1 rounded-full">A magical surprise just for you</p>
          <AudioVisualizer isPlaying={isPlaying} />
        </div>
      </motion.header>

      {/* MAIN CONTENT AREA */}
      <div className="flex-grow w-full max-w-7xl mx-auto flex items-center justify-center z-10 p-2 md:p-4 relative min-h-[500px] md:min-h-[600px]">
        <AnimatePresence mode="wait">

          {/* STEP 0: CEREMONY (Cake & Girl) */}
          {step === 0 && (
            <motion.section
              key="step0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="scene w-full flex flex-row items-end justify-center gap-0 md:gap-4 pb-20 md:pb-0 scale-75 md:scale-100 origin-top h-[400px] md:h-auto"
            >

              {/* Girl Column (Left) */}
              <div className="z-20 -mr-16 md:-mr-10 mb-[-10px]">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  onClick={handleCeremony} // Clicking girl also triggers it
                  className="cursor-pointer"
                >
                  <Girl isCutting={isCutting} hasCut={cakeCut} />
                </motion.div>
              </div>

              {/* Cake Column (Right) */}
              <div className="flex flex-col items-center gap-8 relative z-10 w-64">
                {/* Floating Click Hint */}
                {!cakeCut && !isCutting && (
                  <motion.div
                    className="absolute -top-24 left-1/2 -translate-x-1/2 bg-white text-rose-600 font-bold px-4 py-2 rounded-xl arrow-bottom shadow-xl whitespace-nowrap z-50 animate-bounce pointer-events-none"
                  >
                    Tap us! 👇
                  </motion.div>
                )}

                <div className="relative group cursor-pointer" onClick={handleCeremony}>
                  <Cake isCut={cakeCut} />
                </div>

                {/* Button - Absolute on Mobile to avoid layout shift? No, flex is fine if height fixed. */}
                <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-max">
                  {cakeCut && (
                    <motion.button
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setStep(1)}
                      className="px-8 py-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full font-bold shadow-[0_0_20px_rgba(52,211,153,0.6)] text-white border-2 border-white/50 text-lg uppercase tracking-wide flex items-center gap-2"
                    >
                      <span>Play Game!</span> 🎮
                    </motion.button>
                  )}
                </div>
              </div>

            </motion.section>
          )}

          {/* STEP 1: LOVE CATCHER GAME */}
          {step === 1 && (
            <motion.section key="step1" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: -100 }} className="flex flex-col items-center w-full max-w-4xl">
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
              <h2 className="text-3xl md:text-4xl text-white font-bold mb-8 drop-shadow-md text-center">Our Beautiful Memories 📸</h2>

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

              {/* Dream Button Section */}
              <div className="w-full flex justify-center mt-8">
                {!showDream ? (
                  <motion.button
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setShowDream(true)}
                    className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-xl text-rose-200 font-bold border border-rose-200/30 hover:bg-white/20 transition-all flex flex-col items-center gap-1"
                  >
                    <span>I know your dream is... 💭</span>
                    <span className="text-xs opacity-60">(Click to see!)</span>
                  </motion.button>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full flex justify-center">
                    <DreamScene />
                  </motion.div>
                )}
              </div>

              <button
                onClick={() => window.location.reload()}
                className="text-white/50 hover:text-white mt-8 text-sm uppercase tracking-widest hover:underline transition-colors pb-8"
              >
                ↻ Replay from start
              </button>
            </motion.section>
          )}

        </AnimatePresence>
      </div>

      <footer className="footer glass z-10 w-full text-center py-2 text-rose-200/50 text-xs mt-auto">Made with ❤️ for Anu</footer>
    </main>
  );
}
