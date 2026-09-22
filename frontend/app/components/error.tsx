"use client";

import { ShowHappyDogAnimation } from "./animated";

/**
 * Generic error state, backed by a Lottie animation.
 * Requires: npm install lottie-react
 *
 * Usage — full page (e.g. app/not-found.tsx):
 *   <ErrorState
 *     title="This page wandered off"
 *     message="Looks like there's nothing here. Even the cat is confused."
 *     redirect="http://check-this-out"
 *   />
 */

export interface ErrorStateProps {
  title: string;
  message?: string;
  redirect?: string;
}

export default function ErrorState({
  title,
  message,
  redirect,
}: ErrorStateProps) {
  return (
    <div
      className={
        "flex flex-col items-center justify-center bg-[#040B14] px-6 text-center"
      }
    >
      <ShowHappyDogAnimation />
      <h2 className="relative z-10 mb-5 bg-gradient-to-r from-slate-50 to-sky-300 bg-clip-text text-5xl font-bold text-transparent sm:text-4xl">
        {title}
      </h2>

      {message && redirect && (
        <p className={"max-w-md text-slate-400"}>
          <a href={redirect}> {message}</a>
        </p>
      )}
    </div>
  );
}
