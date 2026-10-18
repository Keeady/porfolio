
"use client";

import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export type ProductImage = {
  src: string;
  alt: string;
};

export type ProductLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type Product = {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  images: ProductImage[];
  features: string[];
  skills?: string[];
  primary_link?: ProductLink;
  secondary_link?: ProductLink;
  image_url?: string;
};

type ProductShowcaseProps = {
  product: Product;
  reverse?: boolean;
};

export default function ProductShowcase({
  product,
  reverse = false,
}: ProductShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const images = product.images ?? [];
  const count = images.length;
  const activeImage = images[activeIndex];

  const next = useCallback(() => {
    if (count === 0) return;
    setActiveIndex((index) => (index + 1) % count);
  }, [count]);

  const previous = useCallback(() => {
    if (count === 0) return;
    setActiveIndex((index) => (index - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
    };

    document.addEventListener("keydown", onKeyDown);
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = oldOverflow;
    };
  }, [lightboxOpen, next, previous]);

  // Reset the gallery when the product changes.
  useEffect(() => {
    setActiveIndex(0);
    setLightboxOpen(false);
  }, [product.id]);

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image gallery */}
        <div
          className={`min-w-0 bg-gradient-to-br from-sky-50 via-blue-50 to-slate-100 p-5 sm:p-8 lg:p-10 ${
            reverse ? "lg:order-2" : ""
          }`}
        >
          {activeImage ? (
            <div className="space-y-4">
              <div className="group relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl bg-white/50">
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="relative h-full w-full cursor-zoom-in"
                  aria-label={`Enlarge ${activeImage.alt}`}
                >
                  <Image
                    key={activeImage.src}
                    src={activeImage.src}
                    alt={activeImage.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </button>

                {count > 1 && (
                  <>
                    <GalleryArrow
                      direction="previous"
                      onClick={previous}
                    />
                    <GalleryArrow
                      direction="next"
                      onClick={next}
                    />
                  </>
                )}

                <div className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs text-slate-600 shadow-sm">
                  {activeIndex + 1} / {count}
                </div>
              </div>

              {/* Horizontal thumbnails */}
              {count > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={`${image.src}-${index}`}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`View image ${index + 1}: ${image.alt}`}
                      aria-pressed={index === activeIndex}
                      className={`relative aspect-[9/16] w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all sm:w-20 ${
                        index === activeIndex
                          ? "border-sky-600 ring-2 ring-sky-200"
                          : "border-transparent opacity-65 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex aspect-[4/5] items-center justify-center text-sm text-slate-400">
              No product images
            </div>
          )}
        </div>

        {/* Product details */}
        <div
          className={`flex flex-col justify-center p-6 sm:p-10 lg:p-12 xl:p-16 ${
            reverse ? "lg:order-1" : ""
          }`}
        >
          <div className="mb-5">
            <span className="inline-flex rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky-700">
              {product.category}
            </span>
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {product.title}
          </h2>

          <p className="mt-4 text-xl font-medium text-slate-700">
            {product.tagline}
          </p>

          <p className="mt-5 text-base leading-8 text-slate-600">
            {product.description}
          </p>

          {product.features?.length > 0 && (
            <div className="mt-8 border-t border-slate-100 pt-7">
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-900">
                Key Features
              </h3>

              <ul className="grid gap-4 sm:grid-cols-2">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-slate-700"
                  >
                    <span className="mt-0.5 rounded-full bg-sky-100 p-1 text-sky-700">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!!product.skills?.length && (
            <div className="mt-8">
              <h3 className="mb-3 text-sm font-semibold text-slate-900">
                Technologies
              </h3>

              <div className="flex flex-wrap gap-2">
                {product.skills.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            {product.primary_link && (
              <ProductAction
                link={product.primary_link}
                primary
              />
            )}

            {product.secondary_link && (
              <ProductAction link={product.secondary_link} />
            )}
          </div>
        </div>
      </div>

      {/* Full-screen image viewer */}
      {lightboxOpen && activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${product.title} image gallery`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-6"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-5 top-5 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            aria-label="Close image gallery"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            className="relative h-[85vh] w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              key={activeImage.src}
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />

            {count > 1 && (
              <>
                <GalleryArrow
                  direction="previous"
                  onClick={previous}
                  lightbox
                />
                <GalleryArrow
                  direction="next"
                  onClick={next}
                  lightbox
                />
              </>
            )}
          </div>

          <span className="absolute bottom-6 text-sm text-white/70">
            {activeIndex + 1} of {count}
          </span>
        </div>
      )}
    </article>
  );
}

function GalleryArrow({
  direction,
  onClick,
  lightbox = false,
}: {
  direction: "previous" | "next";
  onClick: () => void;
  lightbox?: boolean;
}) {
  const isPrevious = direction === "previous";
  const Icon = isPrevious ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrevious ? "Previous image" : "Next image"}
      className={`absolute top-1/2 z-10 -translate-y-1/2 rounded-full p-2.5 shadow-md transition-colors ${
        isPrevious ? "left-3" : "right-3"
      } ${
        lightbox
          ? "bg-white/15 text-white hover:bg-white/30"
          : "bg-white/90 text-slate-800 hover:bg-white"
      }`}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

function ProductAction({
  link,
  primary = false,
}: {
  link: ProductLink;
  primary?: boolean;
}) {
  const Icon = link.external ? ExternalLink : ArrowUpRight;

  return (
    <a
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-colors ${
        primary
          ? "bg-slate-900 text-white hover:bg-slate-700"
          : "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
      }`}
    >
      {link.label}
      <Icon className="h-4 w-4" />
    </a>
  );
}
