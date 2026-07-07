import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function LoadingSpinner() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-white/30 backdrop-blur-sm"
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        {/* Outer spinning circle */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gold border-r-rose-gold shadow-lg" />
      </motion.div>

      {/* Optional loading text */}
      <motion.p
        className="absolute bottom-1/3 font-serif text-sm text-gold tracking-[0.2em] uppercase"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading
      </motion.p>
    </motion.div>
  );
}
