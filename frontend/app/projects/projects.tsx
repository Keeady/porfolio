"use client";

import { Building2, ImageIcon } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Old-style postcard project card.
 *
 * Fonts: add to your root layout via next/font/google —
 *   import { Special_Elite, PT_Serif, Courier_Prime } from "next/font/google";
 *   const typewriter = Special_Elite({ weight: "400", subsets: ["latin"], variable: "--font-typewriter" });
 *   const serif = PT_Serif({ weight: ["400","700"], subsets: ["latin"], variable: "--font-serif" });
 *   const mono = Courier_Prime({ weight: "700", subsets: ["latin"], variable: "--font-mono-stamp" });
 * then add the three variable classNames to <html> or <body>, and reference
 * them below via Tailwind's font-[family-name:var(--font-x)] or a config entry.
 * For a quick start without config, replace the font-[...] classes with
 * font-serif / font-mono as placeholders — the layout still works.
 */

export interface ProjectCardProps {
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
  image_url?: string;
  companyIcon?: ReactNode;
}

export default function ProjectCard({
  title,
  subtitle,
  description,
  skills,
  image_url,
  companyIcon,
}: ProjectCardProps) {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      {/* the "stamp" — affixed top-right, perforation via dashed border, slight rotation */}
      <div className="absolute -right-3 -top-4 z-10 flex h-16 w-14 rotate-[7deg] items-center justify-center border-2 border-dashed border-[#3B5568] bg-[#f6efdd] shadow-sm">
        <div className="flex h-full w-full items-center justify-center border border-[#3B5568]/40 m-1">
          {companyIcon ?? (
            <Building2 size={20} strokeWidth={1.5} className="text-[#3B5568]" />
          )}
        </div>
      </div>

      {/* outer + inner border = the "two borders" raised postcard frame */}
      <div className="border-[3px] border-[#7A6A50] bg-[#f6efdd] p-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
        <div className="border border-[#7A6A50]/70 bg-[#F1E7D0] px-6 pb-6 pt-7">
          {/* header: title + subtitle, centered */}
          <div className="text-center">
            <h3 className="font-serif text-xl font-bold tracking-tight text-[#2E2418]">
              {title}
            </h3>
            <p className="mt-1 font-serif italic text-sm text-[#5c4f3d]">
              {subtitle}
            </p>
          </div>

          {/* dashed divider — mirrors a real postcard's message/address rule */}
          <div className="my-5 border-t border-dashed border-[#7A6A50]/60" />

          {/* body: left image, right (description over skills) */}
          <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
            {/* left: image placeholder */}
            <div className="flex h-40 w-40 items-center justify-center flex-shrink-0 border border-[#7A6A50]/60 bg-[#e9dcc0]">
              {image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image_url}
                  alt={title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <ImageIcon
                  size={28}
                  strokeWidth={1.5}
                  className="text-[#7A6A50]"
                />
              )}
            </div>

            {/* right: dashed vertical rule, then top/bottom split */}
            <div className="flex flex-col sm:border-l border-dashed border-[#7A6A50]/60 pl-5">
              <p className="font-serif text-[0.9rem] leading-relaxed text-[#2E2418]">
                {description}
              </p>

              <div className="my-4 border-t border-dashed border-[#7A6A50]/50" />

              <div className="flex flex-wrap gap-1.5">
                {skills &&
                  skills.map((skill) => (
                    <span
                      key={skill}
                      className="border border-[#3B5568]/40 bg-[#e4d6b8] px-2 py-0.5 font-mono text-[0.65rem] font-bold uppercase tracking-wide text-[#3B5568]"
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
