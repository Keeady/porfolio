"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  LoaderCircle,
  MessageCircle,
} from "lucide-react";
import { submitForm } from "@/api/contact";

type InquiryType = "project" | "general";
type SubmissionStatus = "idle" | "success" | "error";

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400";

type ContactFormProps = {
  initialType: InquiryType;
};
export function ContactForm({ initialType }: ContactFormProps) {
  const searchParams = useSearchParams();

  const [selectedType, setSelectedType] = useState<InquiryType | null>(
    initialType,
  );

  const inquiryType: InquiryType =
    selectedType ??
    (searchParams.get("type") === "project" ? "project" : "general");

  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (data["bot"]) {
      return;
    }

    setSubmitting(true);
    setStatus("idle");

    try {
      const response = await submitForm(data, inquiryType);

      if (!response) {
        throw new Error("Failed to send message");
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-10"
    >
      <fieldset disabled={submitting}>
        <legend className="mb-4 text-base font-semibold text-white">
          What brings you here?
        </legend>

        <div className="mb-8 grid gap-3 sm:grid-cols-2">
          {[
            {
              value: "project" as const,
              icon: BriefcaseBusiness,
              title: "Start a Project",
              description: "Let's discuss your idea.",
            },
            {
              value: "general" as const,
              icon: MessageCircle,
              title: "General Question",
              description: "Ask us anything.",
            },
          ].map((option) => {
            const Icon = option.icon;
            const active = inquiryType === option.value;

            return (
              <label
                key={option.value}
                className={`cursor-pointer rounded-2xl border p-5 transition ${
                  active
                    ? "border-violet-400 bg-violet-500/15"
                    : "border-white/10 bg-white/[0.03] hover:border-violet-400/40"
                }`}
              >
                <input
                  type="radio"
                  name="inquiryType"
                  value={option.value}
                  checked={option.value === selectedType}
                  onChange={() => {
                    setSelectedType(option.value);
                    setStatus("idle");
                  }}
                  className="sr-only"
                />
                <div className="flex items-center justify-between">
                  <Icon className="h-6 w-6 text-violet-300" />
                  {active && (
                    <CheckCircle2 className="h-5 w-5 text-violet-300" />
                  )}
                </div>
                <p className="mt-4 font-semibold text-white">{option.title}</p>
                <p className="mt-1 text-sm text-slate-400">
                  {option.description}
                </p>
              </label>
            );
          })}
        </div>

        <div className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="contact-name"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Name *
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                minLength={3}
                maxLength={120}
                autoComplete="name"
                placeholder="Your name"
                className={fieldClass}
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Email *
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                maxLength={254}
                autoComplete="email"
                placeholder="you@example.com"
                className={fieldClass}
              />
            </div>
          </div>

          {inquiryType === "project" && (
            <>
              <div>
                <label
                  htmlFor="project-type"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  What can we help you build?
                </label>
                <select
                  id="project-type"
                  name="projectType"
                  required
                  defaultValue=""
                  className={fieldClass}
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option value="web">Web Application</option>
                  <option value="mobile">Mobile Application</option>
                  <option value="saas">SaaS / MVP</option>
                  <option value="ai">AI Integration</option>
                  <option value="backend">Backend & APIs</option>
                  <option value="improvement">
                    Existing Product Improvements
                  </option>
                  <option value="other">Something Else</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="budget"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Estimated budget (optional)
                </label>
                <select
                  id="budget"
                  name="budget"
                  defaultValue="unsure"
                  className={fieldClass}
                >
                  <option value="unsure">Not sure yet</option>
                  <option value="under-5k">Under $5,000</option>
                  <option value="5k-15k">$5,000–$15,000</option>
                  <option value="15k-30k">$15,000–$30,000</option>
                  <option value="30k-plus">$30,000+</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              {inquiryType === "project"
                ? "Tell us about your project *"
                : "Your message *"}
            </label>
            <textarea
              id="message"
              name="message"
              required
              minLength={10}
              maxLength={2500}
              rows={5}
              placeholder={
                inquiryType === "project"
                  ? "What are you hoping to build? What problem does it solve?"
                  : "What would you like to talk about?"
              }
              className={fieldClass}
            />
          </div>

          <input
            id="bot"
            name="bot"
            type="hidden"
            autoComplete="email"
            maxLength={254}
            className={fieldClass}
            placeholder="you@example.com"
            aria-hidden={true}
          />

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <LoaderCircle className="h-5 w-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                {inquiryType === "project"
                  ? "Send Project Inquiry"
                  : "Send Message"}
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>

          {status === "success" && (
            <p role="status" className="text-center text-sm text-emerald-400">
              Your message was submitted successfully!
            </p>
          )}

          {status === "error" && (
            <p role="alert" className="text-center text-sm text-red-400">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </fieldset>
    </form>
  );
}
