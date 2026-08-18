"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { clearScreen, triggerDisplay } from "@/lib/socket";

export default function AdminPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [songName, setSongName] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [isSpecialGuest, setIsSpecialGuest] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTrigger = (e: FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !songName.trim()) {
      setStatus("Please fill in name and song.");
      return;
    }

    setIsSubmitting(true);
    triggerDisplay({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      songName: songName.trim(),
      youtubeLink: youtubeLink.trim() || undefined,
      isSpecialGuest,
    });

    setStatus(`Triggered: ${firstName} ${lastName}`);
    setIsSubmitting(false);
  };

  const handleClear = () => {
    clearScreen();
    setStatus("Screen cleared — idle mode.");
  };

  return (
    <main className="min-h-screen bg-pitch px-4 py-8 md:px-8">
      <div className="mx-auto max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="mb-8 text-center">
            <Link
              href="/"
              className="mb-4 inline-block font-body text-xs tracking-widest text-white/30 uppercase hover:text-neon-magenta"
            >
              ← Home
            </Link>
            <h1 className="font-display text-4xl tracking-wider text-glow-magenta">
              ADMIN CONTROL
            </h1>
            <p className="mt-2 font-body text-sm tracking-widest text-white/40 uppercase">
              The Last Dance Karaoke
            </p>
          </header>

          <form onSubmit={handleTrigger} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Field label="First Name" required>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  className={inputClass}
                  autoComplete="given-name"
                />
              </Field>
              <Field label="Last Name" required>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  className={inputClass}
                  autoComplete="family-name"
                />
              </Field>
            </div>

            <Field label="Song Name" required>
              <input
                type="text"
                value={songName}
                onChange={(e) => setSongName(e.target.value)}
                placeholder="Bohemian Rhapsody"
                className={inputClass}
              />
            </Field>

            <Field label="YouTube Link (optional)">
              <input
                type="url"
                value={youtubeLink}
                onChange={(e) => setYoutubeLink(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className={inputClass}
              />
            </Field>

            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 transition hover:border-neon-yellow/30">
              <input
                type="checkbox"
                checked={isSpecialGuest}
                onChange={(e) => setIsSpecialGuest(e.target.checked)}
                className="h-5 w-5 accent-neon-yellow"
              />
              <span className="font-body text-sm tracking-wide text-white/80">
                Special Guest
              </span>
              <span className="ml-auto font-body text-xs text-neon-yellow/60">
                Shows &quot;SPECIAL GUEST&quot; label
              </span>
            </label>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-lg border border-neon-magenta bg-neon-magenta/20 py-4 font-body text-sm tracking-[0.2em] text-neon-magenta uppercase transition hover:bg-neon-magenta/30 disabled:opacity-50"
              >
                Trigger Display
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="flex-1 rounded-lg border border-white/20 bg-white/5 py-4 font-body text-sm tracking-[0.2em] text-white/70 uppercase transition hover:border-white/40 hover:bg-white/10"
              >
                Clear Screen
              </button>
            </div>
          </form>

          {status && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 rounded-lg border border-neon-yellow/20 bg-neon-yellow/5 px-4 py-3 text-center font-body text-sm text-neon-yellow/80"
            >
              {status}
            </motion.p>
          )}

          <p className="mt-8 text-center font-body text-xs text-white/25">
            Open{" "}
            <Link href="/projector" className="text-neon-magenta/50 underline">
              /projector
            </Link>{" "}
            on your display device
          </p>
        </motion.div>
      </div>
    </main>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-body text-xs tracking-widest text-white/50 uppercase">
        {label}
        {required && <span className="text-neon-magenta"> *</span>}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-white/10 bg-black px-4 py-3 font-body text-white placeholder:text-white/20 outline-none transition focus:border-neon-magenta/50 focus:ring-1 focus:ring-neon-magenta/30";
