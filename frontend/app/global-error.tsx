"use client";

import ErrorView from "./components/error-view";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <ErrorView
          code="500"
          title="Something went wrong ..."
          message="The app hit a critical error. Please try again."
        >
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full bg-sky-400 px-7 py-3 text-sm font-semibold text-[#040B14] transition-all hover:scale-[1.03] hover:bg-sky-300"
          >
            Reload
          </button>
        </ErrorView>
      </body>
    </html>
  );
}
