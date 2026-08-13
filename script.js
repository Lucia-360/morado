/* =========================================
   PANTALLAS
========================================= */

const pantallas = {
    inicio: document.getElementById("pantallaInicio"),
    registro: document.getElementById("pantallaRegistro"),
    necesidad: document.getElementById("pantallaNecesidad"),
    consejos: document.getElementById("pantallaConsejos"),
    curriculum: document.getElementById("pantallaCurriculum"),
    portafolio: document.getElementById("pantallaPortafolio")
};


/* =========================================
   ELEMENTOS
========================================= */

const btnComenzar =
    document.getElementById("btnComenzar");

const registroForm =
    document.getElementById("registroForm");

const opcionesNecesidad =
    document.querySelectorAll(".opcion-aprendizaje");

const errorRegistro =
    document.getElementById("errorRegistro");

const errorNecesidad =
    document.getElementById("errorNecesidad");

const listaConsejos =
    document.getElementById("listaConsejos");

const saludoConsejos =
    document.getElementById("saludoConsejos");

const tituloConsejos =
    document.getElementById("tituloConsejos");

const descripcionNecesidad =
    document.getElementById("descripcionNecesidad");

const btnCrearCurriculum =
    document.getElementById("btnCrearCurriculum");

const btnCrearPortafolio =
    document.getElementById("btnCrearPortafolio");

const btnVolverNecesidad =
    document.getElementById("btnVolverNecesidad");

const btnVolverConsejos =
    document.getElementById("btnVolverConsejos");

const btnVolverConsejosPortafolio =
    document.getElementById(
        "btnVolverConsejosPortafolio"
    );

const btnDescargarCv =
    document.getElementById("btnDescargarCv");

const consejosCv =
    document.getElementById("consejosCv");

const consejosPortafolio =
    document.getElementById(
        "consejosPortafolio"
    );

const btnAgregarProyecto =
    document.getElementById(
        "btnAgregarProyecto"
    );

const portafolioPreview =
    document.getElementById(
        "portafolioPreview"
    );


/* =========================================
   VARIABLES
========================================= */

let usuarioActual = null;

let necesidadActual = null;

let proyectos = [];


/* =========================================
   CONSEJOS POR PROFESIÓN
========================================= */

const consejos = {

    Artista: {

        curriculum: [
            [
                "Presenta tu perfil artístico",
                "Explica brevemente qué tipo de artista eres, qué haces y qué te diferencia."
            ],
            [
                "Selecciona tu experiencia",
                "Incluye exposiciones, proyectos, colaboraciones, premios y estudios relevantes."
            ],
            [
                "Mantén el CV claro",
                "Organiza la información para que sea fácil de leer."
            ],
            [
                "Adapta tu CV",
                "Destaca primero la experiencia relacionada con la oportunidad."
            ]
        ],

        portafolio: [
            [
                "Selecciona tus mejores obras",
                "No es necesario mostrar todo. Selecciona las obras que mejor representan tu nivel."
            ],
            [
                "Organiza tus proyectos",
                "Agrupa las obras para que exista una historia o evolución."
            ],
            [
                "Explica tu trabajo",
                "Agrega una breve descripción del concepto o técnica cuando sea necesario."
            ],
            [
                "Cuida las imágenes",
                "Las fotografías o digitalizaciones deben mostrar correctamente la obra."
            ]
        ],

        entrevista: [
            [
                "Habla de tu proceso",
                "Explica cómo pasas de una idea inicial a la obra final."
            ],
            [
                "Conoce tu portafolio",
                "Debes poder explicar por qué elegiste cada obra."
            ],
            [
                "Explica tu valor",
                "Relaciona tu experiencia con las necesidades del puesto."
            ]
        ]
    },


    Fotógrafo: {

        curriculum: [
            [
                "Define tu especialidad",
                "Indica si trabajas en retrato, eventos, producto, editorial, comercial u otra área."
            ],
            [
                "Muestra experiencia",
                "Destaca clientes y proyectos relevantes."
            ],
            [
                "Incluye herramientas",
                "Puedes mencionar cámaras, iluminación y software que dominas."
            ]
        ],

        portafolio: [
            [
                "Crea series",
                "Es preferible mostrar proyectos coherentes en lugar de fotografías sin relación."
            ],
            [
                "Selecciona con criterio",
                "Utiliza pocas fotografías muy buenas antes que muchas repetitivas."
            ],
            [
                "Muestra especialidad",
                "Haz evidente qué tipo de fotografía realizas."
            ],
            [
                "Cuida la calidad",
                "Las fotografías deben verse correctamente y cargar rápido."
            ]
        ],

        entrevista: [
            [
                "Explica tus decisiones",
                "Cuenta por qué utilizaste determinada iluminación, composición o equipo."
            ],
            [
                "Habla de clientes",
                "Explica cómo resolviste las necesidades del cliente."
            ],
            [
                "Muestra profesionalismo",
                "Habla de entregas, tiempos y comunicación."
            ]
        ]
    },


    Ilustrador: {

        curriculum: [
            [
                "Resume tu especialidad",
                "Explica qué tipo de ilustración realizas."
            ],
            [
                "Destaca proyectos relacionados",
                "Prioriza trabajos relacionados con el puesto que buscas."
            ],
            [
                "Incluye herramientas",
                "Menciona programas y técnicas que dominas."
            ]
        ],

        portafolio: [
            [
                "Muestra tu estilo",
                "Tu selección debería permitir reconocer tu identidad visual."
            ],
            [
                "Incluye proceso",
                "Los bocetos pueden demostrar cómo desarrollas tus ideas."
            ],
            [
                "Organiza por categorías",
                "Puedes separar personajes, editorial, conceptual, infantil, etc."
            ],
            [
                "Adapta el portafolio",
                "Selecciona trabajos relacionados con el empleo al que postulas."
            ]
        ],

        entrevista: [
            [
                "Explica tu proceso",
                "Cuenta cómo conviertes un encargo en una ilustración final."
            ],
            [
                "Habla de cambios",
                "Explica cómo trabajas con comentarios de clientes."
            ],
            [
                "Defiende tus decisiones",
                "Explica tus elecciones visuales."
            ]
        ]
    },


    Diseñador: {

        curriculum: [
            [
                "Enfoca tu perfil",
                "Indica tu especialidad dentro del diseño."
            ],
            [
                "Destaca resultados",
                "Cuando sea posible, muestra qué problema solucionaste."
            ],
            [
                "Incluye herramientas",
                "Menciona los programas que realmente dominas."
            ]
        ],

        portafolio: [
            [
                "Presenta casos de estudio",
                "Explica el problema, el proceso y el resultado."
            ],
            [
                "Muestra el proceso",
                "Incluye bocetos, pruebas, wireframes o iteraciones."
            ],
            [
                "Explica tu rol",
                "Indica exactamente qué parte del proyecto realizaste."
            ],
            [
                "Demuestra criterio",
                "No muestres solamente trabajos bonitos: muestra cómo solucionaste problemas."
            ]
        ],

        entrevista: [
            [
                "Explica decisiones",
                "Cuenta el razonamiento detrás de tus elecciones de diseño."
            ],
            [
                "Cuenta problemas reales",
                "Prepara ejemplos concretos."
            ],
            [
                "Habla del equipo",
                "Explica cómo colaboras con otros profesionales."
            ]
        ]
    },


    Pintor: {

        curriculum: [
            [
                "Define tu perfil",
                "Explica qué tipo de pintura y técnicas realizas."
            ],
            [
                "Incluye exposiciones",
                "Destaca muestras, encargos, residencias y proyectos relevantes."
            ],
            [
                "Menciona técnicas",
                "Puedes incluir óleo, acrílico, acuarela, muralismo, etc."
            ]
        ],

        portafolio: [
            [
                "Selecciona una colección",
                "Construye una selección que represente tu lenguaje visual."
            ],
            [
                "Fotografía bien tus obras",
                "La calidad de la imagen influye mucho en la percepción de tu trabajo."
            ],
            [
                "Incluye información",
                "Puedes incluir título, técnica, dimensiones y año."
            ],
            [
                "Muestra evolución",
                "Presentar etapas puede ayudar a mostrar tu desarrollo."
            ]
        ],

        entrevista: [
            [
                "Explica tu lenguaje visual",
                "Cuenta qué temas e ideas aparecen en tu trabajo."
            ],
            [
                "Habla de tu técnica",
                "Explica cómo desarrollas una obra."
            ],
            [
                "Relaciona tu experiencia",
                "Explica cómo tu experiencia puede aportar al proyecto."
            ]
        ]
    },


    Animador: {

        curriculum: [
            [
                "Presenta tu especialidad",
                "Indica si trabajas en 2D, 3D, motion graphics, personajes o VFX."
            ],
            [
                "Destaca proyectos",
                "Prioriza los trabajos relacionados con el tipo de animación que buscas."
            ],
            [
                "Incluye software",
                "Menciona las herramientas que dominas."
            ]
        ],

        portafolio: [
            [
                "Crea un reel",
                "Un reel breve permite mostrar rápidamente tu nivel."
            ],
            [
                "Muestra proceso",
                "Puedes incluir storyboard, layouts, diseño de personajes y pruebas."
            ],
            [
                "Selecciona por objetivo",
                "Prioriza trabajos relacionados con el puesto que buscas."
            ],
            [
                "Cuida el ritmo",
                "Coloca tus mejores trabajos al principio."
            ]
        ],

        entrevista: [
            [
                "Explica tu proceso",
                "Habla desde la idea y storyboard hasta la animación final."
            ],
            [
                "Habla de producción",
                "Explica cómo organizas tiempos y entregas."
            ],
            [
                "Muestra colaboración",
                "La animación suele requerir trabajo en equipo."
            ]
        ]
    },


    Otro: {

        curriculum: [
            [
                "Define tu perfil",
                "Explica claramente qué haces y qué oportunidad buscas."
            ],
            [
                "Prioriza experiencia",
                "Coloca primero la experiencia más relevante."
            ],
            [
                "Incluye habilidades",
                "Selecciona las habilidades relacionadas con el puesto."
            ]
        ],

        portafolio: [
            [
                "Selecciona lo mejor",
                "Muestra proyectos que representen claramente tus habilidades."
            ],
            [
                "Organiza tu trabajo",
                "Usa categorías y títulos claros."
            ],
            [
                "Explica tu participación",
                "Aclara qué hiciste tú en cada proyecto."
            ],
            [
                "Piensa en el empleador",
                "Selecciona trabajos que respondan a las necesidades del puesto."
            ]
        ],

        entrevista: [
            [
                "Conoce tus proyectos",
                "Debes poder explicar tus principales trabajos."
            ],
            [
                "Prepara ejemplos",
                "Ten historias concretas preparadas."
            ],
            [
                "Explica tu aporte",
                "Relaciona tus habilidades con el puesto."
            ]
        ]
    }
};


/* =========================================
   CAMBIO DE PANTALLA
========================================= */

function cambiarPantalla(
    actual,
    siguiente
) {

    actual.classList.add(
        "saliendo"
    );

    setTimeout(function () {

        actual.classList.add(
            "oculta"
        );

        actual.classList.remove(
            "activa",
            "saliendo"
        );

        siguiente.classList.remove(
            "oculta"
        );

        siguiente.classList.add(
            "entrando"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        setTimeout(function () {

            siguiente.classList.remove(
                "entrando"
            );

        }, 700);

    }, 600);
}


/* =========================================
   COMENZAR
========================================= */

btnComenzar.addEventListener(
    "click",
    function () {

        cambiarPantalla(
            pantallas.inicio,
            pantallas.registro
        );

    }
);


/* =========================================
   REGISTRO
========================================= */

registroForm.addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();

        const nombre =
            document
                .getElementById("nombre")
                .value
                .trim();

        const correo =
            document
                .getElementById("correo")
                .value
                .trim();

        const telefono =
            document
                .getElementById("telefono")
                .value
                .trim();

        const profesion =
            document
                .getElementById("profesion")
                .value;


        if (
            !nombre ||
            !correo ||
            !telefono ||
            !profesion
        ) {

            errorRegistro.textContent =
                "Completa todos los campos.";

            return;
        }


        usuarioActual = {

            nombre:
                nombre,

            correo:
                correo,

            telefono:
                telefono,

            profesion:
                profesion

        };


        localStorage.setItem(
            "usuario",
            JSON.stringify(
                usuarioActual
            )
        );


        cambiarPantalla(
            pantallas.registro,
            pantallas.necesidad
        );

    }
);


/* =========================================
   SELECCIONAR NECESIDAD
========================================= */

opcionesNecesidad.forEach(
    function (opcion) {

        opcion.addEventListener(
            "click",
            function () {

                necesidadActual =
                    opcion.dataset.necesidad;


                mostrarConsejos(
                    usuarioActual,
                    necesidadActual
                );


                cambiarPantalla(
                    pantallas.necesidad,
                    pantallas.consejos
                );

            }
        );

    }
);


/* =========================================
   MOSTRAR CONSEJOS
========================================= */

function mostrarConsejos(
    usuario,
    necesidad
) {

    const perfil =
        consejos[
            usuario.profesion
        ] ||
        consejos.Otro;


    const datos =
        perfil[necesidad];


    listaConsejos.innerHTML = "";


    datos.forEach(
        function (item) {

            const articulo =
                document.createElement(
                    "article"
                );

            articulo.className =
                "consejo";


            const titulo =
                document.createElement(
                    "h3"
                );

            titulo.textContent =
                item[0];


            const texto =
                document.createElement(
                    "p"
                );

            texto.textContent =
                item[1];


            articulo.appendChild(
                titulo
            );

            articulo.appendChild(
                texto
            );


            listaConsejos.appendChild(
                articulo
            );

        }
    );


    saludoConsejos.textContent =
        "Hola, " +
        usuario.nombre +
        ". Eres " +
        usuario.profesion +
        ".";


    const nombres = {

        curriculum:
            "Cómo mejorar tu Currículum",

        portafolio:
            "Cómo mejorar tu Portafolio",

        entrevista:
            "Cómo mejorar tus Entrevistas"

    };


    tituloConsejos.textContent =
        nombres[necesidad];


    const descripciones = {

        curriculum:
            "Consejos para presentar mejor tu experiencia profesional.",

        portafolio:
            "Consejos para presentar tus mejores trabajos.",

        entrevista:
            "Consejos para prepararte y destacar."

    };


    descripcionNecesidad.textContent =
        descripciones[necesidad];


    /*
        OCULTAMOS LOS DOS BOTONES
        ANTES DE DECIDIR CUÁL MOSTRAR.
    */

    btnCrearCurriculum.classList.add(
        "oculto"
    );

    btnCrearPortafolio.classList.add(
        "oculto"
    );


    /*
        SI ELIGE CV
    */

    if (
        necesidad ===
        "curriculum"
    ) {

        btnCrearCurriculum.classList.remove(
            "oculto"
        );

    }


    /*
        SI ELIGE PORTAFOLIO
    */

    if (
        necesidad ===
        "portafolio"
    ) {

        btnCrearPortafolio.classList.remove(
            "oculto"
        );

    }

}


/* =========================================
   CREAR CURRÍCULUM
========================================= */

btnCrearCurriculum.addEventListener(
    "click",
    function () {

        mostrarConsejosCv();


        document.getElementById(
            "cvNombre"
        ).value =
            usuarioActual.nombre;


        document.getElementById(
            "cvProfesion"
        ).value =
            usuarioActual.profesion;


        document.getElementById(
            "cvContacto"
        ).value =
            usuarioActual.correo +
            " · " +
            usuarioActual.telefono;


        cambiarPantalla(
            pantallas.consejos,
            pantallas.curriculum
        );

    }
);


/* =========================================
   CONSEJOS CV
========================================= */

function mostrarConsejosCv() {

    const datos =
        consejos[
            usuarioActual.profesion
        ].curriculum;


    consejosCv.innerHTML = "";


    datos.forEach(
        function (item) {

            const bloque =
                document.createElement(
                    "div"
                );

            bloque.className =
                "ayuda-item";


            const titulo =
                document.createElement(
                    "strong"
                );

            titulo.textContent =
                item[0];


            const texto =
                document.createElement(
                    "p"
                );

            texto.textContent =
                item[1];


            bloque.appendChild(
                titulo
            );

            bloque.appendChild(
                texto
            );


            consejosCv.appendChild(
                bloque
            );

        }
    );

}


/* =========================================
   CREAR PORTAFOLIO
========================================= */

btnCrearPortafolio.addEventListener(
    "click",
    function () {

        mostrarConsejosPortafolio();


        cambiarPantalla(
            pantallas.consejos,
            pantallas.portafolio
        );

    }
);


/* =========================================
   CONSEJOS PORTAFOLIO
========================================= */

function mostrarConsejosPortafolio() {

    const perfil =
        consejos[
            usuarioActual.profesion
        ] ||
        consejos.Otro;


    const datos =
        perfil.portafolio;


    consejosPortafolio.innerHTML =
        "";


    datos.forEach(
        function (item) {

            const bloque =
                document.createElement(
                    "div"
                );

            bloque.className =
                "ayuda-item";


            const titulo =
                document.createElement(
                    "strong"
                );

            titulo.textContent =
                item[0];


            const texto =
                document.createElement(
                    "p"
                );

            texto.textContent =
                item[1];


            bloque.appendChild(
                titulo
            );

            bloque.appendChild(
                texto
            );


            consejosPortafolio.appendChild(
                bloque
            );

        }
    );

}


/* =========================================
   AGREGAR PROYECTO
========================================= */

btnAgregarProyecto.addEventListener(
    "click",
    function () {

        const nombre =
            document.getElementById(
                "nombreProyecto"
            ).value.trim();


        const descripcion =
            document.getElementById(
                "descripcionProyecto"
            ).value.trim();


        const rol =
            document.getElementById(
                "rolProyecto"
            ).value.trim();


        const herramientas =
            document.getElementById(
                "herramientasProyecto"
            ).value.trim();


        const enlace =
            document.getElementById(
                "enlaceProyecto"
            ).value.trim();


        const imagenInput =
            document.getElementById(
                "imagenProyecto"
            );


        /*
            EL NOMBRE DEL PROYECTO
            ES EL ÚNICO DATO OBLIGATORIO.
        */

        if (!nombre) {

            alert(
                "Escribe primero el nombre del proyecto."
            );

            return;
        }


        const proyecto = {

            nombre:
                nombre,

            descripcion:
                descripcion,

            rol:
                rol,

            herramientas:
                herramientas,

            enlace:
                enlace,

            imagen:
                null

        };


        /*
            SI EL USUARIO SELECCIONÓ
            UNA IMAGEN, LA LEEMOS.
        */

        if (
            imagenInput.files &&
            imagenInput.files[0]
        ) {

            const archivo =
                imagenInput.files[0];


            const lector =
                new FileReader();


            lector.onload =
                function (evento) {

                    proyecto.imagen =
                        evento.target.result;


                    proyectos.push(
                        proyecto
                    );


                    mostrarProyectos();


                    limpiarFormularioPortafolio();

                };


            lector.readAsDataURL(
                archivo
            );

        } else {

            proyectos.push(
                proyecto
            );


            mostrarProyectos();


            limpiarFormularioPortafolio();

        }

    }
);


/* =========================================
   MOSTRAR PROYECTOS
========================================= */

function mostrarProyectos() {

    portafolioPreview.innerHTML =
        "";


    if (
        proyectos.length === 0
    ) {

        portafolioPreview.innerHTML =
            "<p>Tus proyectos aparecerán aquí.</p>";

        return;
    }


    proyectos.forEach(
        function (proyecto, indice) {

            const tarjeta =
                document.createElement(
                    "article"
                );

            tarjeta.className =
                "proyecto-preview";


            /*
                IMAGEN
            */

            if (
                proyecto.imagen
            ) {

                const imagen =
                    document.createElement(
                        "img"
                    );

                imagen.src =
                    proyecto.imagen;

                imagen.alt =
                    proyecto.nombre;

                tarjeta.appendChild(
                    imagen
                );

            }


            /*
                TÍTULO
            */

            const titulo =
                document.createElement(
                    "h3"
                );

            titulo.textContent =
                proyecto.nombre;


            tarjeta.appendChild(
                titulo
            );


            /*
                DESCRIPCIÓN
            */

            if (
                proyecto.descripcion
            ) {

                const descripcion =
                    document.createElement(
                        "p"
                    );

                descripcion.textContent =
                    proyecto.descripcion;


                tarjeta.appendChild(
                    descripcion
                );

            }


            /*
                ROL
            */

            if (
                proyecto.rol
            ) {

                const rol =
                    document.createElement(
                        "p"
                    );

                rol.innerHTML =
                    "<strong>Mi rol:</strong> " +
                    proyecto.rol;


                tarjeta.appendChild(
                    rol
                );

            }


            /*
                HERRAMIENTAS
            */

            if (
                proyecto.herramientas
            ) {

                const herramientas =
                    document.createElement(
                        "p"
                    );

                herramientas.innerHTML =
                    "<strong>Herramientas:</strong> " +
                    proyecto.herramientas;


                tarjeta.appendChild(
                    herramientas
                );

            }


            /*
                ENLACE
            */

            if (
                proyecto.enlace
            ) {

                const enlace =
                    document.createElement(
                        "a"
                    );

                enlace.href =
                    proyecto.enlace;

                enlace.target =
                    "_blank";

                enlace.rel =
                    "noopener noreferrer";

                enlace.textContent =
                    "Ver proyecto";


                tarjeta.appendChild(
                    enlace
                );

            }


            /*
                BOTÓN BORRAR
            */

            const btnEliminar =
                document.createElement(
                    "button"
                );

            btnEliminar.type =
                "button";

            btnEliminar.className =
                "boton-eliminar";

            btnEliminar.textContent =
                "Eliminar proyecto";


            btnEliminar.addEventListener(
                "click",
                function () {

                    proyectos.splice(
                        indice,
                        1
                    );

                    mostrarProyectos();

                }
            );


            tarjeta.appendChild(
                btnEliminar
            );


            portafolioPreview.appendChild(
                tarjeta
            );

        }
    );

}


/* =========================================
   LIMPIAR FORMULARIO
========================================= */

function limpiarFormularioPortafolio() {

    document.getElementById(
        "nombreProyecto"
    ).value = "";


    document.getElementById(
        "descripcionProyecto"
    ).value = "";


    document.getElementById(
        "rolProyecto"
    ).value = "";


    document.getElementById(
        "herramientasProyecto"
    ).value = "";


    document.getElementById(
        "imagenProyecto"
    ).value = "";


    document.getElementById(
        "enlaceProyecto"
    ).value = "";

}


/* =========================================
   VOLVER A NECESIDAD
========================================= */

btnVolverNecesidad.addEventListener(
    "click",
    function () {

        cambiarPantalla(
            pantallas.consejos,
            pantallas.necesidad
        );

    }
);


/* =========================================
   VOLVER DESDE CV
========================================= */

btnVolverConsejos.addEventListener(
    "click",
    function () {

        cambiarPantalla(
            pantallas.curriculum,
            pantallas.consejos
        );

    }
);


/* =========================================
   VOLVER DESDE PORTAFOLIO
========================================= */

btnVolverConsejosPortafolio.addEventListener(
    "click",
    function () {

        cambiarPantalla(
            pantallas.portafolio,
            pantallas.consejos
        );

    }
);


/* =========================================
   VISTA PREVIA CV
========================================= */

function actualizarVistaPrevia() {

    document.getElementById(
        "previewNombre"
    ).textContent =
        document.getElementById(
            "cvNombre"
        ).value ||
        "Tu nombre";


    document.getElementById(
        "previewProfesion"
    ).textContent =
        document.getElementById(
            "cvProfesion"
        ).value ||
        "Tu profesión";


    document.getElementById(
        "previewContacto"
    ).textContent =
        document.getElementById(
            "cvContacto"
        ).value ||
        "Tu contacto";


    document.getElementById(
        "previewPerfil"
    ).textContent =
        document.getElementById(
            "cvPerfil"
        ).value ||
        "Tu perfil aparecerá aquí.";


    document.getElementById(
        "previewExperiencia"
    ).textContent =
        document.getElementById(
            "cvExperiencia"
        ).value ||
        "Tu experiencia aparecerá aquí.";


    document.getElementById(
        "previewEducacion"
    ).textContent =
        document.getElementById(
            "cvEducacion"
        ).value ||
        "Tu educación aparecerá aquí.";


    document.getElementById(
        "previewHabilidades"
    ).textContent =
        document.getElementById(
            "cvHabilidades"
        ).value ||
        "Tus habilidades aparecerán aquí.";

}


/* =========================================
   ACTUALIZAR CV AL ESCRIBIR
========================================= */

const camposCv = [

    "cvNombre",
    "cvProfesion",
    "cvContacto",
    "cvPerfil",
    "cvExperiencia",
    "cvEducacion",
    "cvHabilidades"

];


camposCv.forEach(
    function (id) {

        document
            .getElementById(id)
            .addEventListener(
                "input",
                actualizarVistaPrevia
            );

    }
);


/* =========================================
   GUARDAR PDF
========================================= */

btnDescargarCv.addEventListener(
    "click",
    function () {

        actualizarVistaPrevia();

        window.print();

    }
);


/* =========================================
   RECUPERAR USUARIO
========================================= */

function cargarUsuario() {

    const guardado =
        localStorage.getItem(
            "usuario"
        );


    if (!guardado) {
        return;
    }


    try {

        usuarioActual =
            JSON.parse(
                guardado
            );


        document.getElementById(
            "nombre"
        ).value =
            usuarioActual.nombre ||
            "";


        document.getElementById(
            "correo"
        ).value =
            usuarioActual.correo ||
            "";


        document.getElementById(
            "telefono"
        ).value =
            usuarioActual.telefono ||
            "";


        document.getElementById(
            "profesion"
        ).value =
            usuarioActual.profesion ||
            "";


    } catch (error) {

        localStorage.removeItem(
            "usuario"
        );

        usuarioActual =
            null;

    }

}


/* =========================================
   INICIAR
========================================= */

cargarUsuario();

mostrarProyectos();
    });

}
