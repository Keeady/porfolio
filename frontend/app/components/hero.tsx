"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Rocket,
  MessageCircle,
  ArrowRight,
  Code2,
  Sparkles,
  Award,
  Mail,
  BriefcaseBusiness,
  Star,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GithubIcon } from "./icons/github";
import { LinkedinIcon } from "./icons/linkedin";

const HERO_MESSAGES = [
  {
    title: "Turning Ideas Into Real Products.",
    subtitle:
      "I create apps, SaaS platforms, and custom software solutions — combining thoughtful design with scalable engineering.",
  },
  {
    title: "Your Idea. Built Into Software.",
    subtitle:
      "Custom web apps, mobile experiences, and AI-powered solutions — designed, developed, and launched with an experienced software engineer.",
  },
  {
    title: "Software That Makes Everyday Life Better.",
    subtitle:
      "Discover apps and digital tools designed to solve real problems, built with care and powered by modern technology.",
  },
  {
    title: "Thoughtful Software. Real-World Impact.",
    subtitle:
      "I create digital products, AI-powered applications, and custom software that help people and businesses solve meaningful problems.",
  },
  {
    title: "I Build Software That Solves Real Problems.",
    subtitle:
      "I'm a full-stack software engineer creating apps, SaaS products, and custom software solutions, from concept to launch.",
  },
  {
    title: "From Idea to Launch.",
    subtitle:
      "I help businesses and founders turn ideas into real software — building web apps, mobile experiences, SaaS platforms, and AI-powered solutions.",
  },
];

const ROTATION_INTERVAL = 7000;
const TRANSITION_DURATION = 450;

function shuffleIndices(excludeFirst?: number): number[] {
  const indices = HERO_MESSAGES.map((_, index) => index);

  // Fisher-Yates shuffle
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Avoid repeating the last message at a cycle boundary.
  if (indices.length > 1 && indices[0] === excludeFirst) {
    [indices[0], indices[1]] = [indices[1], indices[0]];
  }

  return indices;
}

function useRotatingHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const queueRef = useRef<number[]>([]);
  const activeRef = useRef(0);
  const transitioningRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();

    media.addEventListener("change", updateMotion);

    // Start with the first message for predictable initial
    // HTML, then shuffle the remaining messages.
    queueRef.current = shuffleIndices().filter((index) => index !== 0);

    return () => {
      media.removeEventListener("change", updateMotion);
    };
  }, []);

  const selectMessage = (nextIndex: number) => {
    if (nextIndex === activeRef.current || transitioningRef.current) {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Honor reduced-motion preferences.
    if (reducedMotion) {
      activeRef.current = nextIndex;
      setActiveIndex(nextIndex);
      return;
    }

    transitioningRef.current = true;
    setVisible(false);

    timeoutRef.current = setTimeout(() => {
      activeRef.current = nextIndex;
      setActiveIndex(nextIndex);
      setVisible(true);
      transitioningRef.current = false;
      timeoutRef.current = null;
    }, TRANSITION_DURATION);
  };

  const nextMessage = () => {
    if (transitioningRef.current) return;

    if (queueRef.current.length === 0) {
      queueRef.current = shuffleIndices(activeRef.current);
    }

    const next = queueRef.current.shift();

    if (next !== undefined) {
      selectMessage(next);
    }
  };

  useEffect(() => {
    if (paused || reducedMotion) return;

    const interval = setInterval(() => {
      if (!document.hidden) {
        nextMessage();
      }
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const goToMessage = (index: number) => {
    if (transitioningRef.current) return;

    // Reset the remaining queue so manually selected
    // messages aren't repeated immediately.
    queueRef.current = shuffleIndices().filter((item) => item !== index);

    selectMessage(index);
  };

  return {
    activeIndex,
    visible,
    paused,
    setPaused,
    reducedMotion,
    goToMessage,
  };
}

export default function Hero() {
  const { activeIndex, visible, setPaused, reducedMotion, goToMessage } =
    useRotatingHero();

  const message = HERO_MESSAGES[activeIndex];

  return (
    <section
      aria-label="Introduction"
      className="relative flex min-h-[680px] flex-col items-center justify-center overflow-hidden bg-[#040B14] px-6 py-20 text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[110px]" />
        <div className="absolute bottom-0 right-1/4 h-[280px] w-[280px] rounded-full bg-blue-600/5 blur-[100px]" />
      </div>

      {/* Studio eyebrow */}
      <div className="relative z-10 mb-8 flex items-center gap-3">
        <span className="h-px w-7 bg-sky-400/50" />

        <span className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-sky-300">
          <Code2 size={15} />
          Independent Software Studio
        </span>

        <span className="h-px w-7 bg-sky-400/50" />
      </div>

      {/* Rotating title and subtitle */}
      <div className="relative z-10 flex min-h-[250px] w-full max-w-5xl flex-col items-center justify-center sm:min-h-[260px]">
        <div
          className={`w-full transform-gpu transition-all ease-in-out ${
            reducedMotion ? "duration-0" : "duration-[450ms]"
          } ${
            visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <h1 className="mx-auto mb-6 max-w-5xl bg-gradient-to-r from-slate-50 via-slate-100 to-sky-300 bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl lg:text-6xl">
            {message.title}
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            {message.subtitle}
          </p>
        </div>
      </div>

      {/* Carousel indicators */}
      <div
        className="relative z-10 mt-5 flex items-center gap-3"
        role="group"
        aria-label="Choose a hero message"
      >
        {HERO_MESSAGES.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToMessage(index)}
            aria-label={`Show message ${index + 1}: ${item.title}`}
            aria-pressed={activeIndex === index}
            className="flex h-8 w-8 items-center justify-center"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-7 bg-sky-400"
                  : "w-1.5 bg-slate-600 hover:bg-sky-300"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Calls to action */}
      <div className="relative z-10 mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/products"
          className="group inline-flex min-w-[190px] items-center justify-center gap-2 rounded-full bg-sky-400 px-7 py-3.5 text-sm font-semibold text-[#040B14] transition-all hover:scale-[1.03] hover:bg-sky-300"
        >
          <Rocket size={18} strokeWidth={2.2} />
          Explore Products
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>

        <Link
          href="/contact"
          className="group inline-flex min-w-[190px] items-center justify-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-7 py-3.5 text-sm font-semibold text-sky-200 transition-all hover:border-sky-400 hover:bg-sky-500/20"
        >
          <BriefcaseBusiness size={18} />
          Work With Me
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* Personal credibility */}
      <div className="relative z-10 mt-20 flex flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-3">
          <div className="relative h-11 w-11 overflow-hidden rounded-full border border-sky-400/40 bg-sky-900">
            <Image
              src="/my-image-cartoon.jpg"
              alt="Camaria E. Bevavy"
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-sm text-slate-400 sm:text-base">
            <p className="text-sm font-semibold text-slate-200">
              Built by Camaria E. Bevavy
            </p>
          </div>
        </div>

        <div className="text-left">
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-sm text-slate-400 sm:text-base">
            <span className="inline-flex items-center gap-1.5">
              <Award size={16} className="text-sky-400" />
              12 years experience
            </span>

            <span className="hidden text-sky-700 sm:inline">•</span>

            <span className="inline-flex items-center gap-1.5">
              <Star size={16} className="text-sky-400" />
              Ex-Microsoft Senior Engineer
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Code2 size={16} className="text-sky-400" />
              Full-stack development
            </span>

            <span className="hidden text-sky-700 sm:inline">•</span>

            <span className="inline-flex items-center gap-1.5">
              <Sparkles size={16} className="text-sky-400" />
              AI integration
            </span>
          </div>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/keeady"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-900 bg-[#0A1B2E] text-slate-300 transition-colors hover:border-sky-400/60 hover:text-sky-300"
          >
            <GithubIcon size={17} />
          </a>

          <a
            href="https://linkedin.com/in/camariabevavy"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-900 bg-[#0A1B2E] text-slate-300 transition-colors hover:border-sky-400/60 hover:text-sky-300"
          >
            <LinkedinIcon size={17} />
          </a>

          <a
            href="mailto:bcamaria@gmail.com"
            aria-label="Email"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-900 bg-[#0A1B2E] text-slate-300 transition-colors hover:border-sky-400/60 hover:text-sky-300"
          >
            <Mail size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
