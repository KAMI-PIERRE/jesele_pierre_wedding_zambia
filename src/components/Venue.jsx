import React from "react";
import { motion } from "framer-motion";
import { venues } from "../data/weddingData";
import { MdLocationOn, MdMap } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";

const venueImages = [
  "https://content.knightfrank.com/property/zmc019/images/2718a01c-9e17-4fc9-8d86-3fefb9fd310a-0.jpg?cio=true&w=1200",
  "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGan2ehjZxXs0ecBzOOuUAUjnDobAElPvhWYYmzDLQHa0cuLgxbf0VD5MLivqd843zKbSpvdDsxdAI8buAldDuGXfmwQODeluGDbcjuMhAmtwULJlpUXVIjKrjBR1_tppFApkVvoQ=s1360-w1360-h1020-rw",
];

export default function Venue() {
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    "Roma Park Lusaka Zambia"
  )}&output=embed`;

  return (
    <section
      id="venue"
      className="relative py-24 bg-gradient-to-b from-white to-champagne/20 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-serif text-rose-gold/70 tracking-[0.4em] uppercase text-xs mb-4">
            Where love unfolds
          </p>
          <h2 className="section-title">Venue & Location</h2>
          <div className="gold-divider">
            <GiPartyPopper className="text-gold text-sm" />
          </div>
          <p className="font-serif text-gray-500 text-base max-w-md mx-auto">
            Find us on Google Maps and see the exact wedding location in Lusaka.
          </p>
        </motion.div>

        {/* Venue cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {venues.map((venue, index) => (
            <motion.div
              key={venue.id}
              className="group relative bg-white shadow-lg overflow-hidden border border-champagne hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.2, duration: 0.7 }}
              whileHover={{ y: -6 }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden group">
                <motion.img
                  src={venueImages[index]}
                  alt={venue.name}
                  title="Click to open location on map"
                  className="w-full h-full object-cover cursor-pointer"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => window.open(venue.mapUrl, "_blank", "noopener,noreferrer")}
                />
                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/60 px-4 py-3 rounded-xl text-center">
                    <MdMap className="mx-auto mb-2 text-gold" size={24} />
                    <p className="text-white text-xs uppercase tracking-[0.3em] font-semibold">
                      View on map
                    </p>
                  </div>
                </div>

                {/* Event badge */}
                <div className="absolute top-4 left-4 bg-gold/90 text-white font-serif text-xs tracking-widest uppercase px-3 py-1">
                  {venue.event}
                </div>

                {/* Time badge */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white font-serif text-sm px-3 py-1.5">
                  <FaClock size={11} className="text-gold" />
                  {venue.time}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                  {venue.name}
                </h3>

                <div className="flex items-start gap-2 text-gray-500 text-sm mb-4">
                  <MdLocationOn
                    className="text-rose-gold flex-shrink-0 mt-0.5"
                    size={16}
                  />
                  <span className="font-serif">{venue.address}</span>
                </div>

                <p className="font-serif text-gray-400 text-sm leading-relaxed mb-6">
                  {venue.description}
                </p>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-6" />

                {/* Map button */}
                <motion.a
                  href={venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-serif text-xs tracking-widest uppercase text-gold border border-gold/40 px-5 py-2.5 hover:bg-gold hover:text-white hover:border-gold transition-all duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MdMap size={14} />
                  View on Google Maps
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Map embed */}
        <motion.div
          className="mt-16 rounded-3xl overflow-hidden border border-champagne shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gold/10 p-6">
            <h3 className="font-serif text-2xl md:text-3xl text-gray-900 mb-2">
              Find the wedding location on Google Maps
            </h3>
            <p className="font-serif text-gray-600 text-sm md:text-base">
              Use the embedded map below to explore the venue area and get directions.
            </p>
          </div>
          <iframe
            title="Wedding Location Map"
            src={embedUrl}
            className="w-full h-[520px] border-0"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}
