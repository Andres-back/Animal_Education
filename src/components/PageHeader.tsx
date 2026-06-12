"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  icon: string;
  tone?: "sky" | "green" | "orange" | "violet";
}

const tones = {
  sky: {
    gradient: "from-sky-200 via-cyan-50 to-emerald-100",
    badge: "bg-sky-600 text-white",
    accent: "bg-sky-400",
  },
  green: {
    gradient: "from-emerald-200 via-lime-50 to-amber-100",
    badge: "bg-emerald-600 text-white",
    accent: "bg-emerald-400",
  },
  orange: {
    gradient: "from-amber-200 via-orange-50 to-emerald-100",
    badge: "bg-orange-500 text-white",
    accent: "bg-amber-400",
  },
  violet: {
    gradient: "from-violet-200 via-fuchsia-50 to-sky-100",
    badge: "bg-violet-600 text-white",
    accent: "bg-violet-400",
  },
};

const floatingMarks = ["🐾", "🌿", "🍎", "🦁", "🦋", "🍃"];

export default function PageHeader({
  eyebrow,
  title,
  description,
  icon,
  tone = "sky",
}: PageHeaderProps) {
  const style = tones[tone];

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br ${style.gradient} px-4 py-12 sm:px-6 sm:py-16`}>
      <div className="animal-pattern absolute inset-0 opacity-35" aria-hidden />
      <div className="jungle-ridge absolute bottom-0 left-0 h-16 w-full bg-emerald-700/12" aria-hidden />
      {floatingMarks.map((mark, index) => (
        <motion.span
          key={`${mark}-${index}`}
          className="absolute hidden text-3xl opacity-35 sm:block"
          style={{
            left: `${8 + index * 16}%`,
            top: `${18 + (index % 2) * 48}%`,
          }}
          animate={{ y: [0, -10, 0], rotate: [-5, 6, -5] }}
          transition={{ duration: 4 + index * 0.2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          {mark}
        </motion.span>
      ))}

      <motion.div
        className="relative z-10 mx-auto max-w-5xl text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-[30px] bg-white text-5xl shadow-xl ring-4 ring-white/70">
          {icon}
        </div>
        <p className={`mx-auto mb-3 w-fit rounded-full px-4 py-2 text-sm font-black uppercase tracking-wide shadow-md ${style.badge}`}>
          {eyebrow}
        </p>
        <h1 className="text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg font-extrabold leading-8 text-slate-700 sm:text-xl">
          {description}
        </p>
        <div className={`mx-auto mt-7 h-2 w-40 rounded-full ${style.accent}`} aria-hidden />
      </motion.div>
    </section>
  );
}
