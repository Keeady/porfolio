
import type { Metadata } from "next";
import {
  PageIntro,
  ServiceCard,
  StudioCTA,
  services,
} from "../components/sections";
import { HowWeWork } from "../components/how-we-work";
import { WhyWorkWithUs } from "../components/why-work-with-us";
import { ProjectInquiry } from "../components/project-inquiry";

export const metadata: Metadata = {
  title: "Software Development Services | Restless Moon Studio",
  description:
    "Custom web apps, mobile development, SaaS products, AI integration and backend engineering from Restless Moon Studio.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#100d22] px-5 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <PageIntro
          eyebrow="What We Do"
          title="Software built around your ideas."
          description="Whether you're starting something new or improving what already exists, we help turn your ideas into thoughtfully engineered software."
        />

        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </section>

        <HowWeWork />
        <WhyWorkWithUs />
        <ProjectInquiry />

        <StudioCTA />
      </div>
    </main>
  );
}
