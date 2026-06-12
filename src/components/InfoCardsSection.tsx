"use client";

import { motion } from "framer-motion";
import { infoCards } from "@/data/animals";
import InfoCard from "./InfoCard";

export default function InfoCardsSection() {
  return (
    <section className="bg-gradient-to-b from-amber-50 via-white to-green-50 px-3 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">
            Láminas informativas
          </h2>
        </motion.div>

        <div className="grid gap-10">
          {infoCards.map((card, index) => (
            <InfoCard key={card.category} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
