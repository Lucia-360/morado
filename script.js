const inicio = document.getElementById("pantallaInicio");
const registro = document.getElementById("pantallaRegistro");
const necesidad = document.getElementById("pantallaNecesidad");
const consejos = document.getElementById("pantallaConsejos");

const btnComenzar = document.getElementById("btnComenzar");
const registroForm = document.getElementById("registroForm");
const opciones = document.querySelectorAll(".opcion-aprendizaje");

let usuario = null;

function cambiarPantalla(actual, siguiente) {
    actual.classList.add("saliendo");

    setTimeout(function () {
        actual.classList.add("oculta");
        actual.classList.remove("saliendo");

        siguiente.classList.remove("oculta");
        siguiente.classList.add("entrando");

        setTimeout(function () {
            siguiente.classList.remove("entrando");
        }, 700);
    }, 600);
}

btnComenzar.addEventListener("click", function () {
    cambiarPantalla(inicio, registro);
});

registroForm.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const profesion = document.getElementById("profesion").value;

    if (!nombre || !correo || !telefono || !profesion) {
        document.getElementById("errorRegistro").textContent =
            "Completa todos los campos para continuar.";
        return;
    }

    usuario = {
        nombre: nombre,
        correo: correo,
        telefono: telefono,
        profesion: profesion
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));

    cambiarPantalla(registro, necesidad);
});

opciones.forEach(function (opcion) {
    opcion.addEventListener("click", function () {

        const tipo = opcion.dataset.necesidad;

        document.getElementById("saludoConsejos").textContent =
            "Hola, " + usuario.nombre + ". Eres " + usuario.profesion + ".";

        document.getElementById("tituloConsejos").textContent =
            "Has elegido " + tipo;

        document.getElementById("descripcionNecesidad").textContent =
            "Pronto tendremos aquí los consejos personalizados para ti.";

        cambiarPantalla(necesidad, consejos);
    });
});
