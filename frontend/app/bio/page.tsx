import { getBio } from "@/api/bio";
import { BioCard, BioItem } from "./bio";
import ErrorState from "../components/error";
import { Metadata } from "next";
import { StudioCTA } from "../components/sections";
import { FounderSection } from "./founder-section";

export const metadata: Metadata = {
  title: "About | Restless Moon Studio",
  description:
    "Meet Restless Moon Studio, an independent software development studio building web, mobile, and AI-powered products.",
};

export default async function Bio() {
  const bioItems: BioItem[] = await getBio();

  if (!bioItems || bioItems.length === 0) {
    return (
      <section className="relative flex flex-col items-center overflow-hidden bg-[#040B14] px-6 pb-24 pt-20 text-center">
        <ErrorState title={"We'll be right back ..."} />
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-[#100d22] px-5 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-3xl py-10 text-center md:py-18">
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
            products used in the real world.
          </p>
        </header>
        <section className="space-y-8">
          <BioCard
            imageOnLeft
            photoSrc="/moon.png"
            photoAlt="The story behind Restless Moon Studio"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
              Our Story
            </p>

            <h2>Built on curiosity.</h2>

            <p>
              Restless Moon began with a simple belief: great ideas deserve the
              chance to become real.
            </p>

            <p>
              We combine creativity with practical engineering to build software
              that is useful, intuitive, and designed to grow.
            </p>
          </BioCard>
        </section>
        <FounderSection items={bioItems} />
        <StudioCTA
          title="Have an idea?"
          description="Let's explore what's possible and bring it to life together."
        />
      </div>
    </main>
  );
}
