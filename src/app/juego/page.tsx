import DragAnimalGame from "@/components/DragAnimalGame";
import PageHeader from "@/components/PageHeader";

export default function JuegoPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Reto interactivo"
        title="Juego: arrastra cada animal a su grupo alimenticio"
        description="Toma un animal 3D y llévalo al grupo correcto según lo que come."
        icon="🎮"
        tone="violet"
      />
      <DragAnimalGame />
    </main>
  );
}
