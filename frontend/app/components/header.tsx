"use client";

import { Home, Briefcase, User, PenSquare, Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

/**
 * Sticky site header.
 * Requires: lucide-react (`npm install lucide-react`) — for generic icons only.
 * lucide-react v1 removed brand logos (Github, Linkedin, etc.), so GitHub
 * and LinkedIn are hand-rolled inline SVGs below instead.
 * Requires: Tailwind CSS configured in the host Next.js project.
 *
 * Two explicit sections:
 * Left  : avatar placeholder + "Camaria B." — left-aligned
 * Right : nav links (icon + label) — LinkedIn/GitHub are paired,
 *         with an "Open to Work" status pill anchored beneath them —
 *         right-aligned
 *
 * Responsive: below the `md` breakpoint (768px) the right section
 * collapses into a hamburger button. Tapping it opens a stacked
 * mobile panel with the same links directly beneath the header.
 */

const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Projects", href: "/projects", icon: Briefcase },
  { label: "Bio", href: "/bio", icon: User },
  { label: "Writings", href: "/writings", icon: PenSquare },
];

function NavLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-2 text-[0.9rem] font-medium text-slate-300 transition-colors hover:text-sky-300"
    >
      <Icon size={17} strokeWidth={2} />
      <span>{label}</span>
    </a>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sky-950/60 bg-[#040B14]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center px-6 py-3.5">
        {/* Left section: avatar + title, left-aligned */}
        <div className="flex items-center justify-start gap-3.5">
          <div className="relative flex h-10 w-10 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-sky-500/25 blur-md" />
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-sky-400/60 bg-gradient-to-br from-sky-500 to-blue-700 text-sm font-semibold text-white">
              <Image
                src="/initials-512x512.png"
                alt="Camaria Bevavy initials"
                width={40}
                height={40}
              />
            </span>
          </div>
          <span className="text-[0.95rem] font-semibold text-slate-100">
            Camaria B.
          </span>
        </div>

        {/* Right section: nav, right-aligned — hidden below md */}
        <nav className="hidden flex-1 items-center justify-end gap-7 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.label} {...link} />
          ))}

          {/* Status pill */}
          <div className="flex flex-col items-center gap-1.5">
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[0.68rem] font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Open to Work
            </span>
          </div>
        </nav>

        {/* Hamburger button — only visible below md */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex flex-1 h-9 w-9 items-center justify-end text-slate-200 md:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile panel — stacked links, shown only when open, only below md */}
      {menuOpen && (
        <nav className="flex flex-col gap-4 border-t border-sky-950/60 bg-[#040B14] px-6 py-5 md:hidden items-center">
          {navLinks.map((link) => (
            <NavLink key={link.label} {...link} />
          ))}

          <span className="flex w-fit items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[0.68rem] font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Open to Work
          </span>
        </nav>
      )}
    </header>
  );
}
