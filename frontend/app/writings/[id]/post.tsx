
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Code2,
  ExternalLink,
} from "lucide-react";

export interface WritingWithBodies {
  id: string;
  title: string;
  summary: string;
  image_url?: string;
  tags?: string[];
  bodies: WritingBody[];
}

export interface WritingBody {
  id: string;
  header?: string;
  content: string;
  content_type?: string;
  url?: string;
}

function BodyBlock({ body }: { body: WritingBody }) {
  const { header, content, content_type, url } = body;

  return (
    <section className="mb-9 last:mb-0">
      {header && (
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-white md:text-2xl">
          {header}
        </h2>
      )}

      {content_type === "code" ? (
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1020]">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <Code2 className="h-4 w-4 text-violet-400" />
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Code
            </span>
          </div>

          <pre className="overflow-x-auto p-5 text-sm leading-7 text-violet-100">
            <code className="font-mono">{content}</code>
          </pre>
        </div>
      ) : content_type === "image" && url ? (
        <figure className="space-y-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt={content || header || "Article illustration"}
            loading="lazy"
            className="h-auto w-full rounded-xl border border-white/10 object-contain"
          />
          {content && (
            <figcaption className="text-center text-sm text-slate-400">
              {content}
            </figcaption>
          )}
        </figure>
      ) : (
        <p className="whitespace-pre-line text-base leading-8 text-slate-300 md:text-[1.0625rem]">
          {content}
        </p>
      )}

      {url && content_type !== "image" && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-violet-300 hover:text-violet-200"
        >
          Related resource
          <ExternalLink className="h-4 w-4" />
        </a>
      )}
    </section>
  );
}

export default function PostDetail({
  post,
}: {
  post: WritingWithBodies;
}) {
  const { title, summary, image_url, tags, bodies } = post;

  return (
    <main className="min-h-screen bg-[#100d22] px-5 py-12 text-white md:px-8 md:py-20">
      <article className="mx-auto max-w-4xl">
        {/* Back navigation */}
        <Link
          href="/writings"
          className="mb-12 inline-flex items-center gap-2 text-sm font-medium text-violet-300 transition hover:text-violet-200"
        >
          <ArrowLeft className="h-4 w-4" />
          All Writings
        </Link>

        {/* Article header */}
        <header className="mb-12 text-center">
          <div className="mb-5 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
            <BookOpen className="h-4 w-4" />
            Engineering Journal
          </div>

          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-white md:text-5xl md:leading-tight">
            {title}
          </h1>

          {summary && (
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
              {summary}
            </p>
          )}

          {tags && tags.length > 0 && (
            <div className="mt-7 flex flex-wrap justify-center gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Featured image */}
        {image_url && (
          <div className="mb-8 overflow-hidden rounded-2xl border border-white/10 bg-violet-950/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image_url}
              alt={title}
              className="mx-auto max-h-[450px] w-full object-contain"
            />
          </div>
        )}

        {/* Reading surface */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-8 sm:px-10 sm:py-12 md:px-14">
          <div>
            {bodies.map((body) => (
              <BodyBlock key={body.id} body={body} />
            ))}
          </div>
        </div>

        {/* Footer navigation */}
        <footer className="mt-12 border-t border-white/10 pt-8">
          <Link
            href="/writings"
            className="inline-flex items-center gap-2 font-medium text-violet-300 transition hover:text-violet-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all writings
          </Link>
        </footer>
      </article>
    </main>
  );
}
