"use client";

/**
 * Site footer — icon attribution credits, centered, small text.
 * Matches the dark sky-blue theme used across Header/Hero.
 */

export default function Footer() {
  return (
    <footer className="border-t border-sky-950/60 bg-[#040B14] px-6 py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-1 text-center">
        <a
          href="https://www.flaticon.com/free-icons/microsoft"
          title="microsoft icons"
          className="text-xs text-slate-500 transition-colors hover:text-sky-300"
          target="_blank"
        >
          Microsoft icons created by Enamo Studios - Flaticon
        </a>
        <a
          href="https://www.flaticon.com/free-icons/logos"
          title="logos icons"
          className="text-xs text-slate-500 transition-colors hover:text-sky-300"
          target="_blank"
        >
          Logos icons created by pocike - Flaticon
        </a>
        <a
          href="https://cassymari.github.io/Portfolio-profissional/#inicio"
          title="hero page design"
          className="text-xs text-slate-500 transition-colors hover:text-sky-300"
          target="_blank"
        >
          Hero page inspired by Cassiane.dev
        </a>
        <a
          href="https://lottiefiles.com/free-animation/happy-dog-JQlCkLqWSP"
          title="happy dog animation"
          className="text-xs text-slate-500 transition-colors hover:text-sky-300"
          target="_blank"
        >
          Happy Dog animation by Margarita Ivanchikova - LottieFiles
        </a>
        
      </div>
    </footer>
  );
}