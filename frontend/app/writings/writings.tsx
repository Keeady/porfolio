"use client";

import Link from "next/link";
import { Geist, Geist_Mono, Caveat, Patrick_Hand } from "next/font/google";

/**
 * Writings list — post card. Same postcard family as ProjectCard/BioCard
 * (paper background, elevated double border) but with a dashed inner
 * border instead of solid, and handwriting fonts for a journal feel.
 */

export interface Writing {
  id: string;
  title: string;
  summary: string;
  image_url?: string;
  tags?: string[];
}

const caveat = Caveat({ weight: ["600","700"], subsets: ["latin"], variable: "--font-caveat" });
const patrickHand = Patrick_Hand({ weight: "400", subsets: ["latin"], variable: "--font-patrick" });

export function PostCard({ post }: { post: Writing }) {
  const { id, title, summary, image_url, tags } = post;

  return (
    <Link href={`/writings/${id}`} className="block">
      <div className="border-[3px] border-[#7A6A50] bg-[#f6efdd] p-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-0.5">
        <div className="border border-dashed border-[#7A6A50]/70 bg-[#F1E7D0] p-6">
          {/* title */}
          <h3 className={`mb-3 ${caveat.className} text-2xl font-bold text-[#2E2418]`}>
            {title}
          </h3>

          {/* body: optional image left, summary right */}
          <div className="flex gap-4">
            {image_url && (
              <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center border border-[#7A6A50]/50 bg-[#e9dcc0]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image_url} alt={title} className="h-full w-full object-cover" />
              </div>
            )}

            <p className={`flex-1 ${patrickHand.className} text-[1.05rem] leading-relaxed text-[#3a2f22]`}>
              {summary}
            </p>
          </div>

          {/* tags */}
          {tags && tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-[#3B5568]/40 bg-[#e4d6b8] px-2 py-0.5 font-[family-name:var(--font-patrick)] text-xs text-[#3B5568]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
