import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  Flower2,
  Heart,
  FileText,
  Mail,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "IrieZen Privacy Policy | Restless Moon Studio",
  description:
    "Learn about IrieZen's privacy practices, data collection, location access, security, and your rights.",
  alternates: {
    canonical: "/products/iriezen/privacy",
  },
};

const sections = [
  {
    id: "information-collection",
    title: "Information Collection & Use",
  },
  {
    id: "location-information",
    title: "Location Information",
  },
  {
    id: "third-party-access",
    title: "Third-Party Access",
  },
  {
    id: "opt-out-rights",
    title: "Opt-Out Rights",
  },
  {
    id: "children",
    title: "Children",
  },
  {
    id: "security",
    title: "Security",
  },
  {
    id: "changes",
    title: "Changes",
  },
  {
    id: "your-consent",
    title: "Your Consent",
  },
  {
    id: "contact-us",
    title: "Contact Us",
  },
];

function PrivacySection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-24 border-b border-white/10 py-9 first:pt-0 last:border-0 last:pb-0"
    >
      <div className="mb-5 flex items-start gap-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#A9D6E5]/10 text-sm font-semibold text-[#CDEAF2]">
          {String(number).padStart(2, "0")}
        </span>

        <h2
          id={`${id}-heading`}
          className="pt-1 text-xl font-semibold tracking-tight text-white sm:text-2xl"
        >
          {title}
        </h2>
      </div>

      <div className="space-y-5 leading-8 text-[#C8C0D5]">{children}</div>
    </section>
  );
}

export default function IrieZenPrivacyPage() {
  return (
    <main className="min-h-screen bg-[#100d22] px-5 py-12 text-white md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-12 flex flex-wrap items-center gap-2 text-sm"
        >
          <Link
            href="/products"
            className="text-slate-400 transition hover:text-[#D7C1EF]"
          >
            Products
          </Link>

          <ChevronRight className="h-4 w-4 text-slate-600" />

          <Link
            href="/products/iriezen"
            className="text-slate-400 transition hover:text-[#D7C1EF]"
          >
            IrieZen
          </Link>

          <ChevronRight className="h-4 w-4 text-slate-600" />

          <span className="text-[#D7C1EF]">Privacy Policy</span>
        </nav>

        {/* Header */}
        <header className="relative mx-auto mb-14 max-w-3xl text-center">
          <div className="pointer-events-none absolute left-1/2 top-0 h-52 w-72 -translate-x-1/2 rounded-full bg-[#B49CD5]/10 blur-[80px]" />

          <div className="relative">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#A9D6E5]/20 bg-[#A9D6E5]/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#CDEAF2]">
              <Flower2 className="h-4 w-4" />
              IrieZen · Privacy
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Privacy Policy
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#BBB4CD]">
              Your mindful moments deserve care and privacy. Learn more about
              how IrieZen approaches your information.
            </p>

            <div className="mt-7 inline-flex items-center justify-center gap-2 text-sm text-[#BBB4CD]">
              <CalendarDays className="h-4 w-4 text-[#D7C1EF]" />
              Effective Date: April 26, 2026
            </div>
          </div>
        </header>

        {/* Content layout */}
        <div className="grid items-start gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* Sidebar navigation */}
          <aside className="hidden lg:sticky lg:top-24 lg:block">
            <nav
              aria-label="Privacy policy sections"
              className="rounded-3xl border border-[#D7C1EF]/15 bg-white/[0.04] p-5"
            >
              <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-white">
                <FileText className="h-4 w-4 text-[#D7C1EF]" />
                On this page
              </div>

              <ol className="space-y-3">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex items-start gap-3 text-sm text-[#BBB4CD] transition hover:text-[#E5D5F9]"
                    >
                      <span className="font-mono text-xs text-[#BDA7DF]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{section.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="mt-5 rounded-3xl border border-[#B8D9C6]/15 bg-[#253A39]/40 p-5">
              <Heart
                className="mb-3 h-6 w-6 text-[#B8D9C6]"
                strokeWidth={1.5}
              />
              <p className="text-sm font-medium text-[#E2EFE7]">
                A mindful moment, just for you.
              </p>
              <p className="mt-2 text-xs leading-6 text-[#C2D3CB]">
                A little space to pause, reflect, and reconnect with yourself.
              </p>
            </div>
          </aside>

          {/* Privacy policy */}
          <article className="min-w-0 rounded-[32px] border border-[#A9D6E5]/15 bg-gradient-to-br from-[#202C3D] via-[#1B293B] to-[#152D38] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:p-9 lg:p-12">
            {" "}
            {/* Introduction */}
            <div className="mb-10 space-y-4 border-b border-white/10 pb-10 leading-8 text-[#C8C0D5]">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D7C1EF]/15 bg-[#D7C1EF]/10">
                <ShieldCheck
                  className="h-6 w-6 text-[#D7C1EF]"
                  strokeWidth={1.6}
                />
              </div>

              <p>
                IrieZen (“we,” “our,” or “us”) respects your privacy. This
                Privacy Policy explains how we collect, use, process, store, and
                protect your information when you use the IrieZen mobile
                application (the “App”).
              </p>

              <p>
                By using the App, you agree to the practices described in this
                Privacy Policy.
              </p>
            </div>
            <PrivacySection
              id="information-collection"
              number={1}
              title="Information Collection & Use"
            >
              <h3 className="font-semibold text-[#E5D5F9]">
                What information does the Application obtain and how is it used?
              </h3>

              <p>
                The Application does not obtain or collect any information when
                you download and use it. Registration is not required to use the
                Application.
              </p>
            </PrivacySection>
            <PrivacySection
              id="location-information"
              number={2}
              title="Location Information"
            >
              <h3 className="font-semibold text-[#E5D5F9]">
                Does the Application collect precise real time location
                information of the device?
              </h3>

              <p>
                This Application does not collect precise information about the
                location of your mobile device.
              </p>
            </PrivacySection>
            <PrivacySection
              id="third-party-access"
              number={3}
              title="Third-Party Access"
            >
              <h3 className="font-semibold text-[#E5D5F9]">
                Do third parties see and/or have access to information obtained
                by the Application?
              </h3>

              <p>
                Since the Application does not collect any information, no data
                is shared with third parties.
              </p>
            </PrivacySection>
            <PrivacySection
              id="opt-out-rights"
              number={4}
              title="Opt-Out Rights"
            >
              <h3 className="font-semibold text-[#E5D5F9]">
                What are my opt-out rights?
              </h3>

              <p>
                You can stop all collection of information by the Application
                easily by uninstalling it. You may use the standard uninstall
                processes as may be available as part of your mobile device or
                via the mobile application marketplace or network.
              </p>
            </PrivacySection>
            <PrivacySection id="children" number={5} title="Children">
              <p>
                We do not knowingly collect personal information from children
                under 13. If we learn that we have collected personal
                information from a child under 13, we will delete it.
              </p>
            </PrivacySection>
            <PrivacySection id="security" number={6} title="Security">
              <p>
                We take reasonable measures to protect your data from
                unauthorized access, alteration, disclosure, or destruction.
                However, no method of transmission or storage is completely
                secure.
              </p>
            </PrivacySection>
            <PrivacySection id="changes" number={7} title="Changes">
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of significant changes by updating the “Effective
                Date” at the top of this page.
              </p>
            </PrivacySection>
            <PrivacySection id="your-consent" number={8} title="Your Consent">
              <p>
                By using the Application, you are consenting to the processing
                of your information as set forth in this Privacy Policy now and
                as amended by the Service Provider.
              </p>
            </PrivacySection>
            <PrivacySection id="contact-us" number={9} title="Contact Us">
              <p>
                If you have any questions regarding privacy while using the
                Application, or have questions about the practices, please
                contact the Service Provider via email at:
              </p>

              <a
                href="mailto:camariadev@gmail.com"
                className="inline-flex items-center gap-2 rounded-xl border border-[#D7C1EF]/20 bg-[#D7C1EF]/10 px-4 py-3 font-medium text-[#E5D5F9] transition hover:border-[#D7C1EF]/50 hover:bg-[#D7C1EF]/20"
              >
                <Mail className="h-5 w-5" />
                camariadev@gmail.com
              </a>
            </PrivacySection>
          </article>
        </div>

        {/* Footer */}
        <footer className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-white/10 py-8">
          <Link
            href="/products/iriezen"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#D7C1EF] transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to IrieZen
          </Link>

          <span className="flex items-center gap-2 text-sm text-[#AAA3BC]">
            <Heart className="h-4 w-4 text-[#D5AED0]" />
            Made with care at Restless Moon Studio
          </span>
        </footer>
      </div>
    </main>
  );
}
