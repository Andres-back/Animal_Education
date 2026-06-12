import AnimalGallerySection from "@/components/AnimalGallerySection";
import PageHeader from "@/components/PageHeader";

export default function AnimalesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Galería"
        title="Explora los animales"
        description="Mira cada animal, su grupo alimenticio y una pista sencilla sobre lo que come."
        icon="🔎"
        tone="sky"
      />
      <AnimalGallerySection />
    </main>
  );
}
