import React from "react";
import { motion } from "framer-motion";
import { loveStory } from "../data/weddingData";
import { FaHeart } from "react-icons/fa";

export default function LoveStory() {
  return (
    <section
      id="love-story"
      className="relative py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #1a0a0a 0%, #2d1515 40%, #1a0a0a 100%)",
      }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Ambient lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-serif text-gold/70 tracking-[0.4em] uppercase text-xs mb-4">
            How it all began
          </p>
          <h2 className="font-script text-5xl md:text-6xl text-gold text-center mb-4">
            Our Love Story
          </h2>
          <div className="gold-divider">
            <FaHeart className="text-rose-gold text-sm" />
          </div>
          <p className="font-serif text-champagne/60 text-base max-w-md mx-auto">
            A journey of love, laughter, and beautiful moments
          </p>
        </motion.div>

        {/* Story timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/60 via-rose-gold/60 to-gold/60 hidden md:block -translate-x-1/2" />
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-rose-gold/40 to-gold/40 md:hidden" />

          <div className="space-y-16">
            {loveStory.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  className={`relative flex md:items-center gap-6 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  {/* Content card */}
                  <div
                    className={`flex-1 md:px-10 pl-12 md:pl-0 ${
                      isLeft ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <motion.div
                      className="bg-white/5 backdrop-blur-sm border border-gold/20 p-6 md:p-8 hover:bg-white/10 hover:border-gold/40 transition-all duration-400"
                      whileHover={{ y: -3 }}
                    >
                      <div
                        className={`flex items-center gap-3 mb-3 ${
                          isLeft
                            ? "md:flex-row-reverse md:justify-start"
                            : "flex-row"
                        }`}
                      >
                        <span className="text-3xl">{item.emoji}</span>
                        <span className="font-serif text-gold text-sm tracking-widest">
                          {item.year}
                        </span>
                      </div>

                      <h3
                        className={`font-serif text-xl md:text-2xl text-white font-light mb-3 ${
                          isLeft ? "md:text-right" : ""
                        }`}
                      >
                        {item.title}
                      </h3>

                      <p
                        className={`font-serif text-champagne/60 text-sm leading-relaxed ${
                          isLeft ? "md:text-right" : ""
                        }`}
                      >
                        {item.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center node */}
                  <div className="absolute md:static left-0.5 top-6 md:top-auto md:left-auto md:flex-shrink-0 z-10">
                    <motion.div
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-rose-gold flex items-center justify-center shadow-lg shadow-gold/20"
                      whileHover={{ scale: 1.3 }}
                      whileInView={{ scale: [0, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <FaHeart size={12} className="text-white" />
                    </motion.div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom quote */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="font-script text-4xl text-gold">
            "And so the adventure begins..."
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6" />
        </motion.div>
      </div>
    </section>
  );
}
