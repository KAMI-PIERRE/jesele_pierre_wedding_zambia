import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaMusic, FaVolumeMute } from "react-icons/fa";

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const [isUnmuted, setIsUnmuted] = useState(false);
  const audioRef = useRef(null);
  const unmuteAttempted = useRef(false);

  const AUDIO_URL = "/music/Umumararungu.mp3";

  useEffect(() => {
    // Setup audio
    const audio = new Audio(AUDIO_URL);
    audioRef.current = audio;
    audio.loop = true;
    audio.volume = 0.8;

    // Try to start playing muted (autoplay)
    const startAudio = async () => {
      try {
        // First try normal play
        await audio.play();
        audio.muted = false;
        setIsUnmuted(true);
        setPlaying(true);
        console.log("✅ Audio playing normally!");
      } catch (err) {
        console.log("❌ Normal play blocked, trying muted...");
        try {
          // If blocked, play muted
          audio.muted = true;
          await audio.play();
          setPlaying(true);
          setIsUnmuted(false);
          console.log("🔇 Audio playing muted - waiting for user interaction");
        } catch (mutedErr) {
          console.log("❌ Even muted play blocked");
          setPlaying(false);
        }
      }
    };

    // Try autoplay
    startAudio();

    // THIS IS THE KEY: Unmute on ANY user interaction
    const unmuteAudio = async (event) => {
      // If already unmuted, do nothing
      if (isUnmuted || !audioRef.current) return;
      
      // If this is the toggle button click, let toggleMusic handle it
      if (event.target?.closest?.("[data-music-toggle]")) {
        console.log("⏭️ Skipping toggle button (will be handled by toggleMusic)");
        return;
      }

      console.log("🎵 User interacted - unmuting!", event.type);
      
      try {
        // Ensure audio is playing
        if (audioRef.current.paused) {
          await audioRef.current.play();
        }
        
        // UNMUTE - THIS MAKES IT AUDIBLE!
        audioRef.current.muted = false;
        setIsUnmuted(true);
        setPlaying(true);
        console.log("🔊 AUDIO UNMUTED! You can hear it now!");
      } catch (err) {
        console.error("❌ Failed to unmute:", err);
      }
    };

    // Listen for ALL user interactions
    const events = [
      "click", 
      "touchstart", 
      "pointerdown",
      "keydown",
      "mousedown"
    ];
    
    // Use capture phase to catch events even if they're stopped
    events.forEach(evt => {
      document.addEventListener(evt, unmuteAudio, { 
        capture: true, 
        passive: true,
        once: false 
      });
    });

    // Cleanup
    return () => {
      events.forEach(evt => {
        document.removeEventListener(evt, unmuteAudio, { capture: true });
      });
      audio.pause();
      audioRef.current = null;
    };
  }, [isUnmuted]);

  // Handle toggle button clicks
  const toggleMusic = async () => {
    if (!audioRef.current) return;

    console.log("🎮 Toggle button clicked");

    // If not unmuted yet, this is the first interaction
    if (!isUnmuted) {
      try {
        // Play if paused
        if (audioRef.current.paused) {
          await audioRef.current.play();
        }
        // UNMUTE - NOW YOU CAN HEAR IT!
        audioRef.current.muted = false;
        setIsUnmuted(true);
        setPlaying(true);
        console.log("🔊 UNMUTED via toggle button!");
        return;
      } catch (err) {
        console.error("❌ Failed to play:", err);
        return;
      }
    }

    // Normal toggle (already unmuted)
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      console.log("⏸️ Paused");
    } else {
      try {
        await audioRef.current.play();
        setPlaying(true);
        console.log("▶️ Resumed");
      } catch (err) {
        console.error("❌ Failed to resume:", err);
      }
    }
  };

  return (
    <>
      {/* Click anywhere on the page to unmute */}
      <div 
        className="fixed inset-0 z-40 cursor-pointer"
        onClick={(e) => {
          // This catches clicks anywhere on the page
          if (!isUnmuted && audioRef.current) {
            console.log("🖱️ Page clicked - attempting unmute");
            audioRef.current.muted = false;
            setIsUnmuted(true);
            setPlaying(true);
            if (audioRef.current.paused) {
              audioRef.current.play();
            }
          }
        }}
        style={{ pointerEvents: isUnmuted ? 'none' : 'auto' }}
      />

      <motion.button
        onClick={toggleMusic}
        data-music-toggle
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
            <FaMusic className={`text-sm ${isUnmuted ? 'text-gold' : 'text-gray-400'}`} />
          ) : (
            <FaVolumeMute className="text-gray-400 group-hover:text-rose-gold text-sm transition-colors" />
          )}
        </motion.div>

        {playing && (
          <>
            {[1, 2].map((i) => (
              <motion.span
                key={i}
                className={`absolute inset-0 rounded-full border ${isUnmuted ? 'border-gold' : 'border-gray-300'}`}
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

      {/* Show hint if muted */}
      {!isUnmuted && playing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-24 left-6 z-40 bg-black/80 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm"
        >
          Click anywhere to hear the music 🎵
        </motion.div>
      )}
    </>
  );
}