"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { subscribeToState } from "@/lib/socket";
import type { KaraokeState } from "@/types/karaoke";

export default function ProjectorPage() {
  const [state, setState] = useState<KaraokeState>({ mode: "idle", singer: null });
  const [showReveal, setShowReveal] = useState(false);
  const [isBlackout, setIsBlackout] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevModeRef = useRef<"idle" | "active">("idle");

  useEffect(() => {
    return subscribeToState((newState) => {
      setState(newState);
    });
  }, []);

  useEffect(() => {
    const wasIdle = prevModeRef.current === "idle";
    const isActive = state.mode === "active" && state.singer;

    if (wasIdle && isActive) {
      setIsBlackout(true);
      setShowReveal(false);

      const blackoutTimer = setTimeout(() => {
        audioRef.current?.play().catch(() => {});
        setIsBlackout(false);
        setShowReveal(true);
      }, 400);

      prevModeRef.current = "active";
      return () => clearTimeout(blackoutTimer);
    }

    if (state.mode === "idle") {
      setShowReveal(false);
      setIsBlackout(false);
      prevModeRef.current = "idle";
    } else if (isActive && prevModeRef.current === "active") {
      setShowReveal(true);
      setIsBlackout(false);
    }
  }, [state]);

  const singer = state.singer;
  const fullName = singer ? `${singer.firstName} ${singer.lastName}`.trim() : "";

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-pitch">
      <audio ref={audioRef} src="/bass-drop.mp3" preload="auto" />

      {/* Full blackout cut */}
      <AnimatePresence>
        {isBlackout && (
          <motion.div
            key="blackout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 z-50 bg-pitch"
          />
        )}
      </AnimatePresence>

      {/* Idle State */}
      <AnimatePresence mode="wait">
        {state.mode === "idle" && !isBlackout && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="flex h-full w-full items-center justify-center px-8"
          >
            <motion.h1
              animate={{
                scale: [1, 1.02, 1],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="animate-glow-flicker text-center font-display text-5xl leading-tight tracking-wider text-glow-magenta md:text-7xl lg:text-8xl"
            >
              The Last Dance
              <span className="mt-4 block text-3xl text-glow-yellow md:text-5xl lg:text-6xl">
                Karaoke Party
              </span>
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active State — Singer Reveal */}
      <AnimatePresence>
        {showReveal && singer && (
          <motion.div
            key={`${fullName}-${singer.songName}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-full w-full flex-col items-center justify-center px-6 text-center"
          >
            {/* Top label */}
            <motion.p
              initial={{ opacity: 0, y: -60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 20 }}
              className="mb-6 font-body text-sm tracking-[0.5em] text-white/60 uppercase md:text-base"
            >
              {singer.isSpecialGuest ? "Special Guest" : "Next on Stage"}
            </motion.p>

            {/* Main name — slam effect */}
            <motion.h1
              initial={{ scale: 3, opacity: 0, y: -100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                mass: 0.8,
              }}
              className="font-display text-6xl leading-none tracking-wide text-glow-magenta md:text-8xl lg:text-9xl"
            >
              {fullName}
            </motion.h1>

            {/* Song name */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8 max-w-4xl font-body text-xl tracking-wide text-glow-subtle text-white/70 md:text-2xl lg:text-3xl"
            >
              {singer.songName}
            </motion.p>

            {/* Decorative neon lines */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-10 h-px w-64 bg-gradient-to-r from-transparent via-neon-magenta to-transparent md:w-96"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
