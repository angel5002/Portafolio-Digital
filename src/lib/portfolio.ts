// Estructura del portafolio: secciones requeridas por el curso y hoja de
// ruta de entregas (fuente: "Estado del portafolio" de las fichas AC1–AC3).

export const COURSE = {
  name: 'Ética y Deontología Profesional',
  code: 'HUM-010',
  university: 'Universidad Científica del Sur',
  universityShort: 'UCSUR',
  cycle: '2026-2',
  /** Pendiente de confirmar con el equipo */
  teacher: null as string | null,
  portfolioName: 'Brújula Ética'
};

export type Status = 'done' | 'wip' | 'todo';

export interface Section {
  id: string;
  /** Ruta relativa (sin base) */
  path: string;
  label: string;
  title: string;
  eyebrow: string;
  desc: string;
  status: Status;
  icon: 'users' | 'compass' | 'mic' | 'video' | 'map';
}

export const sections: Section[] = [
  {
    id: 'equipo',
    path: 'equipo',
    label: 'Equipo',
    title: 'Quiénes somos',
    eyebrow: 'Los Estoicos · 6 integrantes',
    desc: 'Somos estudiantes de Ingeniería Empresarial y de Sistemas, integrantes de Los Estoicos. Descubre quiénes somos y qué nos motiva.',
    status: 'done',
    icon: 'users'
  },
  {
    id: 'manifiesto',
    path: 'manifiesto',
    label: 'Manifiesto',
    title: 'Manifiesto de Identidad Ética',
    eyebrow: 'Módulo I · Semanas 1–5',
    desc: 'Nuestra metáfora, nuestro propósito profesional, las poblaciones que nos comprometemos a proteger y los valores desde los que decidimos.',
    status: 'wip',
    icon: 'compass'
  },
  {
    id: 'podcast',
    path: 'podcast',
    label: 'Podcast',
    title: 'Podcast de Dilema Moral',
    eyebrow: 'Módulo II · Semanas 6–7',
    desc: 'Un caso real del Perú que analizamos desde dos marcos contrapuestos: el deber kantiano y el utilitarismo de Mill.',
    status: 'todo',
    icon: 'mic'
  },
  {
    id: 'videoreaccion',
    path: 'video-reaccion',
    label: 'Video-reacción',
    title: 'Video-reacción crítico',
    eyebrow: 'Módulo III · Semanas 9–12',
    desc: 'Revisamos nuestro propio podcast: vacíos normativos, tensiones ético-legales y una propuesta para humanizar el código deontológico.',
    status: 'todo',
    icon: 'video'
  },
  {
    id: 'infografia',
    path: 'infografia',
    label: 'Infografía',
    title: 'Infografía de Integridad y Sostenibilidad',
    eyebrow: 'Módulo IV · Semanas 13–15',
    desc: 'Nuestra pieza visual con dos capas: el cuidado de la población vulnerable y nuestra responsabilidad con las generaciones futuras.',
    status: 'todo',
    icon: 'map'
  }
];

export interface Milestone {
  code: string;
  title: string;
  when: string;
  status: Status;
  /** Ruta relativa a la sección o entrada donde vive */
  href?: string;
  note?: string;
}

export const roadmap: Milestone[] = [
  { code: 'AC1', title: 'Metáfora artística y propósito de la carrera', when: 'Semana 1', status: 'done', href: 'bitacora/ac1-metafora-artistica', note: 'Manifiesto' },
  { code: 'AC2', title: 'Poblaciones vulnerables y compromiso ético', when: 'Semana 2', status: 'done', href: 'bitacora/ac2-poblaciones-vulnerables', note: 'Manifiesto' },
  { code: 'AC3', title: 'Jerarquía de valores y tensión axiológica', when: 'Semana 3', status: 'done', href: 'bitacora/ac3-jerarquia-de-valores', note: 'Manifiesto' },
  { code: 'AC4', title: 'Mapa de negligencias y propuestas de mejora', when: 'Semana 4', status: 'wip', note: 'Manifiesto' },
  { code: 'EC1', title: 'Presentación del Manifiesto de Identidad Ética completo', when: 'Semana 5', status: 'todo', href: 'manifiesto', note: '18 % de la nota' },
  { code: 'AC5–AC6', title: 'Guion del podcast (dilema ético profesional)', when: 'Semanas 6–7', status: 'todo', href: 'podcast' },
  { code: 'AC7–AC9', title: 'Video-reacción al podcast', when: 'Semanas 9–11', status: 'todo', href: 'video-reaccion' },
  { code: 'EC2', title: 'Sustentación del portafolio', when: 'Semana 12', status: 'todo' },
  { code: 'AC10–AC11', title: 'Infografía de integridad y sostenibilidad', when: 'Semanas 13–14', status: 'todo', href: 'infografia' },
  { code: 'EC3', title: 'Sustentación final del portafolio', when: 'Semana 15', status: 'todo' }
];

export const STATUS_LABEL: Record<Status, string> = {
  done: 'Listo',
  wip: 'En construcción',
  todo: 'Próximamente'
};

/** Una sección se puede visitar solo cuando tiene contenido publicado */
export function isEnabled(status: Status): boolean {
  return status !== 'todo';
}

/** Banda sonora del portafolio (reproductor fijo). La primera es la inicial. */
export interface Track {
  spotify: string;
  title: string;
  artist: string;
}

export const SOUNDTRACK: Track[] = [
  { spotify: '5XeIQO9gGkGo54naYVVeJP', title: 'Mr. Fear', artist: 'Siamés' },
  { spotify: '2e6PAITtgVsoOZ9jrndG26', title: 'As You Get High', artist: 'Siamés' }
];

export function progress(): { done: number; total: number; pct: number } {
  const total = roadmap.length;
  const done = roadmap.filter((m) => m.status === 'done').length;
  return { done, total, pct: Math.round((done / total) * 100) };
}
