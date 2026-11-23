// Contenido de la página Infografía (AC10–AC11, semanas 13–14) y base de
// nuestra EC3. La lámina es «De la pantalla al territorio en ingeniería»
// (PDF original en public/docs/; imagen en src/assets/images/infografia/).
//
// La página es un recorrido: la lámina queda fija en el centro y, al bajar,
// se acerca a una zona (`focus`) mientras las notas de los costados cambian.
// `left` cuenta lo que hay en la lámina o la teoría que la sostiene; `right`
// es nuestra reflexión como equipo.

export type Layer = 'general' | 'cuidado' | 'ambiente' | 'ambas';

/** Zona de la lámina, en fracciones de su ancho y alto (0–1) */
export interface Focus {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Note {
  label: string;
  title?: string;
  paragraphs?: string[];
  /** Cita textual de la lámina (nuestros compromisos) */
  quote?: string;
  question?: string;
}

export interface Step {
  id: string;
  kicker: string;
  layer: Layer;
  focus: Focus;
  left: Note;
  right: Note;
}

export const TITLE = 'De la pantalla al territorio en ingeniería';
export const PDF = 'docs/infografia-ec3-los-estoicos.pdf';

export const ALT =
  'Infografía «De la pantalla al territorio en ingeniería», de Los Estoicos, grupo 3. Arriba a la izquierda, capa 01, Ética del cuidado: una mujer con lentes oscuros contesta en su casa una llamada de un número desconocido, junto a las ideas de Emmanuel Lévinas y Carol Gilligan y nuestro compromiso del AC10. Una rama cruza la lámina con la frase «Las decisiones tecnológicas afectan a las personas hoy y al ambiente mañana». Abajo a la izquierda, capa 02, Ecoética: las ideas de Hans Jonas y Enrique Leff y nuestro compromiso del AC11. Abajo a la derecha, bajo el título «Cada decisión deja huella», una oficina con pantallas sobre un río lleno de computadoras desechadas y, en la orilla, la misma mujer caminando con su bastón blanco por un sendero iluminado. Al pie, la frase «Diseñar con integridad es cuidar a las personas y sostener la vida futura» y las referencias.';

export const commitments = {
  cuidado:
    'Detrás de cada dato hay una persona, no una oportunidad de negocio. Como equipo, nos comprometemos a proteger su información y a ofrecerle una forma accesible de verificar quién la llama.',
  ambiente:
    'Nos comprometemos a diseñar tecnología accesible y duradera, pensando en las personas que la usan hoy y en el mundo que heredarán las próximas generaciones.'
};

export const LAYER_LABEL: Record<Layer, string> = {
  general: 'La lámina',
  cuidado: 'Capa 1 · Cuidado',
  ambiente: 'Capa 2 · Ambiente',
  ambas: 'Las dos capas'
};

const FULL: Focus = { x: 0, y: 0, w: 1, h: 1 };

export const steps: Step[] = [
  {
    id: 'lamina',
    kicker: 'La lámina completa',
    layer: 'general',
    focus: FULL,
    left: {
      label: 'Lo que ves',
      title: 'Una lámina, dos capas',
      paragraphs: [
        'Arriba, la ética del cuidado (AC10, semana 13): una persona concreta y lo que le debemos hoy. Abajo, la ecoética (AC11, semana 14): lo que nuestras decisiones dejan en el ambiente y en quienes vienen después. Una rama cruza la lámina y une las dos.'
      ]
    },
    right: {
      label: 'Por qué este título',
      paragraphs: [
        'Pasamos el ciclo frente a pantallas: un Excel de 200 000 filas, un código de ética, apps que se aprueban sin probarlas con nadie. Con esta lámina quisimos seguir esas decisiones hasta donde terminan: la sala de una casa y la orilla de un río. Ahí se ve si un sistema estuvo bien hecho.'
      ]
    }
  },
  {
    id: 'escena',
    kicker: 'Capa 1 · Ética del cuidado',
    layer: 'cuidado',
    focus: { x: 0, y: 0, w: 0.31, h: 0.41 },
    left: {
      label: 'En la lámina',
      title: 'Número desconocido',
      paragraphs: [
        'Una mujer con lentes oscuros contesta una llamada en su casa, con su taza y su libreta al lado. En la pantalla del celular solo dice «Número desconocido». Ella no puede leerlo, y aunque pudiera, ese aviso no le diría quién la llama.'
      ]
    },
    right: {
      label: 'Nuestra reflexión',
      paragraphs: [
        'Es la persona de nuestra video-reacción. Ahí dijimos que alguien con discapacidad visual no tiene forma de saber si una llamada es una venta o una estafa. En el podcast era una fila más del Excel que compró Ricardo. Aquí le dimos una cara y una casa, y dejamos de hablar de ella en abstracto.'
      ]
    }
  },
  {
    id: 'vulnerabilidad',
    kicker: 'Capa 1 · Ética del cuidado',
    layer: 'cuidado',
    focus: { x: 0.27, y: 0, w: 0.4, h: 0.41 },
    left: {
      label: 'Lévinas y Gilligan',
      title: 'Detrás de cada dato hay una persona',
      paragraphs: [
        'Para Lévinas (2015), el rostro del otro nos exige responsabilidad antes de cualquier cálculo. Gilligan (2013) agrega que el cuidado no mira reglas en abstracto: mira la relación, el contexto y quién es más frágil en ella.'
      ]
    },
    right: {
      label: 'Nuestra reflexión',
      paragraphs: [
        'La frase que más discutimos fue esta: «La vulnerabilidad no es solo de la persona, sino de un servicio diseñado sin medios de verificación accesibles». En la semana 2 nombramos poblaciones vulnerables como si la fragilidad fuera de ellas. Hoy lo vemos al revés: no la vuelve frágil no ver, sino un servicio que nunca pensó en ella.'
      ],
      question: '¿Cuántas veces llamamos «vulnerable» a alguien para no decir que nuestro diseño lo dejó solo?'
    }
  },
  {
    id: 'compromiso-cuidado',
    kicker: 'Capa 1 · Nuestro compromiso (AC10)',
    layer: 'cuidado',
    focus: { x: 0.63, y: 0, w: 0.37, h: 0.37 },
    left: {
      label: 'Lo que escribimos',
      quote: commitments.cuidado
    },
    right: {
      label: 'Nuestra reflexión',
      paragraphs: [
        'En la video-reacción nos comprometimos a no usar datos sin saber de dónde vienen. Ese compromiso miraba desde la oficina. Este mira desde el otro lado de la línea: no basta con que nosotros no compremos la base; quien recibe la llamada necesita comprobar, por voz y sin depender de una pantalla, que quien llama es quien dice ser.'
      ],
      question: 'Si solo puede verificar una llamada quien ve bien la pantalla, ¿a quién protege de verdad el sistema?'
    }
  },
  {
    id: 'rama',
    kicker: 'Entre las dos capas',
    layer: 'ambas',
    focus: { x: 0.04, y: 0.38, w: 0.74, h: 0.2 },
    left: {
      label: 'En la lámina',
      title: 'Una rama que cruza',
      paragraphs: [
        'Entre las dos capas pusimos una rama que atraviesa la lámina con la frase «Las decisiones tecnológicas afectan a las personas hoy y al ambiente mañana». Nace junto a la escena de la casa y llega hasta el río.'
      ]
    },
    right: {
      label: 'Nuestra reflexión',
      paragraphs: [
        'No queríamos dos infografías pegadas, una sobre personas y otra sobre ambiente. La rama dice que es la misma decisión vista en dos tiempos: el sistema que hoy deja fuera a alguien mañana es basura en algún lugar. Separarlas sería repetir la torre de Babel: cada uno cuidando su parte sin ver la obra entera.'
      ]
    }
  },
  {
    id: 'ecoetica',
    kicker: 'Capa 2 · Ecoética',
    layer: 'ambiente',
    focus: { x: 0, y: 0.5, w: 0.48, h: 0.31 },
    left: {
      label: 'Jonas y Leff',
      title: 'Responder por el futuro',
      paragraphs: [
        'Jonas (1995) pide considerar las consecuencias de nuestras acciones sobre las generaciones futuras: quienes aún no nacen no pueden reclamar, así que nos toca pensar por ellos. Leff (2002) sostiene que la justicia social y la ambiental se abordan juntas, porque el daño ambiental cae primero sobre los más pobres.'
      ]
    },
    right: {
      label: 'Nuestra reflexión',
      paragraphs: [
        'Al principio la ecoética nos parecía lejana a nuestra carrera: no construimos represas ni abrimos minas. Pero cada sistema corre en servidores que consumen energía y en equipos que alguien fabrica y alguien desecha. Y cuando una app deja de funcionar en celulares antiguos, obliga a comprar otro a quien menos puede y manda el viejo a la basura.'
      ]
    }
  },
  {
    id: 'compromiso-ambiente',
    kicker: 'Capa 2 · Nuestro compromiso (AC11)',
    layer: 'ambiente',
    focus: { x: 0.27, y: 0.58, w: 0.22, h: 0.25 },
    left: {
      label: 'Lo que escribimos',
      quote: commitments.ambiente
    },
    right: {
      label: 'Nuestra reflexión',
      paragraphs: [
        'Accesible y duradera parecen dos promesas, pero terminan siendo la misma decisión. Una app liviana, que funciona con poca señal y en un celular de hace cinco años, atiende al usuario de zonas con poca conectividad que nombramos en el Manifiesto y, a la vez, retrasa el día en que ese celular termina en la basura.'
      ],
      question: '¿Y si la tecnología más sostenible no es la más nueva, sino la que no obliga a nadie a cambiar de equipo?'
    }
  },
  {
    id: 'huella',
    kicker: 'Capa 2 · Cada decisión deja huella',
    layer: 'ambiente',
    focus: { x: 0.46, y: 0.44, w: 0.54, h: 0.56 },
    left: {
      label: 'En la lámina',
      title: 'Cada decisión deja huella',
      paragraphs: [
        'Arriba, una oficina iluminada donde un equipo trabaja frente a sus pantallas. Abajo, un río lleno de monitores y computadoras desechadas. En la orilla, la misma mujer de la primera capa camina con su bastón blanco por un sendero iluminado.'
      ]
    },
    right: {
      label: 'Nuestra reflexión',
      paragraphs: [
        'Las pantallas de la oficina y las del río son las mismas, en dos momentos distintos: lo que se decide arriba termina abajo. Pero la escena no es solo una denuncia. El sendero con luz es lo que queremos diseñar: un camino por el que ella avance sola, sin pedir ayuda, en un mundo que no se ahogó en sus propios desechos.'
      ]
    }
  },
  {
    id: 'cierre',
    kicker: 'Cierre',
    layer: 'ambas',
    focus: FULL,
    left: {
      label: 'La frase final',
      title: 'Diseñar con integridad es cuidar a las personas y sostener la vida futura.',
      paragraphs: [
        'Con esa frase cerramos la lámina, encima de las cuatro lecturas que la sostienen: Lévinas, Gilligan, Jonas y Leff.'
      ]
    },
    right: {
      label: 'Nuestra reflexión',
      paragraphs: [
        'Empezamos el ciclo con la torre de Babel: una obra que cae porque sus constructores dejan a alguien fuera sin notarlo. Esta lámina dice lo mismo con dos personas más en la cuenta: la que hoy no puede verificar una llamada y la que mañana heredará el río. Integridad, para nosotros, es no dejar fuera a ninguna de las dos.'
      ],
      question: 'Si cada decisión deja huella, ¿qué huella queremos que encuentre quien venga después de nosotros?'
    }
  }
];

/**
 * Escala y desplazamiento (en % del tamaño de la lámina) para encuadrar una
 * zona en el visor. La escala se limita para que el acercamiento no pixele
 * ni pierda el contexto, y el desplazamiento para no mostrar bordes vacíos.
 */
export function frame(f: Focus, maxScale = 2.6): { s: number; tx: number; ty: number } {
  const s = Math.min(maxScale, 1 / f.w, 1 / f.h);
  const cx = f.x + f.w / 2;
  const cy = f.y + f.h / 2;
  const clamp = (v: number) => Math.min(0, Math.max(1 - s, v));
  const tx = clamp(0.5 - cx * s);
  const ty = clamp(0.5 - cy * s);
  const r = (n: number) => Math.round(n * 10000) / 100;
  return { s: Math.round(s * 1000) / 1000, tx: r(tx), ty: r(ty) };
}
