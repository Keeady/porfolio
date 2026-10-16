
import type { Metadata } from "next";
import {
  ComingSoonCard,
  PageIntro,
  SpotAPawCard,
  StudioCTA,
} from "../components/sections";

export const metadata: Metadata = {
  title: "Products | Restless Moon Studio",
  description:
    "Explore software products built by Restless Moon Studio, including AI-powered mobile and web applications.",
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#100d22] px-5 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <PageIntro
          eyebrow="Our Products"
          title="Ideas brought to life."
          description="Real-world problems deserve thoughtful solutions. Explore the software products we've designed, built, and brought to market."
        />

        <section className="space-y-8">
          <SpotAPawCard />
          <ComingSoonCard />
        </section>

        <StudioCTA
          title="Have a product idea of your own?"
          description="We bring the same care and engineering expertise to your ideas that we put into our own products."
        />
      </div>
    </main>
  );
}
