import DragAnimalGame from "@/components/DragAnimalGame";
import PageHeader from "@/components/PageHeader";

export default function JuegoPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Reto interactivo"
        title="Arrastra cada animal a su grupo"
        description="Observa modelos 3D, piensa en sus pistas y clasifícalos sin que la respuesta aparezca primero."
        icon="🎮"
        tone="violet"
      />
      <DragAnimalGame />
    </main>
  );
}
