import React from "react";
import { motion } from "framer-motion";
import { parents } from "../data/weddingData";
import { GiFlowerEmblem } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.7, ease: "easeOut" },
  }),
};

function ParentCard({ person, side, delay }) {
  const isBride = side === "bride";
  return (
    <motion.div
      className="relative group"
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div
        className={`relative bg-white border ${
          isBride ? "border-rose-gold/30" : "border-gold/30"
        } p-8 md:p-10 text-center shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden`}
      >
        {/* Background texture */}
        <div
          className={`absolute inset-0 opacity-5 ${
            isBride ? "bg-rose-gradient" : "bg-gold-gradient"
          }`}
        />

        {/* Corner ornaments */}
        <span
          className={`absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 ${
            isBride ? "border-rose-gold/50" : "border-gold/50"
          }`}
        />
        <span
          className={`absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 ${
            isBride ? "border-rose-gold/50" : "border-gold/50"
          }`}
        />
        <span
          className={`absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 ${
            isBride ? "border-rose-gold/50" : "border-gold/50"
          }`}
        />
        <span
          className={`absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 ${
            isBride ? "border-rose-gold/50" : "border-gold/50"
          }`}
        />

        {/* Side badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1 mb-6 text-xs tracking-widest uppercase font-serif ${
            isBride
              ? "text-rose-gold border border-rose-gold/30 bg-rose-gold/5"
              : "text-gold border border-gold/30 bg-gold/5"
          }`}
        >
          {isBride ? "👰" : "🤵"} {parents[side].side}
        </div>

        {/* Icon */}
        <motion.div
          className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
            isBride ? "bg-rose-gold/10" : "bg-gold/10"
          }`}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8 }}
        >
          <GiFlowerEmblem
            size={36}
            className={isBride ? "text-rose-gold" : "text-gold"}
          />
        </motion.div>

        {/* Parents info */}
        <div className="grid gap-6">
          <div>
            <p
              className={`font-serif text-xs tracking-[0.25em] uppercase mb-2 ${
                isBride ? "text-rose-gold/70" : "text-gold/70"
              }`}
            >
              {person.father.title}
            </p>
            <h3
              className={`font-serif text-xl md:text-2xl font-semibold tracking-wide ${
                isBride ? "text-gray-800" : "text-gray-800"
              }`}
            >
              {person.father.name}
            </h3>
          </div>

          <div>
            <p
              className={`font-serif text-xs tracking-[0.25em] uppercase mb-2 ${
                isBride ? "text-rose-gold/70" : "text-gold/70"
              }`}
            >
              {person.mother.title}
            </p>
            <h3
              className={`font-serif text-xl md:text-2xl font-semibold tracking-wide ${
                isBride ? "text-gray-800" : "text-gray-800"
              }`}
            >
              {person.mother.name}
            </h3>
          </div>
        </div>

        {/* Decorative divider */}
        <div
          className={`mt-6 w-16 h-px mx-auto ${
            isBride
              ? "bg-gradient-to-r from-transparent via-rose-gold to-transparent"
              : "bg-gradient-to-r from-transparent via-gold to-transparent"
          }`}
        />
      </div>
    </motion.div>
  );
}

export default function Parents() {
  return (
    <section
      id="parents"
      className="relative py-24 bg-gradient-to-b from-white to-champagne/30 overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-serif text-rose-gold/70 tracking-[0.4em] uppercase text-xs mb-4">
            With the blessings of
          </p>
          <h2 className="section-title">Our Families</h2>
          <div className="gold-divider">
            <FaHeart className="text-rose-gold text-sm" />
          </div>
          <p className="font-serif text-gray-500 text-base max-w-md mx-auto">
            We are joyfully united with the love and blessings of our families
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <ParentCard person={parents.bride} side="bride" delay={0} />
          <ParentCard person={parents.groom} side="groom" delay={1} />
        </div>

        {/* Bottom quote */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <p className="font-script text-3xl text-rose-gold">
            "A family united in love"
          </p>
        </motion.div>
      </div>
    </section>
  );
}
