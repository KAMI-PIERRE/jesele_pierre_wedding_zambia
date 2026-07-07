import React from "react";
import { motion } from "framer-motion";
import { contacts } from "../data/weddingData";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function ContactCard({ person, delay }) {
  const isBride = person.role.includes("Bride");

  const formatWhatsAppNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.startsWith("00")) {
      return cleaned.slice(2);
    }
    if (cleaned.startsWith("0")) {
      return `250${cleaned.slice(1)}`;
    }
    if (cleaned.startsWith("250")) {
      return cleaned;
    }
    if (cleaned.startsWith("7") || cleaned.startsWith("8")) {
      return `250${cleaned}`;
    }
    return cleaned;
  };

  const whatsAppNumber = formatWhatsAppNumber(person.phone);

  return (
    <motion.div
      className="group relative bg-white border border-champagne p-8 md:p-10 text-center shadow-md hover:shadow-xl transition-all duration-400 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7 }}
      whileHover={{ y: -4 }}
    >
      {/* Gradient accent */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 ${
          isBride
            ? "bg-gradient-to-r from-rose-gold to-gold"
            : "bg-gradient-to-r from-gold to-rose-gold"
        }`}
      />

      {/* Corner ornaments */}
      {["top-3 left-3 border-t border-l", "top-3 right-3 border-t border-r", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map((cls, i) => (
        <span key={i} className={`absolute w-4 h-4 border-gold/20 ${cls}`} />
      ))}

      {/* Emoji avatar */}
      <motion.div
        className={`w-20 h-20 mx-auto mb-5 rounded-full flex items-center justify-center text-4xl ${
          isBride ? "bg-rose-gold/10" : "bg-gold/10"
        }`}
        whileHover={{ scale: 1.1 }}
      >
        {person.emoji}
      </motion.div>

      {/* Role badge */}
      <p
        className={`font-serif text-xs tracking-[0.25em] uppercase mb-2 ${
          isBride ? "text-rose-gold" : "text-gold"
        }`}
      >
        {person.role}
      </p>

      {/* Name */}
      <h3 className="font-serif text-2xl font-semibold text-gray-800 mb-6">
        {person.name}
      </h3>

      {/* Divider */}
      <div
        className={`w-12 h-px mx-auto mb-6 ${
          isBride
            ? "bg-gradient-to-r from-transparent via-rose-gold to-transparent"
            : "bg-gradient-to-r from-transparent via-gold to-transparent"
        }`}
      />

      {/* Phone button */}
      <motion.a
        href={`tel:${person.phone}`}
        className={`flex items-center justify-center gap-2 w-full py-3 font-serif text-sm tracking-widest uppercase text-white mb-3 transition-all duration-300 ${
          isBride
            ? "bg-rose-gold hover:bg-gold"
            : "bg-gold hover:bg-rose-gold"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FaPhone size={13} />
        {person.phone}
      </motion.a>

      {/* WhatsApp button */}
      <motion.a
        href={`https://api.whatsapp.com/send?phone=${whatsAppNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 font-serif text-sm tracking-widest uppercase border border-green-500/40 text-green-600 hover:bg-green-500 hover:text-white transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FaWhatsapp size={15} />
        WhatsApp
      </motion.a>
    </motion.div>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 bg-gradient-to-b from-champagne/20 to-white overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-serif text-rose-gold/70 tracking-[0.4em] uppercase text-xs mb-4">
            Get in touch
          </p>
          <h2 className="section-title">Contact Us</h2>
          <div className="gold-divider">
            <FaPhone className="text-gold text-xs" />
          </div>
          <p className="font-serif text-gray-500 text-base max-w-md mx-auto">
            Have any questions? Don't hesitate to reach out to us directly
          </p>
        </motion.div>

        {/* Main layout: Couple on left, Other contacts on right */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
          {/* Left: Bride and Groom */}
          <div>
            <h3 className="font-serif text-2xl text-center text-gold mb-8">
              Contacts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <ContactCard person={contacts.couple.bride} delay={0} />
              <ContactCard person={contacts.couple.groom} delay={0.2} />
              <ContactCard person={contacts.couple.other} delay={0.2} />
            </div>
          </div>

          {/* Right: Other Contacts */}
          
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center font-serif text-gray-400 text-sm mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          We look forward to celebrating this special day with you ❤️
        </motion.p>
      </div>
    </section>
  );
}
