"use client";

import { Home, Briefcase, User, PenSquare } from "lucide-react";
import Image from "next/image";

/**
 * Sticky site header.
 * Requires: lucide-react (`npm install lucide-react`)
 * Requires: Tailwind CSS configured in the host Next.js project.
 *
 * Two explicit sections:
 * Left  : avatar placeholder + "Brianna B." — left-aligned
 * Right : nav links (icon + label) with an "Open to Work" status pill — right-aligned
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
  return (
    <header className="sticky top-0 z-50 border-b border-sky-950/60 bg-[#040B14]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center px-6 py-3.5">
        {/* Left section: avatar + title, left-aligned */}
        <div className="flex flex-1 items-center justify-start gap-3.5">
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

        {/* Right section: nav, right-aligned */}
        <nav className="flex flex-1 items-center justify-end gap-7">
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
      </div>
    </header>
  );
}
