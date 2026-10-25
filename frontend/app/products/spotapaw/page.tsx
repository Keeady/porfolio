import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BellRing,
  BrainCircuit,
  Camera,
  CheckCircle2,
  ChevronRight,
  FileImage,
  FileText,
  Globe2,
  HeartHandshake,
  MapPinned,
  PawPrint,
  ScanSearch,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { getProjectById } from "@/api/projects";
import { Product } from "@/app/components/showcase";

export const metadata: Metadata = {
  title: "SpotAPaw | AI-Powered Lost Pet Finder | Restless Moon Studio",
  description:
    "Help reunite lost pets with their families using AI-powered pet matching, real-time sightings, smart alerts, and community-powered tools.",
  alternates: {
    canonical: "/products/spotapaw",
  },
  openGraph: {
    title: "SpotAPaw — Helping Lost Pets Find Their Way Home",
    description:
      "AI-powered matching, live sightings, and a community working together to bring lost pets home.",
    type: "website",
  },
};

const APP_STORE_URL =
  "https://apps.apple.com/us/app/spotapaw-lost-pet-finder/id6757455715";

const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.bcamaria.SpotAPaw";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: ScanSearch,
    title: "AI-Powered Pet Descriptions",
    description:
      "Upload a photo and let AI identify visual details like breed, color, coat patterns, and distinctive markings. Review and refine the suggestions before sharing.",
  },
  {
    icon: BrainCircuit,
    title: "Smart Semantic Matching",
    description:
      "SpotAPaw looks beyond exact keywords, comparing the meaning of pet descriptions to identify potential matches even when people describe the same animal differently.",
  },
  {
    icon: MapPinned,
    title: "Real-Time Sighting Map",
    description:
      "Explore reported lost and found pets on an interactive map. See where animals were last spotted and discover activity in nearby communities.",
  },
  {
    icon: BellRing,
    title: "Intelligent Alerts",
    description:
      "Receive notifications about nearby lost-pet reports and potential matches, so you can follow up on leads that matter.",
  },
  {
    icon: PawPrint,
    title: "Smart Pet Profiles",
    description:
      "Keep important pet details together, including photos, physical characteristics, microchip information, and contact details, ready to share when needed.",
  },
  {
    icon: FileImage,
    title: "AI-Generated Lost Pet Posters",
    description:
      "Turn a pet report into a poster with AI-assisted wording, helping you share essential information quickly with your community.",
  },
  {
    icon: Camera,
    title: "Smart Photo Selection",
    description:
      "Add multiple photos and let AI help select the most useful image to feature, making it easier for others to recognize your pet.",
  },
  {
    icon: Users,
    title: "Community-Powered Network",
    description:
      "Every neighbor can help. Report sightings, share information, and contribute to a connected community looking out for missing pets.",
  },
  {
    icon: Globe2,
    title: "Multilingual Support",
    description:
      "Available in English, French, Spanish, and Arabic, helping more people participate in local pet recovery efforts.",
  },
];

const steps = [
  {
    number: "01",
    icon: Camera,
    title: "Create a Report",
    description:
      "Add your pet's details or report an animal you've seen. Upload photos and review AI-generated suggestions.",
  },
  {
    number: "02",
    icon: BrainCircuit,
    title: "Discover Connections",
    description:
      "Explore nearby reports while intelligent matching helps surface potentially related sightings.",
  },
  {
    number: "03",
    icon: HeartHandshake,
    title: "Bring the Community Together",
    description:
      "Share reports and posters, receive relevant alerts, and help turn sightings into useful leads.",
  },
];

// Add screenshots from your public/products/spotapaw folder.
// Leave empty until the actual image files are available.
const screenshots: {
  src: string;
  alt: string;
  label: string;
}[] = [
  // {
  //   src: "/products/spotapaw/sighting-map.png",
  //   alt: "SpotAPaw map showing nearby pet sightings",
  //   label: "Explore nearby sightings",
  // },
  // {
  //   src: "/products/spotapaw/ai-description.png",
  //   alt: "SpotAPaw AI-assisted pet description screen",
  //   label: "Describe pets with AI",
  // },
];

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-relaxed text-slate-400 md:text-lg">
        {description}
      </p>
    </div>
  );
}

function StoreLinks({ centered = false }: { centered?: boolean }) {
  return (
    <div className={`flex flex-wrap gap-3 ${centered ? "justify-center" : ""}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
      >
        <Smartphone className="h-5 w-5" />
        Download for iOS
        <ArrowUpRight className="h-4 w-4" />
      </a>

      <a
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-400/30 bg-white/5 px-5 py-3 font-semibold text-white transition hover:border-violet-400/70 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
      >
        <Smartphone className="h-5 w-5" />
        Get it on Google Play
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;

  return (
    <article className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-violet-500/[0.06] md:p-7">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15">
        <Icon className="h-6 w-6 text-violet-300" />
      </div>

      <h3 className="text-lg font-semibold text-white">{feature.title}</h3>

      <p className="mt-3 text-sm leading-7 text-slate-400">
        {feature.description}
      </p>
    </article>
  );
}

export default async function SpotAPawPage() {
    const product: Product = await getProjectById("1");
    const images = product.images ?? [];
  
  return (
    <main className="min-h-screen bg-[#100d22] px-5 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 pt-10 text-sm"
        >
          <Link
            href="/products"
            className="text-slate-400 transition hover:text-violet-300"
          >
            Products
          </Link>
          <ChevronRight className="h-4 w-4 text-slate-600" />
          <span className="text-violet-300">SpotAPaw</span>
        </nav>

        {/* Hero */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="pointer-events-none absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/15 blur-[100px]" />

          <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
            <div className="mb-7 flex h-20 w-20 items-center justify-center rounded-3xl border border-violet-400/30 bg-gradient-to-br from-violet-600/30 to-indigo-900/50 shadow-[0_12px_40px_rgba(94,56,180,0.2)]">
              <Image src="/spotapaw.png" alt="Spotapaw icon" width={48} height={48} />
            </div>

            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
              AI-Powered Pet Recovery
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Helping lost pets
              <span className="block text-violet-300">
                find their way home.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-300">
              SpotAPaw brings together artificial intelligence, real-time
              sightings, and caring communities to help reconnect lost pets with
              their families.
            </p>

            <div className="mt-9">
              <StoreLinks centered />
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs text-slate-400">
              {["iOS & Android", "AI-powered matching", "Community driven"].map(
                (item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-violet-400" />
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Screenshots */}
        {images.length > 0 && (
          <section aria-label="SpotAPaw app screenshots" className="pb-20">
            <div className="flex snap-x gap-5 overflow-x-auto pb-6">
              {images.map((screenshot) => (
                <figure
                  key={screenshot.src}
                  className="w-56 shrink-0 snap-center sm:w-64"
                >
                  <div className="relative aspect-[9/19] overflow-hidden rounded-3xl border border-white/15 bg-violet-950">
                    <Image
                      src={screenshot.src}
                      alt={screenshot.alt}
                      fill
                      sizes="(max-width: 640px) 224px, 256px"
                      className="object-contain"
                    />
                  </div>
                  <figcaption className="mt-4 text-center text-sm text-slate-400">
                    {screenshot.alt}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* Why SpotAPaw */}
        <section className="py-16">
          <div className="grid items-center gap-10 rounded-3xl border border-violet-400/15 bg-gradient-to-br from-violet-950/60 via-[#211a3b] to-indigo-950/50 p-7 md:grid-cols-2 md:p-12">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-violet-400">
                Why SpotAPaw
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Because every pet deserves a way home.
              </h2>
              <p className="mt-6 leading-8 text-slate-300">
                When a pet goes missing, information can become scattered across
                social media posts, neighborhood groups, and lost-pet notices.
              </p>
              <p className="mt-4 leading-8 text-slate-300">
                SpotAPaw helps bring that information together, making it easier
                to report sightings, discover possible matches, and connect
                people who want to help.
              </p>
            </div>

            <div className="flex min-h-64 items-center justify-center rounded-2xl border border-white/10 bg-violet-500/10 p-8">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-violet-500/25 blur-3xl" />
                <HeartHandshake
                  className="relative h-28 w-28 text-violet-200"
                  strokeWidth={1.2}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20">
          <SectionHeader
            eyebrow="What SpotAPaw Can Do"
            title="Smarter tools. Stronger communities."
            description="From reporting a sighting to finding a potential match, every feature is designed to make the search for a missing pet a little easier."
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="py-20">
          <SectionHeader
            eyebrow="How It Works"
            title="A little help goes a long way."
            description="Whether you've lost a pet or spotted one nearby, contributing to the search is simple."
          />

          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-7"
                >
                  <div className="mb-8 flex items-center justify-between">
                    <span className="text-sm font-semibold text-violet-400">
                      {step.number}
                    </span>
                    <Icon className="h-7 w-7 text-violet-300" />
                  </div>

                  <h3 className="text-xl font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-400">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Studio connection */}
        <section className="py-16">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 md:p-12">
            <div className="flex items-center gap-3 text-violet-300">
              <Sparkles className="h-6 w-6" />
              <span className="text-sm font-semibold uppercase tracking-widest">
                Built at Restless Moon Studio
              </span>
            </div>

            <h2 className="mt-5 text-2xl font-bold md:text-3xl">
              Thoughtful technology for real-world problems.
            </h2>

            <p className="mt-5 max-w-3xl leading-8 text-slate-300">
              SpotAPaw is an independently developed product combining mobile
              development, full-stack engineering, AI integration, semantic
              search, and cloud infrastructure. It's an example of how Restless
              Moon Studio turns an idea into a working product.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "React Native",
                "Next.js",
                "NestJS",
                "PostgreSQL",
                "Supabase",
                "AI Integration",
              ].map((technology) => (
                <span
                  key={technology}
                  className="rounded-lg border border-violet-400/15 bg-violet-500/10 px-3 py-1.5 text-xs text-violet-200"
                >
                  {technology}
                </span>
              ))}
            </div>

            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-violet-300 transition hover:text-violet-200"
            >
              Explore our development services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20">
          <div className="rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-950 via-[#211a3b] to-slate-950 px-6 py-14 text-center md:px-12">
            <PawPrint className="mx-auto mb-6 h-12 w-12 text-violet-300" />

            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Every sighting could make a difference.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
              Help make your community a place where lost pets have a better
              chance of finding their way back home.
            </p>

            <div className="mt-8">
              <StoreLinks centered />
            </div>
          </div>
        </section>

        {/* Product footer */}
        <footer className="flex flex-wrap items-center justify-between gap-5 border-t border-white/10 py-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-violet-300"
          >
            <ArrowLeft className="h-4 w-4" />
            All Products
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/products/spotapaw/privacy"
              className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-violet-300"
            >
              <ShieldCheck className="h-4 w-4" />
              Privacy Policy
            </Link>

            <Link
              href="/products/spotapaw/terms"
              className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-violet-300"
            >
              <FileText className="h-4 w-4" />
              Terms of Service
            </Link>

            <a
              href="mailto:spotapaw@spotapaw.com"
              className="text-sm text-slate-400 transition hover:text-violet-300"
            >
              Support
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
