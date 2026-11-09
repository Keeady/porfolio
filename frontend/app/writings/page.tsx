import { getWritings } from "@/api/writings";
import { PostCard, Writing } from "./writings";
import ErrorView from "../components/error-view";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default async function Writings() {
  const writings: Writing[] = await getWritings();

  if (!writings || writings.length === 0) {
    return (
      <ErrorView
        code="404"
        title="Page not found ..."
        message="The page you're looking for doesn't exist or has been moved."
      >
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://linkedin.com/in/camariabevavy"
          className="inline-flex gap-2 items-center justify-center rounded-full bg-sky-400 px-7 py-3 text-sm font-semibold text-[#040B14] transition-all hover:scale-[1.03] hover:bg-sky-300"
        >
          Checkout my posts on LinkedIn
          <ExternalLink className="h-4 w-4" />
        </Link>
      </ErrorView>
    );
  }

  return (
    <main className="min-h-screen bg-[#100d22] px-5 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-3xl py-16 text-center md:py-24">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
            Notes from the Studio
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Thoughts on
            <span className="block text-violet-300">building software.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            Engineering lessons, technical deep dives, and ideas from behind the
            scenes.
          </p>
        </header>
        <section
          aria-label="Articles"
          className="grid gap-6 pb-24 lg:grid-cols-2"
        >
          {writings.map((post: Writing) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      </div>
    </main>
  );
}
