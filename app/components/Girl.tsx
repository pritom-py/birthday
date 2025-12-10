'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GirlProps {
    isCutting: boolean;
    hasCut?: boolean;
}

export default function Girl({ isCutting, hasCut }: GirlProps) {
    return (
        <div className="relative w-48 h-64 md:w-64 md:h-80 flex flex-col items-center">
            {/* --- GIRL BODY (Container) --- */}
            <motion.div
                className="relative w-full h-full"
                initial={{ y: 0 }}
                animate={
                    isCutting ? { y: 0 } :
                        hasCut ? { y: [0, -15, 0], rotate: [0, -2, 2, 0] } : // Happy Jump!
                            { y: [0, -5, 0] } // Idle bob
                }
                transition={
                    hasCut
                        ? { repeat: Infinity, duration: 0.6, ease: "circOut" }
                        : { repeat: Infinity, duration: 3, ease: "easeInOut" }
                }
            >

                {/* HEART POPUP (When Happy) */}
                {hasCut && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.2, opacity: 1, y: -20 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="absolute -top-10 right-0 text-4xl z-50"
                    >
                        🥰
                    </motion.div>
                )}

                {/* HAIR (Back) */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 h-48 bg-black rounded-full z-0 block" />
                <div className="absolute top-20 left-0 w-16 h-40 bg-black rounded-b-full z-0 rotate-12 origin-top" />
                <div className="absolute top-20 right-0 w-16 h-40 bg-black rounded-b-full z-0 -rotate-12 origin-top" />

                {/* DRESS */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-32 bg-pink-400 rounded-[50%_50%_10%_10%] z-10 shadow-lg flex flex-col items-center">
                    <div className="w-full h-4 bg-white/20 mt-20" /> {/* Belt details */}
                    <div className="absolute bottom-0 w-48 h-8 bg-pink-300 rounded-full blur-sm opacity-50 -z-10" />
                </div>

                {/* HEAD */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-36 h-32 bg-[#ffdbc5] rounded-[45%] shadow-md z-20 flex flex-col items-center border border-[#eebb99]">

                    {/* BANGS */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-40 h-16 bg-black rounded-[50%_50%_0_0] z-30" />

                    {/* EYES */}
                    <div className="absolute top-14 left-8 w-8 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border border-gray-200">
                        {hasCut ? (
                            // Happy Eyes (^)
                            <div className="w-6 h-4 border-t-4 border-sky-600 rounded-full mt-2" />
                        ) : (
                            // Normal Eyes
                            <>
                                <motion.div
                                    className="w-4 h-6 bg-sky-600 rounded-full"
                                    animate={isCutting ? { height: 4, marginTop: 4 } : { height: 24 }}
                                />
                                <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full opacity-80" />
                            </>
                        )}
                    </div>

                    <div className="absolute top-14 right-8 w-8 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border border-gray-200">
                        {hasCut ? (
                            // Happy Eyes (^)
                            <div className="w-6 h-4 border-t-4 border-sky-600 rounded-full mt-2" />
                        ) : (
                            // Normal Eyes
                            <>
                                <motion.div
                                    className="w-4 h-6 bg-sky-600 rounded-full"
                                    animate={isCutting ? { height: 4, marginTop: 4 } : { height: 24 }}
                                />
                                <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full opacity-80" />
                            </>
                        )}
                    </div>

                    {/* BLUSH */}
                    <div className="absolute top-20 left-4 w-6 h-4 bg-pink-300 rounded-full opacity-40 blur-md" />
                    <div className="absolute top-20 right-4 w-6 h-4 bg-pink-300 rounded-full opacity-40 blur-md" />

                    {/* MOUTH */}
                    <motion.div
                        className="absolute bottom-6 w-4 h-2 bg-rose-400 rounded-full origin-center"
                        animate={
                            isCutting ? { scale: 1.5, borderRadius: "50%" } :
                                hasCut ? { width: 24, height: 12, borderRadius: "0 0 50% 50%" } : // Big smile
                                    { scale: 1 }
                        }
                    />
                </div>

                {/* ARMS */}
                {/* Left Arm */}
                <motion.div
                    className="absolute top-40 left-2 w-10 h-24 bg-[#ffdbc5] rounded-full z-10 border border-[#eebb99] origin-top-right"
                    animate={hasCut ? { rotate: [12, 160, 12] } : { rotate: 12 }} // Wave when happy
                    transition={hasCut ? { repeat: Infinity, duration: 1 } : {}}
                >
                    <div className="absolute bottom-0 left-0 w-10 h-10 bg-[#ffdbc5] rounded-full" />
                </motion.div>

                {/* Right Arm (Holding Knife) */}
                <motion.div
                    className="absolute top-40 right-2 w-10 h-24 bg-[#ffdbc5] rounded-full z-30 border border-[#eebb99] origin-top-left"
                    initial={{ rotate: -10 }}
                    animate={
                        isCutting ? { rotate: [-10, -45, 10] } :
                            hasCut ? { rotate: -120, x: -20 } : // Put hand up (drop knife conceptually or just hold it up)
                                { rotate: -10 }
                    }
                    transition={{ duration: 0.5, ease: "backIn" }}
                >
                    {/* HAND */}
                    <div className="absolute bottom-0 left-0 w-10 h-10 bg-[#ffdbc5] rounded-full" />

                    {/* KNIFE (Hide when happy?? Or keep?) -> Keep for now */}
                    <div className="absolute bottom-2 -left-2 w-6 h-28 bg-gray-300 border border-gray-400 origin-bottom rotate-[100deg] z-0 rounded-t-full shadow-sm" style={{ opacity: hasCut ? 0 : 1 }}>
                        <div className="absolute bottom-0 w-full h-8 bg-amber-700 rounded-sm" /> {/* Handle */}
                        <div className="absolute top-2 left-1 w-2 h-20 bg-white/40" /> {/* Shine */}
                    </div>
                </motion.div>

            </motion.div>
        </div>
    );
}
