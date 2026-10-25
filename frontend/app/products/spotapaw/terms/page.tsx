
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  FileText,
  Mail,
  Scale,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "SpotAPaw Terms of Service | Restless Moon Studio",
  description:
    "Read the SpotAPaw Terms of Service covering acceptable use, user content, AI photo analysis, privacy, and user responsibilities.",
  alternates: {
    canonical: "/products/spotapaw/terms",
  },
};

const sections = [
  { id: "use-of-the-app", title: "Use of the App" },
  { id: "user-content", title: "User Content" },
  { id: "ai-photo-analysis", title: "AI Photo Analysis" },
  { id: "privacy", title: "Privacy" },
  { id: "location-and-camera", title: "Location and Camera Access" },
  { id: "disclaimer-of-warranties", title: "Disclaimer of Warranties" },
  { id: "limitation-of-liability", title: "Limitation of Liability" },
  { id: "termination", title: "Termination" },
  { id: "modifications", title: "Modifications" },
  { id: "governing-law", title: "Governing Law" },
  { id: "contact-us", title: "Contact Us" },
];

function TermsSection({
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
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-sm font-semibold text-violet-300">
          {String(number).padStart(2, "0")}
        </span>

        <h2
          id={`${id}-heading`}
          className="pt-1 text-xl font-semibold tracking-tight text-white sm:text-2xl"
        >
          {title}
        </h2>
      </div>

      <div className="space-y-5 leading-8 text-slate-300 [&_strong]:font-semibold [&_strong]:text-slate-100">
        {children}
      </div>
    </section>
  );
}

function TermsList({ children }: { children: ReactNode }) {
  return (
    <ul className="ml-5 list-disc space-y-2 marker:text-violet-400">
      {children}
    </ul>
  );
}

export default function SpotAPawTermsPage() {
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
            className="text-slate-400 transition hover:text-violet-300"
          >
            Products
          </Link>

          <ChevronRight className="h-4 w-4 text-slate-600" />

          <Link
            href="/products/spotapaw"
            className="text-slate-400 transition hover:text-violet-300"
          >
            SpotAPaw
          </Link>

          <ChevronRight className="h-4 w-4 text-slate-600" />

          <span className="text-violet-300">Terms of Service</span>
        </nav>

        {/* Header */}
        <header className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-violet-300">
            <Scale className="h-4 w-4" />
            SpotAPaw · Legal
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            Terms of Service
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
            The terms and conditions for using SpotAPaw
            and participating in our pet-loving community.
          </p>

          <div className="mt-7 inline-flex items-center gap-2 text-sm text-slate-400">
            <CalendarDays className="h-4 w-4 text-violet-400" />
            Effective Date: February 17, 2026
          </div>
        </header>

        {/* Content layout */}
        <div className="grid items-start gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* Sticky table of contents */}
          <aside className="hidden lg:sticky lg:top-24 lg:block">
            <nav
              aria-label="Terms of Service sections"
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
            >
              <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-white">
                <FileText className="h-4 w-4 text-violet-400" />
                On this page
              </div>

              <ol className="space-y-3">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex items-start gap-3 text-sm text-slate-400 transition hover:text-violet-200"
                    >
                      <span className="font-mono text-xs text-violet-400/80">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span>{section.title}</span>
                    </a>
                  </li>
                ))}
              </ol>

              <div className="mt-6 border-t border-white/10 pt-5">
                <Link
                  href="/products/spotapaw/privacy"
                  className="inline-flex items-center gap-2 text-sm text-violet-300 transition hover:text-violet-200"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Privacy Policy
                </Link>
              </div>
            </nav>
          </aside>

          {/* Terms content */}
          <article className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:p-9 lg:p-12">
            {/* Introduction */}
            <div className="mb-10 space-y-4 border-b border-white/10 pb-10 leading-8 text-slate-300">
              <p>
                Welcome to SpotAPaw (“we,” “our,” or “us”).
                These Terms of Service (“Terms”) govern your
                use of the SpotAPaw mobile application
                (the “App”).
              </p>

              <p>
                By downloading, accessing, or using the App,
                you agree to be bound by these Terms.
                If you do not agree, please do not use the App.
              </p>
            </div>

            <TermsSection
              id="use-of-the-app"
              number={1}
              title="Use of the App"
            >
              <p>
                You may use the App only for lawful purposes
                and in accordance with these Terms. The App
                is designed to help users report, view, and
                share pet sightings to assist in reuniting
                lost pets with their owners.
              </p>

              <p>You agree not to:</p>

              <TermsList>
                <li>
                  Submit false, misleading, or harmful information.
                </li>
                <li>
                  Upload inappropriate, offensive, illegal,
                  or infringing content.
                </li>
                <li>
                  Upload photos you do not have the right to share.
                </li>
                <li>
                  Upload photos containing unrelated individuals
                  or private personal information.
                </li>
                <li>
                  Attempt to reverse-engineer, decompile,
                  disrupt, or otherwise interfere with the
                  App’s operation.
                </li>
                <li>
                  Use the App to harm, harass, or impersonate others.
                </li>
              </TermsList>
            </TermsSection>

            <TermsSection
              id="user-content"
              number={2}
              title="User Content"
            >
              <p>
                You are responsible for the content you submit,
                including:
              </p>

              <TermsList>
                <li>Photos</li>
                <li>Descriptions</li>
                <li>Location information</li>
                <li>
                  Any other information included in a pet sighting report
                </li>
              </TermsList>

              <p>
                By submitting content, you grant SpotAPaw a
                non-exclusive, worldwide, royalty-free license
                to host, store, process, display, reproduce,
                and distribute that content within the App
                for the purpose of operating and improving
                the service.
              </p>

              <p>You retain ownership of your content.</p>

              <p>
                We reserve the right to remove any content
                that violates these Terms or applicable law.
              </p>
            </TermsSection>

            <TermsSection
              id="ai-photo-analysis"
              number={3}
              title="AI Photo Analysis"
            >
              <p>
                The App includes an artificial intelligence
                (“AI”) feature that analyzes user-uploaded photos
                to help generate suggested pet descriptions.
              </p>

              <p>
                By uploading a photo, you acknowledge and agree that:
              </p>

              <TermsList>
                <li>
                  Your photo may be processed by automated AI systems.
                </li>
                <li>
                  AI-generated suggestions are provided
                  for convenience only.
                </li>
                <li>
                  AI outputs may be inaccurate, incomplete, or incorrect.
                </li>
                <li>
                  You are solely responsible for reviewing and
                  editing any AI-generated description before
                  submitting your report.
                </li>
              </TermsList>

              <p>
                SpotAPaw does not guarantee the accuracy
                of AI-generated content and is not responsible
                for errors in AI analysis.
              </p>

              <p>
                We use third-party AI services, including Google
                Gemini, to analyze uploaded images and generate
                suggested descriptions. By uploading a photo,
                you consent to this processing.
              </p>
            </TermsSection>

            <TermsSection
              id="privacy"
              number={4}
              title="Privacy"
            >
              <p>
                Your privacy is important to us. Please review
                our{" "}
                <Link
                  href="/products/spotapaw/privacy"
                  className="font-medium text-violet-300 underline underline-offset-4 transition hover:text-violet-200"
                >
                  Privacy Policy
                </Link>
                , which explains how we collect, use, store,
                and protect your information.
              </p>

              <p>
                By using the App, you consent to the
                collection and use of your information,
                including automated processing of uploaded photos,
                as described in the Privacy Policy.
              </p>
            </TermsSection>

            <TermsSection
              id="location-and-camera"
              number={5}
              title="Location and Camera Access"
            >
              <p>The App may request access to:</p>

              <TermsList>
                <li>
                  <strong>Camera and Photos:</strong> Used only
                  when you choose to upload or capture a photo
                  for a sighting report.
                </li>
                <li>
                  <strong>Location Data:</strong> Used only
                  when you create a pet sighting report to
                  attach relevant location information.
                </li>
              </TermsList>

              <p>
                You can manage these permissions in the App
                or your device settings at any time.
              </p>
            </TermsSection>

            <TermsSection
              id="disclaimer-of-warranties"
              number={6}
              title="Disclaimer of Warranties"
            >
              <p>
                The App is provided “as is” and “as available.”
              </p>

              <p>We do not guarantee:</p>

              <TermsList>
                <li>
                  The accuracy of user-submitted sightings.
                </li>
                <li>
                  The accuracy of AI-generated descriptions.
                </li>
                <li>
                  That reported pets will be located or reunited.
                </li>
              </TermsList>

              <p>
                We are not responsible for any loss, injury,
                or damage resulting from reliance on information
                provided through the App.
              </p>

              <p>
                To the fullest extent permitted by law,
                we disclaim all warranties, express or implied.
              </p>
            </TermsSection>

            <TermsSection
              id="limitation-of-liability"
              number={7}
              title="Limitation of Liability"
            >
              <p>
                To the fullest extent permitted by law,
                SpotAPaw and its affiliates shall not be liable
                for any indirect, incidental, special,
                consequential, or punitive damages arising from:
              </p>

              <TermsList>
                <li>
                  Your use of or inability to use the App.
                </li>
                <li>
                  Reliance on AI-generated descriptions.
                </li>
                <li>
                  Reliance on user-submitted information.
                </li>
              </TermsList>
            </TermsSection>

            <TermsSection
              id="termination"
              number={8}
              title="Termination"
            >
              <p>
                We may suspend or terminate your access
                to the App at any time if you violate
                these Terms or engage in misuse.
              </p>

              <p>
                You may also stop using the App at any time.
              </p>
            </TermsSection>

            <TermsSection
              id="modifications"
              number={9}
              title="Modifications"
            >
              <p>
                We may update these Terms periodically.
                If we make significant changes, we will
                notify you within the App or by updating
                the “Effective Date” above.
              </p>

              <p>
                Continued use of the App after changes
                means you accept the new Terms.
              </p>
            </TermsSection>

            <TermsSection
              id="governing-law"
              number={10}
              title="Governing Law"
            >
              <p>
                These Terms are governed by and construed
                in accordance with the laws of United States
                of America, without regard to its conflict
                of law provisions.
              </p>
            </TermsSection>

            <TermsSection
              id="contact-us"
              number={11}
              title="Contact Us"
            >
              <p>
                If you have questions about these Terms,
                please contact us at:
              </p>

              <a
                href="mailto:spotapaw@spotapaw.com"
                className="inline-flex items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-3 font-medium text-violet-200 transition hover:border-violet-400/50 hover:bg-violet-500/20"
              >
                <Mail className="h-5 w-5" />
                spotapaw@spotapaw.com
              </a>
            </TermsSection>
          </article>
        </div>

        {/* Footer */}
        <footer className="mt-12 flex flex-col justify-between gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <Link
            href="/products/spotapaw"
            className="inline-flex items-center gap-2 text-sm font-medium text-violet-300 transition hover:text-violet-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to SpotAPaw
          </Link>

          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/products/spotapaw/privacy"
              className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-violet-300"
            >
              <ShieldCheck className="h-4 w-4" />
              Privacy Policy
            </Link>

            <span className="text-sm text-slate-500">
              © SpotAPaw
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}
