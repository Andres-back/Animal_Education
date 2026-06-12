"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Animal, AnimalCategory } from "@/data/animals";

interface AnimalCardProps {
  animal: Animal;
  category: AnimalCategory;
}

export default function AnimalCard({ animal, category }: AnimalCardProps) {
  return (
    <motion.article
      className={`overflow-hidden rounded-[26px] border-4 bg-white shadow-md ${category.borderClass}`}
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      <div className={`relative aspect-square ${category.softBgClass}`}>
        <Image
          src={animal.image}
          alt={animal.name}
          fill
          className="object-contain p-3"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 18vw"
        />
      </div>
      <div className="p-4">
        <h4 className="min-h-12 text-lg font-black leading-6 text-slate-950">
          {animal.name}
        </h4>
        <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-black ${category.badgeClass}`}>
          {category.label}
        </span>
        <p className="mt-3 min-h-16 text-sm font-semibold leading-5 text-slate-600">
          {animal.fact}
        </p>
      </div>
    </motion.article>
  );
}
