"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { gsap } from "gsap";
import {
  categories,
  getCategory,
  type AnimalType,
  type ModelAnimal,
} from "@/data/animals";
import ModelViewer from "./ModelViewer";

interface GameAnimal extends ModelAnimal {
  status: "pending" | "correct" | "incorrect";
}

const gameAnimalModels: ModelAnimal[] = [
  {
    id: "model-aguila",
    name: "Águila",
    model: "/glb/aguila.glb",
    category: "carnivoro",
    hint: "Observa su pico curvo y sus patas fuertes.",
  },
  {
    id: "model-aligator",
    name: "Aligátor",
    model: "/glb/aligator.glb",
    category: "carnivoro",
    hint: "Mira su boca grande y sus dientes.",
  },
  {
    id: "model-bear",
    name: "Oso",
    model: "/glb/bear.glb",
    category: "omnivoro",
    hint: "Puede buscar alimento en ríos, árboles y suelo.",
  },
  {
    id: "model-cow",
    name: "Vaca",
    model: "/glb/cow.glb",
    category: "herbivoro",
    hint: "Observa cómo mastica durante mucho tiempo.",
  },
  {
    id: "model-crow",
    name: "Cuervo",
    model: "/glb/cuervo.glb",
    category: "omnivoro",
    hint: "Explora muchos lugares buscando alimento.",
  },
  {
    id: "model-elephant",
    name: "Elefante",
    model: "/glb/elephant.glb",
    category: "herbivoro",
    hint: "Usa su trompa para tomar comida del entorno.",
  },
  {
    id: "model-horse",
    name: "Caballo",
    model: "/glb/horse.glb",
    category: "herbivoro",
    hint: "Sus dientes muelen alimento por largo rato.",
  },
  {
    id: "model-giraffe",
    name: "Jirafa",
    model: "/glb/jiraf.glb",
    category: "herbivoro",
    hint: "Su cuello largo le ayuda a alcanzar comida alta.",
  },
  {
    id: "model-lion",
    name: "León",
    model: "/glb/lion.glb",
    category: "carnivoro",
    hint: "Observa sus garras, colmillos y mirada atenta.",
  },
  {
    id: "model-raccoon",
    name: "Mapache",
    model: "/glb/mapached.glb",
    category: "omnivoro",
    hint: "Usa sus patas para revisar alimentos distintos.",
  },
  {
    id: "model-pig",
    name: "Cerdo",
    model: "/glb/pig.glb",
    category: "omnivoro",
    hint: "Busca alimento con el hocico en el suelo.",
  },
  {
    id: "model-rabbit",
    name: "Conejo",
    model: "/glb/rabit.glb",
    category: "herbivoro",
    hint: "Sus dientes delanteros crecen y roen mucho.",
  },
  {
    id: "model-tiger",
    name: "Tigre",
    model: "/glb/tiger.glb",
    category: "carnivoro",
    hint: "Observa sus colmillos y movimientos sigilosos.",
  },
  {
    id: "model-wolf",
    name: "Lobo",
    model: "/glb/wolf.glb",
    category: "carnivoro",
    hint: "Suele actuar en grupo y usa mucho el olfato.",
  },
  {
    id: "model-fox",
    name: "Zorro",
    model: "/glb/zorro.glb",
    category: "omnivoro",
    hint: "Es curioso y se adapta a alimentos variados.",
  },
];

const animalLessons: Record<
  string,
  {
    observation: string;
    habitat: string;
    clue: string;
    funFact: string;
  }
> = {
  "model-aguila": {
    observation: "Pico curvo, vista aguda y patas diseñadas para sujetar.",
    habitat: "Montañas, bosques y zonas abiertas.",
    clue: "Mira qué parte del cuerpo usaría para atrapar o tomar alimento.",
    funFact: "Puede ver detalles desde muy lejos mientras vuela.",
  },
  "model-aligator": {
    observation: "Cuerpo bajo, cola fuerte y una mandíbula muy marcada.",
    habitat: "Pantanos, ríos y lagunas cálidas.",
    clue: "Piensa si sus dientes parecen hechos para cortar o para moler.",
    funFact: "Puede permanecer quieto en el agua esperando el momento correcto.",
  },
  "model-bear": {
    observation: "Patas fuertes, buen olfato y mucha curiosidad al buscar comida.",
    habitat: "Bosques, montañas y ríos.",
    clue: "Puede encontrar alimento en lugares muy distintos.",
    funFact: "Algunos osos comen mucho antes de descansar durante el invierno.",
  },
  "model-cow": {
    observation: "Boca ancha y dientes preparados para masticar lentamente.",
    habitat: "Praderas y granjas.",
    clue: "Fíjate si parece hecho para perseguir o para masticar con calma.",
    funFact: "Puede volver a masticar su alimento para digerirlo mejor.",
  },
  "model-crow": {
    observation: "Pico fuerte, mucha curiosidad y buena memoria.",
    habitat: "Bosques, campos y ciudades.",
    clue: "Observa si parece especializado en un solo alimento o si explora muchos.",
    funFact: "Es un ave muy curiosa y buena resolviendo problemas.",
  },
  "model-elephant": {
    observation: "Trompa larga para alcanzar, agarrar y llevar comida a la boca.",
    habitat: "Sabanas, bosques y selvas.",
    clue: "Observa si usa fuerza para perseguir o trompa para alcanzar.",
    funFact: "Puede pasar muchas horas al día buscando alimento.",
  },
  "model-horse": {
    observation: "Dientes planos y labios que toman alimento del suelo.",
    habitat: "Praderas, campos y granjas.",
    clue: "Sus dientes muelen: piensa qué tipo de alimento necesita molerse.",
    funFact: "Puede dormir de pie por periodos cortos.",
  },
  "model-giraffe": {
    observation: "Cuello muy largo y lengua que ayuda a tomar comida alta.",
    habitat: "Sabanas con árboles altos.",
    clue: "Piensa para qué sirve alcanzar las copas de los árboles.",
    funFact: "Su lengua es larga y le ayuda a tomar alimento entre ramas.",
  },
  "model-lion": {
    observation: "Garras, colmillos y cuerpo fuerte para moverse rápido.",
    habitat: "Sabanas y pastizales.",
    clue: "Observa si sus herramientas sirven para atrapar o para pastar.",
    funFact: "Vive en grupos y se comunica con rugidos.",
  },
  "model-raccoon": {
    observation: "Patas hábiles para tocar, abrir y revisar objetos.",
    habitat: "Bosques, ríos, parques y ciudades.",
    clue: "Busca pistas en lo curioso que es al explorar comida.",
    funFact: "Sus patas son muy sensibles y le ayudan a reconocer objetos.",
  },
  "model-pig": {
    observation: "Hocico sensible para revisar el suelo.",
    habitat: "Granjas y zonas de bosque.",
    clue: "Puede encontrar alimento de muchas formas usando el olfato.",
    funFact: "Es muy inteligente y aprende rutinas con facilidad.",
  },
  "model-rabbit": {
    observation: "Dientes delanteros largos y mandíbula que mastica rápido.",
    habitat: "Campos, madrigueras y zonas con vegetación.",
    clue: "Piensa qué alimentos se pueden roer con dientes delanteros.",
    funFact: "Sus orejas ayudan a escuchar peligros alrededor.",
  },
  "model-tiger": {
    observation: "Rayas, colmillos y caminar silencioso.",
    habitat: "Bosques, selvas y zonas con agua.",
    clue: "Sus rayas ayudan a esconderse: piensa para qué le sirve eso.",
    funFact: "Cada tigre tiene un patrón de rayas diferente.",
  },
  "model-wolf": {
    observation: "Hocico fino, buen olfato y comportamiento de grupo.",
    habitat: "Bosques, montañas y tundras.",
    clue: "Observa si busca alimento solo o con ayuda de su grupo.",
    funFact: "Se comunica con aullidos para llamar a su grupo.",
  },
  "model-fox": {
    observation: "Hocico fino, oído atento y mucha capacidad de adaptación.",
    habitat: "Bosques, campos y algunas zonas urbanas.",
    clue: "No vive de una sola fuente de alimento; observa su adaptabilidad.",
    funFact: "Es ágil, silencioso y muy buen explorador.",
  },
};

const categoryDisplay: Record<
  AnimalType,
  { label: string; pluralLabel: string; icon: string; description: string }
> = {
  carnivoro: {
    label: "Carnívoro",
    pluralLabel: "Carnívoros",
    icon: "🥩",
    description: "Comen carne",
  },
  herbivoro: {
    label: "Herbívoro",
    pluralLabel: "Herbívoros",
    icon: "🌿",
    description: "Comen plantas",
  },
  omnivoro: {
    label: "Omnívoro",
    pluralLabel: "Omnívoros",
    icon: "🍽️",
    description: "Comen plantas y carne",
  },
};

const tutorialSteps = [
  {
    step: "1",
    title: "Observa",
    text: "Mira la forma del cuerpo, los dientes, las patas y el comportamiento.",
  },
  {
    step: "2",
    title: "Pide una pista",
    text: "Toca Pista si necesitas más información sin ver la respuesta.",
  },
  {
    step: "3",
    title: "Arrastra",
    text: "Toma cualquier parte de la tarjeta y suéltala en el grupo correcto.",
  },
];

function getZoneType(zoneId: string): AnimalType | null {
  if (zoneId === "zone-carnivoro") return "carnivoro";
  if (zoneId === "zone-herbivoro") return "herbivoro";
  if (zoneId === "zone-omnivoro") return "omnivoro";
  return null;
}

function DraggableModelCard({
  animal,
  isDragging,
  onPreview,
}: {
  animal: GameAnimal;
  isDragging: boolean;
  onPreview: (animal: GameAnimal) => void;
}) {
  const category = getCategory(animal.category);
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: animal.id,
    data: { animal },
    disabled: animal.status === "correct",
  });

  const stopDragActivation = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  return (
    <motion.article
      ref={setNodeRef}
      data-animal-id={animal.id}
      className={`touch-none rounded-[28px] border-4 bg-white shadow-lg outline-none transition ${
        animal.status === "correct" ? "cursor-default" : "cursor-grab active:cursor-grabbing"
      } ${category.borderClass} ${isDragging ? "opacity-35 ring-4 ring-violet-300" : ""} ${
        animal.status === "incorrect" ? "ring-4 ring-red-300" : ""
      }`}
      whileHover={animal.status === "correct" ? undefined : { y: -5, scale: 1.02 }}
      {...listeners}
      {...attributes}
    >
      <div className={`h-44 rounded-t-[22px] sm:h-48 xl:h-52 ${category.softBgClass}`}>
        <ModelViewer src={animal.model} alt={`Modelo 3D de ${animal.name}`} ar />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-xl font-black text-slate-950">{animal.name}</h3>
        <p className="mx-auto mt-2 min-h-10 max-w-sm text-sm font-bold leading-5 text-slate-600">
          {animal.hint}
        </p>
        <button
          type="button"
          onPointerDownCapture={stopDragActivation}
          onMouseDownCapture={stopDragActivation}
          onTouchStartCapture={stopDragActivation}
          onKeyDownCapture={stopDragActivation}
          onClick={(event) => {
            event.stopPropagation();
            onPreview(animal);
          }}
          className="mt-4 w-full rounded-full bg-amber-400 px-4 py-3 text-sm font-black uppercase tracking-wide text-slate-950 shadow-md transition hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-200"
        >
          Pista
        </button>
      </div>
    </motion.article>
  );
}

function DragOverlayModel({ animal }: { animal: GameAnimal }) {
  const category = getCategory(animal.category);

  return (
    <div
      className={`w-72 overflow-hidden rounded-[32px] border-4 bg-white shadow-2xl ${category.borderClass}`}
    >
      <div className={`h-64 ${category.softBgClass}`}>
        <ModelViewer
          src={animal.model}
          alt={`Modelo 3D de ${animal.name}`}
          className="drop-shadow-xl"
        />
      </div>
      <div className="bg-white p-4 text-center">
        <p className="text-2xl font-black text-slate-950">{animal.name}</p>
        <p className="mt-1 text-sm font-bold text-violet-700">
          Llévalo al grupo correcto
        </p>
      </div>
    </div>
  );
}

function ModelPreviewModal({
  animal,
  onClose,
}: {
  animal: GameAnimal;
  onClose: () => void;
}) {
  const lesson = animalLessons[animal.id];

  return (
    <motion.div
      className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Pista de ${animal.name}`}
    >
      <motion.div
        className="w-full max-w-6xl overflow-hidden rounded-[34px] bg-white shadow-2xl"
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
      >
        <div className="flex items-start justify-between gap-4 border-b-4 border-violet-100 p-4">
          <div>
            <p className="mb-2 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-700">
              Pista del explorador
            </p>
            <h2 className="text-3xl font-black text-slate-950">
              {animal.name}
            </h2>
            <p className="text-sm font-bold text-slate-600">
              Gira el modelo y observa pistas; la respuesta no aparece aquí.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-200"
          >
            Cerrar
          </button>
        </div>
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="h-[58vh] min-h-96 bg-gradient-to-b from-sky-50 to-emerald-50">
            <ModelViewer
              src={animal.model}
              alt={`Modelo 3D de ${animal.name}`}
              interactive
              ar
              showArButton
            />
          </div>
          <div className="bg-white p-5">
            <h3 className="text-2xl font-black text-slate-950">
              Observa antes de clasificar
            </h3>
            <div className="mt-4 grid gap-3">
              <div className="rounded-3xl border-4 border-amber-200 bg-amber-50 p-4">
                <p className="text-sm font-black uppercase tracking-wide text-amber-700">
                  Cuerpo
                </p>
                <p className="mt-1 text-lg font-extrabold text-slate-800">
                  {lesson.observation}
                </p>
              </div>
              <div className="rounded-3xl border-4 border-sky-200 bg-sky-50 p-4">
                <p className="text-sm font-black uppercase tracking-wide text-sky-700">
                  Hogar
                </p>
                <p className="mt-1 text-lg font-extrabold text-slate-800">
                  {lesson.habitat}
                </p>
              </div>
              <div className="rounded-3xl border-4 border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm font-black uppercase tracking-wide text-emerald-700">
                  Para pensar
                </p>
                <p className="mt-1 text-lg font-extrabold text-slate-800">
                  {lesson.clue}
                </p>
              </div>
              <div className="rounded-3xl border-4 border-violet-200 bg-violet-50 p-4">
                <p className="text-sm font-black uppercase tracking-wide text-violet-700">
                  Dato curioso
                </p>
                <p className="mt-1 text-lg font-extrabold text-slate-800">
                  {lesson.funFact}
                </p>
              </div>
            </div>
            <p className="mt-5 rounded-3xl bg-slate-100 p-4 text-center text-sm font-black text-slate-600">
              Cuando termines, cierra esta ventana y arrastra la tarjeta completa.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PlacedAnimalCard({ animal }: { animal: GameAnimal }) {
  const category = getCategory(animal.category);

  return (
    <motion.div
      className={`overflow-hidden rounded-3xl border-4 bg-white shadow-md ${category.borderClass}`}
      initial={{ opacity: 0, y: 16, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className={`h-36 ${category.softBgClass}`}>
        <ModelViewer
          src={animal.model}
          alt={`Modelo 3D de ${animal.name} clasificado`}
          ar
        />
      </div>
      <div className="flex items-center justify-between gap-2 p-3">
        <span className="font-black text-slate-800">{animal.name}</span>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-green-500 text-lg font-black text-white">
          ✓
        </span>
      </div>
    </motion.div>
  );
}

function DropZone({
  type,
  overZone,
  acceptedAnimals,
}: {
  type: AnimalType;
  overZone: string | null;
  acceptedAnimals: GameAnimal[];
}) {
  const category = getCategory(type);
  const display = categoryDisplay[type];
  const zoneId = `zone-${type}`;
  const { setNodeRef } = useDroppable({
    id: zoneId,
    data: { category: type },
  });
  const isOver = overZone === zoneId;

  return (
    <motion.section
      ref={setNodeRef}
      data-zone-id={zoneId}
      className={`min-h-64 rounded-[32px] border-4 border-dashed p-5 shadow-md transition ${
        isOver ? category.softBgClass : "bg-white/85"
      }`}
      style={{ borderColor: isOver ? category.color : `${category.color}80` }}
      animate={isOver ? { scale: [1, 1.03, 1.01] } : { scale: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-start gap-3">
        <span className="text-4xl" aria-hidden>
          {display.icon}
        </span>
        <div>
          <h3 className="text-2xl font-black" style={{ color: category.color }}>
            {display.pluralLabel.toUpperCase()}
          </h3>
          <p className="font-bold text-slate-700">{display.description}</p>
          <p className="text-sm font-black uppercase tracking-wide text-slate-400">
            Suelta aquí
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {acceptedAnimals.length === 0 ? (
          <div className="grid min-h-40 place-items-center rounded-3xl bg-white/70 p-5 text-center">
            <div>
              <div className="text-4xl" aria-hidden>
                {display.icon}
              </div>
              <p className="mt-2 text-sm font-black text-slate-400">
                Arrastra aquí los animales que pertenecen a este grupo.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {acceptedAnimals.map((animal) => (
              <PlacedAnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}

function makeInitialAnimals(): GameAnimal[] {
  return gameAnimalModels.map((animal) => ({ ...animal, status: "pending" }));
}

export default function DragAnimalGame() {
  const [gameState, setGameState] = useState<GameAnimal[]>(makeInitialAnimals);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overZone, setOverZone] = useState<string | null>(null);
  const [previewAnimal, setPreviewAnimal] = useState<GameAnimal | null>(null);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | null;
  }>({ text: "", type: null });
  const messageRef = useRef<HTMLDivElement>(null);
  const celebrationRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 140, tolerance: 6 } })
  );

  const total = gameAnimalModels.length;
  const score = gameState.filter((animal) => animal.status === "correct").length;
  const isComplete = score === total;

  const pendingAnimals = useMemo(
    () => gameState.filter((animal) => animal.status !== "correct"),
    [gameState]
  );

  const activeAnimal = useMemo(
    () => gameState.find((animal) => animal.id === draggingId) ?? null,
    [draggingId, gameState]
  );

  const animalsByZone = useCallback(
    (type: AnimalType) =>
      gameState.filter((animal) => animal.status === "correct" && animal.category === type),
    [gameState]
  );

  useEffect(() => {
    if (!isComplete || !celebrationRef.current) return;

    const particles = celebrationRef.current.querySelectorAll("[data-particle]");
    gsap.fromTo(
      particles,
      { y: 20, scale: 0, opacity: 0, rotation: 0 },
      {
        y: -110,
        scale: 1,
        opacity: 1,
        rotation: 180,
        duration: 0.9,
        stagger: 0.05,
        ease: "back.out(1.7)",
      }
    );
  }, [isComplete]);

  const showMessage = useCallback((text: string, type: "success" | "error") => {
    setMessage({ text, type });

    if (messageRef.current) {
      gsap.fromTo(
        messageRef.current,
        { scale: 0.88, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
      );
    }

    window.setTimeout(() => setMessage({ text: "", type: null }), 2300);
  }, []);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setDraggingId(String(event.active.id));
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    setOverZone(event.over ? String(event.over.id) : null);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setDraggingId(null);
      setOverZone(null);

      const targetType = event.over ? getZoneType(String(event.over.id)) : null;
      if (!targetType) return;

      const animalId = String(event.active.id);
      const animal = gameState.find((item) => item.id === animalId);
      if (!animal || animal.status === "correct") return;

      if (animal.category === targetType) {
        setGameState((current) =>
          current.map((item) =>
            item.id === animalId ? { ...item, status: "correct" } : item
          )
        );
        showMessage("¡Muy bien! Este animal pertenece a ese grupo.", "success");
        return;
      }

      const card = document.querySelector(`[data-animal-id="${animalId}"]`);
      if (card) {
        gsap.fromTo(
          card,
          { x: 0 },
          { x: 12, duration: 0.07, repeat: 5, yoyo: true, ease: "power1.inOut" }
        );
      }

      setGameState((current) =>
        current.map((item) =>
          item.id === animalId ? { ...item, status: "incorrect" } : item
        )
      );
      showMessage("¡Casi! Observa mejor sus pistas.", "error");

      window.setTimeout(() => {
        setGameState((current) =>
          current.map((item) =>
            item.id === animalId && item.status === "incorrect"
              ? { ...item, status: "pending" }
              : item
          )
        );
      }, 900);
    },
    [gameState, showMessage]
  );

  const resetGame = () => {
    setGameState(makeInitialAnimals());
    setDraggingId(null);
    setOverZone(null);
    setPreviewAnimal(null);
    setMessage({ text: "", type: null });
  };

  return (
    <section className="leaf-pattern bg-gradient-to-b from-violet-50 via-white to-amber-50 px-3 py-10 sm:px-5 lg:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-[1800px]">
        <div className="mb-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[28px] border-4 border-amber-200 bg-white p-5 shadow-md">
              <span className="text-sm font-black uppercase tracking-wide text-slate-500">
                Puntaje
              </span>
              <p className="mt-1 text-4xl font-black text-amber-600">
                {score} / {total}
              </p>
            </div>
            <div className="rounded-[28px] border-4 border-sky-200 bg-white p-5 shadow-md">
              <span className="text-sm font-black uppercase tracking-wide text-slate-500">
                Animales clasificados
              </span>
              <p className="mt-1 text-4xl font-black text-sky-600">
                {score} de {total}
              </p>
            </div>
          </div>

          {!isComplete && (
            <div className="rounded-[32px] border-4 border-violet-100 bg-white p-4 shadow-md sm:p-5">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-violet-600 text-2xl text-white">
                  🐾
                </span>
                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-violet-600">
                    Tutorial rápido
                  </p>
                  <h2 className="text-2xl font-black text-slate-950">
                    ¿Cómo se juega?
                  </h2>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {tutorialSteps.map(({ step, title, text }) => (
                  <div
                    key={step}
                    className="flex items-start gap-3 rounded-3xl border-2 border-violet-100 bg-violet-50/60 p-3"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-violet-600 text-lg font-black text-white">
                      {step}
                    </span>
                    <div>
                      <p className="text-base font-black text-slate-950">{title}</p>
                      <p className="text-sm font-bold leading-5 text-slate-600">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div ref={messageRef} className="mb-6 min-h-14 text-center">
          <AnimatePresence mode="wait">
            {message.text && (
              <motion.p
                key={message.text}
                className={`inline-flex rounded-full border-4 px-5 py-3 text-base font-black shadow-sm sm:text-lg ${
                  message.type === "success"
                    ? "border-green-300 bg-green-50 text-green-700"
                    : "border-red-300 bg-red-50 text-red-600"
                }`}
                initial={{ opacity: 0, scale: 0.86 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.86 }}
              >
                {message.text}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {isComplete ? (
          <motion.div
            className="relative overflow-hidden rounded-[36px] border-4 border-violet-200 bg-white p-8 text-center shadow-xl"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div ref={celebrationRef} className="pointer-events-none absolute inset-0">
              {["🌟", "🎉", "⭐", "✨", "🎊", "🌈", "🏆", "👏"].map((particle, index) => (
                <span
                  key={`${particle}-${index}`}
                  data-particle
                  className="absolute text-3xl opacity-0"
                  style={{
                    left: `${12 + index * 11}%`,
                    bottom: `${16 + (index % 3) * 10}%`,
                  }}
                >
                  {particle}
                </span>
              ))}
            </div>
            <div className="text-6xl" aria-hidden>
              🏆
            </div>
            <h2 className="mt-4 text-4xl font-black text-violet-700">
              ¡Excelente!
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl font-bold leading-8 text-slate-700">
              Ya sabes clasificar animales según su alimentación.
            </p>
            <button
              type="button"
              onClick={resetGame}
              className="mt-7 rounded-full bg-violet-600 px-8 py-4 text-lg font-black text-white shadow-lg transition hover:bg-violet-700"
            >
              Jugar otra vez
            </button>
          </motion.div>
        ) : (
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(390px,460px)] xl:items-start 2xl:gap-8">
              <section>
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-slate-950">
                      Animales 3D para clasificar
                    </h2>
                    <p className="mt-1 text-sm font-bold text-slate-600">
                      Arrastra desde cualquier parte de la tarjeta. Usa Pista solo si necesitas observar mejor.
                    </p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                  {pendingAnimals.map((animal) => (
                    <DraggableModelCard
                      key={animal.id}
                      animal={animal}
                      isDragging={draggingId === animal.id}
                      onPreview={setPreviewAnimal}
                    />
                  ))}
                </div>
              </section>

              <section className="grid gap-5 xl:sticky xl:top-28">
                <div className="rounded-[28px] border-4 border-amber-200 bg-amber-50 p-4 text-center shadow-sm">
                  <p className="text-xl font-black text-slate-950">
                    Zonas para soltar
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-600">
                    Los aciertos aparecerán aquí como modelos 3D.
                  </p>
                </div>
                {categories.map((category) => (
                  <DropZone
                    key={category.type}
                    type={category.type}
                    overZone={overZone}
                    acceptedAnimals={animalsByZone(category.type)}
                  />
                ))}
              </section>
            </div>

            <DragOverlay dropAnimation={null}>
              {activeAnimal ? <DragOverlayModel animal={activeAnimal} /> : null}
            </DragOverlay>
          </DndContext>
        )}
      </div>

      <AnimatePresence>
        {previewAnimal && (
          <ModelPreviewModal
            animal={previewAnimal}
            onClose={() => setPreviewAnimal(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
