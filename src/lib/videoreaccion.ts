// Contenido de la página Video-reacción (AC7–AC9) y base de nuestra EC2.
// Sale de las transcripciones del podcast «Datos a luca» y del video-reacción,
// y del sílabo (semanas 9–11). Seis partes, en el orden en que nos las
// repartimos para la sustentación. Cada parte tiene su obra de arte (archivos
// en src/assets/images/videoreaccion/, todas de dominio público en Wikimedia
// Commons) y su propia maquetación en src/pages/video-reaccion.astro.

export interface Line {
  who?: string;
  text: string;
}

export interface Fragment {
  label: string;
  lines: Line[];
}

export interface Card {
  tag: string;
  title: string;
  points: string[];
  basis: string;
}

export interface Art {
  /** Nombre del archivo en src/assets/images/videoreaccion/ (sin extensión) */
  key: 'leviatan' | 'panoptico' | 'censo' | 'interior' | 'juramento' | 'samaritano';
  title: string;
  author: string;
  year: string;
  alt: string;
  /** Por qué elegimos esta imagen: la reflexión que nos provoca */
  reflection: string;
}

export interface Part {
  id: string;
  n: number;
  /** Nombre corto de la parte, tal como la repartimos */
  tag: string;
  title: string;
  /** Resumen de una línea para el índice junto al video */
  summary: string;
  art: Art;
  paragraphs: string[];
  fragment?: Fragment;
  cards?: Card[];
  /** Párrafos que van después del fragmento o de las tarjetas */
  after?: string[];
  question: string;
}

export const DRIVE_ID = '1fMyFStnQaGAft1fT6hyTBdhQEWRkrqtt';

export const guidingQuestion =
  'Si Valeria cumple lo que el código le pide, ¿el código la respalda?';

/** Parte 3: la cuenta de Ricardo frente a la de Mill */
export const tally = [
  { n: '12', label: 'personas que Ricardo contó', note: 'tienen nombre, cara y escritorio' },
  { n: '200 000', label: 'personas que olvidó', note: 'son filas de un Excel' }
];

/** Parte 6: las dos éticas de Weber aplicadas a Valeria */
export const weberEthics = [
  {
    name: 'Ética de la convicción',
    idea: 'Actúa por principios, cueste lo que cueste.',
    valeria: 'Valeria la cumple: no carga la base.'
  },
  {
    name: 'Ética de la responsabilidad',
    idea: 'Se hace cargo de lo que pasa después.',
    valeria: 'Le falta: dejarlo por escrito, avisar y proponer otra salida.'
  }
];

export const commitment =
  'Como futuros ingenieros, nos comprometemos a no usar datos sin saber de dónde vienen, y a no dejar solo a quien se niegue.';

export const parts: Part[] = [
  {
    id: 'intro',
    n: 1,
    tag: 'Intro y contexto',
    title: '¿Por qué volvimos a nuestro propio podcast?',
    summary: 'Qué pasa en Datos a luca y por qué lo escuchamos otra vez.',
    art: {
      key: 'leviatan',
      title: 'Frontispicio de Leviatán',
      author: 'Abraham Bosse para Thomas Hobbes',
      year: '1651',
      alt: 'Grabado del frontispicio de Leviatán: un gigante coronado, con espada y báculo, cuyo cuerpo está formado por cientos de personas pequeñas',
      reflection: 'Mira de cerca el cuerpo del gigante: está hecho de cientos de personas. Así entendemos una profesión. No existe sola; la sostienen todos los que confían en ella.'
    },
    paragraphs: [
      'Cuando grabamos Datos a luca, sentíamos que el dilema ya estaba resuelto: Valeria no debía cargar la base y punto. Semanas después lo volvimos a escuchar y algo nos incomodó. Habíamos dedicado todo el episodio a si debía decir que no, y casi nada a lo que le pasaba después de decirlo.',
      'El caso se cuenta rápido. Lima, fin de trimestre, una aseguradora que no llega a su meta. Ricardo, el jefe, compra por 1500 soles un Excel con 200 000 nombres, DNI y celulares, el mismo formato que circula en los bots de Telegram. Si la campaña no sale, se van doce personas del área comercial, y una de ellas es el practicante que Valeria formó. Ella sabe que la Ley 29733 lo prohíbe. Lo que la paraliza no es la ley, es el costo.',
      'En estas semanas vimos que una profesión no es solo un oficio: es un compromiso con el cuerpo social. La sociedad nos confía algo (en nuestro caso, sus datos) y espera que respondamos por cómo lo usamos. Los colegios profesionales existen para cuidar ese pacto, y su código de ética es la versión escrita de él. Entonces, ¿qué pasa cuando el pacto falla justo cuando alguien lo necesita?',
      'Así que hicimos algo que casi nunca hacemos con un trabajo ya entregado: volver a él con ojos críticos. Esta vez, con el Código de Ética del Colegio de Ingenieros del Perú al lado. ¿Revisar lo que uno mismo hizo es admitir que se equivocó, o es la única forma de aprender de verdad?'
    ],
    question:
      'Si Valeria cumple todo lo que el código le pide, ¿el código la respalda? ¿O solo la deja con la conciencia tranquila y el problema intacto?'
  },
  {
    id: 'podcast',
    n: 2,
    tag: 'Fragmento del podcast',
    title: 'Doce contra doscientos mil',
    summary: 'Ricardo hace la cuenta como Mill; Valeria responde como Kant.',
    art: {
      key: 'panoptico',
      title: 'Plano del panóptico de Jeremy Bentham',
      author: 'Willey Reveley',
      year: '1791',
      alt: 'Plano y corte de una cárcel circular: las celdas rodean una torre central desde la que se puede vigilar a todos',
      reflection: 'Desde la torre se ve cada celda, pero el preso nunca sabe si lo están mirando, así que se porta bien por si acaso. Foucault lo usó para explicar cómo nos moldea la vigilancia. Valeria se pregunta lo contrario: ¿y si nadie mira?'
    },
    paragraphs: [
      'El corazón del episodio es una discusión de cinco minutos. Ricardo no niega que los datos sean robados; prefiere hacer cuentas. Valeria no discute las cuentas; discute la regla.'
    ],
    fragment: {
      label: 'Así lo grabamos',
      lines: [
        { who: 'Ricardo', text: 'Haz la cuenta conmigo: 12 personas conservan su trabajo; a cambio, cada cliente recibe una llamada. ¿A quién le hacemos daño con una llamada?' },
        { who: 'Valeria', text: 'Si todos usáramos datos dudosos cada vez que nuestro equipo lo necesita, nadie podría confiar en darle su número a una empresa. Y yo no puedo querer que eso sea la regla para todos.' },
        { who: 'Valeria', text: 'Si no hubiera meta, ¿tú comprarías esta base?' },
        { who: 'Ricardo', text: 'No.' }
      ]
    },
    after: [
      'Ricardo piensa como Mill: el mayor bien para el mayor número. Valeria piensa como Kant: actúa solo según una regla que podrías querer para todos. Y seamos honestos: cuando grabamos, a varios nos sonaba más humano Ricardo. Él hablaba de personas con nombre; ella, de reglas. ¿No te pasó lo mismo al escucharlo?',
      'Pero ese «no» de Ricardo lo cambia todo. Si sin la meta no compraría la base, sus razones no son suyas: son del directorio, de la costumbre, del «así funciona el sector». Kant le llama heteronomía. Y la otra frase que nos quedó dando vueltas es la de Valeria: «si lo hago solo cuando alguien me vigila, eso ya no es ética, sino miedo». Foucault decía que las instituciones nos moldean vigilándonos. Entonces, ¿qué queda de nosotros cuando nadie nos mira?',
      'Y algo más: Ricardo no es un villano. En el experimento de la prisión de Stanford, estudiantes comunes se volvieron crueles solo porque les tocó el papel de guardias (Alvarez, 2015). Zimbardo (2008) lo resume así: la situación puede convertir a gente corriente en monstruos o en héroes. Ricardo es gente corriente con una meta encima. ¿Estamos seguros de que nosotros, en su silla, haríamos otra cosa?'
    ],
    question:
      '¿Cuántas de las decisiones que tomamos «por la empresa» son realmente nuestras, y cuántas son solo la presión hablando con nuestra voz?'
  },
  {
    id: 'reaccion',
    n: 3,
    tag: 'Fragmento del video-reacción',
    title: 'La cuenta estaba mal hecha',
    summary: 'Al leer a Mill descubrimos que Ricardo se olvidó de 200 000 personas.',
    art: {
      key: 'censo',
      title: 'El censo de Belén',
      author: 'Pieter Bruegel el Viejo',
      year: '1566',
      alt: 'Pintura de un pueblo nevado lleno de gente: a la izquierda, una multitud hace cola ante una posada para ser registrada',
      reflection: 'Bruegel pintó un censo: un pueblo entero haciendo cola para quedar anotado en un registro. Cada figura tiene frío, prisa, algo que hacer. En el libro del recaudador, en cambio, solo queda un nombre. Eso es una fila de Excel.'
    },
    paragraphs: [
      'Lo que más nos sorprendió al revisar el podcast fue darnos cuenta de que el choque entre Kant y Mill era, en parte, un error de suma. Leímos Utilitarianism y Mill es claro: lo que importa es la felicidad de todos los afectados, no solo la de quienes están en la reunión.'
    ],
    fragment: {
      label: 'Lo que dijimos en el video',
      lines: [
        { text: 'Ricardo contó a los 12 de la oficina y se olvidó de las 200 000 personas del Excel.' },
        { text: 'Una persona con discapacidad visual que hace sus trámites por teléfono, o alguien de una zona rural sin internet, no tiene forma de saber si esa llamada es una venta o una estafa.' }
      ]
    },
    after: [
      'O sea, Mill bien aplicado también dice que no. ¿Por qué entonces nos pareció tan convincente Ricardo? Creemos que porque el practicante tiene cara y las 200 000 personas no: son filas de un Excel. Ese es un riesgo muy propio de nuestra carrera. Trabajamos con datos todo el día, y es facilísimo olvidar que detrás de cada fila hay alguien.',
      'Y no son filas cualquiera. Las personas con discapacidad visual y las de zonas con poca conectividad son justo las poblaciones vulnerables que nombramos en nuestro Manifiesto. Las escribimos ahí en la semana 2, y en el podcast casi las olvidamos.'
    ],
    question:
      '¿Es justo que nos pese más la persona que vemos que las miles que nunca vamos a ver? ¿Y quién decide a quién vemos?'
  },
  {
    id: 'vacios',
    n: 4,
    tag: 'Humanización: los vacíos',
    title: 'Lo que el código no dice',
    summary: 'Los artículos 29 y 34 le dicen qué no hacer, pero la dejan sola.',
    art: {
      key: 'interior',
      title: 'Interior con mujer de espaldas',
      author: 'Vilhelm Hammershøi',
      year: '1903–1904',
      alt: 'Pintura en tonos grises: una mujer vestida de negro, de espaldas, sola en una habitación casi vacía',
      reflection: 'Una mujer de espaldas en un cuarto casi vacío. Así imaginamos a Valeria después de decir que no: con la razón de su lado y nadie alrededor.'
    },
    paragraphs: [
      'Primero, una distinción que nos ayudó mucho: no todas las normas son iguales. En el caso de Valeria, tres normas jalan para lados distintos. La legal, la Ley 29733, dice que no. La social, el «así funciona el sector», dice que todos lo hacen. La moral, su conciencia, dice que esas personas no son un medio. El código deontológico debería ser el puente entre las tres. ¿Lo es?',
      'Revisamos dos artículos del Código de Ética del Colegio de Ingenieros del Perú. A primera vista, Valeria tiene el código de su lado. Pero cuando lo lees pensando en ella, en ese día y con esa presión, aparecen los huecos.'
    ],
    fragment: {
      label: 'Código de Ética del CIP',
      lines: [
        { who: 'Art. 29, inc. a)', text: '«Aceptar como obligación señalar a la comunidad o a la autoridad la ocurrencia de hechos contrarios al bienestar o a la salud de la sociedad y no proteger con su silencio intereses o personas que los conculquen».' },
        { who: 'Art. 34, inc. c)', text: 'Es falta grave «aceptar en materias de su competencia y responsabilidad órdenes de superiores jerárquicos que vulneren la ética o la técnica profesional».' }
      ]
    },
    after: [
      'El artículo 29 dice que quedarse callada también es una falta. Bien. Pero no dice ante quién hablar: ¿Ricardo, el directorio, una autoridad? No dice qué pasa si la sancionan por hacerlo. Y no menciona los datos personales, que es justo de lo que trata el caso. Desde el contrato social, Hobbes diría que una norma sin una autoridad que la haga cumplir es solo una buena intención. Si el código no protege a quien denuncia, denunciar depende de la valentía de cada uno. Y con eso cuenta quien dice «nadie va a auditar de dónde vino este Excel».',
      'El artículo 34 tiene el problema al revés. Si Valeria carga la base, la sancionada es ella. ¿Y Ricardo, que dio la orden? ¿Y el directorio, que puso la meta? Nada. Toda la responsabilidad cae en el último eslabón, el que tiene menos poder. Locke nos ayuda a ver que Valeria tiene derecho a negarse: una orden que pasa por encima de los derechos de otros pierde legitimidad.',
      'Y queda el vacío más humano de todos, el choque entre el código y la conciencia personal. Hasta aquí iban juntos; el choque aparece después. El código le dice que no obedezca, pero no dice nada del practicante. Ella sabe lo que tiene que hacer y aun así le duele. Eso el código no lo contempla.'
    ],
    question:
      'Un código que te dice qué no hacer, pero te deja sola con las consecuencias, ¿te protege o solo te juzga?'
  },
  {
    id: 'propuesta',
    n: 5,
    tag: 'Humanización: la propuesta',
    title: 'Tres cambios para que decir que no sea posible',
    summary: 'Reformamos los artículos 29 y 34 y proponemos uno nuevo, el 29-A.',
    art: {
      key: 'juramento',
      title: 'El juramento del Juego de Pelota',
      author: 'Jacques-Louis David',
      year: '20 de junio de 1789',
      alt: 'Pintura de una multitud en un salón que levanta los brazos para jurar, alrededor de un hombre de pie sobre una mesa',
      reflection: 'En 1789, cientos de diputados juraron no separarse hasta darse una nueva constitución. Para Rousseau, una norma es legítima cuando nace de todos y no de unos pocos. Reescribir un código es eso: ponerse de acuerdo sobre cómo queremos vivir juntos.'
    },
    paragraphs: [
      'Humanizar el código, para nosotros, no es hacerlo más blando. Es escribirlo para la persona que de verdad decide: la que trabaja en una cadena con jefes, metas y miedo, y no para un ingeniero ideal que decide solo y sin presión. Propusimos tres cambios.'
    ],
    cards: [
      {
        tag: 'Art. 29',
        title: 'Que denunciar tenga un camino',
        points: [
          'Que diga a quién acudir: la empresa, el Colegio o la autoridad.',
          'Que mencione expresamente los datos personales.',
          'Que el Colegio defienda a quien denuncia y es castigado por hacerlo.'
        ],
        basis: 'Hobbes: una obligación que nadie respalda no se llega a cumplir.'
      },
      {
        tag: 'Art. 34',
        title: 'Que la responsabilidad suba por la cadena',
        points: [
          'Que quien da la orden reciba una sanción más dura que quien la cumple.',
          'Que la presión de un superior cuente a favor de quien la recibió.'
        ],
        basis: 'Rousseau: una norma impuesta por unos pocos no es legítima, y la meta la impuso el directorio.'
      },
      {
        tag: 'Art. 29-A (nuevo)',
        title: 'Ningún dato sin saber de dónde viene',
        points: [
          'El ingeniero no usa datos personales sin conocer su origen, aunque se lo ordene un jefe.',
          'Si se niega, avisa a la autoridad de protección de datos personales y propone una alternativa legal.'
        ],
        basis: 'Kant: usar los datos de alguien sin su permiso es tratarlo solo como un medio. La Ley 29733 ya exige consentimiento; el 29-A lleva esa exigencia a quien ejecuta.'
      }
    ],
    after: [
      'Fíjate en que ninguno de los tres cambios le pide a Valeria ser más valiente. Lo que hacen es quitarle peso de encima: le dan un lugar adonde ir, alguien que la respalde y un reparto más justo de la culpa.'
    ],
    question:
      '¿Un código debería pedirnos ser héroes, o debería hacer que lo correcto no requiera heroísmo?'
  },
  {
    id: 'cierre',
    n: 6,
    tag: 'Cierre',
    title: 'Negarse no basta',
    summary: 'Weber: convicción y responsabilidad. Y nuestro compromiso.',
    art: {
      key: 'samaritano',
      title: 'El buen samaritano (según Delacroix)',
      author: 'Vincent van Gogh',
      year: '1890',
      alt: 'Pintura de colores intensos: un hombre sube a un herido a su caballo mientras, al fondo, dos figuras se alejan por el camino',
      reflection: 'Fíjate en el fondo: dos personas se alejan por el camino. Pasaron junto al herido y siguieron. No le hicieron nada… ¿o sí? Eso es la responsabilidad por omisión.'
    },
    paragraphs: [
      'Aunque el código cambie, Valeria sigue decidiendo bajo presión. Su jefe le dice «la decisión es mía», sus compañeros no dicen nada y, si a las cinco no está la campaña, empiezan los despidos.',
      'Weber distingue dos éticas y dice que un buen profesional necesita las dos. Si Valeria solo rechaza la orden, Ricardo le pasa el archivo a otro analista, la base se carga igual y el practicante pierde su puesto igual. Son las consecuencias no deseadas de una decisión correcta. ¿De qué sirvió entonces su «no»?'
    ],
    after: [
      'Por eso creemos que lo correcto era no cargar la base, y en eso coinciden Kant y el propio Mill bien aplicado. Pero negarse no basta: hay que dejarlo por escrito, avisar y proponer otra salida. Y los que no hicieron nada también respondieron. Es la responsabilidad por omisión: Ricardo nunca cuestionó la meta y los demás callaron. No actuar también fue una decisión.',
      'Aquí volvemos a Zimbardo (2008). Para él, el héroe no es alguien extraordinario, sino una persona común que actúa cuando los demás se quedan quietos. En esa oficina no hacía falta un héroe solitario; hacía falta que alguien más dijera «yo tampoco la cargo».',
      'Entonces, ¿el código respalda a Valeria? Solo en parte. Le dice qué no hacer, pero la deja sola con las consecuencias. Y eso no debería depender del valor de una sola persona.'
    ],
    question:
      'En el podcast preguntamos si cargarías el archivo sabiendo que nadie va a preguntar de dónde salió. Hoy agregamos otra: si quien se niega es tu compañero de al lado, ¿te quedarías callado?'
  }
];
