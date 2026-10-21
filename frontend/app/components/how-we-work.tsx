
import {
  MessagesSquare,
  Code2,
  Rocket,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We start by understanding your goals, your users, and what success looks like. Together, we define a focused plan.",
    icon: MessagesSquare,
  },
  {
    number: "02",
    title: "Build",
    description:
      "We turn the plan into working software, sharing progress and gathering feedback along the way.",
    icon: Code2,
  },
  {
    number: "03",
    title: "Launch & Evolve",
    description:
      "We test, refine, and launch your product with a foundation designed to support future improvements.",
    icon: Rocket,
  },
];

export function HowWeWork() {
  return (
    <section className="py-20">
      <div className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
          Our Process
        </p>
        <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
          From idea to launch.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-400">
          A collaborative, practical approach to building
          software that works.
        </p>
      </div>

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
              <p className="mt-3 leading-relaxed text-slate-400">
                {step.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
