import AnimalGallerySection from "@/components/AnimalGallerySection";
import PageHeader from "@/components/PageHeader";

export default function AnimalesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Galería de exploración"
        title="Explora los animales"
        description="Mira cada animal, compara sus pistas y descubre cómo se agrupan según su alimentación."
        icon="🔎"
        tone="sky"
      />
      <AnimalGallerySection />
    </main>
  );
}
