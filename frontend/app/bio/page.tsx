import { getBio } from "@/api/bio";
import { BioItem } from "./bio";
import { Metadata } from "next";
import { StudioCTA } from "../components/sections";
import { FounderSection } from "./founder-section";
import ErrorView from "../components/error-view";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Restless Moon Studio",
  description:
    "Meet Restless Moon Studio, an independent software development studio building web, mobile, and AI-powered products.",
};

export default async function Bio() {
  const bioItems: BioItem[] = await getBio();

  if (!bioItems || bioItems.length === 0) {
    return (
      <ErrorView
        code="404"
        title="Page not found ..."
        message="The page you're looking for doesn't exist or has been moved."
      >
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://linkedin.com/in/camariabevavy"
          className="inline-flex gap-2 items-center justify-center rounded-full bg-sky-400 px-7 py-3 text-sm font-semibold text-[#040B14] transition-all hover:scale-[1.03] hover:bg-sky-300"
        >
          Checkout my profile on LinkedIn
          <ExternalLink className="h-4 w-4" />
        </Link>
      </ErrorView>
    );
  }

  return (
    <main className="min-h-screen bg-[#100d22] px-5 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-3xl pt-10 text-center md:pt-18">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
            About Restless Moon
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Independent by nature.
            <span className="block text-violet-300">Curious by design.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            Restless Moon is an independent software studio bringing thoughtful
            digital experiences to life from the first spark of an idea to
            products used in the real world. Great ideas deserve the chance to
            become real. We combine creativity with practical engineering to
            build software that is useful, intuitive, and designed to grow.
          </p>
        </header>

        <FounderSection items={bioItems} />
        <StudioCTA
          title="Have an idea?"
          description="Let's explore what's possible and bring it to life together."
        />
      </div>
    </main>
  );
}
