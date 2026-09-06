// Integrantes del equipo "Los Estoicos" (fuente: fichas AC1–AC3, HUM-010).
// Las fotos viven en src/assets/images/equipo; quien no tiene foto usa el
// SVG placeholder. `photoPos` ajusta el encuadre (object-position) de la
// imagen dentro del recorte cuadrado de la tarjeta.

import type { ImageMetadata } from 'astro:assets';
import grecia from '../assets/images/equipo/grecia-vergara.jpg';
import hideki from '../assets/images/equipo/hideki-fukuhara.jpg';
import laryel from '../assets/images/equipo/laryel-negron.jpg';
import leonardo from '../assets/images/equipo/leonardo-abanto.jpg';
import placeholder from '../assets/images/equipo/placeholder.svg';

export interface Member {
  /** Slug estable para ids/anclas */
  id: string;
  /** Nombre corto para tarjetas */
  name: string;
  /** Nombre completo tal como figura en las fichas */
  fullName: string;
  code: string;
  career: string;
  /** Reseña breve (máx. 2 líneas). `null` = pendiente */
  bio: string | null;
  /** URL de LinkedIn. `null` = pendiente */
  linkedin: string | null;
  photo: ImageMetadata;
  hasPhoto: boolean;
  photoPos?: string;
  /** Iniciales para avatares sin foto */
  initials: string;
  /** Canción que lo representa (aparece en el reproductor y en su tarjeta) */
  song?: { spotify: string; title: string; artist: string; note?: string };
}

export const TEAM_NAME = 'Los Estoicos';
export const CAREER = 'Ingeniería Empresarial y de Sistemas';

export const team: Member[] = [
  {
    id: 'angel-vargas',
    name: 'Angel Vargas',
    fullName: 'Angel Jaime Vargas Flores',
    code: '100182073',
    career: CAREER,
    bio: 'Estudiante de Ingeniería Empresarial y de Sistemas. Curioso por naturaleza, dedica gran parte de su tiempo a investigar herramientas tecnológicas.',
    linkedin: null,
    photo: placeholder,
    hasPhoto: false,
    initials: 'AV',
    song: { spotify: '7uXtqLi3cMTMDslp4KU6b5', title: 'Crazy', artist: 'Seal' }
  },
  {
    id: 'grecia-vergara',
    name: 'Grecia Vergara',
    fullName: 'Grecia Hadid Vergara Carpio',
    code: '100182640',
    career: CAREER,
    bio: null,
    linkedin: null,
    photo: grecia,
    hasPhoto: true,
    photoPos: 'center 38%',
    initials: 'GV'
  },
  {
    id: 'hideki-fukuhara',
    name: 'Hideki Fukuhara',
    fullName: 'Hideki Fukuhara Taira',
    code: '100176939',
    career: CAREER,
    bio: 'Tiene 18 años y estudia Ingeniería Empresarial y de Sistemas. Le apasionan las matemáticas y aprender cosas nuevas.',
    linkedin: null,
    photo: hideki,
    hasPhoto: true,
    photoPos: 'center 32%',
    initials: 'HF'
  },
  {
    id: 'jose-vigil',
    name: 'José Vigil',
    fullName: 'José Alberto Vigil Rodríguez',
    code: '100106264',
    career: CAREER,
    bio: null,
    linkedin: null,
    photo: placeholder,
    hasPhoto: false,
    initials: 'JV'
  },
  {
    id: 'laryel-negron',
    name: 'Laryel Negrón',
    fullName: 'Laryel John Negrón Galindo',
    code: '100178529',
    career: CAREER,
    bio: 'Orientado al detalle y al rigor metodológico. Para él, la estadística es el lenguaje preciso con el que la realidad puede ser descrita y cuestionada.',
    linkedin: null,
    photo: laryel,
    hasPhoto: true,
    photoPos: 'center 28%',
    initials: 'LN'
  },
  {
    id: 'leonardo-abanto',
    name: 'Leonardo Abanto',
    fullName: 'Leonardo Manuel Abanto Huertas',
    code: '100203036',
    career: CAREER,
    bio: 'Comprometido con aprender y compartir conocimiento. Valora el trabajo en equipo y la diversidad de perspectivas que cada compañero aporta al grupo.',
    linkedin: null,
    photo: leonardo,
    hasPhoto: true,
    photoPos: 'center 45%',
    initials: 'LA'
  }
];

export const teamShortNames = team.map((m) => m.name);
