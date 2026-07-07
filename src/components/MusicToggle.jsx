import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaMusic, FaVolumeMute } from "react-icons/fa";

export default function MusicToggle() {
  // 1. FORCE TRUE BY DEFAULT: This ensures the icon spins and looks active instantly
  const [playing, setPlaying] = useState(true);
  const audioRef = useRef(null);

  const AUDIO_URL = "/music/Umumararungu.mp3";

  useEffect(() => {
    // 2. Setup the audio element
    audioRef.current = new Audio(AUDIO_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.8; // Set your loud volume here

    // 3. Start it instantly in muted mode so the browser allows it to run
    audioRef.current.muted = true;
    audioRef.current.play()
      .catch((err) => console.log("Muted autoplay active. Awaiting user movement."));

    // 4. The magic function: Unmutes loud when they interact ANYWHERE on the screen
    const handleUserInteraction = () => {
      if (audioRef.current) {
        audioRef.current.muted = false; // Turn up the volume instantly!
        
        audioRef.current.play()
          .then(() => {
            setPlaying(true); // Keeps the active/spinning state
            cleanUpListeners(); // Kill listeners immediately so it only triggers once
          })
          .catch((err) => console.error("Playback failed:", err));
      }
    };

    const cleanUpListeners = () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("pointerdown", handleUserInteraction);
      window.removeEventListener("scroll", handleUserInteraction);
      window.removeEventListener("wheel", handleUserInteraction);
    };

    // 5. Listen globally to the ENTIRE page for any human interaction
    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("touchstart", handleUserInteraction);   // Mobile taps
    window.addEventListener("pointerdown", handleUserInteraction); // Any touch/click down
    window.addEventListener("scroll", handleUserInteraction);       // Page scrolling
    window.addEventListener("wheel", handleUserInteraction);        // Mouse wheel scrolling

    return () => {
      cleanUpListeners();
      audioRef.current?.pause();
    };
  }, []);

  // Manual click handler just for the floating button itself
  const toggleMusic = (e) => {
    e.stopPropagation(); // Prevents triggering the window level click listener
    if (!audioRef.current) return;

    audioRef.current.muted = false; // Ensure it's unmuted on manual interaction

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true));
    }
  };

  return (
    <motion.button
      onClick={toggleMusic}
      className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-white shadow-lg border border-champagne flex items-center justify-center hover:border-gold transition-all duration-300 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title={playing ? "Pause music" : "Play music"}
      aria-label={playing ? "Pause background music" : "Play background music"}
    >
      <motion.div
        animate={playing ? { rotate: 360 } : { rotate: 0 }}
        transition={
          playing
            ? { duration: 4, repeat: Infinity, ease: "linear" }
            : { duration: 0.3 }
        }
      >
        {playing ? (
          <FaMusic className="text-gold text-sm" />
        ) : (
          <FaVolumeMute className="text-gray-400 group-hover:text-rose-gold text-sm transition-colors" />
        )}
      </motion.div>

      {/* Ripple effect shows up instantly now because playing starts as true */}
      {playing && (
        <>
          {[1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute inset-0 rounded-full border border-gold"
              animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}
    </motion.button>
  );
}