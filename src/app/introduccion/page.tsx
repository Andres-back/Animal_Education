import IntroductionSection from "@/components/IntroductionSection";
import PageHeader from "@/components/PageHeader";

export default function IntroduccionPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Primera parada"
        title="¿Qué es la alimentación animal?"
        description="Descubre por qué los animales necesitan comer y qué pistas podemos observar antes de clasificarlos."
        icon="🧭"
        tone="green"
      />
      <IntroductionSection />
    </main>
  );
}
