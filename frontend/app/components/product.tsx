import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, PawPrint, ArrowRight, Sprout } from "lucide-react";

export default function ProductsSection() {
  return (
    <section id="products" className="relative bg-[#040B14] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
            Products & Apps
          </p>

          <h2 className="mb-4 text-3xl font-bold text-slate-100 sm:text-4xl">
            Software I've Built
          </h2>

          <p className="max-w-2xl text-base leading-relaxed text-slate-400">
            Real products designed to solve everyday problems, built with
            thoughtful engineering and practical AI.
          </p>
        </div>

        {/* Product cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* SpotAPaw */}
          <article className="group overflow-hidden rounded-2xl border border-sky-900/60 bg-[#0A1727] transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/50">
            <div className="relative aspect-[16/9] overflow-hidden bg-[#092336]">
              <Image
                src="/spotapaw.png"
                alt="SpotAPaw lost pet finder app"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-6">
              <div className="mb-3 flex items-center gap-2">
                <PawPrint size={20} className="text-sky-400" />
                <h3 className="text-xl font-semibold text-slate-100">
                  SpotAPaw
                </h3>
              </div>

              <p className="mb-5 leading-relaxed text-slate-400">
                An AI-powered lost pet finder that helps communities discover
                missing pets through smart matching, sightings, and local
                alerts.
              </p>

              <a
                href="/products/spotapaw"
                className="inline-flex items-center gap-2 font-medium text-sky-300 transition-colors hover:text-sky-200"
              >
                Explore App
                <ArrowUpRight size={17} />
              </a>
            </div>
          </article>

          {/* IrieZen */}
          <article className="group overflow-hidden rounded-2xl border border-sky-900/60 bg-[#0A1727] transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/50">
            <div className="relative aspect-[16/9] overflow-hidden bg-[#092336]">
              <Image
                src="/iriezen.png"
                alt="IrieZen wellness mobile app"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-6">
              <div className="mb-3 flex items-center gap-2">
                <Sprout size={20} className="text-sky-400" />
                <h3 className="text-xl font-semibold text-slate-100">
                  IrieZen
                </h3>
              </div>

              <p className="mb-5 leading-relaxed text-slate-400">
                IrieZen helps you name your emotions through thoughtful
                emotional check-ins, gentle reflections, body awareness, and
                guided breathing.
              </p>

              <a
                href="/products/iriezen"
                className="inline-flex items-center gap-2 font-medium text-sky-300 transition-colors hover:text-sky-200"
              >
                Explore App
                <ArrowUpRight size={17} />
              </a>
            </div>
          </article>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-sky-300 transition-colors hover:text-sky-200"
          >
            View All Products
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
