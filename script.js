let usuario=JSON.parse(localStorage.getItem('usuario')||'null');let necesidad=null;let fotoCV='';let proyectos=[];

const $=id=>document.getElementById(id);

function mostrarPantalla(id){
 const actuales=document.querySelectorAll('.pantalla');
 let actual=[...actuales].find(el=>!el.classList.contains('oculta'));
 const siguiente=$(id);
 if(!siguiente)return;
 if(actual===siguiente)return;
 if(actual){
  actual.classList.add('saliendo');
  setTimeout(()=>{
   actual.classList.add('oculta');actual.classList.remove('saliendo');
   siguiente.classList.remove('oculta');siguiente.classList.add('entrando');
   window.scrollTo({top:0,behavior:'smooth'});
   setTimeout(()=>siguiente.classList.remove('entrando'),500);
  },500);
 }else{siguiente.classList.remove('oculta');siguiente.classList.add('entrando');}
}

const consejos={
 Artista:{curriculum:['Presenta tu perfil artístico.','Incluye exposiciones y proyectos relevantes.','Mantén el CV claro.'],portafolio:['Selecciona tus mejores obras.','Ordena tus proyectos.','Cuida las imágenes.'],entrevista:['Explica tu proceso.','Conoce tu portafolio.','Relaciona tu experiencia con el puesto.']},
 Fotógrafo:{curriculum:['Define tu especialidad.','Muestra clientes y proyectos.','Incluye equipo y software.'],portafolio:['Crea series.','Selecciona pocas fotos excelentes.','Cuida la calidad.'],entrevista:['Explica tus decisiones.','Habla de clientes.','Muestra profesionalismo.']},
 Ilustrador:{curriculum:['Resume tu especialidad.','Destaca proyectos relacionados.','Incluye herramientas.'],portafolio:['Muestra tu estilo.','Incluye proceso.','Organiza por categorías.'],entrevista:['Explica tu proceso.','Habla de cambios.','Defiende tus decisiones.']},
 Diseñador:{curriculum:['Define tu especialidad.','Destaca resultados.','Incluye herramientas.'],portafolio:['Presenta casos de estudio.','Muestra el proceso.','Explica tu rol.'],entrevista:['Explica decisiones.','Prepara ejemplos.','Habla del trabajo en equipo.']},
 Pintor:{curriculum:['Define tu perfil.','Incluye exposiciones.','Menciona técnicas.'],portafolio:['Selecciona una colección.','Fotografía bien tus obras.','Incluye información de las obras.'],entrevista:['Explica tu lenguaje visual.','Habla de tu técnica.','Relaciona tu experiencia con el puesto.']},
 Animador:{curriculum:['Presenta tu especialidad.','Destaca proyectos.','Incluye software.'],portafolio:['Crea un reel.','Muestra proceso.','Selecciona trabajos según el puesto.'],entrevista:['Explica tu proceso.','Habla de producción.','Muestra colaboración.']},
 Otro:{curriculum:['Define tu perfil.','Prioriza experiencia.','Incluye habilidades.'],portafolio:['Selecciona lo mejor.','Organiza tu trabajo.','Piensa en el empleador.'],entrevista:['Conoce tus proyectos.','Prepara ejemplos.','Explica tu aporte.']}
};

$('formRegistro').addEventListener('submit',e=>{
 e.preventDefault();
 const nombre=$('nombre').value.trim(),correo=$('correo').value.trim(),telefono=$('telefono').value.trim(),profesion=$('profesion').value;
 if(!nombre||!correo||!telefono||!profesion){$('errorRegistro').textContent='Completa todos los campos.';return;}
 usuario={nombre,correo,telefono,profesion};localStorage.setItem('usuario',JSON.stringify(usuario));$('errorRegistro').textContent='';mostrarPantalla('necesidad');
});

function seleccionarNecesidad(tipo){
 if(!usuario){$('errorNecesidad').textContent='Primero completa el registro.';return;}
 necesidad=tipo;
 const lista=consejos[usuario.profesion]?.[tipo]||consejos.Otro[tipo];
 $('saludo').textContent=`Hola, ${usuario.nombre}. Eres ${usuario.profesion}.`;
 $('titulo').textContent={curriculum:'Cómo mejorar tu currículum',portafolio:'Cómo mejorar tu portafolio',entrevista:'Cómo prepararte para una entrevista'}[tipo];
 $('descripcion').textContent='Consejos personalizados para ti.';
 $('lista').innerHTML=lista.map(x=>`<article class="consejo"><h3>${x}</h3></article>`).join('');
 $('btnCV').classList.toggle('oculto',tipo!=='curriculum');
 $('btnPF').classList.toggle('oculto',tipo!=='portafolio');
 mostrarPantalla('consejos');
}

function renderAyudaCV(){
 const lista=consejos[usuario.profesion]?.curriculum||consejos.Otro.curriculum;
 $('ayudaCV').innerHTML=lista.map(x=>`<div class="ayuda-item"><strong>${x}</strong></div>`).join('');
}

function abrirCurriculum(){
 if(!usuario){alert('Primero completa el registro.');mostrarPantalla('registro');return;}
 renderAyudaCV();
 $('cvNombre').value=usuario.nombre||'';
 $('cvProfesion').value=usuario.profesion||'';
 $('cvContacto').value=`${usuario.correo||''} · ${usuario.telefono||''}`;
 actualizarCV();
 mostrarPantalla('curriculum');
}

function actualizarCV(){
 $('previewNombre').textContent=$('cvNombre').value||'TU NOMBRE';
 $('previewProfesion').textContent=$('cvProfesion').value||'TU PROFESIÓN';
 $('previewContacto').textContent=$('cvContacto').value||'';
 $('previewContacto').textContent=$('cvContacto').value||'';
 $('previewEducacion').textContent=$('cvEducacion').value||'';
 $('previewHabilidades').textContent=$('cvHabilidades').value||'';
 $('previewPerfil').textContent=$('cvPerfil').value||'';
 $('previewExperiencia').textContent=$('cvExperiencia').value||'';
}
['cvNombre','cvProfesion','cvContacto','cvPerfil','cvExperiencia','cvEducacion','cvHabilidades'].forEach(id=>$(id).addEventListener('input',actualizarCV));

$('cvFoto').addEventListener('change',()=>{
 const file=$('cvFoto').files[0];if(!file)return;
 const reader=new FileReader();reader.onload=e=>{$('previewFoto').src=e.target.result;$('previewFoto').style.display='block';};reader.readAsDataURL(file);
});

function renderAyudaPF(){
 const lista=consejos[usuario.profesion]?.portafolio||consejos.Otro.portafolio;
 $('ayudaPF').innerHTML=lista.map(x=>`<div class="ayuda-item"><strong>${x}</strong></div>`).join('');
}

function abrirPortafolio(){
 renderAyudaPF();
 $('pfNombre').value=usuario?.nombre||'';
 $('pfProfesion').value=usuario?.profesion||'';
 $('pfCorreo').value=usuario?.correo||'';
 $('pfTelefono').value=usuario?.telefono||'';
 mostrarPantalla('portafolio');
}

function agregarProyecto(){
 const nombre=$('proyectoNombre').value.trim();if(!nombre){alert('Escribe el nombre del proyecto.');return;}
 const p={nombre,descripcion:$('proyectoDescripcion').value.trim(),rol:$('proyectoRol').value.trim(),herramientas:$('proyectoHerramientas').value.trim(),enlace:$('proyectoEnlace').value.trim(),imagenes:[]};
 const files=[...($('proyectoFotos').files||[])];
 let done=0;
 if(!files.length){proyectos.push(p);renderPF();limpiarPF();return;}
 files.forEach(file=>{const r=new FileReader();r.onload=e=>{p.imagenes.push(e.target.result);done++;if(done===files.length){proyectos.push(p);renderPF();limpiarPF();}};r.readAsDataURL(file);});
}

function renderPF(){
 const box=$('portfolioPreview');box.innerHTML='';
 proyectos.forEach((p,i)=>{const c=document.createElement('article');c.className='portfolio-item';c.innerHTML=`<h3>${p.nombre}</h3><p>${p.descripcion}</p><p><strong>¿Qué hiciste?</strong> ${p.rol}</p><p><strong>Herramientas:</strong> ${p.herramientas}</p>`;if(p.imagenes.length){const g=document.createElement('div');g.className='gallery';p.imagenes.forEach(src=>{const im=document.createElement('img');im.src=src;g.appendChild(im)});c.appendChild(g);}const d=document.createElement('button');d.textContent='Eliminar proyecto';d.className='boton-eliminar';d.onclick=()=>{proyectos.splice(i,1);renderPF();};c.appendChild(d);box.appendChild(c);});
 if(!proyectos.length)box.innerHTML='<p>Aquí aparecerán tus proyectos.</p>';
}

function limpiarPF(){['proyectoNombre','proyectoDescripcion','proyectoRol','proyectoHerramientas','proyectoEnlace','proyectoFotos'].forEach(id=>$(id).value='');}

function descargarPortafolio(){
    if(!proyectos.length){
        alert("Agrega al menos un proyecto antes de descargar el portafolio.");
        return;
    }

    const contenedor = $("printPortfolio");
    contenedor.innerHTML = "";

    const portada = document.createElement("section");
    portada.className = "print-page cover";

    const titulo = $("pfTitulo").value.trim() || "Mi portafolio";
    const autor = $("pfNombre").value.trim() || "Autor";
    const profesion = $("pfProfesion").value.trim() || "Profesional creativo";
    const correo = $("pfCorreo").value.trim() || "—";
    const telefono = $("pfTelefono").value.trim() || "—";
    const ciudad = $("pfCiudad").value.trim() || "—";
    const bio = $("pfBio").value.trim() || "Presentación profesional del autor.";

    portada.innerHTML = `
        <div class="cover-label">PORTAFOLIO</div>
        <h1>${escapar(titulo)}</h1>
        <h2>${escapar(profesion)}</h2>
        <div class="cover-author">
            <strong>${escapar(autor)}</strong>
            <span>${escapar(correo)}</span>
            <span>${escapar(telefono)}</span>
            <span>${escapar(ciudad)}</span>
        </div>
        <p class="cover-bio">${escapar(bio)}</p>
    `;

    contenedor.appendChild(portada);

    proyectos.forEach((proyecto, indice) => {
        const imagenes = proyecto.imagenes || [];
        const porPagina = 4;

        if (!imagenes.length) {
            agregarPaginaProyecto(
                contenedor,
                proyecto,
                indice,
                [],
                0
            );
            return;
        }

        for(let inicio = 0; inicio < imagenes.length; inicio += porPagina){
            const lote = imagenes.slice(inicio, inicio + porPagina);

            agregarPaginaProyecto(
                contenedor,
                proyecto,
                indice,
                lote,
                inicio
            );
        }
    });

    // Esperamos un momento para que el DOM cree las imágenes antes de abrir imprimir.
    setTimeout(() => {
        window.print();
    }, 300);
}

function agregarPaginaProyecto(
    contenedor,
    proyecto,
    indice,
    imagenes,
    inicio
){
    const pagina = document.createElement("section");
    pagina.className = "print-page";

    const titulo = document.createElement("h1");
    titulo.textContent =
        `${indice + 1}. ${proyecto.nombre}` +
        (inicio > 0 ? " — continuación" : "");

    pagina.appendChild(titulo);

    if(inicio === 0){
        if(proyecto.descripcion){
            const descripcion = document.createElement("p");
            descripcion.className = "print-text";
            descripcion.textContent = proyecto.descripcion;
            pagina.appendChild(descripcion);
        }

        if(proyecto.rol || proyecto.herramientas){
            const datos = document.createElement("p");
            datos.className = "print-meta";

            const partes = [];

            if(proyecto.rol){
                partes.push(`¿Qué hiciste?: ${proyecto.rol}`);
            }

            if(proyecto.herramientas){
                partes.push(`Herramientas: ${proyecto.herramientas}`);
            }

            datos.textContent = partes.join(" · ");
            pagina.appendChild(datos);
        }
    }

    if(imagenes.length){
        const galeria = document.createElement("div");
        galeria.className =
            "print-gallery" +
            (imagenes.length === 1 ? " una" : "");

        imagenes.forEach((src, fotoIndex) => {
            const bloque = document.createElement("div");
            bloque.className = "print-image";

            const img = document.createElement("img");
            img.src = src;
            img.alt =
                `${proyecto.nombre} - imagen ${inicio + fotoIndex + 1}`;

            bloque.appendChild(img);
            galeria.appendChild(bloque);
        });

        pagina.appendChild(galeria);
    }

    if(
        inicio + imagenes.length >= (proyecto.imagenes || []).length &&
        proyecto.enlace
    ){
        const enlace = document.createElement("p");
        enlace.className = "print-meta";
        enlace.textContent = `Enlace: ${proyecto.enlace}`;
        pagina.appendChild(enlace);
    }

    contenedor.appendChild(pagina);
}

function escapar(texto){
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}
