"use client";

import { useEffect } from "react";
import Link from "next/link";
import ErrorView from "./components/error-view";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorView
      code="500"
      title="Something went wrong ..."
      message="An unexpected error occurred. You can try again, or head back home."
    >
      <button
        onClick={reset}
        className="inline-flex items-center justify-center rounded-full bg-sky-400 px-7 py-3 text-sm font-semibold text-[#040B14] transition-all hover:scale-[1.03] hover:bg-sky-300"
      >
        Try again
      </button>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full border border-sky-900 px-7 py-3 text-sm font-semibold text-slate-300 transition-colors hover:border-sky-400/60 hover:text-sky-300"
      >
        Home
      </Link>
    </ErrorView>
  );
}
