"use client";

import { motion } from "framer-motion";
import { animals, categories } from "@/data/animals";
import AnimalCard from "./AnimalCard";

export default function AnimalGallerySection() {
  return (
    <section className="animal-pattern bg-white px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {categories.map((category, index) => {
          const categoryAnimals = animals.filter((animal) => animal.category === category.type);

          return (
            <motion.section
              key={category.type}
              className={`rounded-[28px] border border-slate-200/70 bg-white/90 p-4 shadow-sm backdrop-blur sm:p-6 ${
                index === 0 ? "" : "mt-14"
              }`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
            >
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl" aria-hidden>
                      {category.icon}
                    </span>
                    <h2 className="text-3xl font-black text-slate-950">
                      {category.pluralLabel}
                    </h2>
                  </div>
                  <p className="mt-2 text-base font-bold text-slate-600">
                    {category.description}. {category.detail}
                  </p>
                </div>
                <span className={`w-fit rounded-full px-4 py-2 text-sm font-black ${category.badgeClass}`}>
                  {categoryAnimals.length} animales
                </span>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {categoryAnimals.map((animal) => (
                  <AnimalCard key={animal.id} animal={animal} category={category} />
                ))}
              </div>
            </motion.section>
          );
        })}
      </div>
    </section>
  );
}
