
import Link from "next/link";
import { ArrowUpRight, BookOpen, Code2 } from "lucide-react";

export interface Writing {
  id: string;
  title: string;
  summary: string;
  image_url?: string;
  tags?: string[];
}

export function PostCard({ post }: { post: Writing }) {
  const { id, title, summary, image_url, tags } = post;

  return (
    <Link
      href={`/writings/${id}`}
      className="group block h-full rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-violet-500/[0.06] hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 sm:p-6"
    >
      <article className="flex h-full flex-col">
        <div className="flex flex-col gap-5 sm:flex-row">
          {/* Article thumbnail */}
          <div className="relative flex h-40 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-violet-900/60 via-purple-950 to-indigo-950 sm:h-32 sm:w-32">
            {image_url ? (
              // Replace with next/image if your image domains
              // are configured in next.config.ts.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image_url}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <Code2
                className="h-10 w-10 text-violet-300/70"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-violet-400">
              <BookOpen className="h-3.5 w-3.5" />
              Engineering Notes
            </div>

            <h3 className="text-xl font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-violet-200">
              {title}
            </h3>

            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400">
              {summary}
            </p>
          </div>
        </div>

        <div className="mt-auto pt-6">
          {tags && tags.length > 0 && (
            <div className="mb-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-violet-400/15 bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <span className="text-sm font-medium text-violet-300">
              Read article
            </span>
            <ArrowUpRight className="h-4 w-4 text-violet-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>
      </article>
    </Link>
  );
}
