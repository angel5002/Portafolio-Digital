// Contenido del Manifiesto de Identidad Ética.
// Fuente: fichas AC1 (metáfora y propósito), AC2 (poblaciones vulnerables)
// y AC3 (jerarquía de valores) del equipo "Los Estoicos". Los textos se
// transcriben de las fichas con correcciones mínimas de tipeo.

export const metaphor = {
  title: 'La torre de Babel',
  author: 'Pieter Bruegel el Viejo',
  year: 'ca. 1565',
  museum: 'Museo Boijmans Van Beuningen, Rotterdam',
  url: 'https://www.boijmans.nl/en/collection/in-depth/bruegel-s-tower-of-babel',
  reference:
    'Bruegel el Viejo, P. (ca. 1565). La torre de Babel [Pintura]. Museo Boijmans Van Beuningen, Rotterdam, Países Bajos.',
  description:
    'Esta pintura representa un conocido relato en el que un grupo de personas intenta construir una exuberante estructura para alcanzar el cielo. Visualmente, la obra muestra un proyecto arquitectónico inmenso y complejo en plena construcción, pero con fallas estructurales. Esto representa el fracaso de una gran ambición que colapsa, no por falta de esfuerzo o recursos, sino por el castigo de la «confusión de lenguas»: la absoluta incapacidad de los constructores para comunicarse, coordinarse y mantener una visión unificada.',
  quote:
    'Una torre no se derrumba por falta de esfuerzo, sino porque los constructores dejaron algo de lado sin notarlo.'
};

// Introducción reflexiva al propósito (redacción del portafolio; el texto
// literal de la ficha AC1 se conserva en `purpose.team`).
export const purposeEssay = [
  'Una carrera que se llama Ingeniería Empresarial y de Sistemas suena a negocios y a tecnología, no a ética. Por eso conviene empezar por la pregunta incómoda: ¿de dónde nace lo ético en lo que hacemos? La torre de Babel nos dio la respuesta. La torre no cae por falta de piedras ni de esfuerzo: cae cuando los constructores dejan de entenderse. Una organización es exactamente eso, personas coordinándose a través de procesos y de sistemas. Y cada decisión de diseño, un formulario, un flujo de cobro, un indicador de rendimiento, fija de antemano cómo será tratada una persona que no estuvo en la reunión donde se decidió. Ahí aparece la ética: no como un anexo al final del proyecto, sino en el instante en que una decisión técnica se convierte en una decisión sobre alguien.',
  'Aristóteles lo diría de otra forma: toda práctica tiene un telos, un fin propio que la justifica y que no se confunde con lo que se obtiene a cambio. Para nuestra carrera, ese fin no es la rentabilidad. La rentabilidad es un bien externo, necesario para que la organización exista, pero insuficiente para decir que funciona bien. El bien interno de la ingeniería empresarial es que la organización funcione para quienes la habitan y dependen de ella. Cuando decimos que nuestro telos es integrar éticamente el negocio y la tecnología, queremos decir algo preciso: que la eficiencia es un medio y la persona es el fin, nunca al revés. Es la fórmula de Kant, y es también lo que Giusti llama el sentido de la ética: no un catálogo de normas, sino la pregunta por cómo vivir bien con otros. En nuestro campo esa pregunta se traduce en dos más concretas: ¿para quién funciona este sistema y a quién deja fuera?',
  'De ahí se desprenden los otros dos conceptos. La areté, la excelencia, no es la perfección técnica sino el hábito de decidir bien cuando el plazo aprieta y el presupuesto manda; se demuestra en la decisión pequeña que nadie va a revisar. Y la eudaimonía, el florecimiento, no se mide en el tablero de la empresa sino en la vida de quienes usan lo que construimos. Por eso este Manifiesto no termina en una declaración: sigue con las poblaciones que nos comprometemos a proteger y con la jerarquía de valores desde la que decidimos. Son la forma concreta de responder a la pregunta con la que empezamos.'
];

export const purpose = {
  team:
    'Elegimos esta pintura porque ilustra la dificultad y responsabilidad moral de estructurar proyectos de índole empresarial. La alegoría del caos en Babel muestra que sin organización ni comunicación hasta las estructuras más complejas colapsan. Esto define a la Ingeniería Empresarial y de Sistemas: nuestro telos, es decir, el propósito intrínseco de la profesión, es integrar éticamente el negocio y la tecnología. De esta manera, ponemos en proa nuestras propias ambiciones y tendemos hacia la excelsitud con areté, aplicando el máximo rigor moral y técnico en cada decisión para no vulnerar a las personas. Finalmente, al evitar el colapso organizativo, nuestro ejercicio converge hacia el concepto de la eudaimonía, el cual busca el florecimiento y bienestar del ser humano mediante soluciones que aporten progreso equitativo, estabilidad y dignidad a la sociedad.',
  career:
    'El propósito es asegurar que la innovación tecnológica sirva al bienestar colectivo, fomentando la transparencia de la información y la responsabilidad social para impulsar el desarrollo equitativo y la modernización en la sociedad peruana, sin vulnerar derechos ni crear desigualdades.'
};

export const concepts = [
  {
    greek: 'τέλος',
    name: 'Telos · finalidad',
    text: 'Porque su fin supremo no es solo la rentabilidad, sino construir sistemas justos y transparentes al servicio de las personas.'
  },
  {
    greek: 'ἀρετή',
    name: 'Areté · excelencia',
    text: 'Porque es la excelencia moral de tomar decisiones técnicas con integridad, evitando sesgos y no causando daño.'
  },
  {
    greek: 'εὐδαιμονία',
    name: 'Eudaimonía · florecimiento',
    text: 'Porque busca la felicidad humana al crear un entorno corporativo y digital que aporte equidad, confianza y bienestar a la sociedad.'
  }
];

export interface Vulnerable {
  short: string;
  who: string;
  why: string;
  principle: string;
  note: string;
}

export const vulnerables: Vulnerable[] = [
  {
    short: 'Zonas con poca conectividad',
    who: 'Clientes de zonas con poca conectividad que no pueden acceder a promociones, soporte o compras.',
    why: 'Es usual en el mercado migrar ventas y servicios asumiendo que el cliente tiene internet y dispositivos propios; por ende, quienes viven en zonas lejanas como la sierra o la selva quedan sin el soporte que reciben los usuarios urbanos.',
    principle: 'Justicia',
    note: 'Lo cuestionable es que esa decisión no es un error técnico, es una prioridad: es más barato ignorar al usuario rural que adaptar el sistema para él.'
  },
  {
    short: 'Personas con discapacidad',
    who: 'Personas con discapacidad visual o motora que intentan usar apps bancarias, páginas web de trámites o sistemas de atención al cliente sin diseño adecuado.',
    why: 'Al diseñar o evaluar plataformas de atención al cliente, los sistemas suelen aprobarse pensando en el usuario común, sin lector de pantalla ni navegación por teclado. En el Perú esto es común en la banca y en trámites como los de RENIEC o SUNAT, donde la accesibilidad se ve limitada.',
    principle: 'Autonomía',
    note: 'Precisamente por la pérdida de control e independencia sobre gestiones que les corresponden: el sistema debería facilitarles el acceso y termina exigiéndoles herramientas que no pueden usar.'
  },
  {
    short: 'Microempresarios informales',
    who: 'Microempresarios informales que deben adoptar plataformas digitales de venta, cobro o facturación electrónica exigidas por ley o por las grandes cadenas con las que trabajan.',
    why: 'No cuentan con conocimiento técnico, capital ni tiempo para implementar estos sistemas, lo que termina en dependencia de terceros que a veces los estafan o configuran mal sus cuentas, o simplemente quedan fuera del mercado formal por no poder cumplir.',
    principle: 'No maleficencia',
    note: 'Si un sistema exige algo que la persona no puede cumplir por sí sola, el problema no es del microempresario, es del diseño que no pensó en él.'
  }
];

export const commitment =
  'Como en la metáfora, una torre no se derrumba por falta de esfuerzo, sino porque los constructores dejaron algo de lado sin notarlo. Lo mismo pasa con un sistema: se construye pensando en el usuario ideal, no en el real, y así se termina excluyendo a quien más lo necesita sin siquiera darse cuenta. Por eso nuestro compromiso no es solo escuchar antes de digitalizar, sino aceptar que como equipo también podemos caer en ese mismo error si no cuestionamos nuestras propias suposiciones.';

// ─── AC3 · Jerarquía de valores (Scheler) ──────────────────────────────────

export const valuesRank = [
  { n: 'I', name: 'Valores espirituales', type: 'Justicia, verdad, responsabilidad y dignidad humana' },
  { n: 'II', name: 'Valores vitales', type: 'Bienestar, salud y calidad de vida' },
  { n: 'III', name: 'Valores económicos', type: 'Rentabilidad, eficiencia y utilidad' },
  { n: 'IV', name: 'Valores de lo agradable', type: 'Comodidad, facilidad de uso y satisfacción inmediata' },
  { n: 'V', name: 'Valores de lo sagrado', type: 'Principios y convicciones morales' }
];

export const schelerCategories = [
  { key: 'vitales', name: 'Valores vitales', desc: 'Relacionados con la vida, la salud y el bienestar físico. Lo sano vs. lo enfermo.' },
  { key: 'agradable', name: 'Valores de lo agradable', desc: 'Lo placentero vs. lo desagradable. Responden a la sensación inmediata.' },
  { key: 'espirituales', name: 'Valores espirituales', desc: 'Lo bello, lo justo, lo verdadero. Trascienden lo biológico y lo útil.' },
  { key: 'economicos', name: 'Valores económicos', desc: 'Lo útil, lo rentable, lo eficiente. Instrumentales al servicio de otros valores.' },
  { key: 'sagrado', name: 'Valores de lo sagrado', desc: 'Lo santo vs. lo profano. El más alto rango en la jerarquía de Scheler.' }
] as const;

export type Has = 'si' | 'parcial' | 'no';

export interface SchelerSheet {
  memberId: string;
  rows: { has: Has; example: string }[]; // mismo orden que schelerCategories
}

export const schelerSheets: SchelerSheet[] = [
  {
    memberId: 'grecia-vergara',
    rows: [
      { has: 'parcial', example: 'Si bien en proyectos con software o aplicaciones tecnológicas se espera cumplir con tiempos de entrega, excelencia y una expectativa de perfección, la salud mental y física tiende a dejarse de lado; más bien resulta sacrificada. Existe consciencia sobre la importancia del bienestar, pero en la realidad muchas veces es lejana.' },
      { has: 'si', example: 'La tendencia es solucionar problemas que se vean bien, sean fáciles de usar a primera vista y generen satisfacción. Se aplica a diario para dar satisfacción inmediata, aunque seamos conscientes de que a veces esa comodidad nos distrae de revisar si el fondo del sistema es realmente ético o inclusivo.' },
      { has: 'parcial', example: 'Cuando se analizan datos o elaboran procesos, lo correcto es mostrar la verdad de cómo está operando la organización y buscar un trato justo; ese bienestar común es el que lo impulsa. El problema es que muchas veces se prefiere disfrazar los resultados o acomodarlos para beneficio propio o para evitar conflictos.' },
      { has: 'si', example: 'Es la base sobre la que nos enseñan y nos piden tomar decisiones. En cualquier proyecto lo primero que se evalúa es cuánto dinero se va a ahorrar, cuán rentable es, qué tan rápido se recupera y cuán riesgoso será, tratándolo como si fuera el único objetivo que de verdad importa.' },
      { has: 'parcial', example: 'En lo técnico no se involucra lo santo ni decisiones basadas en dogmas, porque se rige por lógica y marcos normativos. Sin embargo, sí podría actuar como un límite moral para no justificar la corrupción, no manipular datos y recordar que el trabajo tiene un sentido de servicio y respeto hacia los demás que va más allá del beneficio material.' }
    ]
  },
  {
    memberId: 'laryel-negron',
    rows: [
      { has: 'parcial', example: 'En el desarrollo de software para centros de salud u hospitales en regiones del Perú, priorizar interfaces accesibles y sistemas estables de historias clínicas para evitar fallas críticas en la atención de pacientes.' },
      { has: 'si', example: 'Diseñar interfaces intuitivas y experiencias de usuario (UX/UI) amigables que reduzcan la fricción y el estrés del usuario al interactuar con aplicaciones cotidianas.' },
      { has: 'si', example: 'Velar por la seguridad de la información y la privacidad de los datos personales de los usuarios peruanos frente al incremento de ciberdelitos y estafas digitales.' },
      { has: 'parcial', example: 'Minimizar los costos de infraestructura en la nube o licencias para microempresas peruanas, buscando la rentabilidad operativa sin descuidar la seguridad del sistema.' },
      { has: 'parcial', example: 'Asumir con profunda integridad el rol del ingeniero como custodio de la confianza digital y la justicia social, protegiendo a las poblaciones más vulnerables ante la exclusión tecnológica.' }
    ]
  },
  {
    memberId: 'hideki-fukuhara',
    rows: [
      { has: 'parcial', example: 'En el diseño de modelos de transporte público en Lima, la autonomía física del individuo para moverse libre y seguramente a menudo se ve limitada por regulaciones centralizadas que impiden el surgimiento de alternativas privadas más seguras.' },
      { has: 'si', example: 'Al desarrollar interfaces (UI/UX) para plataformas digitales, buscamos eliminar fricciones para que el usuario ejerza su libre elección de consumo o navegación de la forma más fluida y satisfactoria posible.' },
      { has: 'parcial', example: 'La libertad individual y el derecho a la privacidad (criptografía, protección de datos). Es un ideal que frecuentemente choca con las exigencias de vigilancia del Estado o la coacción para ceder datos personales.' },
      { has: 'si', example: 'El uso de frameworks de arquitectura empresarial busca maximizar la eficiencia y rentabilidad a través del libre intercambio, permitiendo que las empresas compitan libremente en el mercado ofreciendo mejores servicios.' },
      { has: 'no', example: 'Aunque lo «santo» no aplica en la ingeniería secular, desde la ética libertaria el equivalente supremo es la autopropiedad (el individuo es soberano de sí mismo y de su información), algo que rara vez se respeta en las normativas tecnológicas actuales.' }
    ]
  },
  {
    memberId: 'angel-vargas',
    rows: [
      { has: 'parcial', example: 'Cuando un proyecto se atrasa, lo primero que se sacrifica son las horas de sueño y no la fecha de entrega. En prácticas pasa igual: se pide terminar el sistema a tiempo aunque el equipo esté agotado. Sabemos que la salud importa más, pero ¿por qué siempre cede ella y nunca el plazo?' },
      { has: 'si', example: 'Nos preocupa mucho que las cosas se vean bien. Una presentación con colores ordenados o una app bonita convence rápido a quien la mira. La pregunta es si eso realmente resuelve el problema o solo hace que se sienta resuelto.' },
      { has: 'parcial', example: 'Al mejorar un proceso de una empresa a veces se descubre algo incómodo, como que un puesto de trabajo ya no sería necesario. Lo justo sería decirlo con claridad en el informe. Lo cómodo es escribir que hubo una mejora y no mencionar a quién afecta. Muchas veces gana lo cómodo.' },
      { has: 'si', example: 'Es lo primero que nos enseñan a mirar. En clase y en las empresas siempre se pregunta cuánto cuesta, cuánto se ahorra y en cuánto tiempo se recupera. Recién después aparece la pregunta de a quién beneficia o a quién perjudica.' },
      { has: 'parcial', example: 'En nuestra carrera no decidimos por creencias religiosas sino por normas y datos. Aun así, hay cosas que uno no debería hacer nunca, como cambiar cifras de un informe para que una empresa gane una licitación del Estado. Ese límite no se discute, aunque convenga, y eso es lo más parecido a algo sagrado que tenemos.' }
    ]
  },
  {
    memberId: 'jose-vigil',
    rows: [
      { has: 'si', example: 'Crear sistemas que realmente ayuden a las personas en su día a día. Por ejemplo, una plataforma que facilite el trabajo de los empleados y reduzca tareas complicadas o repetitivas, permitiéndoles trabajar de una manera más cómoda y eficiente.' },
      { has: 'parcial', example: 'Que los sistemas o aplicaciones sean fáciles de entender y utilizar. No basta con que un sistema funcione bien: también debe generar una buena experiencia para el usuario y hacer que su trabajo sea más sencillo y agradable.' },
      { has: 'si', example: 'Aplicar los conocimientos de manera responsable y ética. Que las decisiones y los sistemas desarrollados no solo beneficien económicamente a una empresa, sino que también aporten algo positivo a las personas y a la sociedad.' },
      { has: 'si', example: 'Ayudar a las empresas a mejorar sus procesos mediante la tecnología: por ejemplo, un sistema que permita controlar mejor las ventas, el inventario o la información, ahorrando tiempo, reduciendo errores y mejorando los resultados.' },
      { has: 'parcial', example: 'No perder los principios y valores al ejercer la profesión. Aunque se trabaje principalmente con empresas y tecnología, siempre actuar con respeto, honestidad y responsabilidad hacia las personas que utilicen o se vean afectadas por los sistemas desarrollados.' }
    ]
  },
  {
    memberId: 'leonardo-abanto',
    rows: [
      { has: 'si', example: 'El desarrollo de software debe cuidar activamente la salud integral del usuario y del equipo de desarrollo, previniendo el estrés laboral severo (como el burnout por malas prácticas de estimación de proyectos) y diseñando sistemas que no promuevan la adicción ni el sedentarismo extremo en la sociedad peruana.' },
      { has: 'parcial', example: 'A veces se prioriza únicamente una estética atractiva o animaciones llamativas (lo agradable visualmente) por encima de una verdadera accesibilidad para personas con discapacidad o adultos mayores que no dominan la tecnología.' },
      { has: 'si', example: 'Implementar la equidad y la justicia digital en plataformas del Estado peruano, asegurando que los servicios públicos en línea sean verdaderamente inclusivos y no discriminen a comunidades nativas o personas sin acceso a alta conectividad.' },
      { has: 'si', example: 'La optimización de bases de datos y recursos en la nube para reducir costos operativos en pymes peruanas, entendiendo que la eficiencia económica es el medio para que las empresas crezcan, mas no el fin último de la ingeniería.' },
      { has: 'parcial', example: 'Asumir una profunda convicción ética frente al uso de la inteligencia artificial y la manipulación de datos masivos (big data), respetando la dignidad humana por encima de cualquier intento de comercializar información sensible de los ciudadanos peruanos.' }
    ]
  }
];

export const tension =
  'En nuestra carrera existe una tensión constante entre los valores económicos y los valores espirituales y vitales. Muchas veces las empresas buscan reducir costos, aumentar la rentabilidad y mejorar la eficiencia de sus sistemas, pero esto puede generar que se deje de lado la accesibilidad, la privacidad y el bienestar de los usuarios. Un ejemplo en el contexto peruano ocurre cuando se implementan plataformas digitales pensando solo en usuarios con recursos tecnológicos, excluyendo a personas con poca conectividad o discapacidad. Por ello, consideramos que la eficiencia económica debe ser un medio y no el objetivo final de la ingeniería.';

export const axiologicalPosition =
  'Como equipo priorizamos los valores espirituales y vitales sobre los económicos, porque nuestra profesión no debe enfocarse únicamente en generar beneficios financieros, sino en crear soluciones responsables. Al igual que nuestra metáfora de la Torre de Babel, una estructura tecnológica solo puede sostenerse cuando considera a todas las personas involucradas. Por ello buscamos desarrollar sistemas eficientes, pero siempre respetando la dignidad, inclusión y bienestar de los usuarios.';
