// Integrantes del equipo "Los Estoicos" (fuente: fichas AC1–AC4, HUM-010).
// Las fotos viven en src/assets/images/equipo; quien no tiene foto usa el
// SVG placeholder. `photoPos` ajusta el encuadre (object-position) de la
// imagen dentro del recorte cuadrado de la tarjeta.

import type { ImageMetadata } from 'astro:assets';
import angel from '../assets/images/equipo/angel-vargas.jpg';
import grecia from '../assets/images/equipo/grecia-vergara.jpg';
import hideki from '../assets/images/equipo/hideki-fukuhara.jpg';
import jose from '../assets/images/equipo/jose-vigil.jpg';
import laryel from '../assets/images/equipo/laryel-negron.jpg';
import leonardo from '../assets/images/equipo/leonardo-abanto.jpg';

export interface Member {
  /** Slug estable para ids/anclas */
  id: string;
  /** Nombre corto para tarjetas */
  name: string;
  /** Nombre completo tal como figura en las fichas */
  fullName: string;
  code: string;
  career: string;
  /** Reseña breve (máx. 2 líneas), escrita por el integrante en primera persona. `null` = pendiente */
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
    bio: 'Estudio Ingeniería Empresarial y de Sistemas. Soy curioso por naturaleza y dedico gran parte de mi tiempo a investigar herramientas tecnológicas.',
    linkedin: null,
    photo: angel,
    hasPhoto: true,
    photoPos: 'center 30%',
    initials: 'AV',
    song: { spotify: '2KP6bTmxOSEVMXAnbapkpa', title: 'Crazy', artist: 'Seal' }
  },
  {
    id: 'grecia-vergara',
    name: 'Grecia Vergara',
    fullName: 'Grecia Hadid Vergara Carpio',
    code: '100182640',
    career: CAREER,
    bio: 'Soy estudiante de Ingeniería Empresarial y de Sistemas, con interés en descubrir nuevas ideas y analizar la historia detrás de cada acontecimiento para aprender de ellos.',
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
    bio: 'Tengo 18 años y estudio Ingeniería Empresarial y de Sistemas. Me apasionan las matemáticas y aprender cosas nuevas.',
    linkedin: null,
    photo: hideki,
    hasPhoto: true,
    photoPos: 'center 32%',
    initials: 'HF',
    song: { spotify: '37Tmv4NnfQeb0ZgUC4fOJj', title: 'Sultans of Swing', artist: 'Dire Straits' }
  },
  {
    id: 'jose-vigil',
    name: 'José Vigil',
    fullName: 'José Alberto Vigil Rodríguez',
    code: '100106264',
    career: CAREER,
    bio: 'Tengo 22 años, soy DJ de música electrónica y apasionado por la música. Estudio Ingeniería Empresarial y de Sistemas, combinando mi creatividad con mi interés por los negocios y la tecnología.',
    linkedin: null,
    photo: jose,
    hasPhoto: true,
    photoPos: 'center 30%',
    initials: 'JV',
    song: { spotify: '5u4hhtZ7f4rWkMZEZcTKrH', title: 'Relax My Eyes', artist: 'ANOTR, Abel Balder' }
  },
  {
    id: 'laryel-negron',
    name: 'Laryel Negrón',
    fullName: 'Laryel John Negrón Galindo',
    code: '100178529',
    career: CAREER,
    bio: 'Me oriento al detalle y al rigor metodológico. Para mí, la estadística es el lenguaje preciso con el que la realidad puede ser descrita y cuestionada.',
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
    bio: 'Estoy comprometido con aprender y compartir conocimiento. Valoro el trabajo en equipo y la diversidad de perspectivas que cada compañero aporta al grupo.',
    linkedin: null,
    photo: leonardo,
    hasPhoto: true,
    photoPos: 'center 45%',
    initials: 'LA'
  }
];

export const teamShortNames = team.map((m) => m.name);
