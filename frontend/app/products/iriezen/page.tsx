import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookHeart,
  Brain,
  Check,
  ChevronRight,
  CloudSun,
  Flower2,
  Heart,
  Leaf,
  NotebookPen,
  ScanHeart,
  ShieldCheck,
  Sparkles,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { Product } from "@/app/components/showcase";
import { getProjectById } from "@/api/projects";

export const metadata: Metadata = {
  title: "IrieZen | Emotional Clarity | Restless Moon Studio",
  description:
    "IrieZen is a mindful space to explore your emotions, reconnect with your body, breathe, journal, and find moments of clarity.",
  alternates: { canonical: "/products/iriezen" },
  openGraph: {
    title: "IrieZen — A Mindful Moment, Just for You",
    description:
      "Slow down, name what you feel, and reconnect with yourself through mindful check-ins and gentle reflection.",
  },
};

const APP_STORE_URL =
  "https://apps.apple.com/us/app/iriezen-emotional-clarity/id6763864620";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
  iconColor: string;
};

const blueAccents = {
  emotion: {
    accent: "from-[#A9D6E5]/15 to-[#35536A]/10",
    iconColor: "text-[#CDEAF2]",
  },
  reflection: {
    accent: "from-[#93BFD4]/15 to-[#273E57]/10",
    iconColor: "text-[#B9DCEB]",
  },
  body: {
    accent: "from-[#9FC9D4]/15 to-[#254B57]/10",
    iconColor: "text-[#C3EBF0]",
  },
  breathing: {
    accent: "from-[#B2DFEE]/15 to-[#30516D]/10",
    iconColor: "text-[#D8F2FA]",
  },
  journaling: {
    accent: "from-[#91B5D0]/15 to-[#34455F]/10",
    iconColor: "text-[#BBDCED]",
  },
  brainDump: {
    accent: "from-[#A1CDE4]/15 to-[#2F3D62]/10",
    iconColor: "text-[#CDEAF2]",
  },
  gratitude: {
    accent: "from-[#B5DDE7]/15 to-[#35555C]/10",
    iconColor: "text-[#E0F6F8]",
  },
};

const features: Feature[] = [
  {
    icon: Heart,
    title: "Name What You Feel",
    description:
      "Move beyond happy, sad, or anxious. Explore layers of emotions and find words for what you're actually feeling.",
    ...blueAccents.emotion,
  },
  {
    icon: BookHeart,
    title: "Compassionate Reflection",
    description:
      "Pause with gentle prompts that invite you to acknowledge, investigate, and respond to emotions with kindness.",
    accent: "from-violet-400/15 to-purple-500/5",
    iconColor: "text-violet-200",
  },
  {
    icon: ScanHeart,
    title: "Body Awareness",
    description:
      "Notice where emotions show up in your body and create space to listen to what you're experiencing.",
    accent: "from-teal-400/15 to-emerald-500/5",
    iconColor: "text-emerald-200",
  },
  {
    icon: Wind,
    title: "Mindful Breathing",
    description:
      "Take a gentle pause with guided breathing exercises when you need a little room to reset.",
    accent: "from-sky-400/15 to-teal-500/5",
    iconColor: "text-sky-200",
  },
  {
    icon: NotebookPen,
    title: "Daily Journaling",
    description:
      "Explore thoughtful writing prompts inspired by your emotions, giving you space to express what's on your mind.",
    accent: "from-amber-400/15 to-orange-500/5",
    iconColor: "text-amber-200",
  },
  {
    icon: Brain,
    title: "Weekly Brain Dump",
    description:
      "Make room for everything you're carrying: unfinished tasks, worries, small wins, and things you've been putting off.",
    accent: "from-fuchsia-400/15 to-violet-500/5",
    iconColor: "text-fuchsia-200",
  },
  {
    icon: Sparkles,
    title: "Gratitude, Wins & Intentions",
    description:
      "Celebrate what went well, appreciate small moments, and set gentle intentions for what's ahead.",
    accent: "from-yellow-400/15 to-rose-500/5",
    iconColor: "text-yellow-200",
  },
];

// Include only screenshots that exist in public/products/iriezen.
const screenshots = [
  {
    src: "/products/iriezen/name-what-you-feel.png",
    alt: "IrieZen emotion selection",
    label: "Name what you feel",
  },
  {
    src: "/products/iriezen/go-deeper.png",
    alt: "Explore more specific emotions",
    label: "Explore your emotions",
  },
  {
    src: "/products/iriezen/reflect.png",
    alt: "IrieZen compassionate reflection",
    label: "Reflect with kindness",
  },
  {
    src: "/products/iriezen/body-awareness.png",
    alt: "Body awareness check-in",
    label: "Listen to your body",
  },
];

const journey = [
  {
    step: "01",
    icon: Heart,
    title: "Notice",
    description:
      "Check in with yourself and name the emotions that are present.",
  },
  {
    step: "02",
    icon: Leaf,
    title: "Understand",
    description:
      "Explore your emotions and where you might feel them in your body.",
  },
  {
    step: "03",
    icon: BookHeart,
    title: "Reflect",
    description:
      "Give yourself space to pause and approach your feelings with curiosity.",
  },
  {
    step: "04",
    icon: Flower2,
    title: "Nurture",
    description:
      "Choose a small act of kindness, from breathing to journaling.",
  },
];

function SectionHeading({
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
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#CDB4ED]">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-[#BBB4CD]">{description}</p>
    </div>
  );
}

function AppStoreButton() {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--iriezen-accent-light)] px-7 py-3.5 font-semibold text-[var(--iriezen-button-text)] shadow-lg shadow-sky-950/20 transition hover:bg-[var(--iriezen-accent-pale)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200"
    >
      Download on the App Store
      <ArrowUpRight className="h-4 w-4" />
    </a>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;

  return (
    <article
      className={`group rounded-3xl border border-white/10 bg-gradient-to-br ${feature.accent} p-7 transition duration-300 hover:-translate-y-1 hover:border-violet-300/30`}
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
        <Icon className={`h-6 w-6 ${feature.iconColor}`} strokeWidth={1.7} />
      </div>
      <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
      <p className="mt-3 text-sm leading-7 text-[#C4BDD0]">
        {feature.description}
      </p>
    </article>
  );
}

export default async function IrieZenPage() {
  const product: Product = await getProjectById("5");
  const images = product.images ?? [];

  return (
    <main className="min-h-screen overflow-hidden bg-[#100d22] px-5 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 pt-10 text-sm"
        >
          <Link
            href="/products"
            className="text-slate-400 transition hover:text-violet-200"
          >
            Products
          </Link>
          <ChevronRight className="h-4 w-4 text-slate-600" />
          <span className="text-[#D7C1EF]">IrieZen</span>
        </nav>

        {/* Hero */}

        <section className="relative py-20 text-center md:py-28">
          {/* Pale blue ambient glow */}
          <div className="pointer-events-none absolute left-1/2 top-12 h-80 w-80 -translate-x-1/2 rounded-full bg-[#A9D6E5]/15 blur-[100px]" />

          <div className="relative mx-auto flex max-w-3xl flex-col items-center">
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-[28px] border border-[#A9D6E5]/25 bg-gradient-to-br from-[#38536B] to-[#202C3D] shadow-[0_16px_60px_rgba(169,214,229,0.12)]">
              <Image
                src="/iriezen.png"
                width={48}
                height={48}
                alt="IrieZen icon"
              />
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A9D6E5]">
              Emotional Wellness · Mindful Living
            </p>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              A mindful moment,
              <span className="block text-[#CDEAF2]">just for you.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#C3D1DB]">
              A gentle space to slow down, name your feelings, reconnect with
              your body, and find clarity through mindful reflection.
            </p>

            <div className="mt-9">
              <AppStoreButton />
            </div>
          </div>
        </section>

        {/* Screenshot gallery */}
        {images.length > 0 && (
        <section aria-label="IrieZen app screenshots" className="pb-24">
          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6">
            {images.map((screen) => (
              <figure
                key={screen.src}
                className="w-56 shrink-0 snap-center sm:w-64"
              >
                <div className="relative aspect-[9/19] overflow-hidden rounded-[32px] border border-violet-200/20 bg-[#29213C] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                  <div className="relative h-full w-full overflow-hidden rounded-[25px]">
                    <Image
                      src={screen.src}
                      alt={screen.alt}
                      fill
                      sizes="(max-width: 640px) 224px, 256px"
                      className="object-contain"
                    />
                  </div>
                </div>
                <figcaption className="mt-4 text-center text-sm text-[#BEB4CE]">
                  {screen.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
        )}

        {/* Why IrieZen */}
        <section className="py-12">
          <div className="relative overflow-hidden rounded-[32px] border border-[#C5ACDF]/15 bg-gradient-to-br from-[#312440] via-[#272439] to-[#233A37] p-8 md:p-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-300/10 blur-3xl" />

            <div className="relative grid items-center gap-10 md:grid-cols-[1.4fr_0.6fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D3B8EB]">
                  Why IrieZen
                </p>

                <h2 className="mt-5 text-3xl font-semibold leading-tight text-white md:text-4xl">
                  You don't have to have it all figured out.
                </h2>

                <p className="mt-6 leading-8 text-[#D0C7DB]">
                  Sometimes the hardest part of understanding ourselves is
                  finding the words for what we're feeling.
                </p>

                <p className="mt-4 leading-8 text-[#D0C7DB]">
                  IrieZen was created to offer a gentle place to pause, explore
                  emotions without judgment, and make a little room for yourself
                  in a busy day.
                </p>
              </div>

              <div className="flex items-center justify-center">
                <div className="flex h-48 w-48 items-center justify-center rounded-full border border-[#D8C4EE]/20 bg-[#D8C4EE]/10">
                  <CloudSun
                    className="h-24 w-24 text-[#D9C7F0]"
                    strokeWidth={1}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature cards */}
        <section id="features" className="py-24">
          <SectionHeading
            eyebrow="A Little Care Goes a Long Way"
            title="Gentle tools for everyday moments."
            description="Whether you're processing a difficult day, celebrating a small win, or simply checking in with yourself, IrieZen offers a way to pause and reconnect."
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </section>

        {/* Guided journey */}
        <section className="py-20">
          <SectionHeading
            eyebrow="Your Mindful Check-In"
            title="One small moment at a time."
            description="There's no perfect way to feel. Start wherever you are and explore what you need."
          />

          <div className="grid gap-4 md:grid-cols-4">
            {journey.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.step}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#D3B8EB]">
                      {step.step}
                    </span>
                    <Icon
                      className="h-6 w-6 text-[#D5C1EA]"
                      strokeWidth={1.6}
                    />
                  </div>

                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#BBB4CC]">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Brain dump spotlight */}
        <section className="py-16">
          <div className="grid items-center gap-10 rounded-[32px] border border-[#D9BDA6]/15 bg-gradient-to-br from-[#382B3E] to-[#25283C] p-8 md:grid-cols-2 md:p-12">
            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAC9AF]/10">
                <NotebookPen className="h-6 w-6 text-[#F1C9AB]" />
              </div>

              <p className="text-xs font-semibold uppercase tracking-widest text-[#EAC9AF]">
                Weekly Brain Dump
              </p>

              <h2 className="mt-4 text-3xl font-semibold leading-tight">
                You carry a lot.
                <span className="block text-[#F1C9D0]">
                  You don't have to hold it all in.
                </span>
              </h2>

              <p className="mt-5 leading-8 text-[#D0C7D7]">
                Between responsibilities, invisible deadlines, worries, and all
                the little things waiting for attention, our minds can get
                crowded.
              </p>

              <p className="mt-4 leading-8 text-[#D0C7D7]">
                The weekly brain dump gives those thoughts somewhere to land,
                without the pressure to solve everything at once.
              </p>
            </div>

            <div className="rounded-3xl border border-[#A9D6E5]/20 bg-[#E8F6FA] p-6 text-[#233447] shadow-xl shadow-black/10">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#8A6C9B]">
                <Leaf className="h-4 w-4" />A little space to unload
              </div>

              <h3 className="mt-4 text-xl font-semibold">
                What's on your mind this week?
              </h3>

              <div className="mt-6 space-y-4">
                {[
                  "Things I need to do",
                  "One small win this week",
                  "How I'm actually feeling",
                  "Things I'm worried about",
                  "Things I've been putting off",
                ].map((prompt) => (
                  <div
                    key={prompt}
                    className="flex items-start gap-3 border-b border-[#D8CADB] pb-3 last:border-0"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#B49CC0]">
                      <Check className="h-3 w-3 text-[#927BA0]" />
                    </span>
                    <span className="text-sm">{prompt}</span>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs italic text-[#8A778E]">
                You can take it one thought at a time.
              </p>
            </div>
          </div>
        </section>

        {/* Built at Restless Moon */}
        <section className="py-20">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 md:p-12">
            <div className="flex items-center gap-3 text-[#D3B8EB]">
              <Sparkles className="h-6 w-6" />
              <span className="text-sm font-semibold uppercase tracking-widest">
                Built at Restless Moon Studio
              </span>
            </div>

            <h2 className="mt-5 text-2xl font-semibold md:text-3xl">
              Thoughtful software for everyday life.
            </h2>

            <p className="mt-5 max-w-3xl leading-8 text-slate-300">
              IrieZen is an independently built mobile application that brings
              together user-centered design, interactive emotional check-ins,
              thoughtful content, and mobile engineering.
            </p>

            <Link
              href="/services"
              className="mt-7 inline-flex items-center gap-2 font-medium text-[#D7C1EF] transition hover:text-white"
            >
              Explore our development services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="pb-20 pt-10">
          <div className="rounded-[32px] border border-violet-200/15 bg-gradient-to-br from-[#342640] via-[#28243D] to-[#213B39] px-6 py-16 text-center md:px-12">
            <Flower2
              className="mx-auto h-12 w-12 text-[#D9C7F0]"
              strokeWidth={1.4}
            />

            <h2 className="mx-auto mt-6 max-w-xl text-3xl font-semibold md:text-4xl">
              Make a little room for yourself.
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-8 text-[#D0C7DB]">
              You don't need the perfect words or the perfect moment. Just start
              with how you feel.
            </p>

            <div className="mt-8">
              <AppStoreButton />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-wrap items-center justify-between gap-5 border-t border-white/10 py-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-violet-200"
          >
            <ArrowLeft className="h-4 w-4" />
            All Products
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/products/iriezen/privacy"
              className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-[#D7C1EF]"
            >
              <ShieldCheck className="h-4 w-4" />
              Privacy Policy
            </Link>
            <a
              href="mailto:camariadev@gmail.com"
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
