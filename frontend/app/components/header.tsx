
"use client";

import {
  Home,
  Layers3,
  Code2,
  User,
  PenSquare,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Products", href: "/products", icon: Layers3 },
  { label: "Services", href: "/services", icon: Code2 },
  { label: "About", href: "/bio", icon: User },
  { label: "Writings", href: "/writings", icon: PenSquare },
];

type NavLinkProps = {
  href: string;
  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
  }>;
  label: string;
  active: boolean;
  onClick?: () => void;
};

function NavLink({
  href,
  icon: Icon,
  label,
  active,
  onClick,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`group flex items-center gap-2 text-[0.9rem]
        font-medium transition-colors
        ${
          active
            ? "text-sky-400"
            : "text-slate-300 hover:text-sky-300"
        }`}
    >
      <Icon size={17} strokeWidth={2} />
      <span>{label}</span>
    </Link>
  );
}

function ContactButton({
  onClick,
  mobile = false,
}: {
  onClick?: () => void;
  mobile?: boolean;
}) {
  return (
    <Link
      href="/contact"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2
        rounded-full border border-sky-500/40
        bg-sky-500/10 px-4 py-2 text-sm font-medium
        text-sky-300 transition-all duration-200
        hover:border-sky-400 hover:bg-sky-500/20
        hover:text-sky-200
        ${mobile ? "w-full" : ""}`}
    >
      Let's Talk
      <ArrowUpRight size={15} strokeWidth={2} />
    </Link>
  );
}

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex shrink-0 items-center gap-3"
      aria-label="Restless Moon Studio home"
    >
      {/* Moon icon */}
      <div className="flex h-[56px] w-[56px] items-center justify-center rounded-2xl bg-[#0B2740] sm:h-[64px] sm:w-[64px]">
        <Image
          src="/moon.png"
          alt="Restless Moon Studio logo"
          width={64}
          height={64}
          priority
        />
      </div>

      {/* Brand text */}
      <div className="flex flex-col leading-none">
        <span className="text-xl font-semibold tracking-tight text-white sm:text-[2rem]">
          Restless Moon
        </span>
        <span className="mt-2 text-[0.62rem] font-medium uppercase tracking-[0.42em] text-sky-400 sm:text-[0.82rem]">
          Software Studio
        </span>
      </div>
    </Link>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href ||
        pathname.startsWith(`${href}/`);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sky-950/60 bg-[#040B14]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        {/* Left brand */}
        <Brand onClick={closeMenu} />

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center justify-end gap-5 lg:flex"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              {...link}
              active={isActive(link.href)}
            />
          ))}

          <div className="ml-2">
            <ContactButton />
          </div>
        </nav>

        {/* Mobile / tablet hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="flex h-9 w-9 items-center justify-center text-slate-200 transition-colors hover:text-sky-300 lg:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile / tablet navigation */}
      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="flex flex-col gap-5 border-t border-sky-950/60 bg-[#040B14] px-6 py-6 lg:hidden"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              {...link}
              active={isActive(link.href)}
              onClick={closeMenu}
            />
          ))}

          <div className="border-t border-sky-950/60 pt-4">
            <ContactButton
              mobile
              onClick={closeMenu}
            />
          </div>
        </nav>
      )}
    </header>
  );
}
