import React from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "./components/LoadingSpinner";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Parents from "./components/Parents";
import BibleVerse from "./components/BibleVerse";
import Timeline from "./components/Timeline";
import Venue from "./components/Venue";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingParticles from "./components/FloatingParticles";
import MusicToggle from "./components/MusicToggle";

export default function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative"
    >
      <LoadingSpinner />
      <ScrollProgress />
      <FloatingParticles />
      <Navbar />
      <MusicToggle />

      <main>
        <Hero />
        <BibleVerse />
        <Parents />
        <Timeline />
        <Venue />
        <Contact />
      </main>

      <Footer />
    </motion.div>
  );
}
