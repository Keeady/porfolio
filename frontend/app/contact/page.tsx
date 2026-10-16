
import type { Metadata } from "next";
import { ContactForm } from "../components/contact-form";

export const metadata: Metadata = {
  title: "Contact | Restless Moon Studio",
  description:
    "Have a software project in mind? Get in touch with Restless Moon Studio about web apps, mobile development, SaaS, and AI integration.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#100d22] px-5 text-white md:px-8">
      <div className="mx-auto max-w-3xl py-16 md:py-24">
        <header className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
            Get in Touch
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Let's build something together.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-400">
            Have an idea, a question, or just want to say hello?
            We'd love to hear from you.
          </p>
        </header>

        <ContactForm />
      </div>
    </main>
  );
}
