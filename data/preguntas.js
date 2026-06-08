/* ============================================================
   LOS BIENES — Banco de preguntas para el Examen de Grado
   Fuente: Resumen del Prof. Juan Andrés Orrego Acuña
   ============================================================
   Estructura de temas (niveles) y tres tipos de carta:
     - flash : { q, a }                      (flashcard girable)
     - quiz  : { q, opts:[4], correct, exp } (alternativas)
     - vf    : { s, ok:true|false, exp }     (verdadero/falso)
============================================================ */

window.BIENES_TEMAS = [
  { id: "conceptos", nombre: "Conceptos Fundamentales", corto: "Conceptos", hue: 230 },
  { id: "corporales", nombre: "Corporales e Incorporales", corto: "Corp./Incorp.", hue: 265 },
  { id: "muebles",    nombre: "Muebles e Inmuebles",       corto: "Mueb./Inmueb.", hue: 200 },
  { id: "clasifA",    nombre: "Específicas · Consumibles · Fungibles", corto: "Esp./Cons./Fung.", hue: 160 },
  { id: "clasifB",    nombre: "Principales · Divisibles · Futuras · Universales", corto: "Princ./Univ.", hue: 130 },
  { id: "comercio",   nombre: "Comerciables · Apropiables · Nacionales · Registrables", corto: "Comercio/Estado", hue: 45 },
  { id: "teorias",    nombre: "Teorías y Autores",         corto: "Teorías", hue: 25 },
  { id: "paralelo",   nombre: "Derechos Reales vs. Personales", corto: "Reales/Personales", hue: 340 },
  { id: "cartillas",  nombre: "Cartillas · Resumen Visual", corto: "Cartillas", hue: 185 }
];

window.BIENES_DATA = {

/* ========================================================== */
conceptos: {
  flash: [
    { q: "¿Desde qué cinco puntos de vista se estudian los bienes?", a: "(a) Concepto; (b) clasificación; (c) facultades que sobre ellos puede tener una persona; (d) los modos de adquirir tales facultades; (e) la protección que el ordenamiento confiere a las facultades adquiridas." },
    { q: "¿Cómo pueden definirse los bienes? (dos doctrinas)", a: "No hay unanimidad. Para Alessandri/Kiverstein: cosas que, prestando utilidad al hombre, son susceptibles de apropiación privada. Para Somarriva: cosas materiales o inmateriales susceptibles de prestar utilidad y ser objeto de derecho." },
    { q: "¿Qué relación existe entre las cosas y los bienes según la primera doctrina?", a: "Las cosas son el género y los bienes la especie: no todas las cosas son bienes (el aire y la alta mar producen utilidad pero no pueden ser apropiados, por lo que no son bienes)." },
    { q: "¿Define el Código Civil chileno los términos 'cosa' y 'bien'?", a: "No los define y los emplea como sinónimos (arts. 565 y ss.). La distinción es obra de la doctrina." },
    { q: "Según Peñailillo, ¿qué función cumple la materia jurídica de los derechos reales?", a: "a) Fija o radica los bienes en el patrimonio de cada individuo, y b) determina los poderes o facultades que el sujeto tiene sobre ellos." },
    { q: "¿Por qué el Derecho clasifica las cosas? (tres razones)", a: "1° Para determinar qué reglas se aplican a cada categoría; 2° porque los requisitos para adquirir y enajenar no son comunes a todas; 3° porque tampoco son iguales los actos que se pueden ejecutar sobre ellas." }
  ],
  quiz: [
    { q: "El estudio de los bienes puede abordarse desde cinco ángulos. ¿Cuál NO es uno de ellos?", opts: ["Concepto", "Clasificación", "La capacidad de las personas", "Modos de adquirir"], correct: 2, exp: "Los cinco son: concepto, clasificación, facultades, modos de adquirir y protección. La capacidad de las personas no figura." },
    { q: "Según la etimología que cita Alessandri, la palabra 'bien' proviene del latín:", opts: ["bonus, de beare (hacer feliz)", "res (cosa)", "dominium (señorío)", "habere (tener)"], correct: 0, exp: "Alessandri: 'bien' viene del latín bonus, derivado de beare, hacer feliz." },
    { q: "¿Por qué el aire produce utilidad pero NO es un bien según Kiverstein?", opts: ["Porque es inmaterial", "Porque no puede ser objeto de propiedad privada", "Porque no presta utilidad real", "Porque el CC lo prohíbe expresamente"], correct: 1, exp: "Lo que caracteriza a los bienes no es la mera utilidad, sino la posibilidad de ser objeto de propiedad privada." },
    { q: "La norma constitucional que alude a bienes corporales e incorporales es el:", opts: ["Art. 19 N° 21 CPR", "Art. 19 N° 24 CPR", "Art. 20 CPR", "Art. 565 CC"], correct: 1, exp: "El art. 19 N° 24 CPR alude tanto a bienes corporales como incorporales." }
  ],
  vf: [
    { s: "El Código Civil chileno define expresamente qué es una 'cosa' y qué es un 'bien'.", ok: false, exp: "Falso. El CC no define ninguno de los dos términos y los usa como sinónimos." },
    { s: "Para la doctrina mayoritaria (Somarriva), los bienes pueden ser cosas materiales o inmateriales.", ok: true, exp: "Verdadero. La segunda corriente, más amplia y mayoritaria, abarca cosas materiales e inmateriales." },
    { s: "Según la primera doctrina, todas las cosas son bienes.", ok: false, exp: "Falso. Las cosas son el género y los bienes la especie; no todas las cosas son bienes." }
  ]
},

/* ========================================================== */
corporales: {
  flash: [
    { q: "¿Qué son las cosas corporales? (art. 565 inc. 1°)", a: "Las que tienen un ser real y pueden ser percibidas por los sentidos, como una casa o un libro. Se subdividen en muebles e inmuebles (art. 566)." },
    { q: "¿Qué son las cosas incorporales? (art. 565 inc. 2°)", a: "Las que consisten en meros derechos, como los créditos (derechos personales) y las servidumbres activas (derecho real). El art. 576 precisa que son derechos reales o personales." },
    { q: "¿Quién formuló originalmente la clasificación corporales/incorporales y por qué?", a: "El jurista romano Gayo, en sus Institutiones. Según Guzmán Brito, no obedeció a razones sustantivas sino metodológicas: encuadrar todo el Derecho en la tripartición personae, res y actiones." },
    { q: "¿Qué crítica formulan Planiol y Alessandri a esta clasificación?", a: "Que es incoherente: asocia en un mismo plano dos categorías radicalmente distintas (cosas materiales y derechos). Planiol dice que no es una clasificación sino una 'comparación incoherente'." },
    { q: "¿Cómo define el art. 577 el derecho real?", a: "'Aquél que tenemos sobre una cosa sin respecto a determinada persona.' Se concibe como relación persona-cosa, inmediata y absoluta." },
    { q: "¿Cómo se clasifican los derechos reales según su función?", a: "De goce (permiten utilizar directamente la cosa: dominio, usufructo, uso, habitación, servidumbre activa) y de garantía (utilizan la cosa por su valor de cambio: hipoteca, prenda, censo)." },
    { q: "¿En qué consiste la taxatividad (numerus clausus) de los derechos reales?", a: "Los derechos reales sólo son los que determina la ley y su estructura es fijada por ella; los particulares no pueden crear uno nuevo ni alterar el existente. Fundamento: las normas son de orden público y sus efectos erga omnes exigen definición legal previa." },
    { q: "¿Por qué en Roma se excluía al dominio de los bienes incorporales?", a: "Porque el derecho de propiedad se identificaba con la cosa misma sobre la que recaía (se decía 'mi casa', no 'mi derecho de propiedad sobre mi casa'), ya que el dominio es totalizador: envuelve toda la cosa." }
  ],
  quiz: [
    { q: "¿Cuáles son ejemplos de cosas incorporales según el art. 565?", opts: ["Una casa y un libro", "Los créditos y las servidumbres activas", "El aire y la alta mar", "Los animales y las plantas"], correct: 1, exp: "Las incorporales consisten en meros derechos: créditos (personales) y servidumbres activas (real)." },
    { q: "Para Planiol, la clasificación corporales/incorporales es en realidad:", opts: ["Una clasificación perfecta", "Una comparación incoherente", "Una creación de Justiniano", "Una norma de orden privado"], correct: 1, exp: "Planiol sostiene que no es una clasificación sino una 'comparación incoherente', pues opone los derechos a su objeto." },
    { q: "Los derechos reales de GARANTÍA son:", opts: ["Dominio, usufructo y uso", "Hipoteca, prenda y censo", "Habitación y servidumbre", "Sólo el dominio"], correct: 1, exp: "Los de garantía (hipoteca, prenda, censo) permiten utilizar la cosa indirectamente por su valor de cambio." },
    { q: "El historiador que explica que la clasificación de Gayo tuvo razón metodológica y no sustantiva es:", opts: ["Planiol", "Borda", "Guzmán Brito", "Peñailillo"], correct: 2, exp: "Guzmán Brito precisa que la motivación de Gayo fue sistemática, para organizar sus Instituciones." },
    { q: "¿Qué modos de adquirir se aplican SÓLO a los bienes corporales?", opts: ["La tradición y la prescripción", "La ocupación y la accesión", "La sucesión por causa de muerte", "Todos por igual"], correct: 1, exp: "La ocupación y la accesión sólo se aplican a bienes corporales; la tradición y prescripción tienen reglas distintas según corporal/incorporal." }
  ],
  vf: [
    { s: "Según el numerus clausus, los particulares pueden crear nuevos derechos reales en sus convenciones.", ok: false, exp: "Falso. No pueden crearlos ni alterar su contenido; sólo existen los que establece la ley." },
    { s: "El art. 576 establece que las cosas incorporales son derechos reales o personales.", ok: true, exp: "Verdadero." },
    { s: "Los derechos reales de goce permiten utilizar la cosa indirectamente por su valor de cambio.", ok: false, exp: "Falso. Eso describe los derechos reales de GARANTÍA. Los de goce permiten utilizar directamente la cosa." },
    { s: "La posición moderna mayoritaria rechaza por completo la categoría de cosas incorporales.", ok: false, exp: "Falso. La acepta, pero sólo para designar bienes inmateriales (obras del ingenio, invenciones), separando los derechos de la noción de 'cosas'." }
  ]
},

/* ========================================================== */
muebles: {
  flash: [
    { q: "¿Cómo se dividen las cosas corporales en muebles e inmuebles?", a: "Según puedan o no transportarse de un lugar a otro sin cambiar su naturaleza. Es la clasificación más importante del derecho moderno, con raíces en el Derecho medieval que protegía más a los inmuebles." },
    { q: "¿Qué son los muebles por anticipación? (art. 571)", a: "Cosas inmuebles (por naturaleza, adherencia o destinación) que, para constituir un derecho sobre ellas a favor de persona distinta del dueño, se reputan muebles antes de su separación del inmueble (ej: venta de madera de un bosque antes de talarla, frutos)." },
    { q: "¿Qué son los inmuebles por adherencia? (arts. 568-569)", a: "Los que adhieren permanentemente a un inmueble por naturaleza o a otro inmueble por adherencia: árboles, plantas, construcciones, durmientes y rieles del ferrocarril. La conexión es FÍSICA." },
    { q: "¿Qué son los inmuebles por destinación? (art. 570)", a: "Cosas muebles que la ley reputa inmuebles por una ficción, al estar destinadas permanentemente al uso, cultivo o beneficio de un inmueble: utensilios de labranza, animales de cultivo, abonos, maquinaria industrial adherente al suelo." },
    { q: "¿Qué diferencia a los inmuebles por adherencia de los por destinación?", a: "En los por adherencia hay conexión FÍSICA (pierden su individualidad y se vuelven parte del bien principal). En los por destinación la conexión es JURÍDICA con fundamento económico: el mueble conserva su individualidad y sólo se anexa al inmueble." },
    { q: "¿Qué tres requisitos exige el inmueble por destinación?", a: "1) La cosa mueble debe colocarse en un inmueble; 2) debe colocarse en interés del inmueble (uso, cultivo O beneficio — basta uno); 3) debe destinarse en forma permanente (no perpetua, pero sí con estabilidad y fijeza)." },
    { q: "¿Debe el dueño del inmueble destinar el mueble para que sea inmueble por destinación? (art. 570)", a: "Regla general: NO es necesario (esto diferencia a Chile del derecho comparado). Excepción: para utensilios de labranza/minería, animales de cultivo, abonos y maquinaria industrial adherente, SÍ se exige que la destinación provenga del dueño." },
    { q: "¿Cuándo cesa la calidad de inmueble por destinación? (art. 573)", a: "No cesa por separación momentánea. Sólo cesa cuando los muebles se separan con el objeto de darles un destino diferente, desapareciendo objetivamente el vínculo de destinación." }
  ],
  quiz: [
    { q: "La tradición de los bienes inmuebles se realiza por:", opts: ["Entrega material o simbólica (art. 684)", "Inscripción en el CBR competente (art. 686)", "La mera firma del contrato", "Decreto judicial"], correct: 1, exp: "Inmuebles: inscripción en el Conservador de Bienes Raíces (art. 686). Muebles: entrega material o simbólica (art. 684)." },
    { q: "El plazo de prescripción adquisitiva ordinaria es (art. 2508):", opts: ["1 año muebles / 3 años inmuebles", "2 años muebles / 5 años inmuebles", "5 años muebles / 10 años inmuebles", "Igual para ambos: 5 años"], correct: 1, exp: "Muebles: 2 años. Inmuebles: 5 años (art. 2508)." },
    { q: "La caución real sobre bienes muebles es la PRENDA; sobre inmuebles es la:", opts: ["Fianza", "Hipoteca", "Anticresis", "Servidumbre"], correct: 1, exp: "Muebles: prenda (art. 2384). Inmuebles: hipoteca (art. 2407)." },
    { q: "La lesión enorme procede sólo en compraventa y permuta de:", opts: ["Bienes muebles", "Bienes raíces", "Cualquier bien", "Derechos personales"], correct: 1, exp: "La lesión enorme sólo procede respecto de bienes raíces (art. 1891)." },
    { q: "Las acciones posesorias protegen la posesión de:", opts: ["Sólo los muebles", "Sólo los inmuebles (art. 916)", "Todos los bienes", "Sólo los derechos personales"], correct: 1, exp: "Las acciones posesorias sólo protegen la posesión de inmuebles (art. 916)." },
    { q: "La compraventa de un inmueble es un contrato:", opts: ["Consensual", "Solemne (escritura pública)", "Real", "Unilateral"], correct: 1, exp: "Inmuebles: solemne, requiere escritura pública (arts. 1443 y 1801). Muebles: consensual." },
    { q: "Para que un mueble sea inmueble por destinación, ¿qué fines basta cumplir?", opts: ["Los tres a la vez: uso, cultivo y beneficio", "Uno solo de los tres (uso, cultivo o beneficio)", "Sólo el beneficio económico", "Ninguno, basta colocarlo"], correct: 1, exp: "Basta uno de los tres fines (uso, cultivo O beneficio), según la Corte Suprema y el art. 4 del Código de Aguas." }
  ],
  vf: [
    { s: "La maquinaria de un establecimiento industrial adherente al suelo es un inmueble por destinación.", ok: true, exp: "Verdadero (art. 570), siempre que la destine el dueño del inmueble." },
    { s: "Robo y hurto sólo pueden recaer sobre bienes muebles; la apropiación de inmuebles ajenos es usurpación.", ok: true, exp: "Verdadero (materia penal: robo/hurto sobre muebles, usurpación sobre inmuebles)." },
    { s: "Los inmuebles por destinación dejan de serlo por su separación momentánea del inmueble.", ok: false, exp: "Falso (art. 573). No cesan por separación momentánea, sólo cuando se separan para darles un destino diferente." },
    { s: "En la sociedad conyugal el marido puede vender o gravar inmuebles sin autorización de la mujer.", ok: false, exp: "Falso (art. 1749). Para inmuebles requiere autorización de la mujer; muebles los administra sin esa restricción." },
    { s: "La ocupación sólo procede como modo de adquirir respecto de bienes muebles.", ok: true, exp: "Verdadero (art. 590 a contrario): la ocupación sólo procede sobre muebles." }
  ]
},

/* ========================================================== */
clasifA: {
  flash: [
    { q: "¿Qué es una cosa específica o cuerpo cierto?", a: "La individualmente determinada, dentro de un género también determinado; se distingue por sus caracteres propios. Ej: 'la pintura Angelmó, de 1936, de Arturo Pacheco Altamirano'." },
    { q: "¿Qué es una cosa genérica?", a: "La indeterminada individualmente, de un género determinado; está determinada sólo por los caracteres comunes a su género. Ej: 'una pintura al óleo con motivo marina'." },
    { q: "Pérdida fortuita: ¿qué ocurre con el cuerpo cierto y con el género?", a: "La pérdida fortuita del cuerpo cierto extingue la obligación (art. 1670). El género no perece: genus nunquam perit (art. 1510)." },
    { q: "¿Cuándo se confunde el art. 575 al hablar de fungibles?", a: "El art. 575, aunque alude erróneamente a cosas 'fungibles', en realidad recoge la distinción entre cosas CONSUMIBLES y no consumibles. La clasificación se aplica sólo a muebles." },
    { q: "Diferencia entre consumible OBJETIVA y SUBJETIVAMENTE.", a: "Objetivamente consumible: se destruye (natural o civilmente) por el primer uso. Subjetivamente consumible: siendo objetivamente no consumible, su primer uso para el actual titular importa enajenarla o destruirla (atendido el destino que le da)." },
    { q: "¿Qué son los criterios de fungibilidad y cuál es el correcto?", a: "(i) BGB alemán: fungibles las que se determinan por número, peso o medida (insuficiente, no capta la calidad). (ii) Igualdad del poder liberatorio (mayoritario): fungibles las que, por igualdad de hecho, cumplen las mismas funciones liberatorias; extensible a los hechos." },
    { q: "¿Puede una cosa ser fungible y cuerpo cierto a la vez?", a: "Sí. Un rifle 'Máuser' de cierto calibre es cosa genérica y fungible; pero si se lo individualiza por su número de serie, es cuerpo cierto, sin dejar de ser fungible. Son criterios distintos (determinación vs. similitud)." },
    { q: "¿Qué son los bienes deteriorables y corruptibles?", a: "Deteriorables ('gradualmente consumibles'): se deterioran por uso repetido (ropa); técnicamente son no consumibles. Corruptibles: consumibles que deben consumirse en breve tiempo pues pierden rápido su aptitud (art. 488)." }
  ],
  quiz: [
    { q: "El aforismo 'genus nunquam perit' significa que:", opts: ["El cuerpo cierto nunca perece", "El género no perece (art. 1510)", "Las cosas fungibles se destruyen siempre", "Toda obligación se extingue por caso fortuito"], correct: 1, exp: "El género no perece: el deudor de cosa genérica siempre puede cumplir mientras subsistan individuos del género." },
    { q: "El contrato de MUTUO sólo puede recaer sobre cosas:", opts: ["No consumibles", "Consumibles (art. 2196)", "Inmuebles", "No fungibles"], correct: 1, exp: "El mutuo sólo recae sobre cosas consumibles (art. 2196). El comodato y el arrendamiento, sobre no consumibles." },
    { q: "El usufructo que recae sobre cosas consumibles es en realidad un:", opts: ["Comodato", "Cuasiusufructo (arts. 764 y 789)", "Mutuo", "Arrendamiento"], correct: 1, exp: "El usufructo sólo recae sobre cosas no consumibles; cuando recae sobre consumibles, es un cuasiusufructo." },
    { q: "Una botella de vino de cosecha única destinada a exhibición en museo es:", opts: ["Objetivamente consumible y fungible", "Subjetivamente no consumible", "Inmueble por destinación", "Cosa genérica"], correct: 1, exp: "Siendo objetivamente consumible, está destinada a un uso distinto al consumo: subjetivamente no consumible." },
    { q: "La compensación legal procede cuando se deben:", opts: ["Cuerpos ciertos distintos", "Cosas genéricas fungibles de igual género y calidad (art. 1656)", "Un inmueble y un mueble", "Sólo derechos personalísimos"], correct: 1, exp: "No procede sobre cuerpo cierto; sí sobre cosas fungibles recíprocas de igual género y calidad (art. 1656)." }
  ],
  vf: [
    { s: "Por regla general, las cosas consumibles son también fungibles.", ok: true, exp: "Verdadero, lo que explicaría la confusión del art. 575. Aunque hay excepciones (la última botella de una cosecha: consumible y no fungible)." },
    { s: "Las partes no pueden hacer fungibles cosas que objetivamente no lo son.", ok: false, exp: "Falso. Existe fungibilidad subjetiva: las partes pueden, por ejemplo, aceptar en dación en pago bienes distintos a los debidos." },
    { s: "El deudor de cosa genérica puede enajenarla o destruirla mientras subsistan otras del mismo género.", ok: true, exp: "Verdadero (art. 1510). El deudor de cuerpo cierto, en cambio, debe conservar la cosa (arts. 1548-1549)." },
    { s: "Sólo puede haber error esencial en la identidad cuando la cosa es genérica.", ok: false, exp: "Falso. Sólo cabe error esencial en la identidad cuando la cosa es un cuerpo cierto (art. 1453)." }
  ]
},

/* ========================================================== */
clasifB: {
  flash: [
    { q: "¿Cuándo una cosa es principal y cuándo accesoria?", a: "Principal: tiene existencia independiente, sin necesidad de otras. Accesoria: está subordinada a otra sin la cual no puede subsistir (la hipoteca y la prenda son accesorias del crédito que garantizan)." },
    { q: "¿Qué cuatro criterios determinan cuál cosa es principal? (cosas accesorias)", a: "1° Existencia por sí misma; 2° finalidad (uso, cultivo, adorno o complemento de otra); 3° valor (la de mayor valor es principal, art. 659); 4° volumen (subsidiario, la de mayor volumen, art. 661)." },
    { q: "¿Qué clases de divisibilidad distingue el Derecho?", a: "Materialmente divisibles (se fraccionan en partes homogéneas sin menoscabo considerable) e intelectualmente divisibles (en cuotas ideales). Todos los bienes corporales e incorporales son intelectualmente divisibles." },
    { q: "Da ejemplos de cosas intelectualmente INDIVISIBLES.", a: "La servidumbre (se tiene íntegramente o no se tiene, arts. 826-827) y la prenda y la hipoteca (arts. 2405 y 2408): no admiten ni siquiera división intelectual." },
    { q: "¿Qué diferencia a las cosas futuras absolutas de las relativas? (Corral Talciani)", a: "Objetiva/absolutamente futuras: no existen en absoluto al tiempo del acto (una casa por construir). Subjetiva/relativamente futuras: existen, pero no pertenecen al patrimonio del que se obliga (venta de cosa ajena lícita, art. 1815)." },
    { q: "¿Qué son las cosas singulares y las universalidades?", a: "Singulares: constituyen una unidad (natural o artificial) con existencia real. Universalidades: agrupaciones de cosas singulares sin conexión física que, por un lazo vinculatorio, forman un todo con denominación común." },
    { q: "Diferencia clave entre universalidad de hecho y de derecho.", a: "De hecho (universitas facti): sólo activos, origen en la voluntad humana, sin regulación especial, sólo muebles (ej: biblioteca, rebaño). De derecho (universitas iuris): activos y pasivos, origen en la ley, regulación especial, opera la subrogación real (ej: la herencia)." },
    { q: "¿Desde qué dos perspectivas el dominio es el derecho real divisible por excelencia?", a: "(i) Puede desmembrarse, desprendiendo facultades a un tercero (nuda propiedad + usufructo); (ii) varias personas pueden ejercerlo sobre un mismo objeto (copropiedad), donde cada comunero ejerce todo el dominio limitado por el de los demás." }
  ],
  quiz: [
    { q: "Si un diamante se engasta en un anillo de plata, ¿cuál es la cosa principal (adjunción)?", opts: ["El anillo de plata", "El diamante (criterio del valor, art. 659)", "Ninguno, son independientes", "La de mayor volumen"], correct: 1, exp: "Por el criterio del valor (art. 659), la de mucho mayor valor es la principal: el diamante." },
    { q: "La universalidad de DERECHO se caracteriza por:", opts: ["Contener sólo activos", "Tener origen en la voluntad humana", "Contener activos y pasivos y tener origen en la ley", "Aplicarse sólo a muebles"], correct: 2, exp: "La universitas iuris comprende activos y pasivos, tiene regulación legal propia y origen en la ley (ej: la herencia)." },
    { q: "La venta de cosa ajena lícita (art. 1815) es ejemplo de cosa:", opts: ["Objetiva o absolutamente futura", "Subjetiva o relativamente futura", "Presente y singular", "Incomerciable"], correct: 1, exp: "La cosa existe pero no pertenece al patrimonio del vendedor: es relativa o subjetivamente futura." },
    { q: "Para Coviello, la única universalidad de derecho es:", opts: ["La sociedad conyugal", "El patrimonio del ausente", "La herencia", "Los bienes reservados de la mujer"], correct: 2, exp: "Coviello sostiene la posición restrictiva: sólo la herencia. Ruggiero, en cambio, admite múltiples." },
    { q: "¿Qué autor sostiene que la universalidad de hecho tiene su origen en la voluntad humana?", opts: ["Ruggiero", "Coviello", "Figueroa Yáñez", "Corral Talciani"], correct: 2, exp: "Figueroa Yáñez (2008): la voluntad humana dispone que un conjunto de cosas singulares se miren como una sola." }
  ],
  vf: [
    { s: "Extinguido el crédito, se extingue la hipoteca o prenda que lo cauciona.", ok: true, exp: "Verdadero. Lo accesorio sigue la suerte de lo principal: la extinción del derecho principal acarrea la del accesorio." },
    { s: "Todos los bienes corporales e incorporales son intelectualmente divisibles.", ok: false, exp: "Falso. Como regla general sí, pero hay derechos intelectualmente indivisibles: la servidumbre, la prenda y la hipoteca." },
    { s: "En la universalidad de hecho opera, por regla general, la subrogación real.", ok: false, exp: "Falso. La subrogación real opera como regla general en la universalidad de DERECHO, no en la de hecho." },
    { s: "La sociedad conyugal y el patrimonio del deudor en concurso son ejemplos de universalidad de derecho.", ok: true, exp: "Verdadero, según la posición amplia de Ruggiero." }
  ]
},

/* ========================================================== */
comercio: {
  flash: [
    { q: "¿Qué son las cosas comerciables e incomerciables?", a: "Comerciables: pueden ser objeto de relaciones jurídicas privadas e incorporarse a un patrimonio (regla general). Incomerciables: no pueden ser objeto de ninguna relación jurídica de derecho privado." },
    { q: "¿Qué dos categorías de cosas incomerciables existen?", a: "(i) Por su NATURALEZA: alta mar, aire (res communis omnium, art. 585); fuera del comercio en términos absolutos. (ii) Por su DESTINO: bienes nacionales de uso público (calles, plazas); comerciables por naturaleza pero sustraídos del comercio, pueden desafectarse." },
    { q: "Distinción crítica: incomerciabilidad vs. inalienabilidad.", a: "Las incomerciables (art. 1464 N°1) no pueden ser objeto de ningún derecho privado. Las inalienables (N°2) son comerciables (están en un patrimonio) pero no pueden enajenarse. Toda cosa incomerciable es inalienable, pero no toda inalienable es incomerciable." },
    { q: "¿Por qué los derechos personalísimos son COMERCIABLES?", a: "Porque están en el patrimonio privado de sus titulares (uso, habitación, alimentos futuros), aunque sean intransferibles e intransmisibles. Una cosa inalienable puede seguir siendo comerciable." },
    { q: "¿Qué son las res nullius y las res derelictae?", a: "Res nullius: cosas que nunca han tenido dueño (animales bravíos, peces no pescados). Res derelictae: tuvieron dueño pero éste las abandonó con intención de desprenderse del dominio. Ambas son cosas inapropiadas (pueden llegar a tener dueño)." },
    { q: "¿Por qué en Chile NO existen inmuebles sin dueño?", a: "Porque el art. 590 atribuye al Estado el dominio de los inmuebles que carecen de otro dueño; no hay inmuebles res nullius ni res derelictae. Pero confiere sólo el dominio, no la posesión: el poseedor de un inmueble no inscrito podría adquirirlo por prescripción." },
    { q: "Bienes nacionales de uso público vs. bienes fiscales.", a: "BNUP: pertenecen a la nación toda, uso de todos, incomerciables, imprescriptibles e inalienables (calles, plazas, playas). Fiscales: son propiedad del Estado, están en el comercio, son prescriptibles y enajenables (D.L. 1.939)." },
    { q: "¿Cómo se desafecta un bien nacional de uso público?", a: "Dos vías: (i) Decreto Supremo del Ministerio de Bienes Nacionales (D.L. 1.939, arts. 64-65); (ii) modificación del Plan Regulador Comunal (art. 61 DFL 458). En ambos casos el bien pasa al patrimonio fiscal y se inscribe a nombre del Fisco." },
    { q: "¿Qué bienes son registrables? (ejemplos y entidades)", a: "Inmuebles (CBR), naves mayores >50 ton (Directemar), aeronaves (DGAC), vehículos (Registro Civil), propiedad industrial (INAPI), propiedad intelectual (DIBAM), armas (DGMN), mascotas (Ley 21.020)." }
  ],
  quiz: [
    { q: "La alta mar y el aire son incomerciables por razón de su:", opts: ["Destino", "Naturaleza (res communis omnium, art. 585)", "Valor", "Registro"], correct: 1, exp: "Por su naturaleza (res communis omnium): están fuera del comercio en términos absolutos; jurídicamente no son 'bienes'." },
    { q: "¿Cuál afirmación es correcta sobre los derechos personalísimos?", opts: ["Son incomerciables", "Son comerciables aunque intransferibles e intransmisibles", "Pueden enajenarse libremente", "Son siempre inmuebles"], correct: 1, exp: "Son comerciables (están en el patrimonio del titular), pero intransferibles e intransmisibles." },
    { q: "En Chile, los inmuebles que carecen de otro dueño pertenecen a:", opts: ["Quien los ocupe primero", "El Estado (art. 590)", "La nación toda", "Nadie, son res nullius"], correct: 1, exp: "El art. 590 atribuye al Estado el dominio (no la posesión) de los inmuebles sin otro dueño." },
    { q: "Los bienes nacionales de uso público son, respecto de la prescripción:", opts: ["Prescriptibles a 5 años", "Imprescriptibles", "Prescriptibles a 10 años", "Prescriptibles sólo por el Fisco"], correct: 1, exp: "Son imprescriptibles: no cabe alegar posesión exclusiva, dominio privado ni servidumbre sobre ellos." },
    { q: "El registro de los vehículos motorizados está a cargo de:", opts: ["El Conservador de Bienes Raíces", "INAPI", "El Servicio de Registro Civil e Identificación", "Directemar"], correct: 2, exp: "El Registro de Vehículos Motorizados lo lleva el Servicio de Registro Civil e Identificación (Ley 18.290)." },
    { q: "Los bienes fiscales, a diferencia de los BNUP, son:", opts: ["Imprescriptibles e inalienables", "Propiedad del Estado, prescriptibles y enajenables", "De uso de todos los habitantes", "Incomerciables en términos absolutos"], correct: 1, exp: "Los bienes fiscales son propiedad del Estado, están en el comercio, son prescriptibles y enajenables (D.L. 1.939)." }
  ],
  vf: [
    { s: "Toda cosa incomerciable es inalienable, pero no toda cosa inalienable es incomerciable.", ok: true, exp: "Verdadero. Es la síntesis de la distinción crítica del art. 1464 N°s 1 y 2." },
    { s: "Los bienes nacionales de uso público nunca pueden cambiar de calidad jurídica.", ok: false, exp: "Falso. Pueden desafectarse (por Decreto Supremo o modificación del Plan Regulador) y pasar al patrimonio fiscal." },
    { s: "En Chile existen tanto muebles (mostrencos) como inmuebles sin dueño (vacantes).", ok: false, exp: "Falso. Sólo existen los muebles sin dueño (mostrencos); los inmuebles sin otro dueño pertenecen al Estado (art. 590)." },
    { s: "Para Borda, el Estado es mero administrador de los bienes nacionales de uso público, no su propietario.", ok: true, exp: "Verdadero. Pertenecen a toda la nación; el Estado ejerce sólo un dominio eminente como administrador." }
  ]
},

/* ========================================================== */
teorias: {
  flash: [
    { q: "Naturaleza del derecho real: ¿qué sostiene la concepción clásica (art. 577)?", a: "Que es una relación directa e inmediata entre una persona y una cosa (ius in re), recogida en el art. 577 desde el Derecho Romano." },
    { q: "¿Qué sostiene Planiol sobre la naturaleza del derecho real?", a: "La teoría de la obligación pasivamente universal: el Derecho sólo regula relaciones entre personas; el derecho real es una obligación de abstención que pesa sobre toda la colectividad de no perturbar al titular." },
    { q: "¿Con qué tres argumentos refuta Borda a Planiol?", a: "i) No es impropio que exista una relación directa persona-cosa; ii) el deber de respetar derechos ajenos existe tanto en los reales como en los personales; iii) lo esencial del derecho real no es la obligación pasiva, sino el poder de goce y disposición sobre la cosa." },
    { q: "Derecho del concesionario de un BNUP: ¿qué sostiene Hauriou?", a: "Que existe un derecho real administrativo, de carácter precario y revocable por la administración." },
    { q: "Derecho del concesionario: ¿qué sostiene Urrutia?", a: "Que es un verdadero derecho real de uso, distinto al del art. 811, ejercido sin respecto a persona determinada; la enumeración de los arts. 577-579 no es taxativa. La jurisprudencia ha acogido esta posición." },
    { q: "Derecho del concesionario: ¿qué sostiene Claro Solar (posición dominante)?", a: "Que es un mero permiso de ocupación a título precario; no tiene base jurídica real, pues la existencia de derechos exclusivos sobre bienes públicos es contraria a su naturaleza. El art. 602 niega al concesionario la propiedad del suelo." },
    { q: "Bienes preciosos y valor de afección: ¿qué posiciones hay?", a: "Claro Solar: forman una sola clase de bienes. Luis F. Borja (seguido por Orrego): son dos categorías distintas. El art. 659 reconoce que el valor de afección puede primar sobre el venal en la adjunción." },
    { q: "Distinción cosa/bien: ¿qué dos corrientes y autores existen?", a: "Primera (restringida): cosa = sólo material; bien = cosa corporal apropiable (Alessandri, Vodanovic, Kiverstein). Segunda (amplia, mayoritaria): cosa = material e inmaterial; bien = cosa útil susceptible de apropiación (Somarriva)." }
  ],
  quiz: [
    { q: "La teoría de la 'obligación pasivamente universal' del derecho real es de:", opts: ["Borda", "Planiol", "Claro Solar", "Hauriou"], correct: 1, exp: "Planiol: el derecho real es una obligación de abstención que pesa sobre toda la colectividad." },
    { q: "¿Quién refuta a Planiol señalando que lo esencial del derecho real es el poder de goce y disposición?", opts: ["Alessandri", "Borda", "Peñailillo", "Coviello"], correct: 1, exp: "Borda refuta a Planiol con tres argumentos; el tercero es ese poder de goce y disposición sobre la cosa." },
    { q: "Sobre el derecho del concesionario de un BNUP, la posición DOMINANTE es la de:", opts: ["Hauriou (derecho real administrativo)", "Urrutia (verdadero derecho real de uso)", "Claro Solar (mero permiso de ocupación precario)", "Planiol"], correct: 2, exp: "Claro Solar (dominante): mero permiso de ocupación a título precario; el art. 602 niega la propiedad del suelo." },
    { q: "El numerus clausus de los derechos reales en Chile es defendido por:", opts: ["Somarriva y Ruggiero", "Alessandri y Planiol", "Coviello y Borja", "Hauriou y Urrutia"], correct: 1, exp: "Alessandri (siguiendo a Planiol): las normas son de orden público y sus efectos erga omnes exigen definición legal previa." },
    { q: "Para Ruggiero, ¿existen varias universalidades de derecho?", opts: ["No, sólo la herencia", "Sí: patrimonio en concurso, sociedad conyugal, del ausente, bienes reservados, etc.", "Sí, pero sólo la sociedad conyugal", "No existe ninguna"], correct: 1, exp: "Ruggiero (posición amplia) admite múltiples; Coviello (restrictiva) sólo la herencia." }
  ],
  vf: [
    { s: "Según Planiol, el Derecho sólo regula relaciones entre personas, no entre persona y cosa.", ok: true, exp: "Verdadero. De ahí su teoría de la obligación pasivamente universal." },
    { s: "Claro Solar refuta a Urrutia y sostiene que el concesionario de un BNUP tiene un verdadero derecho real de uso.", ok: false, exp: "Falso. Claro Solar sostiene lo contrario: un mero permiso de ocupación precario, sin base jurídica real." },
    { s: "Orrego Acuña sigue a Borja: bienes preciosos y bienes con valor de afección son dos categorías distintas.", ok: true, exp: "Verdadero. Frente a Claro Solar, que los considera una sola clase." }
  ]
},

/* ========================================================== */
paralelo: {
  flash: [
    { q: "Reales vs. personales: ¿qué pasa con las personas involucradas?", a: "Real: un sujeto activo determinado y sujeto pasivo indeterminado (toda la colectividad debe respetarlo). Personal: ambos sujetos, activo y pasivo, determinados." },
    { q: "Reales vs. personales: objeto.", a: "Real: siempre una cosa determinada individualmente. Personal: un acto humano (dar, hacer o no hacer algo)." },
    { q: "Reales vs. personales: eficacia.", a: "Real: absoluta, oponible a todos (erga omnes). Personal: relativa, sólo oponible a quien contrajo la obligación." },
    { q: "Reales vs. personales: número y fuente.", a: "Número — Reales: limitados (numerus clausus). Personales: ilimitados (autonomía de la voluntad). Fuente — Reales: los modos de adquirir. Personales: las fuentes de las obligaciones (contrato, cuasicontrato, delito, cuasidelito, ley)." },
    { q: "Reales vs. personales: acciones que los protegen.", a: "Reales: acciones reales con ius persequendi (se ejercen contra cualquiera que tenga la cosa). Personales: acciones personales (sólo contra quien contrajo la obligación)." },
    { q: "Reales vs. personales: posesión y prescripción.", a: "Reales: pueden poseerse y ganarse por prescripción adquisitiva. Personales: no hay verdadera posesión (sólo cuasipossessio) ni se ganan por prescripción adquisitiva." },
    { q: "Reales vs. personales: prescripción extintiva.", a: "Reales: no se extinguen por prescripción extintiva (salvo servidumbres por no uso y, de forma indirecta, garantías). El dominio es imprescriptible extintivamente. Personales: las acciones se extinguen por prescripción extintiva." },
    { q: "Reales vs. personales: renuncia y regulación legal.", a: "Renuncia — Reales: por acto unilateral (abandono). Personales: la renuncia gratuita es remisión, acto bilateral que exige aceptación del deudor. Regulación — Reales: normas de orden público. Personales: de orden privado (modificables)." }
  ],
  quiz: [
    { q: "El ius persequendi (perseguir la cosa contra cualquiera) es propio de:", opts: ["Los derechos personales", "Los derechos reales", "Ambos por igual", "Sólo el dominio"], correct: 1, exp: "Las acciones reales tienen ius persequendi; las personales sólo se ejercen contra quien contrajo la obligación." },
    { q: "Respecto del NÚMERO, los derechos reales son ___ y los personales son ___:", opts: ["Ilimitados / limitados", "Limitados (numerus clausus) / ilimitados", "Limitados / limitados", "Ilimitados / ilimitados"], correct: 1, exp: "Reales: limitados (sólo los de la ley). Personales: ilimitados (autonomía de la voluntad)." },
    { q: "La eficacia de los derechos reales es:", opts: ["Relativa", "Absoluta (erga omnes)", "Limitada al deudor", "Inexistente frente a terceros"], correct: 1, exp: "Real: eficacia absoluta, oponible a todos. Personal: relativa, sólo frente al obligado." },
    { q: "¿Cuál se extingue por prescripción extintiva?", opts: ["El dominio", "Las acciones personales", "El derecho real de herencia siempre", "Ninguno"], correct: 1, exp: "Las acciones personales se extinguen por prescripción extintiva; el dominio es imprescriptible extintivamente." },
    { q: "La renuncia gratuita de un crédito (derecho personal) constituye:", opts: ["Un abandono unilateral", "Una remisión de deuda, acto bilateral que exige aceptación del deudor", "Una tradición", "Una prescripción"], correct: 1, exp: "A diferencia del abandono del dominio (unilateral), la remisión es bilateral y requiere aceptación del deudor." }
  ],
  vf: [
    { s: "El objeto de un derecho personal es siempre una cosa determinada individualmente.", ok: false, exp: "Falso. El objeto del derecho personal es un acto humano (dar, hacer o no hacer). La cosa determinada es objeto del derecho real." },
    { s: "Los derechos reales pueden ganarse por prescripción adquisitiva.", ok: true, exp: "Verdadero. Pueden poseerse y ganarse por prescripción adquisitiva; los personales no." },
    { s: "Las normas que regulan los derechos reales son, en su mayoría, de orden privado y modificables por las partes.", ok: false, exp: "Falso. Son en su mayoría de orden público. Las de los derechos personales son de orden privado." },
    { s: "Entre dos hipotecas, prefiere la de fecha de inscripción anterior (ius preferendi).", ok: true, exp: "Verdadero. Ciertos derechos reales gozan de ius preferendi; en la hipoteca prefiere la inscrita primero." }
  ]
}

,

/* ========================================================== */
cartillas: {
  flash: [
    {
      q: "¿Qué son los bienes?",
      a: "Los bienes son cosas que, pudiendo procurar al hombre una <strong>utilidad</strong>, son <strong>susceptibles de apropiación</strong> por los particulares.<br><br>En doctrina se distingue <em>cosa</em> y <em>bien</em>: la cosa es el concepto más amplio (todo lo que existe sin ser persona y puede percibirse por los sentidos o concebirse mediante la imaginación). Para el <strong>Código Civil</strong>, ambos términos se usan como sinónimos."
    },
    {
      q: "¿Cómo se clasifican los bienes? (12 categorías)",
      a: "<ol style='padding-left:1.2em;margin:0;line-height:1.8'><li>Corporales e incorporales</li><li>Corporales muebles e inmuebles</li><li>Específicas y genéricas</li><li>Consumibles y no consumibles</li><li>Fungibles y no fungibles</li><li>Divisibles e indivisibles</li><li>Presentes y futuras</li><li>Principales y accesorias</li><li>Comerciables y no comerciables</li><li>Singulares y universales</li><li>Apropiables e inapropiables</li><li>Bienes particulares o nacionales</li></ol>"
    },
    {
      q: "¿En qué consisten las cosas corporales e incorporales? (Art. 565 CC)",
      a: "<div style='border-left:3px solid currentColor;padding-left:.8em;margin-bottom:.6em'><strong>Corporales</strong> — tienen un ser real y pueden percibirse por los sentidos (ej: casa, libro). Se subclasifican en <em>muebles e inmuebles</em>.</div><div style='border-left:3px solid currentColor;padding-left:.8em'><strong>Incorporales</strong> — consisten en meros derechos (ej: créditos, servidumbres activas). Pueden ser <em>derechos reales o personales</em>.</div>"
    },
    {
      q: "¿Qué son los bienes muebles e inmuebles?",
      a: "<div style='margin-bottom:.5em'><strong>📦 Muebles</strong> — pueden transportarse de un lugar a otro sin detrimento de su sustancia.<br><span style='opacity:.8;font-size:.9em'>→ Por naturaleza &nbsp;·&nbsp; Por anticipación</span></div><div><strong>🏠 Inmuebles</strong> (fincas / bienes raíces) — no pueden transportarse sin que se altere su sustancia.<br><span style='opacity:.8;font-size:.9em'>→ Por naturaleza &nbsp;·&nbsp; Por adherencia &nbsp;·&nbsp; Por destinación</span></div>"
    },
    {
      q: "¿Qué importancia tiene distinguir entre bienes muebles e inmuebles?",
      a: "<ol style='padding-left:1.2em;margin:0;line-height:1.9;font-size:.93em'><li><strong>Tradición:</strong> inmuebles → inscripción CBR; muebles → entrega.</li><li><strong>Compraventa:</strong> inmuebles → solemne (escritura pública); muebles → consensual.</li><li><strong>Incapaces:</strong> más requisitos para enajenar bienes raíces.</li><li><strong>Garantías:</strong> hipoteca sobre inmuebles; prenda sobre muebles.</li><li><strong>Posesión inmueble:</strong> se adquiere, prueba y conserva por inscripción CBR.</li><li><strong>Prescripción ordinaria:</strong> 2 años (muebles) / 5 años (inmuebles).</li><li><strong>Lesión enorme:</strong> solo en venta o permuta de inmuebles.</li></ol>"
    },
    {
      q: "¿Qué son los bienes muebles por naturaleza?",
      a: "Son los que pueden transportarse de un lugar a otro <strong>sin detrimento de su sustancia</strong>. Se dividen en:<br><br><strong>🐄 Semovientes</strong> — se trasladan por sí solos (animales).<br><strong>📘 Inanimados</strong> — requieren fuerza externa para trasladarse (ej: un libro)."
    },
    {
      q: "¿Qué son los bienes muebles por anticipación? (Art. 571 CC)",
      a: "Son bienes inmuebles por naturaleza, adherencia o destinación que, para <strong>constituir un derecho sobre ellos en favor de una persona distinta del dueño</strong>, se reputan muebles <em>antes de su separación</em> del inmueble.<br><br>El legislador no los mira en su estado actual (unidos al inmueble) sino en su <strong>estado futuro</strong> (ya separados)."
    },
    {
      q: "¿Qué son los bienes inmuebles por naturaleza? (Art. 568 CC)",
      a: "<blockquote style='border-left:3px solid currentColor;margin:0;padding:.4em .8em;font-style:italic'>&ldquo;Inmuebles o fincas o bienes ra&iacute;ces son las cosas que no pueden transportarse de un lugar a otro; como las tierras y minas...&rdquo;</blockquote><br>Son la categor&iacute;a base de los inmuebles: no pueden moverse sin alterar su sustancia."
    },
    {
      q: "¿Qué son los bienes inmuebles por adherencia? (Art. 568 CC)",
      a: "Son aquellos bienes que <strong>adhieren permanentemente</strong> a las cosas que no pueden transportarse de un lugar a otro.<br><br><span style='opacity:.85'>Ejemplos: <strong>edificios</strong>, <strong>árboles</strong>, plantas, durmientes y rieles del ferrocarril.</span><br><br>La conexión es <strong>física</strong>: el bien pierde su individualidad y pasa a ser parte del inmueble."
    },
    {
      q: "¿Qué son los bienes inmuebles por destinación? (Art. 570 CC)",
      a: "Son bienes muebles que la ley <strong>reputa inmuebles</strong> por una ficción legal, al estar permanentemente destinados al <strong>uso, cultivo y beneficio</strong> de un inmueble, aunque puedan separarse sin detrimento.<br><br>La conexión es <strong>jurídica</strong>: el bien conserva su individualidad pero queda anexado al inmueble.<br><span style='opacity:.8;font-size:.9em'>Ej: utensilios de labranza, animales de cultivo, maquinaria industrial adherente al suelo.</span>"
    }
  ],
  quiz:  [],
  vf:    []
}

};
