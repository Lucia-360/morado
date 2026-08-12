const pantallas = {
    inicio: document.getElementById("pantallaInicio"),
    registro: document.getElementById("pantallaRegistro"),
    necesidad: document.getElementById("pantallaNecesidad"),
    consejos: document.getElementById("pantallaConsejos")
};

const btnComenzar = document.getElementById("btnComenzar");
const registroForm = document.getElementById("registroForm");
const opcionesNecesidad = document.querySelectorAll(".opcion-aprendizaje");
const errorRegistro = document.getElementById("errorRegistro");
const errorNecesidad = document.getElementById("errorNecesidad");

const listaConsejos = document.getElementById("listaConsejos");
const saludoConsejos = document.getElementById("saludoConsejos");
const tituloConsejos = document.getElementById("tituloConsejos");
const descripcionNecesidad = document.getElementById("descripcionNecesidad");
const btnVolverNecesidad = document.getElementById("btnVolverNecesidad");

let usuarioActual = null;

const consejos = {
    Artista: {
        curriculum: [
            ["Presenta tu perfil artístico", "Explica en pocas líneas qué tipo de artista eres, qué haces y qué te diferencia."],
            ["Selecciona tu experiencia", "Incluye exposiciones, proyectos, colaboraciones, premios, estudios y experiencias relevantes."],
            ["Mantén el CV claro", "Un currículum artístico puede ser completo, pero debe ser fácil de leer y estar bien organizado."],
            ["Adapta tu CV", "Destaca primero la experiencia que tenga más relación con la oportunidad a la que estás postulando."]
        ],
        portafolio: [
            ["Elige tus mejores obras", "No necesitas mostrar todo. Selecciona trabajos que representen tu nivel actual y tu identidad artística."],
            ["Ordena tus proyectos", "Crea una secuencia que permita entender tu estilo, evolución y principales fortalezas."],
            ["Explica tus obras", "Agrega una breve descripción del concepto, técnica o propósito cuando aporte valor."],
            ["Cuida la presentación", "Utiliza buenas imágenes, títulos claros y una navegación sencilla."]
        ],
        entrevista: [
            ["Habla de tu proceso", "Explica cómo desarrollas una idea desde el concepto inicial hasta la obra final."],
            ["Conoce tu portafolio", "Debes poder explicar por qué elegiste cada proyecto que muestras."],
            ["Explica tu valor", "Relaciona tu experiencia artística con lo que necesita el puesto o proyecto."],
            ["Prepara ejemplos", "Ten preparados algunos proyectos concretos para responder preguntas sobre decisiones y resultados."]
        ]
    },

    Fotógrafo: {
        curriculum: [
            ["Define tu especialidad", "Indica si trabajas en fotografía comercial, editorial, eventos, retrato, producto u otra área."],
            ["Muestra experiencia relevante", "Prioriza clientes, proyectos, publicaciones y colaboraciones relacionadas con el puesto."],
            ["Incluye herramientas", "Puedes mencionar cámaras, iluminación, edición y software que dominas."],
            ["Adapta el CV", "Da prioridad a la experiencia fotográfica más relacionada con cada oportunidad."]
        ],
        portafolio: [
            ["Crea series", "Es mejor mostrar proyectos o series coherentes que una colección sin orden de fotografías."],
            ["Selecciona con criterio", "Incluye pocas imágenes muy buenas antes que muchas imágenes repetitivas."],
            ["Muestra variedad con intención", "La variedad debe demostrar habilidades, no hacer que el portafolio parezca desordenado."],
            ["Cuida la calidad", "Las imágenes deben cargar correctamente y mantener una presentación profesional."]
        ],
        entrevista: [
            ["Explica tus decisiones", "Cuenta por qué elegiste una determinada luz, composición, lente o tratamiento."],
            ["Habla de clientes", "Describe cómo entendiste las necesidades del cliente y cómo las resolviste."],
            ["Muestra profesionalismo", "Explica cómo organizas entregas, tiempos, cambios y comunicación."],
            ["Lleva ejemplos", "Ten proyectos preparados para hablar de problemas concretos y cómo los solucionaste."]
        ]
    },

    Ilustrador: {
        curriculum: [
            ["Resume tu especialidad", "Indica qué tipo de ilustración realizas y cuáles son tus principales fortalezas."],
            ["Destaca proyectos relacionados", "Prioriza trabajos editoriales, publicitarios, infantiles o digitales según el puesto."],
            ["Incluye herramientas", "Menciona los programas y técnicas que utilizas con mayor dominio."],
            ["Mantén una estructura clara", "Haz que tu experiencia sea fácil de revisar rápidamente."]
        ],
        portafolio: [
            ["Muestra tu estilo", "Tu selección debe permitir reconocer qué tipo de ilustrador eres."],
            ["Incluye proceso", "Bocetos, pruebas y etapas de trabajo pueden demostrar cómo desarrollas tus ideas."],
            ["Organiza por categorías", "Separa, por ejemplo, editorial, personajes, conceptual, infantil o comercial."],
            ["Elige pensando en el empleo", "La selección debe acercarte al tipo de proyectos que quieres conseguir."]
        ],
        entrevista: [
            ["Explica tu proceso creativo", "Describe cómo recibes un encargo y cómo llegas a una propuesta final."],
            ["Habla de cambios", "Explica cómo recibes comentarios y realizas modificaciones sin perder la idea principal."],
            ["Defiende tus decisiones", "Explica por qué elegiste determinados colores, estilos y composiciones."],
            ["Muestra adaptación", "Demuestra que puedes mantener tu identidad y adaptarte a distintas necesidades."]
        ]
    },

    Diseñador: {
        curriculum: [
            ["Enfoca tu perfil", "Indica qué área de diseño dominas y qué tipo de proyectos realizas."],
            ["Destaca resultados", "Cuando puedas, explica qué problema resolviste y qué resultado tuvo tu trabajo."],
            ["Incluye herramientas", "Menciona programas y herramientas que realmente dominas."],
            ["Ordena por relevancia", "Los proyectos más relacionados con la vacante deberían aparecer primero."]
        ],
        portafolio: [
            ["Presenta casos de estudio", "Explica el problema, tu proceso, las decisiones y el resultado."],
            ["Muestra el proceso", "Wireframes, bocetos, pruebas o iteraciones ayudan a demostrar cómo piensas."],
            ["Explica tu rol", "Deja claro qué parte del proyecto realizaste tú cuando trabajaste en equipo."],
            ["Demuestra criterio", "No muestres solo piezas bonitas; muestra cómo solucionaste problemas."]
        ],
        entrevista: [
            ["Explica decisiones", "Habla del razonamiento detrás de tus elecciones de diseño."],
            ["Cuenta problemas reales", "Prepara ejemplos de proyectos donde tuviste que resolver dificultades."],
            ["Habla del trabajo en equipo", "Explica cómo colaboras con clientes, desarrolladores u otros profesionales."],
            ["Conecta diseño y resultados", "Cuando sea posible, muestra cómo tu trabajo ayudó al proyecto."]
        ]
    },

    Pintor: {
        curriculum: [
            ["Define tu perfil", "Indica qué tipo de pintura realizas, técnicas principales y áreas en las que has trabajado."],
            ["Incluye exposiciones y proyectos", "Destaca muestras, encargos, colaboraciones, residencias o proyectos relevantes."],
            ["Menciona técnicas", "Puedes incluir óleo, acrílico, acuarela, muralismo u otras técnicas que domines."],
            ["Adapta tu presentación", "Destaca primero la experiencia relacionada con la oportunidad."]
        ],
        portafolio: [
            ["Selecciona una colección", "Construye una selección coherente que represente tu lenguaje visual."],
            ["Fotografía bien tus obras", "La calidad de las fotografías influye directamente en cómo se percibe tu trabajo."],
            ["Incluye datos de cada obra", "Título, técnica, dimensiones y año pueden aportar contexto."],
            ["Muestra evolución", "Puedes incluir una pequeña secuencia que muestre cómo desarrollas tu propuesta."]
        ],
        entrevista: [
            ["Explica tu lenguaje visual", "Cuenta qué ideas, temas o referencias aparecen en tu trabajo."],
            ["Habla de tu técnica", "Explica cómo desarrollas una obra y qué materiales utilizas."],
            ["Relaciona tu experiencia", "Muestra cómo tu disciplina artística puede aportar al proyecto o puesto."],
            ["Prepara obras concretas", "Elige algunas piezas que puedas explicar con seguridad y claridad."]
        ]
    },

    Animador: {
        curriculum: [
            ["Presenta tu especialidad", "Indica si trabajas en 2D, 3D, motion graphics, personajes, VFX u otra área."],
            ["Destaca proyectos", "Prioriza trabajos relacionados con animación y con el tipo de producción que buscas."],
            ["Incluye software", "Menciona las herramientas que dominas para animación, modelado o composición."],
            ["Explica tu rol", "En proyectos grupales, indica exactamente qué parte realizaste."]
        ],
        portafolio: [
            ["Crea un reel", "Un reel breve y bien seleccionado puede mostrar rápidamente tu nivel y especialidad."],
            ["Muestra proceso", "Incluye storyboards, layouts, diseño de personajes o pruebas cuando ayuden a entender tu trabajo."],
            ["Selecciona por objetivo", "Si buscas animación de personajes, prioriza los trabajos que demuestren esa capacidad."],
            ["Cuida el ritmo", "Evita un reel demasiado largo y coloca tus trabajos más fuertes al principio."]
        ],
        entrevista: [
            ["Explica tu proceso", "Habla desde la idea y storyboard hasta la animación y composición final."],
            ["Habla de producción", "Explica cómo organizas tiempos, archivos, cambios y entregas."],
            ["Muestra colaboración", "Demuestra que sabes trabajar con otros roles y respetar un pipeline."],
            ["Defiende tus decisiones", "Explica por qué utilizaste determinados movimientos, tiempos y recursos visuales."]
        ]
    },

    Otro: {
        curriculum: [
            ["Define tu perfil", "Explica claramente qué haces, qué sabes hacer y qué tipo de oportunidad buscas."],
            ["Prioriza experiencia", "Coloca primero la experiencia que más se relacione con el empleo."],
            ["Incluye habilidades", "Selecciona las habilidades realmente relevantes para la oportunidad."],
            ["Adapta tu CV", "Evita usar exactamente el mismo currículum para todas las postulaciones."]
        ],
        portafolio: [
            ["Selecciona lo mejor", "Muestra proyectos que representen claramente tus habilidades."],
            ["Organiza tu trabajo", "Usa categorías y títulos claros para facilitar la navegación."],
            ["Explica tu participación", "Aclara qué hiciste tú y cuáles fueron tus responsabilidades."],
            ["Piensa en el empleador", "Selecciona ejemplos que respondan a las necesidades del puesto."]
        ],
        entrevista: [
            ["Conoce tus proyectos", "Debes poder explicar qué hiciste y qué aprendiste en tus trabajos principales."],
            ["Prepara ejemplos", "Ten historias concretas para explicar problemas, decisiones y resultados."],
            ["Explica tu aporte", "Relaciona tus habilidades con lo que necesita la empresa o cliente."],
            ["Practica", "Ensaya respuestas claras para ganar seguridad antes de la entrevista."]
        ]
    }
};

function cambiarPantalla(actual, siguiente) {
    actual.classList.add("saliendo");

    setTimeout(function () {
        actual.classList.add("oculta");
        actual.classList.remove("activa", "saliendo");

        siguiente.classList.remove("oculta");
        siguiente.classList.add("entrando");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        setTimeout(function () {
            siguiente.classList.remove("entrando");
        }, 700);
    }, 600);
}

btnComenzar.addEventListener("click", function () {
    cambiarPantalla(pantallas.inicio, pantallas.registro);
});

registroForm.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const profesion = document.getElementById("profesion").value;

    if (!nombre || !correo || !telefono || !profesion) {
        errorRegistro.textContent = "Completa todos los campos para continuar.";
        return;
    }

    usuarioActual = {
        nombre,
        correo,
        telefono,
        profesion
    };

    localStorage.setItem("usuario", JSON.stringify(usuarioActual));

    errorRegistro.textContent = "";
    cambiarPantalla(pantallas.registro, pantallas.necesidad);
});

opcionesNecesidad.forEach(function (opcion) {
    opcion.addEventListener("click", function () {
        if (!usuarioActual) {
            errorNecesidad.textContent = "Primero debes completar el registro.";
            return;
        }

        const necesidad = opcion.dataset.necesidad;

        mostrarConsejos(usuarioActual, necesidad);
        cambiarPantalla(pantallas.necesidad, pantallas.consejos);
    });
});

function mostrarConsejos(usuario, necesidad) {
    const perfil = consejos[usuario.profesion] || consejos.Otro;
    const datos = perfil[necesidad];

    const nombres = {
        curriculum: "Currículum",
        portafolio: "Portafolio",
        entrevista: "Entrevistas"
    };

    const descripciones = {
        curriculum: "Consejos para presentar mejor tu experiencia profesional.",
        portafolio: "Consejos para mostrar tus mejores trabajos de acuerdo con tu profesión.",
        entrevista: "Consejos para explicar tu experiencia y destacar en una entrevista."
    };

    saludoConsejos.textContent =
        "Hola, " + usuario.nombre + ". Eres " + usuario.profesion + ".";

    tituloConsejos.textContent =
        "Cómo mejorar tu " + nombres[necesidad];

    descripcionNecesidad.textContent =
        descripciones[necesidad];

    listaConsejos.innerHTML = "";

    datos.forEach(function (item) {
        const consejo = document.createElement("article");
        consejo.className = "consejo";

        const titulo = document.createElement("h3");
        titulo.textContent = item[0];

        const texto = document.createElement("p");
        texto.textContent = item[1];

        consejo.appendChild(titulo);
        consejo.appendChild(texto);

        listaConsejos.appendChild(consejo);
    });
}

btnVolverNecesidad.addEventListener("click", function () {
    cambiarPantalla(pantallas.consejos, pantallas.necesidad);
});

function cargarUsuario() {
    const guardado = localStorage.getItem("usuario");

    if (!guardado) {
        return;
    }

    try {
        usuarioActual = JSON.parse(guardado);

        document.getElementById("nombre").value = usuarioActual.nombre || "";
        document.getElementById("correo").value = usuarioActual.correo || "";
        document.getElementById("telefono").value = usuarioActual.telefono || "";
        document.getElementById("profesion").value = usuarioActual.profesion || "";
    } catch (error) {
        localStorage.removeItem("usuario");
        usuarioActual = null;
    }
}

cargarUsuario();
