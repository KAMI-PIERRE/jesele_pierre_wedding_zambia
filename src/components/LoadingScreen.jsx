import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="loading-screen fixed inset-0 z-[9999] flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/couple-photo.jpg.jpeg')" }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 bg-black/85" />
      <div className="relative z-10 w-full max-w-2xl px-6 py-10 rounded-[2rem] border border-white/10 bg-black/30 shadow-2xl backdrop-blur-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/70" />
        <div className="relative z-10 flex flex-col items-center text-center gap-8">
          <motion.div
            className="relative flex items-center justify-center w-[200px] h-[200px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: [1, 1.03, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full border border-gold/40"
                style={{
                  width: `${110 + i * 45}px`,
                  height: `${110 + i * 45}px`,
                }}
                animate={{ opacity: [0.15, 0.5, 0.15], scale: [1, 1.02, 1] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
            <motion.div
              className="relative z-10 flex items-center justify-center w-24 h-24 rounded-full bg-white/10 border border-white/20 shadow-2xl text-6xl text-gold"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              💍
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="font-script text-5xl md:text-6xl text-gold">
              Gisele &  Pierre
            </h1>
            <p className="font-serif text-champagne tracking-[0.3em] uppercase text-sm">
              22 November 2026 · 15:00 hrs
            </p>
          </motion.div>

          <div className="w-full">
            <div className="h-3 rounded-full bg-white/10 overflow-hidden shadow-inner">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-rose-gold via-gold to-champagne"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.2 }}
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.35em] text-white/70">
              <span>Preparing your invitation...</span>
              <span>{progress}%</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
