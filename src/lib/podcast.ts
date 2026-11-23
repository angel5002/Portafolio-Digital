// Contenido de la página Podcast (AC5–AC6, semanas 6–7): nuestro episodio
// «Datos a luca». El audio está en public/audio/ (mono, 96 kbps, volumen
// normalizado). El guion sale de la transcripción del episodio.
//
// Los capítulos (`chapters`, en segundos) se ubicaron por las pausas largas y
// el cambio de voz entre la narración y la escena; si se vuelve a editar el
// audio, hay que revisarlos. `peaks` es la forma de onda real del episodio
// (140 barras, 0–1), calculada con ffmpeg a partir del mp3.

export const EPISODE = {
  show: 'Datos a luca',
  number: '01',
  title: 'El caso de Valeria',
  audio: 'audio/datos-a-luca.mp3',
  duration: 337,
  tagline: 'Dilemas del trabajo que no tienen una respuesta cómoda.'
};

export interface Chapter {
  t: number;
  title: string;
  note: string;
}

export const chapters: Chapter[] = [
  { t: 0, title: 'El caso', note: 'Lima, fin de trimestre: una meta que no llega y un Excel de 200 000 contactos.' },
  { t: 87, title: 'La escena', note: 'Ricardo hace la cuenta; Valeria pregunta de dónde salió la base.' },
  { t: 217, title: 'Tres cosas que nos dejó', note: 'Nadie te mira, razones prestadas y quién responde.' },
  { t: 309, title: 'Te toca a ti', note: 'Las preguntas con las que cerramos el episodio.' }
];

/** La pregunta que plantea la narración antes de la escena */
export const dilemma =
  '¿Qué haces cuando hacer lo correcto le cuesta el trabajo a gente que conoces, y el daño de hacer lo incorrecto lo sufren miles de personas que nunca vas a ver?';

export interface Fact {
  n: number;
  prefix?: string;
  suffix?: string;
  label: string;
  note: string;
}

export const facts: Fact[] = [
  { n: 1500, prefix: 'S/ ', label: 'pagó Ricardo por la base', note: 'a un proveedor' },
  { n: 200000, label: 'contactos en el Excel', note: 'nombres, DNI y celulares' },
  { n: 12, label: 'puestos en juego', note: 'entre ellos, un practicante' },
  { n: 5, suffix: ' p. m.', label: 'hora límite', note: 'para tener la campaña armada' }
];

export type Speaker = 'Ricardo' | 'Valeria';

export interface Line {
  who: Speaker;
  text: string;
  /** Lo dice para sí misma */
  aside?: boolean;
}

/** La escena completa, tal como la grabamos */
export const scene: Line[] = [
  { who: 'Ricardo', text: 'Valeria, necesito que cargues esta base al CRM y armes la campaña de llamadas. La necesito para hoy.' },
  { who: 'Valeria', text: '¿De dónde sacaste esto, Ricardo?' },
  { who: 'Ricardo', text: 'De un proveedor. Lo adquirí por 1500 soles.' },
  { who: 'Valeria', text: 'Ese formato lo conozco. Esos datos los robaron.' },
  { who: 'Ricardo', text: 'Escúchame un momento. Haz la cuenta conmigo: 12 personas conservan su trabajo; a cambio, cada cliente recibe una llamada. ¿A quién le hacemos daño con una llamada? Para mí, el bien mayor es claro: que la empresa siga en pie con su gente. Y si no usamos estos datos, los usa la competencia.' },
  { who: 'Valeria', text: 'Yo lo pienso al revés. Si todos usáramos datos dudosos cada vez que nuestro equipo lo necesita, nadie podría confiar en darle su número a una empresa. Y yo no puedo querer que eso sea la regla para todos.' },
  { who: 'Ricardo', text: 'Hablas de reglas, Valeria. Y yo hablo de personas. El practicante que formaste tú es uno de los doce. ¿Le vas a decir que su sueldo valía menos que tu principio?' },
  { who: 'Valeria', text: 'Me duele, ¿ya? Pero esas 200 000 personas también son personas. A nadie le preguntaron nada. Para esta campaña, solo valen si compran. Eso es usarlos como si fueran un medio, y no es justo.' },
  { who: 'Ricardo', text: 'Tú solo cargas el archivo. La decisión es mía.' },
  { who: 'Valeria', text: '¿De verdad? Dime una cosa: si el directorio no te estuviera presionando, ¿comprarías esta base?' },
  { who: 'Ricardo', text: 'Eh… no lo sé.' },
  { who: 'Valeria', text: 'Entonces creo que no estás decidiendo tú. Está decidiendo la presión.' },
  { who: 'Ricardo', text: 'Un solo clic y todo esto termina. Nadie va a auditar nunca de dónde vino este Excel.' },
  { who: 'Valeria', text: 'Y justamente por eso tengo que decidir yo. Si lo hago solo cuando alguien me vigila, eso ya no es ética, sino miedo.' },
  { who: 'Valeria', aside: true, text: 'Pero… ¿y si no es principio? ¿Y si es orgullo? ¿Y si yo me quedo tranquila y ellos pagan la cuenta?' },
  { who: 'Ricardo', text: 'Valeria, el directorio quiere ver la campaña armada antes de las cinco. Si no llega, mañana empiezan a llamar a los doce a Recursos Humanos. Y uno es el practicante que tú formaste.' },
  { who: 'Ricardo', text: 'Yo también tengo miedo. Si me piden cifras y no las tengo, no solo caen ellos; caigo yo.' },
  { who: 'Valeria', text: 'Dime la verdad. Si no hubiera meta, ¿tú comprarías esta base?' },
  { who: 'Ricardo', text: 'No. Entonces ya sabes de dónde vienen mis razones.' }
];

export interface Voice {
  who: Speaker;
  thinker: string;
  principle: string;
  line: string;
  protects: string;
  risk: string;
}

/** Cada personaje hace la cuenta desde un marco distinto */
export const voices: [Voice, Voice] = [
  {
    who: 'Ricardo',
    thinker: 'Mill · Utilitarismo',
    principle: 'El mayor bien para el mayor número.',
    line: 'Haz la cuenta conmigo: 12 personas conservan su trabajo; a cambio, cada cliente recibe una llamada.',
    protects: 'Lo que tiene delante: la empresa en pie y doce sueldos.',
    risk: 'Olvidar a quienes no tienen voz en la reunión.'
  },
  {
    who: 'Valeria',
    thinker: 'Kant · Ética del deber',
    principle: 'Actúa solo según una regla que puedas querer para todos.',
    line: 'Si todos usáramos datos dudosos cada vez que nuestro equipo lo necesita, nadie podría confiar en darle su número a una empresa.',
    protects: 'A los invisibles: 200 000 personas a las que nadie les preguntó nada.',
    risk: 'No mirar el costo que sí se ve: el practicante y los doce.'
  }
];

export interface Takeaway {
  n: string;
  title: string;
  lens: string;
  text: string;
}

export const takeaways: Takeaway[] = [
  {
    n: '01',
    title: 'Cuando nadie te mira',
    lens: 'Foucault',
    text: '«Nadie va a auditar nunca de dónde vino este Excel.» Foucault decía que las instituciones nos moldean vigilándonos. Si solo actuamos bien cuando alguien nos observa, no actuamos por convicción: actuamos por miedo.'
  },
  {
    n: '02',
    title: 'Razones prestadas',
    lens: 'Kant · Heteronomía',
    text: 'Ricardo admite que, sin la meta, no compraría la base. Sus razones no salen de él: salen del directorio, de la presión y de la costumbre. Kant le llama heteronomía.'
  },
  {
    n: '03',
    title: '¿Quién responde?',
    lens: 'Responsabilidad',
    text: 'Quien aprieta el botón no puede esconderse detrás de quien dio la orden. Pero tampoco es justo cargarle todo el peso a la persona con menos poder en la cadena.'
  }
];

/** La duda de Valeria, que comentamos al final del episodio */
export const doubt = {
  quote: '¿Y si no es principio? ¿Y si es orgullo?',
  text: 'Para Kant lo que importa es el motivo. Valeria actúa por deber, pero, desde afuera, ese motivo puede parecerse mucho al orgullo. Ahí está lo difícil de ser ético: a veces ni uno mismo sabe con certeza por qué hace lo que hace.'
};

/** Cómo lo escuchamos hoy, después del video-reacción y la infografía */
export const hindsight = [
  'Terminamos el episodio sin respuesta: Valeria sigue con el cursor sobre «cargar». No quisimos cerrar con una moraleja, porque ninguno de nosotros tenía una respuesta limpia. Preferimos que quien escuche se quede con el peso de decidir.',
  'Cuando lo volvimos a escuchar para el video-reacción, notamos dos cosas. La primera: la cuenta de Ricardo estaba mal hecha. Mill pide contar la felicidad de todos los afectados, y Ricardo contó a los doce de la oficina y se olvidó de las 200 000 personas del Excel. La segunda: el Código de Ética del Colegio de Ingenieros le dice a Valeria qué no hacer, pero la deja sola con las consecuencias.',
  'En la infografía le pusimos cara a una de esas filas: una mujer con discapacidad visual que contesta un número desconocido y no tiene cómo saber quién la llama. Por eso hoy oímos distinto la pregunta de Ricardo. Cuando dice «¿a quién le hacemos daño con una llamada?», ya sabemos a quién.'
];

export const questions = [
  '¿Puede una empresa salvar empleos usando a personas que nunca aceptaron ser usadas?',
  'Si el daño ocurre, ¿quién responde? ¿Quien compra la base, quien da la orden o quien aprieta «cargar»?',
  'Si supieras que nadie va a preguntar nunca de dónde salió ese archivo, ¿lo cargarías?'
];

export interface PodcastArt {
  /** Nombre del archivo en src/assets/images/podcast/ (sin extensión) */
  key: 'cambista' | 'vocacion' | 'balanza' | 'meninas' | 'caminante';
  title: string;
  author: string;
  year: string;
  alt: string;
  /** Por qué elegimos esta obra: la reflexión que nos provoca */
  reflection: string;
}

/**
 * Una obra por parte del episodio, todas de dominio público (Wikimedia
 * Commons; ficha completa en referencias.ts, AC5–AC6). Cada una tiene su
 * propia animación en portfolio.scss (sección «Podcast · obras»).
 */
export const arts: Record<PodcastArt['key'], PodcastArt> = {
  cambista: {
    key: 'cambista',
    title: 'El cambista y su mujer',
    author: 'Quentin Matsys',
    year: '1514',
    alt: 'Pintura: un cambista pesa monedas en una pequeña balanza sobre una mesa verde; a su lado, su mujer pasa las páginas de un libro de oraciones con la mirada puesta en el dinero. Un espejo convexo sobre la mesa refleja una ventana.',
    reflection: 'Ella tiene abierto un libro de oraciones, pero no lo lee: mira las monedas que pesa su marido. Matsys lo pintó hace más de quinientos años, y es lo que pasa en una empresa a fin de trimestre: la conciencia sigue sobre la mesa, abierta, mientras los ojos se van a la cuenta.'
  },
  vocacion: {
    key: 'vocacion',
    title: 'La vocación de san Mateo',
    author: 'Caravaggio',
    year: '1599–1600',
    alt: 'Pintura en penumbra: varios hombres sentados alrededor de una mesa con monedas; desde la derecha entra un haz de luz y una figura los señala.',
    reflection: 'Mateo cobraba impuestos y estaba en su mesa, con las monedas, cuando entró la luz y alguien lo señaló. Todavía se discute cuál de los hombres es él: el que parece señalarse a sí mismo, como preguntando «¿yo?», o el joven que no levanta la vista del dinero. A Valeria la decisión también la encuentra en su escritorio. La pregunta es si va a levantar la mirada.'
  },
  balanza: {
    key: 'balanza',
    title: 'Mujer con balanza',
    author: 'Johannes Vermeer',
    year: 'c. 1664',
    alt: 'Pintura: una mujer de pie junto a una ventana sostiene una pequeña balanza vacía sobre una mesa con perlas y monedas; detrás de ella cuelga un cuadro del Juicio Final.',
    reflection: 'Los platillos de la balanza están vacíos. Detrás de la mujer cuelga un Juicio Final; frente a ella, perlas y monedas. Vermeer no pinta lo que se pesa, sino la calma antes de decidir. Ricardo y Valeria ponen cosas distintas en los platillos, pero en esa oficina nadie se da ese momento.'
  },
  meninas: {
    key: 'meninas',
    title: 'Las meninas',
    author: 'Diego Velázquez',
    year: '1656',
    alt: 'Pintura: la infanta Margarita rodeada de sus damas, un perro y otros personajes en una gran sala; a la izquierda, el propio Velázquez, pincel en mano, mira hacia afuera; al fondo, un espejo refleja a los reyes.',
    reflection: 'Foucault abre Las palabras y las cosas con este cuadro. Casi todos miran hacia afuera, hacia donde estamos nosotros, y el espejo del fondo muestra a los reyes: quienes miran también son mirados. Velázquez incluso se pintó a sí mismo, pincel en mano. Ricardo dice que nadie va a auditar el Excel; el cuadro responde que siempre hay alguien en el lugar del que mira, aunque sea uno mismo.'
  },
  caminante: {
    key: 'caminante',
    title: 'El caminante sobre el mar de nubes',
    author: 'Caspar David Friedrich',
    year: 'c. 1818',
    alt: 'Pintura: un hombre de espaldas, de pie sobre una roca, contempla un paisaje de montañas cubierto de niebla.',
    reflection: 'Friedrich pintó al caminante de espaldas: no vemos su cara ni sabemos qué piensa, solo lo que tiene delante. Eso nos pone en su lugar. Así cerramos el episodio: Valeria con el cursor sobre «cargar», y quien escucha parado donde está ella, frente a una niebla que no deja ver qué viene después.'
  }
};

export const peaks: number[] = [
  0.76, 0.86, 0.68, 1.0, 0.51, 0.75, 0.95, 0.79, 0.73, 0.76, 0.56, 0.65, 0.77, 0.79, 0.73, 0.91,
  0.73, 0.87, 0.63, 0.92, 0.87, 0.71, 0.68, 0.53, 0.89, 0.6, 0.92, 0.86, 0.75, 0.77, 0.83, 0.79,
  0.58, 0.76, 0.67, 0.67, 0.41, 0.57, 0.4, 0.34, 0.58, 0.31, 0.41, 0.5, 0.41, 0.41, 0.4, 0.38,
  0.38, 0.49, 0.6, 0.59, 0.5, 0.55, 0.33, 0.45, 0.45, 0.42, 0.49, 0.38, 0.45, 0.52, 0.36, 0.36,
  0.62, 0.43, 0.46, 0.77, 0.36, 0.58, 0.53, 0.6, 0.81, 0.68, 0.49, 0.53, 0.46, 0.55, 0.79, 0.38,
  0.57, 0.41, 0.41, 0.55, 0.59, 0.53, 0.58, 0.52, 0.4, 0.46, 0.75, 0.94, 0.88, 0.83, 0.83, 0.87,
  0.89, 0.76, 0.79, 0.77, 0.76, 0.74, 0.79, 0.81, 0.69, 0.77, 0.8, 0.95, 0.7, 0.71, 0.76, 0.77,
  0.89, 0.86, 0.88, 0.78, 0.9, 0.68, 0.69, 0.75, 0.9, 0.85, 0.9, 0.91, 0.66, 0.7, 0.73, 0.56,
  0.73, 0.8, 0.59, 0.77, 0.74, 0.51, 0.56, 0.63, 0.67, 0.77, 0.62, 0.46
];

/** 87 → «1:27» */
export function clock(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
