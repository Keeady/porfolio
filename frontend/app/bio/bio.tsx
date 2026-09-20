"use client";

import { ImageIcon } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Bio card — alternates photo/text sides per item, matching the
 * postcard visual system used for ProjectCard (double border, elevated,
 * dashed divider). The photo tilts toward whichever side it's on:
 * left-side photo tilts left, right-side photo tilts right.
 *
 * Fonts: same as ProjectCard — register "PT Serif" via next/font/google
 * in your root layout if you haven't already.
 */

export interface BioCardProps {
  photoSrc?: string;
  photoAlt?: string;
  imageOnLeft: boolean; // pass index % 2 === 0 from the list below
  children: ReactNode; // bio text content
}

export function BioCard({ photoSrc, photoAlt, imageOnLeft, children }: BioCardProps) {
  const tiltClass = imageOnLeft ? "-rotate-3" : "rotate-3";

  const photo = (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className={`${tiltClass} border-4 border-[#f6efdd] bg-[#e9dcc0] shadow-[0_6px_14px_rgba(0,0,0,0.3)]`}>
        <div className="flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48">
          {photoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photoSrc} alt={photoAlt ?? ""} className="h-full w-full object-cover" />
          ) : (
            <ImageIcon size={32} strokeWidth={1.5} className="text-[#7A6A50]" />
          )}
        </div>
      </div>
    </div>
  );

  const text = (
    <div className="flex flex-1 items-center p-6 sm:p-8">
      <div className="font-serif text-[0.95rem] leading-relaxed text-[#2E2418]">
        {children}
      </div>
    </div>
  );

  return (
    <div className="border-[3px] border-[#7A6A50] bg-[#f6efdd] p-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
      <div className="flex flex-col border border-[#7A6A50]/70 bg-[#F1E7D0] sm:flex-row">
        {imageOnLeft ? (
          <>
            {photo}
            <div className="hidden w-px self-stretch border-l border-dashed border-[#7A6A50]/50 sm:block" />
            {text}
          </>
        ) : (
          <>
            {text}
            <div className="hidden w-px self-stretch border-l border-dashed border-[#7A6A50]/50 sm:block" />
            {photo}
          </>
        )}
      </div>
    </div>
  );
}
