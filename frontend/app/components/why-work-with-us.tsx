
import {
  Award,
  Building2,
  PackageCheck,
  Handshake,
} from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "10+ Years of Experience",
    description:
      "Over a decade of professional software engineering experience across complex systems and customer-facing products.",
  },
  {
    icon: Building2,
    title: "Big Tech Experience",
    description:
      "Engineering experience at Microsoft, bringing production-grade thinking to projects of every size.",
  },
  {
    icon: PackageCheck,
    title: "Built & Shipped Products",
    description:
      "Firsthand experience taking products from concept to launch across web, mobile, and AI-powered applications.",
  },
  {
    icon: Handshake,
    title: "Direct Collaboration",
    description:
      "Work directly with the engineer building your software, with clear communication and practical technical guidance.",
  },
];

export function WhyWorkWithUs() {
  return (
    <section className="py-20">
      <div className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
          Why Restless Moon
        </p>
        <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
          Experience behind every build.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-400">
          Thoughtful engineering, practical decisions,
          and a product-first mindset.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {reasons.map((reason) => {
          const Icon = reason.icon;

          return (
            <article
              key={reason.title}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-7"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15">
                <Icon className="h-6 w-6 text-violet-300" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                {reason.title}
              </h3>
              <p className="mt-3 leading-relaxed text-slate-400">
                {reason.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
