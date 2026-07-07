import React from "react";
import { motion } from "framer-motion";
import { schedule } from "../data/weddingData";
import { MdLocationOn } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { GiDiamondRing } from "react-icons/gi";

const timelineIcons = {
  0: "🌸",
  1: "⛪",
  2: "🥂",
};

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="relative py-24 bg-gradient-to-b from-champagne/30 to-white overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
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
            Save the Date
          </p>
          <h2 className="section-title">Reception Schedule</h2>
          <div className="gold-divider">
            <GiDiamondRing className="text-gold text-sm" />
          </div>
          <p className="font-serif text-gray-500 text-base max-w-md mx-auto">
            Join us for a beautiful day filled with love, joy, and celebration
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px timeline-line hidden md:block -translate-x-1/2" />
          <div className="absolute left-6 top-0 bottom-0 w-px timeline-line md:hidden" />

          <div className="space-y-12 md:space-y-16">
            {schedule.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  className={`relative flex items-center gap-6 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                >
                  {/* Card */}
                  <div
                    className={`flex-1 md:px-10 pl-14 md:pl-0 ${
                      isLeft ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <motion.div
                      className="bg-white border border-champagne p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-400 relative overflow-hidden group"
                      whileHover={{ y: -4 }}
                    >
                      {/* Color accent bar */}
                      <div
                        className={`absolute top-0 ${isLeft ? "md:right-0 left-0 md:left-auto" : "left-0"} w-1 h-full`}
                        style={{ backgroundColor: item.color }}
                      />

                      <div
                        className={`flex items-center gap-3 mb-3 ${
                          isLeft
                            ? "md:flex-row-reverse md:justify-start"
                            : "flex-row"
                        }`}
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <h3 className="font-serif text-xl md:text-2xl font-semibold text-gray-800">
                          {item.event}
                        </h3>
                      </div>

                      <div
                        className={`flex items-center gap-2 text-sm text-gray-500 mb-2 ${
                          isLeft
                            ? "md:flex-row-reverse md:justify-start"
                            : "flex-row"
                        }`}
                      >
                        <FaClock
                          className="text-gold flex-shrink-0"
                          size={12}
                        />
                        <span className="font-serif tracking-wide">
                          {item.time}
                        </span>
                      </div>

                      <div
                        className={`flex items-start gap-2 text-sm text-gray-500 mb-4 ${
                          isLeft
                            ? "md:flex-row-reverse md:justify-start"
                            : "flex-row"
                        }`}
                      >
                        <MdLocationOn
                          className="text-rose-gold flex-shrink-0 mt-0.5"
                          size={14}
                        />
                        <span className="font-serif">{item.location}</span>
                      </div>

                      <p
                        className={`font-serif text-sm text-gray-400 leading-relaxed ${
                          isLeft ? "md:text-right" : "text-left"
                        }`}
                      >
                        {item.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center dot (desktop) */}
                  <div className="absolute md:static left-3 md:left-auto md:flex-shrink-0 z-10">
                    <motion.div
                      className="w-10 h-10 rounded-full bg-white border-2 border-gold flex items-center justify-center shadow-md"
                      whileHover={{ scale: 1.2 }}
                      style={{ boxShadow: `0 0 0 4px ${item.color}20` }}
                    >
                      <span className="text-sm">{item.icon}</span>
                    </motion.div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
