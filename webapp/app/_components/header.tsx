"use client";
import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

type HeaderLink = { href: string; label: string; };
const navLinks: HeaderLink[] = [
  { href: "/catalog",    label: "Catálogo" },
  { href: "/team",       label: "Quiénes somos" },
  { href: "/support",    label: "Soporte" },
];
const languageOptions = [{ code: "es", flag: "🇪🇸" }];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-[var(--bg-dark-blue)] text-white fixed w-full top-0 z-20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-4xl font-bold">LOGO</Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-gray-300">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right buttons */}
        <div className="flex items-center space-x-4">
          {/* idioma */}
          <button className="hidden sm:flex items-center space-x-1 hover:opacity-80">
            <span className="text-lg">{languageOptions[0].flag}</span>
          </button>

          {/* register / login */}
          <Link
            href="/?form=register"
            className="hidden sm:inline-block px-4 py-1.5 bg-white text-[var(--bg-dark-blue)] rounded-md font-medium hover:opacity-90 transition"
          >Registrarse</Link>
          <Link
            href="/?form=login"
            className="hidden sm:inline-block px-4 py-1.5 border border-white rounded-md hover:bg-white/10 transition"
          >Iniciar sesión</Link>

          {/* mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-xl"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-[var(--bg-dark-blue)] px-6 pb-6 space-y-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block text-lg hover:text-gray-300"
              onClick={() => setMobileOpen(false)}
            >{l.label}</Link>
          ))}

          {/* idiomas + botones en mobile */}
          <div className="border-t border-white/20 pt-4 space-y-3">
            <button className="flex items-center space-x-2">
              <span className="text-xl">{languageOptions[0].flag}</span>
              <span>ES</span>
            </button>
            <Link href="/?form=register" className="block px-4 py-2 bg-white text-[var(--bg-dark-blue)] rounded-md text-center">
              Registrarse
            </Link>
            <Link href="/?form=login" className="block px-4 py-2 border border-white rounded-md text-center">
              Iniciar sesión
            </Link>
          </div>
        </nav>
      )}
    </header>
)
}
