const $ = (id) => document.getElementById(id);

const pantallas = {
    inicio: $("pantallaInicio"),
    registro: $("pantallaRegistro"),
    necesidad: $("pantallaNecesidad"),
    consejos: $("pantallaConsejos"),
    curriculum: $("pantallaCurriculum"),
    portafolio: $("pantallaPortafolio")
};

const btnComenzar = $("btnComenzar");
const registroForm = $("registroForm");
const opciones = document.querySelectorAll(".opcion");

let usuario = null;
let necesidadActual = null;
let proyectos = [];
let fotoCV = "";

const datos = {
    Artista: {
        curriculum: [
            ["Perfil", "Explica qué tipo de artista eres y qué te diferencia."],
            ["Experiencia", "Incluye exposiciones, proyectos, colaboraciones y estudios relevantes."],
            ["Claridad", "Mantén el CV ordenado y fácil de leer."],
            ["Adaptación", "Destaca primero lo más relacionado con cada oportunidad."]
        ],
        portafolio: [
            ["Selección", "Muestra tus mejores obras, no todo lo que has realizado."],
            ["Orden", "Agrupa los trabajos para mostrar una evolución o una idea clara."],
            ["Descripción", "Explica brevemente concepto, técnica o propósito cuando sea útil."],
            ["Presentación", "Usa imágenes claras, títulos y navegación sencilla."]
        ],
        entrevista: [
            ["Proceso", "Explica cómo desarrollas una idea hasta convertirla en obra."],
            ["Portafolio", "Debes poder explicar por qué elegiste cada proyecto."],
            ["Valor", "Relaciona tu experiencia con las necesidades del puesto."]
        ]
    },

    Fotógrafo: {
        curriculum: [
            ["Especialidad", "Indica tu área: retrato, eventos, producto, editorial, comercial, etc."],
            ["Experiencia", "Destaca clientes y proyectos relevantes."],
            ["Herramientas", "Incluye equipo y software que realmente dominas."],
            ["Adaptación", "Prioriza experiencia relacionada con el puesto."]
        ],
        portafolio: [
            ["Series", "Muestra proyectos o series coherentes."],
            ["Selección", "Mejor pocas fotografías excelentes que muchas repetitivas."],
            ["Especialidad", "Haz evidente qué tipo de fotografía realizas."],
            ["Calidad", "Cuida resolución, carga y presentación de las imágenes."]
        ],
        entrevista: [
            ["Decisiones", "Explica luz, composición, lente y tratamiento."],
            ["Clientes", "Cuenta cómo entendiste y resolviste sus necesidades."],
            ["Profesionalismo", "Habla de tiempos, entregas y comunicación."]
        ]
    },

    Ilustrador: {
        curriculum: [
            ["Especialidad", "Resume qué tipo de ilustración realizas."],
            ["Proyectos", "Prioriza trabajos relacionados con el puesto."],
            ["Herramientas", "Incluye programas y técnicas que dominas."],
            ["Orden", "Haz que tu experiencia pueda revisarse rápidamente."]
        ],
        portafolio: [
            ["Estilo", "Tu selección debe representar claramente tu identidad visual."],
            ["Proceso", "Incluye bocetos y etapas cuando ayuden a demostrar tu trabajo."],
            ["Categorías", "Puedes separar personajes, editorial, infantil, conceptual, etc."],
            ["Objetivo", "Selecciona trabajos pensando en el empleo que quieres conseguir."]
        ],
        entrevista: [
            ["Proceso creativo", "Explica cómo recibes un encargo y llegas a una propuesta."],
            ["Cambios", "Cuenta cómo trabajas con comentarios y revisiones."],
            ["Decisiones", "Explica por qué elegiste determinados recursos visuales."]
        ]
    },

    Diseñador: {
        curriculum: [
            ["Especialidad", "Define tu área: gráfico, UX/UI, branding, editorial, etc."],
            ["Resultados", "Explica problemas solucionados y resultados cuando sea posible."],
            ["Herramientas", "Menciona los programas que realmente dominas."],
            ["Relevancia", "Coloca primero los proyectos relacionados con la vacante."]
        ],
        portafolio: [
            ["Casos de estudio", "Explica problema, proceso, decisiones y resultado."],
            ["Proceso", "Muestra bocetos, pruebas, wireframes o iteraciones."],
            ["Rol", "Aclara qué parte realizaste tú en proyectos grupales."],
            ["Criterio", "Demuestra cómo resolviste problemas, no solo resultados bonitos."]
        ],
        entrevista: [
            ["Decisiones", "Explica el razonamiento detrás de tus elecciones."],
            ["Problemas", "Prepara ejemplos concretos de dificultades y soluciones."],
            ["Equipo", "Explica cómo colaboras con otros profesionales."]
        ]
    },

    Pintor: {
        curriculum: [
            ["Perfil", "Explica tu tipo de pintura y principales técnicas."],
            ["Exposiciones", "Incluye muestras, encargos, residencias y proyectos relevantes."],
            ["Técnicas", "Menciona óleo, acrílico, acuarela, muralismo u otras."],
            ["Adaptación", "Destaca primero la experiencia útil para la oportunidad."]
        ],
        portafolio: [
            ["Colección", "Construye una selección coherente con tu lenguaje visual."],
            ["Imágenes", "Cuida mucho las fotografías de tus obras."],
            ["Información", "Puedes incluir título, técnica, dimensiones y año."],
            ["Evolución", "Muestra etapas o proyectos que permitan ver tu desarrollo."]
        ],
        entrevista: [
            ["Lenguaje visual", "Explica temas, ideas o referencias presentes en tu trabajo."],
            ["Técnica", "Describe cómo desarrollas una obra."],
            ["Aporte", "Relaciona tu experiencia con el proyecto o puesto."]
        ]
    },

    Animador: {
        curriculum: [
            ["Especialidad", "Indica si trabajas en 2D, 3D, motion graphics, personajes, VFX, etc."],
            ["Proyectos", "Prioriza trabajos relacionados con el tipo de producción que buscas."],
            ["Software", "Menciona herramientas que realmente dominas."],
            ["Rol", "Explica exactamente qué hiciste en proyectos de equipo."]
        ],
        portafolio: [
            ["Reel", "Crea un reel breve y coloca tus mejores trabajos al principio."],
            ["Proceso", "Puedes mostrar storyboard, layouts, personajes o pruebas."],
            ["Objetivo", "Selecciona trabajos según el puesto que quieres conseguir."],
            ["Ritmo", "Evita reels demasiado largos o repetitivos."]
        ],
        entrevista: [
            ["Proceso", "Explica desde la idea hasta la animación final."],
            ["Producción", "Habla de tiempos, archivos, cambios y entregas."],
            ["Colaboración", "Demuestra que puedes trabajar con otros roles."]
        ]
    },

    Otro: {
        curriculum: [
            ["Perfil", "Explica claramente qué haces y qué oportunidad buscas."],
            ["Experiencia", "Prioriza lo más relevante."],
            ["Habilidades", "Selecciona habilidades útiles para el puesto."],
            ["Adaptación", "Ajusta el CV según cada oportunidad."]
        ],
        portafolio: [
            ["Selección", "Muestra proyectos que representen tus mejores habilidades."],
            ["Orden", "Usa categorías y títulos claros."],
            ["Rol", "Aclara qué hiciste tú en cada proyecto."],
            ["Objetivo", "Piensa en lo que necesita el empleador."]
        ],
        entrevista: [
            ["Proyectos", "Conoce y explica tus principales trabajos."],
            ["Ejemplos", "Prepara historias concretas."],
            ["Aporte", "Relaciona tus habilidades con el puesto."]
        ]
    }
};

function cambiar(actual, siguiente) {
    actual.classList.add("saliendo");

    setTimeout(() => {
        actual.classList.add("oculta");
        actual.classList.remove("activa", "saliendo");

        siguiente.classList.remove("oculta");
        siguiente.classList.add("entrando");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        setTimeout(() => {
            siguiente.classList.remove("entrando");
        }, 550);
    }, 550);
}

btnComenzar.addEventListener("click", () => {
    cambiar(pantallas.inicio, pantallas.registro);
});

registroForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = $("nombre").value.trim();
    const correo = $("correo").value.trim();
    const telefono = $("telefono").value.trim();
    const profesion = $("profesion").value;

    if (!nombre || !correo || !telefono || !profesion) {
        $("errorRegistro").textContent = "Completa todos los campos para continuar.";
        return;
    }

    usuario = {
        nombre,
        correo,
        telefono,
        profesion
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));
    $("errorRegistro").textContent = "";

    cambiar(pantallas.registro, pantallas.necesidad);
});

opciones.forEach((opcion) => {
    opcion.addEventListener("click", () => {
        if (!usuario) {
            $("errorNecesidad").textContent = "Primero completa el registro.";
            return;
        }

        necesidadActual = opcion.dataset.necesidad;
        renderConsejos();
        cambiar(pantallas.necesidad, pantallas.consejos);
    });
});

function renderConsejos() {
    const perfil = datos[usuario.profesion] || datos.Otro;
    const items = perfil[necesidadActual];

    $("saludoConsejos").textContent =
        `Hola, ${usuario.nombre}. Eres ${usuario.profesion}.`;

    $("tituloConsejos").textContent = {
        curriculum: "Cómo mejorar tu currículum",
        portafolio: "Cómo mejorar tu portafolio",
        entrevista: "Cómo prepararte para una entrevista"
    }[necesidadActual];

    $("descripcionNecesidad").textContent = {
        curriculum: "Consejos para presentar mejor tu experiencia.",
        portafolio: "Consejos para presentar mejor tus proyectos.",
        entrevista: "Consejos para explicar tu experiencia y destacar."
    }[necesidadActual];

    $("listaConsejos").innerHTML = "";

    items.forEach(([titulo, texto]) => {
        const article = document.createElement("article");
        article.className = "consejo";
        article.innerHTML = `<h3>${titulo}</h3><p>${texto}</p>`;
        $("listaConsejos").appendChild(article);
    });

    $("btnCrearCurriculum").classList.toggle(
        "oculto",
        necesidadActual !== "curriculum"
    );

    $("btnCrearPortafolio").classList.toggle(
        "oculto",
        necesidadActual !== "portafolio"
    );
}

$("btnCrearCurriculum").addEventListener("click", () => {
    renderAyuda("consejosCv", "curriculum");

    $("cvNombre").value = usuario.nombre;
    $("cvProfesion").value = usuario.profesion;
    $("cvContacto").value =
        `${usuario.correo} · ${usuario.telefono}`;

    actualizarCV();

    cambiar(
        pantallas.consejos,
        pantallas.curriculum
    );
});

$("btnCrearPortafolio").addEventListener("click", () => {
    renderAyuda("consejosPortafolio", "portafolio");

    cambiar(
        pantallas.consejos,
        pantallas.portafolio
    );
});

function renderAyuda(id, tipo) {
    const perfil = datos[usuario.profesion] || datos.Otro;
    const items = perfil[tipo];
    const contenedor = $(id);

    contenedor.innerHTML = "";

    items.forEach(([titulo, texto]) => {
        const bloque = document.createElement("div");
        bloque.className = "ayuda-item";
        bloque.innerHTML =
            `<strong>${titulo}</strong><p>${texto}</p>`;

        contenedor.appendChild(bloque);
    });
}


/* =========================
   FOTO DEL CURRÍCULUM
========================= */

$("cvFoto").addEventListener("change", () => {
    const archivo = $("cvFoto").files[0];

    if (!archivo) {
        fotoCV = "";
        $("previewFoto").style.display = "none";
        return;
    }

    if (!archivo.type.startsWith("image/")) {
        alert("Selecciona una imagen válida.");
        $("cvFoto").value = "";
        return;
    }

    const lector = new FileReader();

    lector.onload = (evento) => {
        fotoCV = evento.target.result;

        $("previewFoto").src = fotoCV;
        $("previewFoto").style.display = "block";
    };

    lector.readAsDataURL(archivo);
});


/* =========================
   CURRÍCULUM
========================= */

$("btnVolverNecesidad").addEventListener("click", () => {
    cambiar(
        pantallas.consejos,
        pantallas.necesidad
    );
});

$("btnVolverConsejos").addEventListener("click", () => {
    cambiar(
        pantallas.curriculum,
        pantallas.consejos
    );
});

function actualizarCV() {
    $("previewNombre").textContent =
        $("cvNombre").value || "TU NOMBRE";

    $("previewProfesion").textContent =
        $("cvProfesion").value || "TU PROFESIÓN";

    $("previewContacto").textContent =
        $("cvContacto").value || "Tu contacto";

    $("previewContactoSide").textContent =
        $("cvContacto").value || "Tu contacto";

    $("previewPerfil").textContent =
        $("cvPerfil").value ||
        "Tu perfil profesional aparecerá aquí.";

    $("previewExperiencia").textContent =
        $("cvExperiencia").value ||
        "Tu experiencia aparecerá aquí.";

    $("previewEducacion").textContent =
        $("cvEducacion").value ||
        "Tu educación aparecerá aquí.";

    $("previewHabilidades").textContent =
        $("cvHabilidades").value ||
        "Tus habilidades aparecerán aquí.";

    if (fotoCV) {
        $("previewFoto").src = fotoCV;
        $("previewFoto").style.display = "block";
    }
}

[
    "cvNombre",
    "cvProfesion",
    "cvContacto",
    "cvPerfil",
    "cvExperiencia",
    "cvEducacion",
    "cvHabilidades"
].forEach((id) => {
    $(id).addEventListener("input", actualizarCV);
});

$("btnDescargarCv").addEventListener("click", () => {
    actualizarCV();
    window.print();
});


/* =========================
   PORTAFOLIO
========================= */

const btnDescargarPortafolio = $("btnDescargarPortafolio");

$("btnVolverConsejosPortafolio").addEventListener("click", () => {
    cambiar(
        pantallas.portafolio,
        pantallas.consejos
    );
});

function cargarDatosAutorPortafolio() {
    $("pfNombre").value = usuario?.nombre || "";
    $("pfProfesion").value = usuario?.profesion || "";
    $("pfCorreo").value = usuario?.correo || "";
    $("pfTelefono").value = usuario?.telefono || "";
}

["pfNombre", "pfProfesion", "pfCorreo", "pfTelefono", "pfCiudad", "pfBio"]
.forEach((id) => {
    $(id).addEventListener("input", () => {
        renderProyectos();
    });
});

$("btnCrearPortafolio").addEventListener("click", () => {
    renderAyuda("consejosPortafolio", "portafolio");
    cargarDatosAutorPortafolio();
    cambiar(pantallas.consejos, pantallas.portafolio);
});

$("btnAgregarProyecto").addEventListener("click", () => {
    const nombre = $("nombreProyecto").value.trim();

    if (!nombre) {
        alert("Escribe el nombre del proyecto.");
        return;
    }

    const proyecto = {
        nombre,
        descripcion: $("descripcionProyecto").value.trim(),
        rol: $("rolProyecto").value.trim(),
        herramientas: $("herramientasProyecto").value.trim(),
        enlace: $("enlaceProyecto").value.trim(),
        imagenes: []
    };

    const archivos = Array.from($("imagenProyecto").files || []);

    if (archivos.length === 0) {
        proyectos.push(proyecto);
        renderProyectos();
        limpiarProyecto();
        return;
    }

    let pendientes = archivos.length;

    archivos.forEach((archivo) => {
        if (!archivo.type.startsWith("image/")) {
            pendientes--;
            return;
        }

        const lector = new FileReader();

        lector.onload = (evento) => {
            proyecto.imagenes.push(evento.target.result);
            pendientes--;

            if (pendientes === 0) {
                proyectos.push(proyecto);
                renderProyectos();
                limpiarProyecto();
            }
        };

        lector.onerror = () => {
            pendientes--;

            if (pendientes === 0) {
                proyectos.push(proyecto);
                renderProyectos();
                limpiarProyecto();
            }
        };

        lector.readAsDataURL(archivo);
    });
});

function renderProyectos() {
    const contenedor = $("portafolioPreview");
    contenedor.innerHTML = "";

    if (!proyectos.length) {
        contenedor.innerHTML = "<p>Aquí aparecerán tus proyectos.</p>";
        return;
    }

    proyectos.forEach((proyecto, indice) => {
        const card = document.createElement("article");
        card.className = "proyecto";

        const titulo = document.createElement("h3");
        titulo.textContent = proyecto.nombre;
        card.appendChild(titulo);

        const galeria = document.createElement("div");
        galeria.className = "proyecto-gallery";

        proyecto.imagenes.forEach((src, imageIndex) => {
            const img = document.createElement("img");
            img.src = src;
            img.alt = `${proyecto.nombre} - imagen ${imageIndex + 1}`;
            galeria.appendChild(img);
        });

        if (proyecto.imagenes.length) {
            card.appendChild(galeria);
        }

        if (proyecto.descripcion) {
            const p = document.createElement("p");
            p.className = "proyecto-meta";
            p.textContent = proyecto.descripcion;
            card.appendChild(p);
        }

        if (proyecto.rol) {
            const p = document.createElement("p");
            p.className = "proyecto-meta";
            p.innerHTML = `<strong>Mi rol:</strong> ${proyecto.rol}`;
            card.appendChild(p);
        }

        if (proyecto.herramientas) {
            const p = document.createElement("p");
            p.className = "proyecto-meta";
            p.innerHTML = `<strong>Herramientas:</strong> ${proyecto.herramientas}`;
            card.appendChild(p);
        }

        if (proyecto.enlace) {
            const enlace = document.createElement("a");
            enlace.href = proyecto.enlace;
            enlace.target = "_blank";
            enlace.rel = "noopener noreferrer";
            enlace.textContent = "Ver proyecto";
            card.appendChild(enlace);
        }

        const eliminar = document.createElement("button");
        eliminar.type = "button";
        eliminar.className = "boton-eliminar";
        eliminar.textContent = "Eliminar proyecto";

        eliminar.addEventListener("click", () => {
            proyectos.splice(indice, 1);
            renderProyectos();
        });

        card.appendChild(eliminar);
        contenedor.appendChild(card);
    });
}

function limpiarProyecto() {
    $("nombreProyecto").value = "";
    $("descripcionProyecto").value = "";
    $("rolProyecto").value = "";
    $("herramientasProyecto").value = "";
    $("imagenProyecto").value = "";
    $("enlaceProyecto").value = "";
}

btnDescargarPortafolio.addEventListener("click", () => {
    if (!proyectos.length) {
        alert("Agrega al menos un proyecto antes de descargar el portafolio.");
        return;
    }

    generarPortafolioImpresion();

    setTimeout(() => {
        window.print();
    }, 150);
});

function generarPortafolioImpresion() {
    const pages = $("portfolioPages");
    pages.innerHTML = "";

    /* Primera página: portada y datos del autor */
    const portada = document.createElement("section");
    portada.className = "portfolio-page portfolio-cover";

    portada.innerHTML = `
        <div class="cover-label">PORTAFOLIO</div>
        <h1>${escapeHtml($("pfNombre").value || "Tu nombre")}</h1>
        <h2>${escapeHtml($("pfProfesion").value || "Profesional creativo")}</h2>
        <p class="cover-bio">${escapeHtml($("pfBio").value || "Presentación profesional del autor.")}</p>
        <div class="cover-contact">
            <div><strong>Correo:</strong> ${escapeHtml($("pfCorreo").value || "—")}</div>
            <div><strong>Teléfono:</strong> ${escapeHtml($("pfTelefono").value || "—")}</div>
            <div><strong>Ciudad:</strong> ${escapeHtml($("pfCiudad").value || "—")}</div>
        </div>
    `;

    pages.appendChild(portada);

    /*
       Cada proyecto tiene una página propia.
       Las imágenes se muestran en una cuadrícula estable
       y no se superponen.
    */
    proyectos.forEach((proyecto, projectIndex) => {
        const page = document.createElement("section");
        page.className = "portfolio-page portfolio-project-page";

        const title = document.createElement("h1");
        title.textContent = `${projectIndex + 1}. ${proyecto.nombre}`;
        page.appendChild(title);

        const subtitle = document.createElement("p");
        subtitle.className = "project-subtitle";

        const metadata = [];
        if (proyecto.rol) metadata.push(`Rol: ${proyecto.rol}`);
        if (proyecto.herramientas) metadata.push(`Herramientas: ${proyecto.herramientas}`);

        subtitle.textContent = metadata.join(" · ");
        page.appendChild(subtitle);

        if (proyecto.descripcion) {
            const description = document.createElement("p");
            description.className = "project-body";
            description.textContent = proyecto.descripcion;
            page.appendChild(description);
        }

        const gallery = document.createElement("div");
        gallery.className =
            "project-gallery-print" +
            (proyecto.imagenes.length === 1 ? " single" : "");

        proyecto.imagenes.forEach((src, imageIndex) => {
            const wrap = document.createElement("div");
            wrap.className = "project-image-wrap";

            const img = document.createElement("img");
            img.src = src;
            img.alt = `${proyecto.nombre} - imagen ${imageIndex + 1}`;

            wrap.appendChild(img);
            gallery.appendChild(wrap);
        });

        if (proyecto.imagenes.length) {
            page.appendChild(gallery);
        }

        if (proyecto.enlace) {
            const link = document.createElement("p");
            link.className = "project-tools";
            link.innerHTML =
                `<strong>Proyecto:</strong> ${escapeHtml(proyecto.enlace)}`;
            page.appendChild(link);
        }

        pages.appendChild(page);
    });
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

/* =========================
   USUARIO
========================= */

function cargarUsuario() {
    const guardado = localStorage.getItem("usuario");

    if (!guardado) {
        return;
    }

    try {
        usuario = JSON.parse(guardado);

        $("nombre").value = usuario.nombre || "";
        $("correo").value = usuario.correo || "";
        $("telefono").value = usuario.telefono || "";
        $("profesion").value = usuario.profesion || "";
    } catch {
        localStorage.removeItem("usuario");
        usuario = null;
    }
}

cargarUsuario();
mostrarProyectos();

/*
    La foto comienza oculta hasta que el usuario seleccione una.
*/
$("previewFoto").style.display = "none";
