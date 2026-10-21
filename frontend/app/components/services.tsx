
import Link from "next/link";
import {
  MonitorSmartphone,
  BrainCircuit,
  Database,
  Cloud,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    title: "Web & Mobile Apps",
    description:
      "From MVP to production-ready applications.",
    icon: MonitorSmartphone,
  },
  {
    title: "AI Integration",
    description:
      "Practical AI-powered features and workflows.",
    icon: BrainCircuit,
  },
  {
    title: "Backend & APIs",
    description:
      "Scalable services, databases, and integrations.",
    icon: Database,
  },
  {
    title: "SaaS Development",
    description:
      "Full-stack software products from concept to launch.",
    icon: Cloud,
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative bg-[#040B14] px-6 pb-24 pt-16"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
            Software Development Services
          </p>

          <h2 className="mb-4 text-3xl font-bold text-slate-100 sm:text-4xl">
            Let's Build Something Great
          </h2>

          <p className="max-w-2xl text-base leading-relaxed text-slate-400">
            From early-stage ideas to complex software systems,
            I help founders and businesses design, build, and
            launch reliable digital products.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.title}
                href="/services"
                className="group rounded-2xl border border-sky-900/60 bg-[#0A1727] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/50 hover:bg-[#0D2034]"
              >
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                    <Icon size={24} strokeWidth={1.8} />
                  </div>

                  <ArrowUpRight
                    size={19}
                    className="text-slate-600 transition-colors group-hover:text-sky-300"
                  />
                </div>

                <h3 className="mb-2 text-xl font-semibold text-slate-100">
                  {service.title}
                </h3>

                <p className="leading-relaxed text-slate-400">
                  {service.description}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl border border-sky-900/60 bg-gradient-to-r from-[#0A1B2E] to-[#092336] p-8 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="mb-2 text-xl font-semibold text-slate-100">
              Have a software project in mind?
            </h3>

            <p className="text-slate-400">
              Let's discuss how I can help bring your idea to life.
            </p>
          </div>

          <Link
            href="/contact?type=project"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-[#040B14] transition-all hover:scale-[1.03] hover:bg-sky-300"
          >
            Let's Talk
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
