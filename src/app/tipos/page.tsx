import InfoCardsSection from "@/components/InfoCardsSection";
import PageHeader from "@/components/PageHeader";

export default function TiposPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Tarjetas de aprendizaje"
        title="Conoce los tipos de alimentación"
        description="Observa las láminas grandes. Toda la explicación está dentro de cada imagen para que puedas leerla con calma."
        icon="📚"
        tone="orange"
      />
      <InfoCardsSection />
    </main>
  );
}
