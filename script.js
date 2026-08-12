const registroForm = document.getElementById("registroForm");
const mensaje = document.getElementById("mensaje");
const listaConsejos = document.getElementById("listaConsejos");

const consejos = {
    "Artista": [
        "Selecciona tus 8 a 12 mejores obras.",
        "Ordena tus trabajos para mostrar una evolución o una idea clara.",
        "Explica brevemente el concepto detrás de cada proyecto.",
        "Evita incluir trabajos que no representen tu nivel actual.",
        "Agrega tus datos de contacto y enlaces profesionales."
    ],

    "Fotógrafo": [
        "Selecciona fotografías que representen tu especialidad.",
        "Organiza tu portafolio por categorías o proyectos.",
        "Utiliza imágenes de buena calidad.",
        "Muestra proyectos completos y no solamente fotografías aisladas.",
        "Explica brevemente tu participación en cada proyecto."
    ],

    "Ilustrador": [
        "Muestra diferentes estilos y técnicas.",
        "Incluye algunos bocetos junto con trabajos terminados.",
        "Explica brevemente tu proceso creativo.",
        "Organiza tus proyectos por categorías.",
        "Destaca los trabajos relacionados con el tipo de empleo que buscas."
    ],

    "Diseñador": [
        "Presenta cada proyecto como un caso de estudio.",
        "Explica cuál era el problema y cómo lo solucionaste.",
        "Muestra el proceso y no solamente el resultado final.",
        "Indica qué herramientas y programas utilizaste.",
        "Destaca resultados concretos cuando sea posible."
    ],

    "Otro": [
        "Selecciona tus mejores trabajos y proyectos.",
        "Organiza tu portafolio de manera clara y sencilla.",
        "Explica qué hiciste en cada proyecto.",
        "Adapta tu portafolio al empleo al que quieres postular.",
        "Incluye tus datos de contacto y enlaces profesionales."
    ]
};

function mostrarPerfil(usuario) {
    mensaje.innerHTML =
        "Hola, <strong>" + usuario.nombre + "</strong>.<br>" +
        "Tu profesión es: <strong>" + usuario.profesion + "</strong>.<br><br>" +
        "Hemos preparado consejos de portafolio especialmente para ti.";

    mostrarConsejos(usuario.profesion);
}

function mostrarConsejos(profesion) {
    listaConsejos.innerHTML = "";

    const lista = consejos[profesion] || consejos["Otro"];

    lista.forEach(function(consejo) {
        const elemento = document.createElement("li");
        elemento.textContent = "✓ " + consejo;
        listaConsejos.appendChild(elemento);
    });
}

function cargarUsuario() {
    const usuarioGuardado = localStorage.getItem("usuario");

    if (usuarioGuardado) {
        const usuario = JSON.parse(usuarioGuardado);
        mostrarPerfil(usuario);
    }
}

registroForm.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const usuario = {
        nombre: document.getElementById("nombre").value,
        correo: document.getElementById("correo").value,
        telefono: document.getElementById("telefono").value,
        profesion: document.getElementById("profesion").value
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));

    mostrarPerfil(usuario);

    alert("¡Perfil guardado correctamente!");

    document.getElementById("bienvenida").scrollIntoView({
        behavior: "smooth"
    });
});

cargarUsuario();
