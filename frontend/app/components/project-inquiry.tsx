
"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400";

export function ProjectInquiry() {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setPending(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Submission failed");

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setPending(false);
    }
  }

  return (
    <section id="project-inquiry" className="py-20">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            Let's Collaborate
          </p>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
            Tell us what you're building.
          </h2>
          <p className="mt-4 text-slate-400">
            Have an idea, a challenge, or an existing product
            that needs some love? We'd love to hear about it.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-10"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-200">
                Name *
              </label>
              <input id="name" name="name" type="text" autoComplete="name" required maxLength={120} className={inputClass} placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
                Email *
              </label>
              <input id="email" name="email" type="email" autoComplete="email" required maxLength={254} className={inputClass} placeholder="you@example.com" />
            </div>
          </div>

          <div>
            <label htmlFor="projectType" className="mb-2 block text-sm font-medium text-slate-200">
              What do you need help with?
            </label>
            <select id="projectType" name="projectType" required defaultValue="" className={inputClass}>
              <option value="" disabled>Select a service</option>
              <option value="web">Web Application</option>
              <option value="mobile">Mobile Application</option>
              <option value="saas">SaaS / MVP</option>
              <option value="ai">AI Integration</option>
              <option value="backend">Backend & APIs</option>
              <option value="improvement">Existing Product Improvements</option>
              <option value="other">Something Else</option>
            </select>
          </div>

          <div>
            <label htmlFor="budget" className="mb-2 block text-sm font-medium text-slate-200">
              Estimated budget (optional)
            </label>
            <select id="budget" name="budget" defaultValue="unsure" className={inputClass}>
              <option value="unsure">Not sure yet</option>
              <option value="under-5k">Under $5,000</option>
              <option value="5k-15k">$5,000–$15,000</option>
              <option value="15k-30k">$15,000–$30,000</option>
              <option value="30k-plus">$30,000+</option>
            </select>
          </div>

          <div>
            <label htmlFor="details" className="mb-2 block text-sm font-medium text-slate-200">
              Tell us about your project *
            </label>
            <textarea
              id="details"
              name="details"
              rows={5}
              required
              minLength={10}
              maxLength={5000}
              className={inputClass}
              placeholder="What are you hoping to build? What problem does it solve?"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? (
              <><LoaderCircle className="h-5 w-5 animate-spin" /> Sending...</>
            ) : (
              <>Send Project Inquiry <ArrowRight className="h-5 w-5" /></>
            )}
          </button>

          {status === "success" && (
            <p role="status" className="text-center text-sm text-emerald-400">
              Your inquiry was submitted successfully!
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="text-center text-sm text-red-400">
              We couldn't send your inquiry. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
