"use client";

import type { ReactNode } from "react";
import { ShowHappyDogAnimation } from "./animated";

interface ErrorViewProps {
  code?: string;
  title: string;
  message: string;
  /** Path under /public, e.g. "/lottie/404.lottie". Leave empty to show the placeholder. */
  animationSrc?: string;
  children?: ReactNode;
}

export default function ErrorView({ title, message, children }: ErrorViewProps) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#040B14] px-6 py-20 text-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[110px]" />
      </div>

      <div className="relative z-10 flex max-w-xl flex-col items-center">
        <div className="mb-6 h-64 w-64 sm:h-72 sm:w-72">
          <ShowHappyDogAnimation />
        </div>
        <h1 className="mb-4 bg-gradient-to-r from-slate-50 via-slate-100 to-sky-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
          {title}
        </h1>
        <p className="mb-8 text-base leading-relaxed text-slate-400 sm:text-lg">{message}</p>

        <div className="flex flex-wrap items-center justify-center gap-3">{children}</div>
      </div>
    </main>
  );
}
