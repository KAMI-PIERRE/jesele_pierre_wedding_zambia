import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GiPartyPopper } from "react-icons/gi";
import { coupleInfo } from "../data/weddingData";

function useCountdown(targetDate) {
  const calculate = () => {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [time, setTime] = useState(calculate);

  useEffect(() => {
    const id = setInterval(() => setTime(calculate()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return time;
}

function CountdownBox({ value, label }) {
  return (
    <div className="sm:rounded-3xl sm:bg-white sm:border sm:border-champagne/40 sm:p-6 sm:shadow-lg text-center p-3">
      <div className="text-3xl sm:text-5xl font-serif text-gold-dark font-semibold">
        {String(value).padStart(2, "0")}
      </div>
      <div className="mt-1 sm:mt-2 text-xs tracking-[0.25em] uppercase text-gray-500">
        {label}
      </div>
    </div>
  );
}

export default function BibleVerse() {
  const countdown = useCountdown(coupleInfo.weddingDate);

  return (
    <section
      id="bible-verse"
      className="relative h-screen flex items-center justify-center py-10 bg-gradient-to-b from-gold/5 to-rose-gold/5 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-3xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-4">
            <GiPartyPopper className="text-gold text-4xl" />
          </div>
          <p className="font-serif text-rose-gold/70 tracking-[0.4em] uppercase text-xs mb-4">
            Blessed union
          </p>
          <h2 className="section-title text-4xl md:text-5xl">Invitation details</h2>
        </motion.div>

        {/* Countdown + Bible Verse */}
        <motion.div
          className="w-full sm:bg-white sm:border sm:border-champagne sm:shadow-xl sm:rounded-[3rem] p-4 sm:p-8 md:p-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-4xl mx-auto">
            <p className="font-serif text-rose-gold/70 tracking-[0.4em] uppercase text-xs mb-4">
              Counting Down
            </p>
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-gray-900 font-semibold mb-6 sm:mb-8">
              Until {coupleInfo.weddingDateFormatted}
            </h3>
            <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-8 sm:mb-12">
              <CountdownBox value={countdown.days} label="Days" />
              <CountdownBox value={countdown.hours} label="Hours" />
              <CountdownBox value={countdown.minutes} label="Minutes" />
              <CountdownBox value={countdown.seconds} label="Seconds" />
            </div>

            <div className="text-center">
              <div className="text-6xl md:text-7xl text-gold/30 font-serif mb-6">
                "
              </div>
              <p className="font-serif text-xl md:text-2xl text-gray-700 leading-relaxed mb-10 italic">
                For this child I prayed, and the Lord has granted me my petition that I made to him
              </p>
              <div className="w-28 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />
              <p className="font-serif text-sm md:text-base text-rose-gold tracking-widest uppercase">
                1 Samuel 1:27
              </p>
              <div className="text-6xl md:text-7xl text-gold/30 font-serif mt-6 flex justify-end">
                "
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p
          className="text-center font-serif text-gray-500 text-sm mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          A blessing from God to start this beautiful journey together
        </motion.p>
      </div>
    </section>
  );
}
