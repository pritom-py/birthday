'use client';
import { motion } from 'framer-motion';

const memories = [
    { id: 1, title: "Our First Date", color: "bg-rose-400" },
    { id: 2, title: "Crazy Adventures", color: "bg-amber-400" },
    { id: 3, title: "Sweet Moments", color: "bg-pink-400" },
    { id: 4, title: "Your Smile", color: "bg-purple-400" },
    { id: 5, title: "Together Forever", color: "bg-emerald-400" },
];

export default function MemoryGallery() {
    return (
        <div className="w-full max-w-4xl mx-auto py-8">
            <h3 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-md">Memory Lane 📸</h3>
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x px-4 no-scrollbar">
                {memories.map((mem, i) => (
                    <motion.div
                        key={mem.id}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                        className={`flex-shrink-0 w-64 h-80 ${mem.color} rounded-xl p-4 shadow-xl rotate-1 snap-center cursor-pointer relative group`}
                    >
                        <div className="w-full h-4/5 bg-white/90 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                            <span className="text-6xl opacity-50 group-hover:scale-125 transition-transform duration-500">❤️</span>
                        </div>
                        <p className="text-center font-handwriting font-bold text-white text-lg drop-shadow-sm">{mem.title}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
