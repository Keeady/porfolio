
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  Database,
  FileText,
  LockKeyhole,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "SpotAPaw Privacy Policy | Restless Moon Studio",
  description:
    "Learn how SpotAPaw collects, uses, stores, and protects information when you use the SpotAPaw mobile app.",
  alternates: {
    canonical: "/products/spotapaw/privacy",
  },
};

const sections = [
  { id: "information-we-collect", title: "Information We Collect" },
  { id: "how-we-use-information", title: "How We Use Information" },
  { id: "how-information-is-shared", title: "How Information Is Shared" },
  { id: "data-retention", title: "Data Retention" },
  { id: "permissions", title: "Permissions" },
  { id: "security", title: "Security" },
  { id: "childrens-privacy", title: "Children's Privacy" },
  { id: "your-rights", title: "Your Rights" },
  { id: "changes-to-this-policy", title: "Changes to This Policy" },
  { id: "contact-us", title: "Contact Us" },
];

function PolicySection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: number;
  title: string;
  children: React.ReactNode;
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
      <div className="space-y-5 leading-8 text-slate-300 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-violet-200 [&_strong]:font-semibold [&_strong]:text-slate-100">
        {children}
      </div>
    </section>
  );
}

function PolicyList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="ml-5 list-disc space-y-2 marker:text-violet-400">
      {children}
    </ul>
  );
}

export default function SpotAPawPrivacyPage() {
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
          <span className="text-violet-300">Privacy Policy</span>
        </nav>

        {/* Header */}
        <header className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-violet-300">
            <ShieldCheck className="h-4 w-4" />
            SpotAPaw · Legal
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            Privacy Policy
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
            How SpotAPaw collects, uses, processes, stores,
            and protects your information.
          </p>

          <div className="mt-7 inline-flex items-center gap-2 text-sm text-slate-400">
            <CalendarDays className="h-4 w-4 text-violet-400" />
            Effective Date: February 17, 2026
          </div>
        </header>

        {/* Main layout */}
        <div className="grid items-start gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* Desktop table of contents */}
          <aside className="hidden lg:sticky lg:top-24 lg:block">
            <nav
              aria-label="Privacy policy sections"
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
                      className="group flex items-start gap-3 text-sm text-slate-400 transition hover:text-violet-200"
                    >
                      <span className="font-mono text-xs text-violet-400/80">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{section.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          {/* Policy content */}
          <article className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:p-9 lg:p-12">
            {/* Introduction */}
            <div className="mb-10 space-y-4 border-b border-white/10 pb-10 text-base leading-8 text-slate-300">
              <p>
                SpotAPaw (“we,” “our,” or “us”) respects your privacy.
                This Privacy Policy explains how we collect, use,
                process, store, and protect your information when
                you use the SpotAPaw mobile application (the “App”).
              </p>

              <p>
                By using the App, you agree to the practices
                described in this Privacy Policy.
              </p>
            </div>

            <PolicySection
              id="information-we-collect"
              number={1}
              title="Information We Collect"
            >
              <p>
                We collect only the information necessary to operate the App.
              </p>

              <h3>A. Pet Sighting Reports</h3>
              <p>
                When you submit a sighting report, we collect:
              </p>

              <PolicyList>
                <li>
                  <strong>Photo:</strong> The image you choose to upload.
                  We do not access or collect other photos from your device.
                </li>
                <li>
                  <strong>Location Data:</strong> Collected only at the
                  time you submit a sighting report to identify where
                  the pet was seen.
                </li>
                <li>
                  <strong>Pet Description &amp; Report Details:</strong>{" "}
                  Information you enter into the report form (such as
                  breed, color, time, and other relevant details).
                </li>
              </PolicyList>

              <h3>B. AI Photo Processing (Google Gemini)</h3>
              <p>
                When you upload a photo, the image is analyzed using
                artificial intelligence technology provided by
                Google Gemini (a service operated by Google).
              </p>

              <p>
                This processing is used solely to generate suggested
                pet description details to assist you in completing
                your sighting report.
              </p>

              <p>In connection with this feature:</p>

              <PolicyList>
                <li>
                  Uploaded photos may be transmitted securely to
                  Google for processing.
                </li>
                <li>
                  We use the paid commercial API version of Google Gemini.
                </li>
                <li>
                  Data processed through this API is not used by us
                  to train public AI models.
                </li>
                <li>
                  We do not sell or license your photos to third parties.
                </li>
                <li>
                  AI-generated suggestions are provided for assistance
                  only and must be reviewed by you before submission.
                </li>
                <li>
                  Google processes data in accordance with its
                  applicable data protection and security commitments.
                </li>
              </PolicyList>

              <h3>C. Information We Do NOT Collect</h3>
              <p>We do not collect or store:</p>

              <PolicyList>
                <li>Continuous or background location data</li>
                <li>Access to your entire photo library</li>
                <li>
                  Private messages or chat history
                  (chat functionality has been removed)
                </li>
                <li>Biometric identifiers</li>
              </PolicyList>
            </PolicySection>

            <PolicySection
              id="how-we-use-information"
              number={2}
              title="How We Use Information"
            >
              <p>We use collected information to:</p>

              <PolicyList>
                <li>
                  Create and display pet sighting reports to other users
                </li>
                <li>Enable AI-assisted description suggestions</li>
                <li>
                  Improve the functionality and reliability of the App
                </li>
                <li>Maintain safety and prevent misuse</li>
              </PolicyList>

              <p>We do not:</p>

              <PolicyList>
                <li>Sell your personal information</li>
                <li>Use your data for targeted advertising</li>
                <li>Share your data with advertisers</li>
              </PolicyList>
            </PolicySection>

            <PolicySection
              id="how-information-is-shared"
              number={3}
              title="How Information Is Shared"
            >
              <p>We may share:</p>

              <h3>With Other App Users</h3>

              <p>
                Pet sighting information (photo, description, date and
                time, and location) is visible within the App to help
                reunite pets with owners.
              </p>

              <h3>With Service Providers</h3>

              <p>
                We may share limited information with trusted
                third-party service providers who help us operate
                the App, such as cloud hosting providers and
                artificial intelligence processing providers
                (including Google for Gemini AI services).
                These providers process data solely on our behalf
                and in accordance with contractual data
                protection obligations.
              </p>

              <p>
                We do not share your personal data with unrelated
                third parties.
              </p>

              <p>We do not share your data with advertisers.</p>

              <p>We may disclose information:</p>

              <PolicyList>
                <li>To comply with legal obligations</li>
                <li>
                  To protect the rights, safety, or property
                  of SpotAPaw or others
                </li>
              </PolicyList>
            </PolicySection>

            <PolicySection
              id="data-retention"
              number={4}
              title="Data Retention"
            >
              <p>
                We retain data only as long as necessary to operate the App.
              </p>

              <PolicyList>
                <li>
                  <strong>Sighting Reports:</strong> Stored until
                  marked resolved, or deemed no longer relevant.
                </li>
                <li>
                  <strong>Uploaded Photos:</strong> Stored as part
                  of the sighting report.
                </li>
                <li>
                  <strong>AI Processing Data:</strong> Images may be
                  temporarily processed for AI analysis. Any
                  temporary processing by service providers is
                  governed by contractual safeguards.
                </li>
              </PolicyList>

              <p>
                We may retain limited information as required to
                comply with legal obligations or resolve disputes.
              </p>
            </PolicySection>

            <PolicySection
              id="permissions"
              number={5}
              title="Permissions"
            >
              <p>The App requests the following permissions:</p>

              <PolicyList>
                <li>
                  <strong>Camera &amp; Photos:</strong> Used only when
                  you choose to upload or capture a photo for a
                  sighting report.
                </li>
                <li>
                  <strong>Location:</strong> Used only at the time
                  you create a sighting report.
                </li>
              </PolicyList>

              <p>
                You may manage these permissions in the App
                or your device settings at any time.
              </p>
            </PolicySection>

            <PolicySection
              id="security"
              number={6}
              title="Security"
            >
              <p>
                We take reasonable measures to protect your data
                from unauthorized access, alteration, disclosure,
                or destruction. However, no method of transmission
                or storage is completely secure.
              </p>
            </PolicySection>

            <PolicySection
              id="childrens-privacy"
              number={7}
              title="Children's Privacy"
            >
              <p>
                Our app is not directed to children under 13.
                We do not knowingly collect personal information
                from children under 13. If we learn that we have
                collected personal information from a child under 13,
                we will delete it.
              </p>
            </PolicySection>

            <PolicySection
              id="your-rights"
              number={8}
              title="Your Rights"
            >
              <PolicyList>
                <li>
                  Request access to personal information we hold about you
                </li>
                <li>Request deletion of your information</li>
                <li>Request correction of inaccurate information</li>
              </PolicyList>

              <p>
                To exercise these rights, contact us at the email below.
              </p>
            </PolicySection>

            <PolicySection
              id="changes-to-this-policy"
              number={9}
              title="Changes to this Policy"
            >
              <p>
                We may update this Privacy Policy from time to time.
                We will notify you of significant changes by
                updating the “Effective Date” at the top of this page.
              </p>
            </PolicySection>

            <PolicySection
              id="contact-us"
              number={10}
              title="Contact Us"
            >
              <p>
                If you have questions about this Privacy Policy,
                please contact us at:
              </p>

              <a
                href="mailto:spotapaw@spotapaw.com"
                className="inline-flex items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-3 font-medium text-violet-200 transition hover:border-violet-400/50 hover:bg-violet-500/20"
              >
                <Mail className="h-5 w-5" />
                spotapaw@spotapaw.com
              </a>
            </PolicySection>
          </article>
        </div>

        {/* Footer navigation */}
        <footer className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <Link
            href="/products/spotapaw"
            className="inline-flex items-center gap-2 text-sm font-medium text-violet-300 transition hover:text-violet-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to SpotAPaw
          </Link>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <LockKeyhole className="h-4 w-4" />
            Your privacy matters.
          </div>
        </footer>
      </div>
    </main>
  );
}
