"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Inicio", icon: "🏠" },
  { href: "/introduccion", label: "Explorar", icon: "🧭" },
  { href: "/tipos", label: "Láminas", icon: "📚" },
  { href: "/animales", label: "Galería", icon: "🔎" },
  { href: "/juego", label: "Reto 3D", icon: "🎮" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b-4 border-emerald-300 bg-white/90 shadow-lg shadow-emerald-900/5 backdrop-blur-xl">
      <div className="animal-pattern absolute inset-0 opacity-30" aria-hidden />
      <div className="relative mx-auto flex max-w-[1800px] flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 text-slate-900"
          aria-label="Ir al inicio"
        >
          <span className="relative grid h-12 w-12 place-items-center rounded-[20px] bg-gradient-to-br from-emerald-500 to-lime-400 text-2xl shadow-lg ring-4 ring-white">
            🐾
            <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-amber-400 text-xs">
              3D
            </span>
          </span>
          <span>
            <span className="block text-xl font-black leading-tight sm:text-2xl">
              Aventura Animal
            </span>
            <span className="block text-xs font-black uppercase tracking-wide text-emerald-700">
              Exploradores de la alimentación
            </span>
          </span>
        </Link>

        <nav
          className="flex gap-2 overflow-x-auto pb-1 lg:pb-0"
          aria-label="Secciones principales"
        >
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex shrink-0 items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-extrabold transition ${
                  active
                    ? "border-slate-900 bg-slate-900 text-white shadow-md"
                    : "border-emerald-100 bg-white/85 text-slate-700 hover:border-amber-300 hover:bg-amber-100 hover:text-slate-950"
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
