import type { Metadata } from "next";
import {
  ComingSoonCard,
  PageIntro,
  SpotAPawCard,
  StudioCTA,
} from "../components/sections";
import ProductShowcase, { Product } from "../components/showcase";
import { getProjects } from "@/api/projects";
import ErrorState from "../components/error";

export const metadata: Metadata = {
  title: "Products | Restless Moon Studio",
  description:
    "Explore software products built by Restless Moon Studio, including AI-powered mobile and web applications.",
};

export default async function ProductsPage() {
  const projects: Product[] = await getProjects();

  if (!projects || projects.length === 0) {
    return (
      <section className="relative flex flex-col items-center overflow-hidden bg-[#040B14] px-6 pb-24 pt-20 text-center">
        <ErrorState
          title={"We'll be right back ..."}
          message="Check out my projects on LinkedIn"
          redirect="https://linkedin.com/in/camariabevavy"
        />
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-[#100d22] px-5 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <PageIntro
          eyebrow="Our Products"
          title="Ideas brought to life."
          description="Real-world problems deserve thoughtful solutions. Explore the software products we've designed, built, and brought to market."
        />

        <section className="space-y-8">
          {projects.map((p: Product) => (
            <ProductShowcase key={p.id} product={p} />
          ))}
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
