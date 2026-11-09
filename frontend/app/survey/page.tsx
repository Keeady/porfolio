"use client";

import { ShowHappyDogAnimation } from "../components/animated";

export default function QuestionnairePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#040B14] px-6 py-20 text-center">
      <AmbientBackground />
      <div className="relative z-10 flex max-w-xl flex-col items-center">
        <ShowHappyDogAnimation />

        <h1 className="mb-4 bg-gradient-to-r from-slate-50 via-slate-100 to-sky-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
          This survey is complete
        </h1>
        <p className="text-base leading-relaxed text-slate-400 sm:text-lg">
          We&apos;re no longer collecting responses. Thank you for visiting!
        </p>
      </div>
    </main>
  );
}

function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[110px]" />
      <div className="absolute bottom-0 right-1/4 h-[280px] w-[280px] rounded-full bg-blue-600/5 blur-[100px]" />
    </div>
  );
}
