import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelopeOpenText, FaCheck } from "react-icons/fa";

const initialForm = {
  fullName: "",
  phone: "",
  guests: "1",
  message: "",
};

export default function RSVP() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Please enter your full name";
    if (!form.phone.trim()) e.phone = "Please enter your phone number";
    if (!form.guests || form.guests < 1) e.guests = "At least 1 guest required";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);

    // Simulate async save
    setTimeout(() => {
      // Save to localStorage
      const existing = JSON.parse(localStorage.getItem("wedding_rsvp") || "[]");
      existing.push({
        ...form,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("wedding_rsvp", JSON.stringify(existing));

      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const inputClass = (field) =>
    `w-full bg-white border ${
      errors[field] ? "border-red-400" : "border-champagne"
    } px-4 py-3 font-serif text-gray-700 focus:outline-none focus:border-gold transition-colors duration-200 placeholder-gray-300 text-sm`;

  return (
    <section
      id="rsvp"
      className="relative py-24 bg-gradient-to-b from-white to-champagne/30 overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-serif text-gold/70 tracking-[0.4em] uppercase text-xs mb-4">
            Kindly respond
          </p>
          <h2 className="section-title">RSVP</h2>
          <div className="gold-divider">
            <FaEnvelopeOpenText className="text-gold text-sm" />
          </div>
          <p className="font-serif text-gray-500 text-base max-w-md mx-auto">
            Please let us know you are coming so we can ensure a perfect
            celebration for everyone
          </p>
        </motion.div>

        {/* Form or Success */}
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="bg-white border border-champagne shadow-lg p-8 md:p-12 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              {/* Corner ornaments */}
              {["top-3 left-3 border-t border-l", "top-3 right-3 border-t border-r", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map((cls, i) => (
                <span key={i} className={`absolute w-6 h-6 border-gold/30 ${cls}`} />
              ))}

              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block font-serif text-xs tracking-widest uppercase text-gray-500 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={inputClass("fullName")}
                  />
                  {errors.fullName && (
                    <p className="text-red-400 text-xs font-serif mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block font-serif text-xs tracking-widest uppercase text-gray-500 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    className={inputClass("phone")}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs font-serif mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Number of guests */}
                <div>
                  <label className="block font-serif text-xs tracking-widest uppercase text-gray-500 mb-2">
                    Number of Guests *
                  </label>
                  <select
                    name="guests"
                    value={form.guests}
                    onChange={handleChange}
                    className={`${inputClass("guests")} cursor-pointer`}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                  {errors.guests && (
                    <p className="text-red-400 text-xs font-serif mt-1">
                      {errors.guests}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block font-serif text-xs tracking-widest uppercase text-gray-500 mb-2">
                    Message (optional)
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Share a message with the couple..."
                    className={`${inputClass("message")} resize-none`}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-rose-gold text-white font-serif text-sm tracking-widest uppercase py-4 hover:bg-gold transition-all duration-300 disabled:opacity-60 relative overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <motion.div
                        className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </div>
                  ) : (
                    "Confirm Attendance"
                  )}
                </motion.button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              className="bg-white border border-champagne shadow-lg p-12 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="w-20 h-20 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <FaCheck size={28} className="text-green-500" />
              </motion.div>

              <h3 className="font-script text-4xl text-rose-gold mb-3">
                See you there!
              </h3>
              <p className="font-serif text-gray-500 text-base mb-6">
                Thank you,{" "}
                <span className="text-gold font-semibold">{form.fullName}</span>
                ! Your RSVP has been confirmed. We can't wait to celebrate with
                you on 22 November 2026 at 15:00 hrs.
              </p>
              <p className="font-serif text-gray-400 text-sm mb-8">
                🎉 We'll be in touch with more details closer to the date.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm(initialForm);
                }}
                className="font-serif text-xs tracking-widest uppercase text-gold border border-gold/40 px-6 py-2 hover:bg-gold hover:text-white transition-all duration-300"
              >
                Submit Another RSVP
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
