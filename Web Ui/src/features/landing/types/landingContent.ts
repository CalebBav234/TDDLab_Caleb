export type LandingInfoCard = {
  title: string;
  description: string;
};

export type LandingBenefit = {
  title: string;
  imagePath: string;
  imageAlt: string;
};

export type LandingResource = {
  imagePath: string;
  imageAlt: string;
};

export const LANDING_INFO_CARDS: LandingInfoCard[] = [
  {
    title: "Que es?",
    description:
      "TDDLab es una plataforma de aprendizaje para practicar desarrollo guiado por pruebas con retroalimentacion constante.",
  },
  {
    title: "Como funciona?",
    description:
      "Trabaja en ciclos rojo-verde-refactor, ejecuta pruebas y visualiza evidencia de avance en un solo flujo.",
  },
  {
    title: "Para que sirve?",
    description:
      "Facilita formacion tecnica con seguimiento docente, tareas y practicas enfocadas en calidad de software.",
  },
];

export const LANDING_BENEFITS: LandingBenefit[] = [
  {
    title: "Fundamentos de TDD",
    imagePath: "/landing/beneficios-1.png",
    imageAlt: "Ciclo de TDD red green refactor",
  },
  {
    title: "Practicas guiadas",
    imagePath: "/landing/beneficios-2.png",
    imageAlt: "Personas trabajando en laptop en una sesion guiada",
  },
  {
    title: "Comunidad activa",
    imagePath: "/landing/beneficios-3.png",
    imageAlt: "Equipo colaborando alrededor de una mesa",
  },
];

export const LANDING_RESOURCES: LandingResource[] = [
  {
    imagePath: "/landing/recursos-1.jpg",
    imageAlt: "Escritorio con monitor mostrando codigo",
  },
  {
    imagePath: "/landing/recursos-2.jpg",
    imageAlt: "Analisis de datos en equipo",
  },
  {
    imagePath: "/landing/recursos-3.jpg",
    imageAlt: "Manos unidas representando colaboracion",
  },
  {
    imagePath: "/landing/recursos-4.jpg",
    imageAlt: "Fragmento de codigo en pantalla",
  },
  {
    imagePath: "/landing/recursos-5.jpg",
    imageAlt: "Persona trabajando en portatil",
  },
];

export const LANDING_COPY = {
  heroTitle: "Todo para crear software,\nsin complicaciones.",
  heroSubtitle:
    "Una plataforma todo-en-uno que permite a los desarrolladores probar, ver resultados al instante y aplicar el ciclo rojo-verde-refactor de forma agil y eficiente.",
  benefitsTitle: "Aprovecha al maximo todos\nlos beneficios",
  resourcesTitle: "Disfruta de nuestros\nrecursos",
  ctaTitle: "EMPIEZA HOY Y\nCONSTRUYE SIN LIMITES",
  ctaSubtitle:
    "Unete a cientos de desarrolladores que ya optimizan su codigo con informacion en tiempo real.",
  authButtonText: "Comienza ahora",
  heroButtonText: "Ir a TDD Lab",
};

