"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Inicio", icon: "🏠" },
  { href: "/introduccion", label: "Alimentación", icon: "🌱" },
  { href: "/tipos", label: "Tipos", icon: "📚" },
  { href: "/animales", label: "Animales", icon: "🔎" },
  { href: "/juego", label: "Juego", icon: "🎮" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b-4 border-amber-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 text-slate-900"
          aria-label="Ir al inicio"
        >
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-500 text-2xl shadow-md">
            🐾
          </span>
          <span>
            <span className="block text-lg font-black leading-tight sm:text-xl">
              Aventura Animal
            </span>
            <span className="block text-xs font-bold uppercase tracking-wide text-emerald-700">
              Plataforma educativa
            </span>
          </span>
        </Link>

        <nav className="flex gap-2 overflow-x-auto pb-1 lg:pb-0" aria-label="Secciones principales">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold transition ${
                  active
                    ? "bg-sky-600 text-white shadow-md"
                    : "bg-sky-50 text-slate-700 hover:bg-amber-100 hover:text-slate-950"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <span aria-hidden>{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
