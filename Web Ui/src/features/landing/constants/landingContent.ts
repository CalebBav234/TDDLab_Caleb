export type LandingInfoCard = {
  title: string;
  description: string;
  icon: string; // SVG path or icon identifier
  iconPath?: string; // For image-based icons
  tabAlign: "left" | "center" | "right";
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
    title: "¿Qué es?",
    description:
      "Es una extension para Visual Studio Code disenada para facilitar la metodologia de Desarrollo Guiado por Pruebas (TDD).",
    icon: "?",
    iconPath: "/landing/icon-question.svg",
    tabAlign: "left",
  },
  {
    title: "¿Cómo funciona?",
    description:
      "Funciona mediante un ciclo rapido de tres pasos: Rojo (crear un test que falla), Verde (escribir el codigo minimo para que pase) y Refactorizar (mejorar el codigo).",
    icon: "|||",
    iconPath: "/landing/icon-sliders.svg",
    tabAlign: "center",
  },
  {
    title: "¿Para qué sirve?",
    description:
      "Sirve para implementar una metodologia de desarrollo de software donde se escriben las pruebas unitarias antes que el codigo funcional, garantizando un codigo mas limpio, seguro, escalable y con menos errores, automatizando la verificacion desde el inicio.",
    icon: "o",
    iconPath: "/landing/icon-bulb.svg",
    tabAlign: "right",
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


