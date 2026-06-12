"use client";

import Image from "next/image";
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

const heroAnimals = [
  { name: "León", image: "/imagenes/carnivoro/JAGUAR.png", badge: "Observa" },
  { name: "Koala", image: "/imagenes/hervivoro/koala.png", badge: "Explora" },
  { name: "Pato", image: "/imagenes/omnivoro/pato.png", badge: "Clasifica" },
];

const routes = [
  {
    href: "/introduccion",
    icon: "🧭",
    title: "Aprende",
    text: "Descubre cómo observar pistas",
    className: "border-green-300 bg-green-50",
  },
  {
    href: "/tipos",
    icon: "📚",
    title: "Láminas",
    text: "Lee imágenes grandes y claras",
    className: "border-amber-300 bg-amber-50",
  },
  {
    href: "/animales",
    icon: "🔎",
    title: "Galería",
    text: "Explora animales por grupo",
    className: "border-sky-300 bg-sky-50",
  },
  {
    href: "/juego",
    icon: "🎮",
    title: "Reto 3D",
    text: "Arrastra y clasifica modelos",
    className: "border-violet-300 bg-violet-50",
  },
];

export default function HeroSection() {
  return (
    <main className="overflow-hidden">
      <section className="relative min-h-[calc(100vh-92px)] bg-gradient-to-br from-sky-300 via-amber-200 to-emerald-300 px-4 py-10 sm:px-6 lg:py-14">
        <div className="animal-pattern absolute inset-0 opacity-35" aria-hidden />
        <div className="jungle-ridge absolute bottom-0 left-0 h-32 w-full bg-emerald-800/15" aria-hidden />

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

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-188px)] max-w-[1800px] items-center gap-10 lg:grid-cols-[1fr_0.92fr]">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="mb-4 inline-flex rounded-full bg-white/90 px-4 py-2 text-sm font-black uppercase tracking-wide text-emerald-700 shadow-sm ring-2 ring-white">
              🐾 Aventura educativa para niños
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-none text-slate-950 drop-shadow-sm sm:text-6xl lg:text-7xl">
              Aprendamos qué comen los animales
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-extrabold leading-8 text-slate-800 sm:text-2xl">
              Una expedición visual para observar, comparar y clasificar animales.
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
                  🎮 Ir al reto 3D
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="grid gap-5"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          >
            <div className="grid gap-4 sm:grid-cols-3">
              {heroAnimals.map((animal, index) => (
                <motion.div
                  key={animal.name}
                  className="overflow-hidden rounded-[30px] border-4 border-white bg-white/90 shadow-xl"
                  animate={{ y: [0, index % 2 === 0 ? -8 : 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.25 }}
                >
                  <div className="relative aspect-square bg-gradient-to-b from-lime-100 to-sky-100">
                    <Image
                      src={animal.image}
                      alt={animal.name}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 33vw, 220px"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
                      {animal.badge}
                    </p>
                    <p className="text-lg font-black text-slate-950">{animal.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {routes.map((route) => (
                <motion.div
                  key={route.href}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={route.href}
                    className={`block min-h-36 rounded-[28px] border-4 p-5 shadow-lg transition hover:shadow-xl ${route.className}`}
                  >
                    <span className="text-4xl" aria-hidden>
                      {route.icon}
                    </span>
                    <span className="mt-3 block text-2xl font-black text-slate-950">
                      {route.title}
                    </span>
                    <span className="mt-1 block text-base font-bold leading-6 text-slate-700">
                      {route.text}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
