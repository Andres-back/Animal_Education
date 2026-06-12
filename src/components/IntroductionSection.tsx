"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const learningIdeas = [
  {
    icon: "⚡",
    title: "Energía",
    text: "La comida ayuda a correr, nadar, volar, jugar y mantenerse despiertos.",
  },
  {
    icon: "🌱",
    title: "Crecimiento",
    text: "Al alimentarse bien, los animales crecen y fortalecen su cuerpo.",
  },
  {
    icon: "🏡",
    title: "Lugar donde viven",
    text: "Cada hábitat ofrece alimentos diferentes: selvas, mares, bosques o granjas.",
  },
  {
    icon: "👀",
    title: "Observación",
    text: "Podemos mirar dientes, pico, patas y costumbres para imaginar qué comen.",
  },
];

export default function IntroductionSection() {
  return (
    <section className="leaf-pattern bg-white px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
        >
          <div className="relative overflow-hidden rounded-[34px] border-4 border-emerald-300 bg-white p-7 shadow-xl">
            <div className="animal-pattern absolute inset-0 opacity-20" aria-hidden />
            <div className="relative">
              <div className="mb-5 text-6xl" aria-hidden>
                🧭
              </div>
              <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">
                Antes de clasificar, aprendamos a observar
              </h2>
              <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">
                Todos los animales buscan alimento para vivir. La clave es mirar su
                cuerpo, su hogar y sus hábitos: esas pistas nos ayudan a entender
                por qué cada animal come cosas distintas.
              </p>
              <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">
                En la siguiente vista verás las láminas completas con los grupos de
                alimentación. Aquí nos enfocamos en preparar la mirada de explorador.
              </p>
              <Link
                href="/tipos"
                className="mt-7 inline-flex rounded-full bg-emerald-600 px-6 py-3 text-base font-black text-white shadow-md transition hover:bg-emerald-700"
              >
                Ver láminas de alimentación
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {learningIdeas.map((idea, index) => (
              <motion.article
                key={idea.title}
                className="rounded-[28px] border-4 border-sky-200 bg-white/95 p-5 shadow-lg"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.12 }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <div className="text-5xl" aria-hidden>
                  {idea.icon}
                </div>
                <h3 className="mt-4 text-2xl font-black text-slate-950">
                  {idea.title}
                </h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                  {idea.text}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
