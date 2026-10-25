
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Database,
  Globe,
  Layers3,
  MoonStar,
  PawPrint,
  Smartphone,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="mx-auto max-w-3xl py-16 text-center md:py-24">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
        {eyebrow}
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
        {title}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
        {description}
      </p>
    </section>
  );
}

export function StudioCTA({
  title = "Have an idea? Let's bring it to life.",
  description = "Tell us what you're building. We'd love to hear about it.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="my-16 rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-950/80 via-slate-900 to-slate-950 px-6 py-16 text-center md:px-12">
      <MoonStar className="mx-auto mb-5 h-10 w-10 text-violet-400" />
      <h2 className="text-3xl font-bold text-white md:text-4xl">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-slate-300">
        {description}
      </p>
      <Link
        href="/contact?type=project"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
      >
        Start a conversation
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </section>
  );
}

export type StudioService = {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
};

export const services: StudioService[] = [
  {
    title: "Web Applications",
    description:
      "Fast, responsive, and intuitive web applications built around your business needs.",
    icon: Globe,
    features: ["Next.js & React", "Custom dashboards", "Full-stack development"],
  },
  {
    title: "Mobile Development",
    description:
      "Beautiful, reliable cross-platform apps that work where your users are.",
    icon: Smartphone,
    features: ["iOS & Android", "React Native", "App deployment"],
  },
  {
    title: "SaaS & MVP Development",
    description:
      "Bring a product idea to market with a focused, extensible foundation.",
    icon: Layers3,
    features: ["MVP development", "Product architecture", "Iterative delivery"],
  },
  {
    title: "AI Integration",
    description:
      "Bring practical AI capabilities into products and everyday workflows.",
    icon: BrainCircuit,
    features: ["LLM integration", "AI-powered features", "Workflow automation"],
  },
  {
    title: "Backend & APIs",
    description:
      "Build the infrastructure that keeps your software connected and dependable.",
    icon: Database,
    features: ["REST APIs", "Database design", "Cloud integrations"],
  },
  {
    title: "Existing Product Improvements",
    description:
      "Improve performance, add features, and modernize existing applications.",
    icon: Wrench,
    features: ["Feature development", "Performance", "Refactoring"],
  },
];

export function ServiceCard({
  service,
}: {
  service: StudioService;
}) {
  const Icon = service.icon;

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition hover:border-violet-400/40 hover:bg-violet-500/[0.06]">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold text-white">
        {service.title}
      </h3>
      <p className="mt-3 leading-relaxed text-slate-400">
        {service.description}
      </p>
      <ul className="mt-6 space-y-2 text-sm text-slate-300">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href="/contact?type=project"
        className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-violet-300 hover:text-violet-200"
        aria-label={`Inquire about ${service.title}`}
      >
        Let's talk
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}

export function SpotAPawCard() {
  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
      <div className="grid md:grid-cols-2">
        <div className="flex min-h-64 flex-col items-center justify-center bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-950 p-10">
          <div className="mb-5 rounded-3xl bg-white/10 p-6">
            <PawPrint className="h-16 w-16 text-violet-200" />
          </div>
          <h3 className="text-3xl font-bold text-white">SpotAPaw</h3>
          <p className="mt-2 text-violet-200">
            Lost pets. Found connections.
          </p>
        </div>

        <div className="flex flex-col justify-center p-8 md:p-10">
          <span className="w-fit rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
            Live Product
          </span>
          <h3 className="mt-5 text-3xl font-bold text-white">
            Bringing lost pets home.
          </h3>
          <p className="mt-4 leading-relaxed text-slate-300">
            An AI-powered platform helping reunite lost pets with their
            families through smart pet profiles, matching technology,
            and community sightings.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["React Native", "Next.js", "NestJs", "AI", "Database", "Mobile", "FullStack"].map(
              (tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                >
                  {tech}
                </span>
              ),
            )}
          </div>
          <a
            href="/products/spotapaw"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 font-semibold text-violet-300 hover:text-violet-200"
          >
            Explore SpotAPaw
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

export function ComingSoonCard() {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-violet-400/20 bg-violet-500/[0.03] px-6 py-12 text-center">
      <Sparkles className="mb-4 h-8 w-8 text-violet-400" />
      <h3 className="text-xl font-semibold text-white">
        More ideas are in orbit.
      </h3>
      <p className="mt-3 max-w-md text-slate-400">
        We're always exploring new ideas and building useful tools.
        More products are on the horizon.
      </p>
    </div>
  );
}
