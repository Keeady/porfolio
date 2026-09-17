"use client";

import Image from "next/image";
import { Mail, Code2 } from "lucide-react";
import { GithubIcon } from "./icons/github";
import { LinkedinIcon } from "./icons/linkedin";

/**
 * Homepage hero section.
 * Requires: lucide-react, next/image
 * Requires: Tailwind CSS configured in the host Next.js project.
 * Uses styled-jsx (built into Next.js) for the orbit-dot keyframe animation.
 *
 * Replace `/avatar.jpg` with the real photo. Until then this falls back
 * to an initials placeholder so the layout still renders correctly.
 */

const TITLE = "Senior Software Engineer | Full Stack";
const NAME = "Camaria E. Bevavy";
const SUMMARY =
  "Building AI-powered, scalable platforms and experiences used by millions of users.";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center overflow-hidden bg-[#040B14] px-6 pb-24 pt-20 text-center">
      {/* ambient background glow, matches header's sky palette */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[100px]" />
      </div>

      {/* avatar with orbiting dot */}
      <div className="relative z-10 mb-8 h-44 w-44">
        {/* rotating ring that carries the bright dot around the photo */}
        <div className="orbit absolute inset-[-14px] rounded-full">
          <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300 shadow-[0_0_12px_4px_rgba(125,211,252,0.75)]" />
        </div>

        {/* static glow behind the photo */}
        <div className="absolute inset-0 rounded-full bg-sky-500/25 blur-xl" />

        {/* photo / initials fallback */}
        <div className="relative flex h-44 w-44 items-center justify-center overflow-hidden rounded-full border border-sky-400/50 bg-gradient-to-br from-sky-500 to-blue-800">
          <Image
            src="/avatar.jpg"
            alt="Camaria E. Bevavy"
            fill
            sizes="176px"
            className="object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <span className="pointer-events-none text-3xl font-semibold text-white">
            BC
          </span>
        </div>
      </div>

      {/* eyebrow / title */}
      <p className="relative z-10 mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-sky-300">
        <span className="h-px w-8 bg-sky-400/50" />
        {TITLE.toUpperCase()}
        <span className="h-px w-8 bg-sky-400/50" />
      </p>

      {/* name */}
      <h1 className="relative z-10 mb-5 bg-gradient-to-r from-slate-50 to-sky-300 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl">
        {NAME}
      </h1>

      {/* summary */}
      <p className="relative z-10 mb-9 max-w-xl text-base text-slate-400 sm:text-lg">
        {SUMMARY}
      </p>

      {/* CTA */}
      <a
        href="/projects"
        className="relative z-10 mb-10 flex items-center gap-2 rounded-full bg-sky-400 px-7 py-3 text-sm font-semibold text-[#040B14] transition-transform hover:scale-[1.03] hover:bg-sky-300"
      >
        <Code2 size={17} strokeWidth={2.4} />
        View Projects
      </a>

      {/* social row */}
      <div className="relative z-10 flex items-center gap-4">
        <a
          href="https://github.com/keeady"
          aria-label="GitHub"
          target="_blank"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-sky-900 bg-[#0A1B2E] text-slate-300 transition-colors hover:border-sky-400/60 hover:text-sky-300"
        >
          <GithubIcon size={18} />
        </a>
        <a
          href="https://linkedin.com/in/camariabevavy"
          aria-label="LinkedIn"
          target="_blank"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-sky-900 bg-[#0A1B2E] text-slate-300 transition-colors hover:border-sky-400/60 hover:text-sky-300"
        >
          <LinkedinIcon size={18} />
        </a>
        <a
          href="mailto:bbt@gmail.com"
          aria-label="Email"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-sky-900 bg-[#0A1B2E] text-slate-300 transition-colors hover:border-sky-400/60 hover:text-sky-300"
        >
          <Mail size={18} />
        </a>
      </div>

      <style jsx>{`
        .orbit {
          animation: spin 6s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .orbit {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
