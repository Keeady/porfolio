
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { ReactNode } from "react";

export type BioItem = {
  id: string;
  image_url?: string;
  photo_alt?: string;
  description: string;
};

export interface BioCardProps {
  photoSrc?: string;
  photoAlt?: string;
  imageOnLeft: boolean;
  children: ReactNode;
}

export function BioCard({
  photoSrc,
  photoAlt,
  imageOnLeft,
  children,
}: BioCardProps) {
  const photo = (
    <div className="relative flex w-full h-full min-h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-violet-900/40 via-purple-900/20 to-indigo-950/50 p-6 sm:min-h-80 sm:p-10">
      {/* Soft decorative glow */}
      <div className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full bg-violet-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative aspect-square w-full items-center justify-center  overflow-hidden rounded-2xl border border-white/10 bg-violet-950/50 shadow-[0_16px_48px_rgba(0,0,0,0.25)] transition-transform duration-500 group-hover:scale-[1.025]">
        {photoSrc ? (
          <Image
            src={photoSrc}
            alt={photoAlt ?? ""}
            fill
            sizes="(max-width: 640px) 256px, 320px"
            className="object-contain"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ImageIcon
              size={42}
              strokeWidth={1.25}
              className="text-violet-300/50"
            />
          </div>
        )}
      </div>
    </div>
  );

  const text = (
    <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
      <div className="max-w-lg space-y-4 text-base leading-relaxed text-slate-300 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-white [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_strong]:font-semibold [&_strong]:text-violet-200 [&_a]:text-violet-300 [&_a]:underline-offset-4 hover:[&_a]:underline">
        {children}
      </div>
    </div>
  );

  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition-colors duration-300 hover:border-violet-400/30 hover:bg-white/[0.06]">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className={imageOnLeft ? "sm:order-1" : "sm:order-2"}>
          {photo}
        </div>

        <div className={imageOnLeft ? "sm:order-2" : "sm:order-1"}>
          {text}
        </div>
      </div>
    </article>
  );
}
