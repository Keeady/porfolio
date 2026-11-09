import type { Metadata } from "next";
import { ComingSoonCard, PageIntro, StudioCTA } from "../components/sections";
import ProductShowcase, { Product } from "../components/showcase";
import { getProjects } from "@/api/projects";
import ErrorView from "../components/error-view";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Products | Restless Moon Studio",
  description:
    "Explore software products built by Restless Moon Studio, including AI-powered mobile and web applications.",
};

export default async function ProductsPage() {
  const projects: Product[] = await getProjects();

  if (!projects || projects.length === 0) {
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
          Checkout my projects on LinkedIn
          <ExternalLink className="h-4 w-4" />
        </Link>
      </ErrorView>
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
