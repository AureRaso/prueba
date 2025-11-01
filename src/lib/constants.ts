import { ToneOfVoice } from './types';

export const HERO_TITLES: Record<ToneOfVoice, string[]> = {
  professional: [
    "Descubre tu potencial en el pádel",
    "Entrena con los mejores profesionales",
    "Lleva tu juego al siguiente nivel",
    "Academia de pádel de élite",
    "Perfecciona tu técnica de pádel"
  ],
  family: [
    "¡Diversión garantizada para toda la familia!",
    "Aprende pádel en un ambiente familiar",
    "Deporte y risas para todos",
    "¡Ven a disfrutar del pádel con nosotros!",
    "Tu segunda casa del pádel"
  ],
  premium: [
    "Experiencia exclusiva de pádel",
    "El lujo del pádel de alta gama",
    "Instalaciones premium para jugadores exigentes",
    "Pádel exclusivo para ti",
    "La excelencia hecha club"
  ]
};

export const HERO_SUBTITLES: Record<ToneOfVoice, string[]> = {
  professional: [
    "Clases personalizadas con entrenadores certificados",
    "Metodología probada para todos los niveles",
    "Formación integral desde principiante hasta avanzado",
    "Técnica, táctica y preparación física",
    "Tu progreso es nuestro compromiso"
  ],
  family: [
    "Clases para niños, jóvenes y adultos",
    "Un espacio donde todos aprenden y se divierten",
    "Actividades para toda la familia",
    "Diversión y aprendizaje garantizados",
    "Crear recuerdos jugando al pádel"
  ],
  premium: [
    "Instalaciones de primer nivel con servicio personalizado",
    "Entrenamiento exclusivo en instalaciones de lujo",
    "La mejor experiencia de pádel de la ciudad",
    "Servicios premium para jugadores exigentes",
    "Donde el pádel se convierte en arte"
  ]
};

export const HERO_CTAS = [
  "Reserva tu clase gratuita",
  "Únete ahora",
  "Prueba gratis",
  "Empezar ahora",
  "Reservar clase",
  "Conocer más",
  "Solicitar información"
];

export const ABOUT_TITLES: Record<ToneOfVoice, string[]> = {
  professional: [
    "¿Por qué elegirnos?",
    "Nuestra propuesta de valor",
    "Lo que nos diferencia",
    "Ventajas competitivas"
  ],
  family: [
    "¿Por qué somos diferentes?",
    "Lo que nos hace especiales",
    "Nuestra filosofía",
    "Por qué las familias nos eligen"
  ],
  premium: [
    "Excelencia sin compromisos",
    "El estándar premium",
    "Nuestra promesa de calidad",
    "La diferencia premium"
  ]
};

export const ADVANTAGES = [
  "Entrenadores certificados",
  "Instalaciones modernas",
  "Grupos reducidos",
  "Metodología personalizada",
  "Horarios flexibles",
  "Precios competitivos",
  "Ambiente familiar",
  "Seguimiento personalizado",
  "Material incluido",
  "Pistas profesionales",
  "Clases para todos los niveles",
  "Ubicación céntrica"
];

export const TRAINER_ROLES = [
  "Director técnico",
  "Entrenador profesional",
  "Entrenador de base",
  "Especialista en competición",
  "Entrenador infantil",
  "Preparador físico"
];

export const TRAINER_SPECIALTIES = [
  "Iniciación",
  "Perfeccionamiento",
  "Competición",
  "Pádel infantil",
  "Preparación física",
  "Táctica avanzada",
  "Corrección técnica",
  "Mentalidad competitiva"
];

export const FAQ_TEMPLATES = {
  general: [
    {
      question: "¿Necesito experiencia previa para empezar?",
      answer: "No es necesario tener experiencia previa. Tenemos clases para todos los niveles, desde principiantes absolutos hasta jugadores avanzados."
    },
    {
      question: "¿Qué material necesito?",
      answer: "Solo necesitas ropa deportiva cómoda y zapatillas. Las palas y pelotas están incluidas en las clases."
    },
    {
      question: "¿Cuánto dura cada clase?",
      answer: "Las clases tienen una duración de 60 minutos, tiempo ideal para aprender sin agotarse."
    },
    {
      question: "¿Puedo recuperar una clase si no puedo asistir?",
      answer: "Sí, puedes recuperar tu clase avisando con al menos 24 horas de antelación."
    }
  ],
  kids: [
    {
      question: "¿A partir de qué edad pueden empezar los niños?",
      answer: "Los niños pueden empezar a partir de los 6 años con nuestro programa especial de iniciación."
    },
    {
      question: "¿Las clases infantiles son diferentes?",
      answer: "Sí, adaptamos la metodología, material y duración de las clases a cada grupo de edad."
    },
    {
      question: "¿Los padres pueden acompañar a los niños?",
      answer: "Los padres pueden observar las clases desde la zona de espectadores, pero no acceder a la pista durante la clase."
    }
  ],
  competition: [
    {
      question: "¿Organizan torneos?",
      answer: "Sí, organizamos torneos internos mensuales y participamos en competiciones federadas."
    },
    {
      question: "¿Preparan para competición?",
      answer: "Tenemos un programa específico de entrenamiento para jugadores que quieren competir a nivel federado."
    },
    {
      question: "¿Qué nivel necesito para competir?",
      answer: "Evaluamos tu nivel individualmente. Generalmente recomendamos al menos 6 meses de experiencia regular."
    }
  ]
};

export const OFFER_TEMPLATES = {
  'free-class': {
    title: "¡Primera clase gratuita!",
    description: "Prueba nuestras instalaciones y metodología sin compromiso",
    buttonText: "Reservar clase gratuita"
  },
  'discount-15': {
    title: "15% de descuento en tu primer mes",
    description: "Oferta especial para nuevos alumnos. ¡No te lo pierdas!",
    buttonText: "Aprovechar descuento"
  },
  'welcome-pack': {
    title: "Pack de bienvenida gratuito",
    description: "Incluye pala, muñequeras y toalla con tu primera matrícula",
    buttonText: "Conseguir pack"
  },
  'bring-friend': {
    title: "Trae un amigo y ambos ahorráis",
    description: "20% de descuento para ti y tu acompañante en el primer mes",
    buttonText: "Invitar amigo"
  }
};

export const CONTACT_MESSAGES: Record<ToneOfVoice, string[]> = {
  professional: [
    "Estamos aquí para ayudarte a alcanzar tus objetivos",
    "Contacta con nuestro equipo profesional",
    "Resolvemos todas tus dudas",
    "Tu consulta es importante para nosotros"
  ],
  family: [
    "¡Estaremos encantados de conocerte!",
    "Ven a visitarnos cuando quieras",
    "Hablemos sobre tu pasión por el pádel",
    "Cualquier duda, aquí estamos"
  ],
  premium: [
    "Atención personalizada para miembros premium",
    "Servicio de atención exclusivo",
    "Tu experiencia premium comienza aquí",
    "Contacto directo con nuestro equipo"
  ]
};

export const PRICE_UNITS = [
  { value: 'class', label: 'por clase' },
  { value: 'month', label: 'al mes' },
  { value: 'pack', label: 'pack de clases' },
  { value: 'trimester', label: 'trimestre' }
];

export const CLASS_INCLUDES = [
  "Material incluido",
  "Pista libre 1h/semana",
  "Seguimiento personalizado",
  "Análisis de vídeo"
];

export const CLASS_CTAS = [
  "Apuntarse",
  "Reservar plaza",
  "Más información",
  "Solicitar información",
  "Unirse al grupo"
];