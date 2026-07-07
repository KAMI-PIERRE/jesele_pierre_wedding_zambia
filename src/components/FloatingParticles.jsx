import React, { useMemo } from "react";
import { motion } from "framer-motion";

const HEARTS = ["❤️", "🌸", "✨", "💕", "🌹", "💫", "🌺", "💖"];

export default function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        emoji: HEARTS[i % HEARTS.length],
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 16 + 10}px`,
        duration: `${Math.random() * 15 + 10}s`,
        delay: `${Math.random() * 10}s`,
        opacity: Math.random() * 0.4 + 0.1,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute particle"
          style={{
            left: p.left,
            bottom: "-50px",
            fontSize: p.size,
            opacity: p.opacity,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}
