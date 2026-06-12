"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { getCategory, type InfoCardData } from "@/data/animals";

interface InfoCardProps {
  card: InfoCardData;
  index: number;
}

export default function InfoCard({ card, index }: InfoCardProps) {
  const category = getCategory(card.category);

  return (
    <motion.figure
      className={`mx-auto w-full max-w-5xl overflow-hidden rounded-[30px] border-4 bg-white shadow-xl ${category.borderClass}`}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{
        y: -4,
        boxShadow: "0 24px 50px rgba(15, 23, 42, 0.18)",
      }}
    >
      <div className={`relative aspect-square ${category.softBgClass}`}>
        <Image
          src={card.image}
          alt={`Imagen informativa sobre ${card.title.toLowerCase()}`}
          fill
          preload={index === 0}
          className="object-contain p-2 sm:p-4"
          sizes="(max-width: 1024px) 100vw, 960px"
        />
      </div>
      <figcaption className="sr-only">{card.description}</figcaption>
    </motion.figure>
  );
}
