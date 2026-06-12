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
  sky: "from-sky-100 via-white to-cyan-100 text-sky-800",
  green: "from-green-100 via-white to-lime-100 text-green-800",
  orange: "from-orange-100 via-white to-amber-100 text-orange-800",
  violet: "from-violet-100 via-white to-fuchsia-100 text-violet-800",
};

export default function PageHeader({
  eyebrow,
  title,
  description,
  icon,
  tone = "sky",
}: PageHeaderProps) {
  return (
    <section className={`bg-gradient-to-br ${tones[tone]} px-4 py-12 sm:px-6 sm:py-16`}>
      <motion.div
        className="mx-auto max-w-5xl text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div className="mb-4 text-5xl" aria-hidden>
          {icon}
        </div>
        <p className="mb-3 text-sm font-black uppercase tracking-wide">{eyebrow}</p>
        <h1 className="text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg font-medium leading-8 text-slate-700 sm:text-xl">
          {description}
        </p>
      </motion.div>
    </section>
  );
}
