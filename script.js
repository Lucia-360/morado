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
    Artista:{curriculum:[["Perfil","Explica qué tipo de artista eres y qué te diferencia."],["Experiencia","Incluye exposiciones, proyectos y colaboraciones relevantes."],["Claridad","Mantén el CV ordenado y fácil de leer."],["Adaptación","Destaca primero lo más relacionado con cada oportunidad."]],portafolio:[["Selección","Muestra tus mejores obras."],["Orden","Agrupa los trabajos para mostrar una evolución."],["Descripción","Explica concepto o técnica cuando sea útil."],["Presentación","Usa imágenes claras y títulos."]],entrevista:[["Proceso","Explica cómo desarrollas una idea."],["Portafolio","Conoce y explica cada proyecto."],["Valor","Relaciona tu experiencia con el puesto."]]},
    Fotógrafo:{curriculum:[["Especialidad","Indica tu área de fotografía."],["Experiencia","Destaca clientes y proyectos relevantes."],["Herramientas","Incluye equipo y software que dominas."]],portafolio:[["Series","Muestra proyectos coherentes."],["Selección","Mejor pocas fotos excelentes que muchas repetitivas."],["Especialidad","Haz evidente qué tipo de fotografía realizas."],["Calidad","Cuida la presentación de las imágenes."]],entrevista:[["Decisiones","Explica luz, composición y equipo."],["Clientes","Cuenta cómo resolviste sus necesidades."],["Profesionalismo","Habla de tiempos y entregas."]]},
    Ilustrador:{curriculum:[["Especialidad","Resume qué tipo de ilustración realizas."],["Proyectos","Prioriza trabajos relacionados con el puesto."],["Herramientas","Incluye programas y técnicas que dominas."]],portafolio:[["Estilo","Representa claramente tu identidad visual."],["Proceso","Incluye bocetos cuando ayuden."],["Categorías","Organiza tus trabajos."],["Objetivo","Piensa en el empleo que buscas."]],entrevista:[["Proceso","Explica cómo conviertes un encargo en una propuesta."],["Cambios","Cuenta cómo trabajas con revisiones."],["Decisiones","Explica tus decisiones visuales."]]},
    Diseñador:{curriculum:[["Especialidad","Define tu área de diseño."],["Resultados","Explica problemas solucionados."],["Herramientas","Menciona programas que dominas."]],portafolio:[["Casos de estudio","Explica problema, proceso y resultado."],["Proceso","Muestra bocetos y pruebas."],["Rol","Aclara qué parte realizaste tú."],["Criterio","Demuestra cómo resolviste problemas."]],entrevista:[["Decisiones","Explica el razonamiento detrás de tu diseño."],["Problemas","Prepara ejemplos concretos."],["Equipo","Explica cómo colaboras."]]},
    Pintor:{curriculum:[["Perfil","Explica tu tipo de pintura y técnicas."],["Exposiciones","Incluye muestras y proyectos."],["Técnicas","Menciona tus técnicas principales."]],portafolio:[["Colección","Construye una selección coherente."],["Imágenes","Cuida las fotografías de las obras."],["Información","Incluye título, técnica y año."],["Evolución","Muestra desarrollo."]],entrevista:[["Lenguaje visual","Explica temas e ideas."],["Técnica","Describe cómo desarrollas una obra."],["Aporte","Relaciona tu experiencia con el proyecto."]]},
    Animador:{curriculum:[["Especialidad","Indica si trabajas en 2D, 3D, motion, personajes o VFX."],["Proyectos","Prioriza trabajos relacionados con el puesto."],["Software","Menciona herramientas que dominas."]],portafolio:[["Reel","Crea un reel breve."],["Proceso","Muestra storyboard, layouts o pruebas."],["Objetivo","Selecciona trabajos según el puesto."],["Ritmo","Coloca tus mejores trabajos al principio."]],entrevista:[["Proceso","Explica desde la idea hasta la animación."],["Producción","Habla de tiempos y entregas."],["Colaboración","Demuestra trabajo en equipo."]]},
    Otro:{curriculum:[["Perfil","Explica qué haces y qué oportunidad buscas."],["Experiencia","Prioriza lo más relevante."],["Habilidades","Selecciona las útiles para el puesto."]],portafolio:[["Selección","Muestra tus mejores proyectos."],["Orden","Usa categorías claras."],["Rol","Aclara qué hiciste tú."],["Objetivo","Piensa en el empleador."]],entrevista:[["Proyectos","Conoce tus trabajos."],["Ejemplos","Prepara historias concretas."],["Aporte","Relaciona tus habilidades con el puesto."]]}
};

function cambiar(actual, siguiente){
    actual.classList.add("saliendo");
    setTimeout(()=>{
        actual.classList.add("oculta");
        actual.classList.remove("activa","saliendo");
        siguiente.classList.remove("oculta");
        siguiente.classList.add("entrando");
        window.scrollTo({top:0,behavior:"smooth"});
        setTimeout(()=>siguiente.classList.remove("entrando"),550);
    },550);
}

function renderAyuda(id, tipo){
    const perfil = datos[usuario?.profesion] || datos.Otro;
    const items = perfil[tipo];
    const contenedor = $(id);
    contenedor.innerHTML = "";
    items.forEach(([titulo, texto])=>{
        const bloque = document.createElement("div");
        bloque.className = "ayuda-item";
        bloque.innerHTML = `<strong>${titulo}</strong><p>${texto}</p>`;
        contenedor.appendChild(bloque);
    });
}

btnComenzar.addEventListener("click", ()=>{
    cambiar(pantallas.inicio,pantallas.registro);
});

registroForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const nombre=$("nombre").value.trim();
    const correo=$("correo").value.trim();
    const telefono=$("telefono").value.trim();
    const profesion=$("profesion").value;

    if(!nombre || !correo || !telefono || !profesion){
        $("errorRegistro").textContent="Completa todos los campos para continuar.";
        return;
    }

    usuario={nombre,correo,telefono,profesion};
    localStorage.setItem("usuario",JSON.stringify(usuario));
    $("errorRegistro").textContent="";
    cambiar(pantallas.registro,pantallas.necesidad);
});

opciones.forEach(opcion=>{
    opcion.addEventListener("click",()=>{
        if(!usuario){
            $("errorNecesidad").textContent="Primero completa el registro.";
            return;
        }
        necesidadActual=opcion.dataset.necesidad;
        renderConsejos();
        cambiar(pantallas.necesidad,pantallas.consejos);
    });
});

function renderConsejos(){
    const perfil=datos[usuario.profesion] || datos.Otro;
    const items=perfil[necesidadActual];

    $("saludoConsejos").textContent=`Hola, ${usuario.nombre}. Eres ${usuario.profesion}.`;
    $("tituloConsejos").textContent={
        curriculum:"Cómo mejorar tu currículum",
        portafolio:"Cómo mejorar tu portafolio",
        entrevista:"Cómo prepararte para una entrevista"
    }[necesidadActual];

    $("descripcionNecesidad").textContent={
        curriculum:"Consejos para presentar mejor tu experiencia.",
        portafolio:"Consejos para presentar mejor tus proyectos.",
        entrevista:"Consejos para explicar tu experiencia y destacar."
    }[necesidadActual];

    $("listaConsejos").innerHTML="";

    items.forEach(([titulo,texto])=>{
        const article=document.createElement("article");
        article.className="consejo";
        const h3=document.createElement("h3");
        h3.textContent=titulo;
        const p=document.createElement("p");
        p.textContent=texto;
        article.appendChild(h3);
        article.appendChild(p);
        $("listaConsejos").appendChild(article);
    });

    $("btnCrearCurriculum").classList.toggle("oculto",necesidadActual!=="curriculum");
    $("btnCrearPortafolio").classList.toggle("oculto",necesidadActual!=="portafolio");
}

/* BOTÓN CV: evento único y directo */
$("btnCrearCurriculum").addEventListener("click",()=>{
    renderAyuda("consejosCv","curriculum");

    $("cvNombre").value=usuario?.nombre || "";
    $("cvProfesion").value=usuario?.profesion || "";
    $("cvContacto").value=usuario ? `${usuario.correo} · ${usuario.telefono}` : "";

    actualizarCV();

    cambiar(pantallas.consejos,pantallas.curriculum);
});

$("btnCrearPortafolio").addEventListener("click",()=>{
    renderAyuda("consejosPortafolio","portafolio");

    $("pfNombre").value=usuario?.nombre || "";
    $("pfProfesion").value=usuario?.profesion || "";
    $("pfCorreo").value=usuario?.correo || "";
    $("pfTelefono").value=usuario?.telefono || "";

    cambiar(pantallas.consejos,pantallas.portafolio);
});

$("btnVolverNecesidad").addEventListener("click",()=>{
    cambiar(pantallas.consejos,pantallas.necesidad);
});

$("btnVolverConsejos").addEventListener("click",()=>{
    cambiar(pantallas.curriculum,pantallas.consejos);
});

$("btnVolverConsejosPortafolio").addEventListener("click",()=>{
    cambiar(pantallas.portafolio,pantallas.consejos);
});

function actualizarCV(){
    $("previewNombre").textContent=$("cvNombre").value || "TU NOMBRE";
    $("previewProfesion").textContent=$("cvProfesion").value || "TU PROFESIÓN";
    $("previewContacto").textContent=$("cvContacto").value || "Tu contacto";
    $("previewContactoSide").textContent=$("cvContacto").value || "Tu contacto";
    $("previewPerfil").textContent=$("cvPerfil").value || "Tu perfil aparecerá aquí.";
    $("previewExperiencia").textContent=$("cvExperiencia").value || "Tu experiencia aparecerá aquí.";
    $("previewEducacion").textContent=$("cvEducacion").value || "Tu educación aparecerá aquí.";
    $("previewHabilidades").textContent=$("cvHabilidades").value || "Tus habilidades aparecerán aquí.";
}

[
    "cvNombre","cvProfesion","cvContacto","cvPerfil",
    "cvExperiencia","cvEducacion","cvHabilidades"
].forEach(id=>{
    $(id).addEventListener("input",actualizarCV);
});

$("cvFoto").addEventListener("change",()=>{
    const archivo=$("cvFoto").files[0];
    if(!archivo){
        fotoCV="";
        $("previewFoto").style.display="none";
        return;
    }
    if(!archivo.type.startsWith("image/")){
        alert("Selecciona una imagen válida.");
        $("cvFoto").value="";
        return;
    }
    const lector=new FileReader();
    lector.onload=(e)=>{
        fotoCV=e.target.result;
        $("previewFoto").src=fotoCV;
        $("previewFoto").style.display="block";
    };
    lector.readAsDataURL(archivo);
});

$("btnDescargarCv").addEventListener("click",()=>{
    actualizarCV();
    window.print();
});

$("btnAgregarProyecto").addEventListener("click",()=>{
    const nombre=$("nombreProyecto").value.trim();
    if(!nombre){
        alert("Escribe el nombre del proyecto.");
        return;
    }

    const proyecto={
        nombre,
        descripcion:$("descripcionProyecto").value.trim(),
        rol:$("rolProyecto").value.trim(),
        herramientas:$("herramientasProyecto").value.trim(),
        enlace:$("enlaceProyecto").value.trim(),
        imagenes:[]
    };

    const archivos=Array.from($("imagenProyecto").files || []);

    if(!archivos.length){
        proyectos.push(proyecto);
        renderProyectos();
        limpiarProyecto();
        return;
    }

    let pendientes=archivos.length;

    archivos.forEach(archivo=>{
        if(!archivo.type.startsWith("image/")){
            pendientes--;
            return;
        }

        const lector=new FileReader();

        lector.onload=e=>{
            proyecto.imagenes.push(e.target.result);
            pendientes--;
            if(pendientes===0){
                proyectos.push(proyecto);
                renderProyectos();
                limpiarProyecto();
            }
        };

        lector.onerror=()=>{
            pendientes--;
            if(pendientes===0){
                proyectos.push(proyecto);
                renderProyectos();
                limpiarProyecto();
            }
        };

        lector.readAsDataURL(archivo);
    });
});

function renderProyectos(){
    const contenedor=$("portafolioPreview");
    contenedor.innerHTML="";

    if(!proyectos.length){
        contenedor.innerHTML="<p>Aquí aparecerán tus proyectos.</p>";
        return;
    }

    proyectos.forEach((proyecto,indice)=>{
        const card=document.createElement("article");
        card.className="proyecto";

        const h3=document.createElement("h3");
        h3.textContent=proyecto.nombre;
        card.appendChild(h3);

        if(proyecto.imagenes.length){
            const galeria=document.createElement("div");
            galeria.className="proyecto-gallery";

            proyecto.imagenes.forEach(src=>{
                const img=document.createElement("img");
                img.src=src;
                img.alt=proyecto.nombre;
                galeria.appendChild(img);
            });

            card.appendChild(galeria);
        }

        if(proyecto.descripcion){
            const p=document.createElement("p");
            p.textContent=proyecto.descripcion;
            card.appendChild(p);
        }

        if(proyecto.rol){
            const p=document.createElement("p");
            p.innerHTML=`<strong>¿Qué hiciste?</strong> ${proyecto.rol}`;
            card.appendChild(p);
        }

        if(proyecto.herramientas){
            const p=document.createElement("p");
            p.innerHTML=`<strong>Herramientas:</strong> ${proyecto.herramientas}`;
            card.appendChild(p);
        }

        if(proyecto.enlace){
            const a=document.createElement("a");
            a.href=proyecto.enlace;
            a.target="_blank";
            a.rel="noopener noreferrer";
            a.textContent="Ver proyecto";
            card.appendChild(a);
        }

        const borrar=document.createElement("button");
        borrar.className="boton-eliminar";
        borrar.type="button";
        borrar.textContent="Eliminar proyecto";
        borrar.addEventListener("click",()=>{
            proyectos.splice(indice,1);
            renderProyectos();
        });

        card.appendChild(borrar);
        contenedor.appendChild(card);
    });
}

function limpiarProyecto(){
    $("nombreProyecto").value="";
    $("descripcionProyecto").value="";
    $("rolProyecto").value="";
    $("herramientasProyecto").value="";
    $("imagenProyecto").value="";
    $("enlaceProyecto").value="";
}

$("btnDescargarPortafolio").addEventListener("click",()=>{
    if(!proyectos.length){
        alert("Agrega al menos un proyecto.");
        return;
    }
    generarPortafolioImpresion();
    setTimeout(()=>window.print(),150);
});

function generarPortafolioImpresion(){
    const pages=$("portfolioPages");
    pages.innerHTML="";

    const portada=document.createElement("section");
    portada.className="portfolio-page portfolio-cover";

    const titulo=$("pfTitulo").value.trim() || "Mi portafolio";

    portada.innerHTML=`
        <div class="cover-label">PORTAFOLIO</div>
        <h1>${escapeHtml(titulo)}</h1>
        <h2>${escapeHtml($("pfProfesion").value.trim() || "Profesional creativo")}</h2>
        <div class="cover-author">
            <strong>${escapeHtml($("pfNombre").value.trim() || "Autor")}</strong>
            <div>${escapeHtml($("pfCorreo").value.trim() || "—")}</div>
            <div>${escapeHtml($("pfTelefono").value.trim() || "—")}</div>
            <div>${escapeHtml($("pfCiudad").value.trim() || "—")}</div>
        </div>
        <p class="cover-bio">${escapeHtml($("pfBio").value.trim() || "Presentación profesional del autor.")}</p>
    `;
    pages.appendChild(portada);

    proyectos.forEach((proyecto,projectIndex)=>{
        const images=proyecto.imagenes || [];
        const porPagina=4;

        for(let offset=0;offset<Math.max(1,images.length);offset+=porPagina){
            const page=document.createElement("section");
            page.className="portfolio-page portfolio-project-page";

            const h1=document.createElement("h1");
            h1.textContent=`${projectIndex+1}. ${proyecto.nombre}${offset ? " (continuación)" : ""}`;
            page.appendChild(h1);

            if(!offset){
                if(proyecto.descripcion){
                    const p=document.createElement("p");
                    p.className="project-body";
                    p.textContent=proyecto.descripcion;
                    page.appendChild(p);
                }
                if(proyecto.rol || proyecto.herramientas){
                    const p=document.createElement("p");
                    p.className="project-tools";
                    p.textContent=[
                        proyecto.rol ? `¿Qué hiciste?: ${proyecto.rol}` : "",
                        proyecto.herramientas ? `Herramientas: ${proyecto.herramientas}` : ""
                    ].filter(Boolean).join(" · ");
                    page.appendChild(p);
                }
            }

            const lote=images.slice(offset,offset+porPagina);
            if(lote.length){
                const gallery=document.createElement("div");
                gallery.className=`project-gallery-print${lote.length===1 ? " single" : ""}`;

                lote.forEach((src,imageIndex)=>{
                    const wrap=document.createElement("div");
                    wrap.className="project-image-wrap";
                    const img=document.createElement("img");
                    img.src=src;
                    img.alt=`${proyecto.nombre} - imagen ${offset+imageIndex+1}`;
                    wrap.appendChild(img);
                    gallery.appendChild(wrap);
                });

                page.appendChild(gallery);
            }

            pages.appendChild(page);
        }

        if(proyecto.enlace){
            const lastPage=pages.lastElementChild;
            const p=document.createElement("p");
            p.className="project-tools";
            p.textContent=`Enlace: ${proyecto.enlace}`;
            lastPage.appendChild(p);
        }
    });
}

function escapeHtml(text){
    const div=document.createElement("div");
    div.textContent=text;
    return div.innerHTML;
}

function cargarUsuario(){
    const guardado=localStorage.getItem("usuario");
    if(!guardado) return;

    try{
        usuario=JSON.parse(guardado);
        $("nombre").value=usuario.nombre || "";
        $("correo").value=usuario.correo || "";
        $("telefono").value=usuario.telefono || "";
        $("profesion").value=usuario.profesion || "";
    }catch{
        localStorage.removeItem("usuario");
        usuario=null;
    }
}

cargarUsuario();
renderProyectos();
$("previewFoto").style.display="none";
