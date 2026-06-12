"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const decorations = [
  { icon: "🐾", left: "8%", top: "18%", delay: 0 },
  { icon: "🌿", left: "86%", top: "16%", delay: 0.3 },
  { icon: "🍎", left: "15%", top: "72%", delay: 0.6 },
  { icon: "🥩", left: "78%", top: "70%", delay: 0.9 },
  { icon: "🦋", left: "48%", top: "12%", delay: 1.2 },
  { icon: "🍃", left: "58%", top: "82%", delay: 1.5 },
];

const routes = [
  {
    href: "/introduccion",
    icon: "🌍",
    title: "Aprende",
    text: "Qué significa alimentarse",
    className: "border-green-300 bg-green-50",
  },
  {
    href: "/tipos",
    icon: "📚",
    title: "Conoce",
    text: "Los 3 grupos principales",
    className: "border-amber-300 bg-amber-50",
  },
  {
    href: "/animales",
    icon: "🔎",
    title: "Explora",
    text: "Animales con imágenes locales",
    className: "border-sky-300 bg-sky-50",
  },
  {
    href: "/juego",
    icon: "🎮",
    title: "Juega",
    text: "Clasifica modelos 3D",
    className: "border-violet-300 bg-violet-50",
  },
];

export default function HeroSection() {
  return (
    <main className="overflow-hidden">
      <section className="relative min-h-[calc(100vh-92px)] bg-gradient-to-br from-sky-300 via-amber-200 to-emerald-300 px-4 py-12 sm:px-6">
        {decorations.map((item) => (
          <motion.span
            key={`${item.icon}-${item.left}`}
            className="absolute text-4xl drop-shadow-sm sm:text-5xl"
            style={{ left: item.left, top: item.top }}
            aria-hidden
            animate={{ y: [0, -14, 0], rotate: [-4, 5, -4] }}
            transition={{
              duration: 4,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {item.icon}
          </motion.span>
        ))}

        <div className="absolute left-0 top-14 h-24 w-40 rounded-r-full bg-white/35 blur-sm" />
        <div className="absolute right-0 top-28 h-28 w-56 rounded-l-full bg-white/30 blur-sm" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-188px)] max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="mb-4 inline-flex rounded-full bg-white/85 px-4 py-2 text-sm font-black uppercase tracking-wide text-emerald-700 shadow-sm">
              Aventura educativa para niños
            </p>
            <h1 className="max-w-3xl text-5xl font-black leading-none text-slate-950 drop-shadow-sm sm:text-6xl lg:text-7xl">
              Aprendamos qué comen los animales
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-extrabold leading-8 text-slate-800 sm:text-2xl">
              Descubre si un animal es carnívoro, herbívoro u omnívoro.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/introduccion"
                  className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-4 text-lg font-black text-white shadow-xl transition hover:bg-orange-600"
                >
                  🚀 Comenzar aventura
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/juego"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-lg font-black text-violet-700 shadow-xl transition hover:bg-violet-50"
                >
                  🎮 Ir al juego
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="grid gap-4 sm:grid-cols-2"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          >
            {routes.map((route) => (
              <motion.div
                key={route.href}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={route.href}
                  className={`block min-h-44 rounded-[28px] border-4 p-5 shadow-lg ${route.className}`}
                >
                  <span className="text-5xl" aria-hidden>
                    {route.icon}
                  </span>
                  <span className="mt-4 block text-2xl font-black text-slate-950">
                    {route.title}
                  </span>
                  <span className="mt-2 block text-base font-bold leading-6 text-slate-700">
                    {route.text}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
