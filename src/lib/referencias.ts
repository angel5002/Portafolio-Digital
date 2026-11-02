// Bibliografía de cada aprendizaje colaborativo (APA 7, orden alfabético).
// Fuente: sección «Conexión teórica» de las fichas AC1–AC4 (HUM-010). Se
// muestra al final de cada entrada de la bitácora y bajo su bloque en el
// Manifiesto (componente References.astro). No se inventan editoriales ni
// iniciales que las fichas no consignan.
//
// `lead` = autor y año; `title` va en cursiva; `rest` = lo que sigue al
// título, con su puntuación inicial.

export interface Reference {
  lead: string;
  title?: string;
  rest?: string;
  url?: string;
}

const UCSUR = 'Universidad Científica del Sur';
const CURSO = ' [Material del curso Ética y Deontología Profesional, HUM-010].';

const ficha = (year: string, code: string, title: string): Reference => ({
  lead: `${UCSUR}. (${year}).`,
  title: `Ficha de aprendizaje colaborativo ${code}: ${title}`,
  rest: CURSO
});

const sesion = (year: string, n: number, tema: string): Reference => ({
  lead: `${UCSUR}. (${year}).`,
  title: `Sesión ${n}: ${tema}`,
  rest: CURSO
});

export const references: Record<string, Reference[]> = {
  AC1: [
    {
      lead: 'Aristóteles. (2014).',
      title: 'Ética a Nicómaco',
      rest: ' (Libro I). Obra original escrita ca. 349 a. C.'
    },
    {
      lead: 'Bruegel el Viejo, P. (ca. 1565).',
      title: 'La torre de Babel',
      rest: ' [Pintura]. Museo Boijmans Van Beuningen, Rotterdam, Países Bajos.',
      url: 'https://www.boijmans.nl/en/collection/in-depth/bruegel-s-tower-of-babel'
    },
    { lead: 'Giusti, M. (2007).', title: 'El sentido de la ética', rest: '.' },
    ficha('2026', 'AC1', 'Mi metáfora artística. ¿Quiénes somos y hacia dónde vamos?')
  ],
  AC2: [
    {
      lead: 'Beauchamp y Childress. (s. f.).',
      rest: 'Los cuatro principios de la bioética: autonomía, beneficencia, no maleficencia y justicia [Referidos en la sesión 2 del curso Ética y Deontología Profesional, HUM-010].'
    },
    {
      lead: 'Kant, I. (2012).',
      title: 'Fundamentación de la metafísica de las costumbres',
      rest: '. Obra original publicada en 1785.'
    },
    {
      lead: 'Organización de las Naciones Unidas. (1948).',
      title: 'Declaración Universal de los Derechos Humanos',
      rest: '.',
      url: 'https://www.un.org/es/about-us/universal-declaration-of-human-rights'
    },
    ficha('2026a', 'AC2', '¿A quién le debemos responsabilidad? Poblaciones vulnerables de nuestra carrera'),
    sesion('2026b', 2, 'Contenidos del curso')
  ],
  AC3: [
    { lead: 'Gaarder, J. (1991).', title: 'El mundo de Sofía', rest: ' [Lectura complementaria].' },
    {
      lead: 'Scheler, M. (1913–1916).',
      title: 'El formalismo en la ética y la ética material de los valores',
      rest: '.'
    },
    ficha('2026a', 'AC3', '¿Qué valoramos? Nuestra jerarquía de valores'),
    sesion('2026b', 3, 'De la virtud clásica a la libertad contemporánea')
  ],
  AC4: [
    { lead: 'Platón. (s. f.).', title: 'La República', rest: ' (Libro VII) [Lectura complementaria].' },
    {
      lead: 'Radio Ambulante. (s. f.). Caravana de la desinformación [Episodio de pódcast]. En',
      title: 'Radio Ambulante',
      rest: '.'
    },
    ficha('2026a', 'AC4', 'Mapa de negligencias y acciones positivas en nuestro ámbito profesional'),
    sesion('2026b', 4, 'Verdad lógica vs. verdad ética, falacias y posverdad, y método socrático para la resolución de problemas')
  ],
  // Video-reacción: autores y normas que citamos en el podcast y en el video,
  // y el material de las semanas 9–11 del sílabo
  'AC7–AC9': [
    { lead: 'Alvarez, K. (2015).', title: 'El experimento de la prisión de Stanford', rest: ' [Película].' },
    { lead: 'Bosse, A. (1651).', title: 'Frontispicio de Leviatán, de Thomas Hobbes', rest: ' [Grabado]. Wikimedia Commons.', url: 'https://commons.wikimedia.org/wiki/File:Leviathan_frontispiece_cropped_British_Library.jpg' },
    { lead: 'Bruegel el Viejo, P. (1566).', title: 'El censo de Belén', rest: ' [Pintura]. Museos Reales de Bellas Artes de Bélgica, Bruselas.', url: 'https://commons.wikimedia.org/wiki/File:The_Census_at_Bethlehem_by_Bruegel_the_Elder.jpg' },
    { lead: 'Colegio de Ingenieros del Perú. (s. f.).', title: 'Código de Ética del Colegio de Ingenieros del Perú', rest: '.' },
    { lead: 'Congreso de la República del Perú. (2011).', title: 'Ley N.° 29733, Ley de Protección de Datos Personales', rest: '.' },
    { lead: 'David, J.-L. (s. f.).', title: 'El juramento del Juego de Pelota', rest: ' [Pintura]. Wikimedia Commons.', url: 'https://commons.wikimedia.org/wiki/File:Serment_du_Jeu_de_Paume_-_Jacques-Louis_David.jpg' },
    { lead: 'Foucault, M. (1975).', title: 'Vigilar y castigar', rest: '.' },
    { lead: 'Hammershøi, V. (1903–1904).', title: 'Interior con mujer de espaldas', rest: ' [Pintura]. Randers Kunstmuseum, Randers, Dinamarca.', url: 'https://commons.wikimedia.org/wiki/File:Vilhelm_Hammershoi_-_Interieur_mit_Rueckenansicht_einer_Frau_-_1903-1904_-_Randers_Kunstmuseum.jpg' },
    { lead: 'Hobbes, T. (1651).', title: 'Leviatán', rest: '.' },
    {
      lead: 'Kant, I. (2012).',
      title: 'Fundamentación de la metafísica de las costumbres',
      rest: '. Obra original publicada en 1785.'
    },
    { lead: 'Locke, J. (1690).', title: 'Segundo tratado sobre el gobierno civil', rest: '.' },
    { lead: 'Mill, J. S. (1863).', title: 'Utilitarianism', rest: '.' },
    { lead: 'Reveley, W. (1791).', title: 'Plano del panóptico de Jeremy Bentham', rest: ' [Dibujo]. Wikimedia Commons (CC BY-SA 4.0).', url: "https://commons.wikimedia.org/wiki/File:Plan_of_Jeremy_Bentham's_panopticon_prison,_drawn_by_Willey_Reveley_in_1791.jpg" },
    { lead: 'Rousseau, J.-J. (1762).', title: 'El contrato social', rest: '.' },
    {
      lead: 'TED. (2008).',
      title: 'Philip Zimbardo: cómo la gente corriente se convierte en monstruos... o héroes',
      rest: ' [Video]. YouTube.',
      url: 'https://www.youtube.com/watch?v=OsFEV35tWsg'
    },
    sesion('2026b', 9, 'Contrato social y normas profesionales'),
    { lead: 'Van Gogh, V. (1890).', title: 'El buen samaritano (según Delacroix)', rest: ' [Pintura]. Kröller-Müller Museum, Otterlo, Países Bajos.', url: 'https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_The_Good_Samaritan,_1890_-_Google_Art_Project.jpg' },
    sesion('2026b', 10, 'Análisis de los códigos deontológicos'),
    sesion('2026b', 11, 'La brecha entre la ética de la intención y el desempeño profesional'),
    {
      lead: 'Weber, M. (1919).',
      title: 'La política como vocación',
      rest: '.',
      url: 'https://archive.org/details/weber-politica-vocacion/page/2/mode/1up'
    }
  ]
};

export function referencesFor(code: string): Reference[] {
  return references[code] ?? [];
}
