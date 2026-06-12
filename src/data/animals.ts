export type AnimalType = "carnivoro" | "herbivoro" | "omnivoro";

export interface AnimalCategory {
  type: AnimalType;
  label: string;
  pluralLabel: string;
  color: string;
  badgeClass: string;
  bgClass: string;
  softBgClass: string;
  borderClass: string;
  folder: string;
  description: string;
  detail: string;
  icon: string;
}

export interface Animal {
  id: string;
  name: string;
  image: string;
  category: AnimalType;
  fact: string;
}

export interface InfoCardData {
  title: string;
  image: string;
  category: AnimalType;
  description: string;
}

export interface ModelAnimal {
  id: string;
  name: string;
  model: string;
  category: AnimalType;
  hint: string;
}

export const categories: AnimalCategory[] = [
  {
    type: "carnivoro",
    label: "Carnívoro",
    pluralLabel: "Carnívoros",
    color: "#e14d2a",
    badgeClass: "bg-orange-500 text-white",
    bgClass: "bg-orange-500",
    softBgClass: "bg-orange-50",
    borderClass: "border-orange-300",
    folder: "/imagenes/carnivoro",
    description: "Comen carne",
    detail: "Tienen dientes, picos o garras que les ayudan a conseguir alimento.",
    icon: "🥩",
  },
  {
    type: "herbivoro",
    label: "Herbívoro",
    pluralLabel: "Herbívoros",
    color: "#2f9e44",
    badgeClass: "bg-green-600 text-white",
    bgClass: "bg-green-600",
    softBgClass: "bg-green-50",
    borderClass: "border-green-300",
    folder: "/imagenes/hervivoro",
    description: "Comen plantas",
    detail: "Pueden alimentarse de hojas, frutas, pasto, semillas o cortezas.",
    icon: "🌿",
  },
  {
    type: "omnivoro",
    label: "Omnívoro",
    pluralLabel: "Omnívoros",
    color: "#7c3aed",
    badgeClass: "bg-violet-600 text-white",
    bgClass: "bg-violet-600",
    softBgClass: "bg-violet-50",
    borderClass: "border-violet-300",
    folder: "/imagenes/omnivoro",
    description: "Comen plantas y carne",
    detail: "Su dieta es variada y cambia según el lugar donde viven.",
    icon: "🍽️",
  },
];

export const infoCards: InfoCardData[] = [
  {
    title: "Carnívoros",
    image: "/imagenes/carnivoro/info_carnivoro.png",
    category: "carnivoro",
    description:
      "Los carnívoros comen carne. Muchos cazan o buscan otros animales para alimentarse.",
  },
  {
    title: "Herbívoros",
    image: "/imagenes/hervivoro/herbivor_info.png",
    category: "herbivoro",
    description:
      "Los herbívoros comen plantas, hierbas, hojas, frutas o pasto.",
  },
  {
    title: "Omnívoros",
    image: "/imagenes/omnivoro/omnivoro_info.png",
    category: "omnivoro",
    description:
      "Los omnívoros comen plantas y también carne. Por eso tienen una dieta muy variada.",
  },
];

export const animals: Animal[] = [
  { id: "carn-buho", name: "Búho", image: "/imagenes/carnivoro/buho.png", category: "carnivoro", fact: "Caza pequeños animales durante la noche." },
  { id: "carn-serpiente", name: "Serpiente", image: "/imagenes/carnivoro/serpiente.png", category: "carnivoro", fact: "Se alimenta de presas pequeñas como roedores o aves." },
  { id: "carn-orca", name: "Orca", image: "/imagenes/carnivoro/ORCA.png", category: "carnivoro", fact: "Come peces, calamares y otros animales marinos." },
  { id: "carn-leopardo", name: "Leopardo de las nieves", image: "/imagenes/carnivoro/LEOPARDO_DE_LAS_NIEVES.png", category: "carnivoro", fact: "Usa su fuerza y agilidad para cazar." },
  { id: "carn-jaguar", name: "Jaguar", image: "/imagenes/carnivoro/JAGUAR.png", category: "carnivoro", fact: "Tiene una mordida muy fuerte para atrapar presas." },
  { id: "carn-hiena", name: "Hiena", image: "/imagenes/carnivoro/HIENA.png", category: "carnivoro", fact: "Come carne y suele vivir en grupos." },
  { id: "carn-halcon", name: "Halcón", image: "/imagenes/carnivoro/FALCO.png", category: "carnivoro", fact: "Vuela rápido para capturar otros animales." },
  { id: "carn-komodo", name: "Dragón de Komodo", image: "/imagenes/carnivoro/DRAGON_KOMODO.png", category: "carnivoro", fact: "Es un gran reptil que come carne." },
  { id: "herb-rinoceronte", name: "Rinoceronte", image: "/imagenes/hervivoro/rinoceronte.png", category: "herbivoro", fact: "Pasa mucho tiempo comiendo hojas y pasto." },
  { id: "herb-oveja", name: "Oveja", image: "/imagenes/hervivoro/oveja.png", category: "herbivoro", fact: "Mastica pasto y otras plantas suaves." },
  { id: "herb-koala", name: "Koala", image: "/imagenes/hervivoro/koala.png", category: "herbivoro", fact: "Le gustan mucho las hojas de eucalipto." },
  { id: "herb-cebra", name: "Cebra", image: "/imagenes/hervivoro/cebra.png", category: "herbivoro", fact: "Come pasto en las sabanas." },
  { id: "herb-camello", name: "Camello", image: "/imagenes/hervivoro/camello.png", category: "herbivoro", fact: "Puede comer plantas duras del desierto." },
  { id: "herb-cabra", name: "Cabra", image: "/imagenes/hervivoro/cabra.png", category: "herbivoro", fact: "Come hojas, hierbas y pequeños arbustos." },
  { id: "herb-alpaca", name: "Alpaca", image: "/imagenes/hervivoro/alpaca.png", category: "herbivoro", fact: "Se alimenta de pastos de montaña." },
  { id: "omni-avestruz", name: "Avestruz", image: "/imagenes/omnivoro/aveztruz.png", category: "omnivoro", fact: "Come plantas, semillas e insectos." },
  { id: "omni-zarigueya", name: "Zarigüeya", image: "/imagenes/omnivoro/zarihuella.png", category: "omnivoro", fact: "Come frutas, insectos y pequeños animales." },
  { id: "omni-rata", name: "Rata", image: "/imagenes/omnivoro/rata.png", category: "omnivoro", fact: "Puede comer semillas, frutas y otros alimentos." },
  { id: "omni-pato", name: "Pato", image: "/imagenes/omnivoro/pato.png", category: "omnivoro", fact: "Busca plantas acuáticas, semillas e insectos." },
  { id: "omni-gallina", name: "Gallina", image: "/imagenes/omnivoro/gallina.png", category: "omnivoro", fact: "Picotea granos, hojas pequeñas e insectos." },
  { id: "omni-chimpance", name: "Chimpancé", image: "/imagenes/omnivoro/chimpanse.png", category: "omnivoro", fact: "Come frutas, hojas e insectos." },
  { id: "omni-ardilla", name: "Ardilla", image: "/imagenes/omnivoro/ardilla.png", category: "omnivoro", fact: "Come semillas, frutos y a veces insectos." },
];

export function getCategory(type: AnimalType) {
  return categories.find((category) => category.type === type)!;
}
