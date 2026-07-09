import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { coupleInfo } from "../data/weddingData";
import { FaHeart, FaInstagram, FaFacebook } from "react-icons/fa";

// Animated emojis for footer
const ANIMATED_EMOJIS = ["❤️", "💕", "💖", "💗", "💓", "💝", "🌹", "🌸", "💐", "🎊", "🎉", "💒", "👰", "🤵"];

function FloatingEmoji({ emoji, x, delay, duration }) {
  return (
    <motion.span
      className="absolute pointer-events-none select-none"
      style={{ left: `${x}%`, top: -50 }}
      animate={{
        y: [0, 800],
        opacity: [0, 1, 1, 0],
        rotate: [0, 15, -15, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <span className="text-2xl md:text-3xl">{emoji}</span>
    </motion.span>
  );
}

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Family", href: "#parents" },
  { label: "Schedule", href: "#timeline" },
  { label: "Venue", href: "#venue" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const emojis = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        emoji: ANIMATED_EMOJIS[i % ANIMATED_EMOJIS.length],
        x: (i / 8) * 100,
        delay: i * 1.2,
        duration: 8 + (i % 3),
      })),
    []
  );

  const scrollTo = (href) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer
      className="relative overflow-hidden py-24 bg-gradient-to-b from-champagne/5 to-rose-gold/10"
    >
      {/* Animated emoji background */}
      {emojis.map((item) => (
        <FloatingEmoji
          key={item.id}
          emoji={item.emoji}
          x={item.x}
          delay={item.delay}
          duration={item.duration}
        />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-[2rem] border border-gold/30 bg-white/80 backdrop-blur-sm shadow-2xl p-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-rose-gold/5" />
          <div className="relative z-10">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="mx-auto mb-8 flex justify-center gap-3">
                {['💕', '💒', '💕', '💐', '💕', '💒', '💕'].map((e, i) => (
                  <motion.span
                    key={i}
                    className="text-4xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                  >
                    {e}
                  </motion.span>
                ))}
              </div>
              <h2 className="font-script text-5xl md:text-6xl text-gold mb-2">
                Gisele & Pierre
              </h2>
              <p className="font-serif text-gray-600 tracking-[0.3em] uppercase text-xs">
                22 November 2026 · Lusaka, Zambia
              </p>
            </motion.div>

            <motion.div
              className="mx-auto mb-10 max-w-xl rounded-2xl border border-gold/30 bg-gold/5 px-6 py-5 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              <p className="font-serif text-gray-700 text-sm leading-relaxed">
                <span className="text-gold font-semibold">Please note:</span>{" "}
                our wedding ceremony will be held on{" "}
                <span className="font-semibold">5th September 2026</span>, an
                intimate celebration of love, family, and the start of
                forever. This invitation is for our{" "}
                <span className="font-semibold">Reception in Lusaka, Zambia</span>{" "}
                on <span className="font-semibold">22nd November 2026</span>,
                where we'd love to celebrate with you.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="font-serif text-xs tracking-[0.35em] uppercase text-gray-600 hover:text-gold transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </motion.div>

            <div className="w-full h-px bg-gold/20 mb-10" />

            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <p className="font-script text-3xl md:text-4xl text-gold mb-3">
                Thank you for celebrating with us
              </p>
              <p className="font-serif text-gray-600 text-sm max-w-2xl mx-auto">
                Your presence is the greatest gift we could receive. We are honored to share this special day with family and friends.
              </p>
            </motion.div>

            <motion.div
              className="flex justify-center gap-2 mb-10 flex-wrap"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              {['❤️', '💕', '🌹', '💒', '💐', '🎉', '💖', '🌸', '💓', '🎊', '💝', '👰'].map((e, i) => (
                <motion.span key={i} className="text-2xl" animate={{ y: [0, -8, 0] }} transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}>
                  {e}
                </motion.span>
              ))}
            </motion.div>

            <div className="w-full h-px bg-gold/20 mb-8" />

            <div className="text-center">
              <p className="font-serif text-gray-600 text-xs tracking-[0.35em]">
                © {new Date().getFullYear()} Gisele & Pierre · empowered by{' '}
                <a
                  href="https://santechinnovate.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold underline hover:text-rose-gold"
                >
                  SAN TECH
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
