import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { galleryImages } from "../data/weddingData";
import { MdClose, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { FaImages } from "react-icons/fa";

const heightMap = {
  tall: "h-72 md:h-80",
  medium: "h-52 md:h-64",
  short: "h-44 md:h-52",
};

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null); // index of selected image

  const open = (i) => setLightbox(i);
  const close = () => setLightbox(null);
  const prev = () =>
    setLightbox((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  const next = () =>
    setLightbox((i) => (i + 1) % galleryImages.length);

  return (
    <section
      id="gallery"
      className="relative py-24 bg-gradient-to-b from-champagne/20 to-white overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-serif text-gold/70 tracking-[0.4em] uppercase text-xs mb-4">
            Our Memories
          </p>
          <h2 className="section-title">Gallery</h2>
          <div className="gold-divider">
            <FaImages className="text-gold text-sm" />
          </div>
          <p className="font-serif text-gray-500 text-base max-w-md mx-auto">
            Moments captured, memories treasured forever
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="masonry-grid">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.id}
              className={`masonry-item ${heightMap[img.height] || "h-64"} overflow-hidden cursor-pointer group relative`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              onClick={() => open(i)}
            >
              <motion.img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.07 }}
                transition={{ duration: 0.5 }}
              />

              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-rose-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4"
              >
                <div className="text-white">
                  <p className="font-serif text-sm font-light">{img.alt}</p>
                  <div className="w-8 h-px bg-gold mt-1" />
                </div>
              </motion.div>

              {/* Magnify icon */}
              <div className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-rose-gold text-xs">🔍</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors rounded-full"
              onClick={close}
              aria-label="Close"
            >
              <MdClose size={20} />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors rounded-full"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
            >
              <MdChevronLeft size={24} />
            </button>

            {/* Image */}
            <motion.img
              key={lightbox}
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].alt}
              className="max-w-full max-h-[85vh] object-contain shadow-2xl"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors rounded-full"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
            >
              <MdChevronRight size={24} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-serif text-white/60 text-sm">
              {lightbox + 1} / {galleryImages.length}
            </div>

            {/* Caption */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 font-serif text-champagne text-sm">
              {galleryImages[lightbox].alt}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
