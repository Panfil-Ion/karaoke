import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-pitch px-6">
      <h1 className="font-display text-center text-5xl tracking-wider text-glow-magenta md:text-7xl">
        THE LAST DANCE
      </h1>
      <p className="font-body text-center text-lg tracking-[0.3em] text-white/50 uppercase">
        Karaoke Event Control
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/admin"
          className="neon-border rounded-lg border border-neon-magenta/50 bg-black px-8 py-4 text-center font-body text-sm tracking-widest text-neon-magenta uppercase transition hover:bg-neon-magenta/10"
        >
          Admin Panel
        </Link>
        <Link
          href="/projector"
          className="neon-border rounded-lg border border-neon-yellow/50 bg-black px-8 py-4 text-center font-body text-sm tracking-widest text-neon-yellow uppercase transition hover:bg-neon-yellow/10"
        >
          Projector Screen
        </Link>
      </div>
    </main>
  );
}
