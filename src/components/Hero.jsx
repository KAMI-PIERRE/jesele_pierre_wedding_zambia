import React from "react";
import { motion } from "framer-motion";
import { coupleInfo } from "../data/weddingData";

export default function Hero() {
  const scrollToInvitation = () => {
    document.querySelector("#bible-verse")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative h-screen overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/couple-photo.jpg.jpeg')",
          backgroundPosition: 'center 30%',
          backgroundSize: 'cover',
        }}
      />

      {/* Minimal bottom gradient for readability only */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end px-4 sm:px-6 pb-24">
        <motion.div
          className="max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-white leading-tight font-semibold mx-auto drop-shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
            {coupleInfo.fullNames}
          </h1>
          <p className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide drop-shadow-[0_0_30px_rgba(212,175,55,0.6)]">
            <span className="text-gold">22</span> <span className="text-white">November</span> <span className="text-gold">2026</span>
          </p>
          <p className="mt-2 text-lg sm:text-xl text-gold/90 font-semibold tracking-[0.25em] uppercase">
            15:00 hrs · Lusaka
          </p>
          <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Reception
          </p>
        </motion.div>

        <motion.button
          onClick={scrollToInvitation}
          className="mx-auto mt-10 inline-flex items-center justify-center rounded-full border border-rose-gold/40 bg-gradient-to-r from-rose-gold/90 to-gold-light/90 px-8 py-3 text-sm uppercase tracking-[0.35em] text-black shadow-2xl shadow-rose-gold/20 transition hover:-translate-y-0.5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          See the details
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        onClick={scrollToInvitation}
      >
        <span className="font-serif text-champagne/60 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-champagne/60 to-transparent" />
      </motion.div>
    </section>
  );
}
