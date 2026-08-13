const $=id=>document.getElementById(id);
const pantallas={inicio:$("pantallaInicio"),registro:$("pantallaRegistro"),necesidad:$("pantallaNecesidad"),consejos:$("pantallaConsejos"),curriculum:$("pantallaCurriculum"),portafolio:$("pantallaPortafolio")};
const btnComenzar=$("btnComenzar"),registroForm=$("registroForm"),opciones=document.querySelectorAll(".opcion");
let usuario=null,necesidadActual=null,proyectos=[];

const datos={
Artista:{curriculum:[["Perfil","Explica qué tipo de artista eres y qué te diferencia."],["Experiencia","Incluye exposiciones, proyectos y colaboraciones relevantes."],["Claridad","Mantén el CV ordenado y fácil de leer."]],portafolio:[["Selección","Muestra tus mejores obras."],["Orden","Agrupa los trabajos para mostrar una evolución."],["Descripción","Explica concepto o técnica cuando sea útil."],["Presentación","Usa imágenes claras y títulos."]],entrevista:[["Proceso","Explica cómo desarrollas una idea."],["Portafolio","Conoce y explica cada proyecto."],["Valor","Relaciona tu experiencia con el puesto."]]},
Fotógrafo:{curriculum:[["Especialidad","Indica tu área de fotografía."],["Experiencia","Destaca clientes y proyectos relevantes."],["Herramientas","Incluye equipo y software que dominas."]],portafolio:[["Series","Muestra proyectos coherentes."],["Selección","Mejor pocas fotos excelentes que muchas repetitivas."],["Especialidad","Haz evidente qué tipo de fotografía realizas."],["Calidad","Cuida la presentación de las imágenes."]],entrevista:[["Decisiones","Explica luz, composición y equipo."],["Clientes","Cuenta cómo resolviste sus necesidades."],["Profesionalismo","Habla de tiempos y entregas."]]},
Ilustrador:{curriculum:[["Especialidad","Resume qué tipo de ilustración realizas."],["Proyectos","Prioriza trabajos relacionados con el puesto."],["Herramientas","Incluye programas y técnicas que dominas."]],portafolio:[["Estilo","Representa claramente tu identidad visual."],["Proceso","Incluye bocetos cuando ayuden."],["Categorías","Organiza tus trabajos."],["Objetivo","Piensa en el empleo que buscas."]],entrevista:[["Proceso","Explica cómo conviertes un encargo en una propuesta."],["Cambios","Cuenta cómo trabajas con revisiones."],["Decisiones","Explica tus decisiones visuales."]]},
Diseñador:{curriculum:[["Especialidad","Define tu área de diseño."],["Resultados","Explica problemas solucionados."],["Herramientas","Menciona programas que dominas."]],portafolio:[["Casos de estudio","Explica problema, proceso y resultado."],["Proceso","Muestra bocetos y pruebas."],["Rol","Aclara qué parte realizaste tú."],["Criterio","Demuestra cómo resolviste problemas."]],entrevista:[["Decisiones","Explica el razonamiento detrás de tu diseño."],["Problemas","Prepara ejemplos concretos."],["Equipo","Explica cómo colaboras."]]},
Pintor:{curriculum:[["Perfil","Explica tu tipo de pintura y técnicas."],["Exposiciones","Incluye muestras y proyectos."],["Técnicas","Menciona tus técnicas principales."]],portafolio:[["Colección","Construye una selección coherente."],["Imágenes","Cuida las fotografías de las obras."],["Información","Incluye título, técnica y año."],["Evolución","Muestra desarrollo cuando sea útil."]],entrevista:[["Lenguaje visual","Explica temas e ideas."],["Técnica","Describe cómo desarrollas una obra."],["Aporte","Relaciona tu experiencia con el proyecto."]]},
Animador:{curriculum:[["Especialidad","Indica si trabajas en 2D, 3D, motion, personajes o VFX."],["Proyectos","Prioriza trabajos relacionados con el puesto."],["Software","Menciona herramientas que dominas."]],portafolio:[["Reel","Crea un reel breve."],["Proceso","Muestra storyboard, layouts o pruebas."],["Objetivo","Selecciona trabajos según el puesto."],["Ritmo","Coloca tus mejores trabajos al principio."]],entrevista:[["Proceso","Explica desde la idea hasta la animación."],["Producción","Habla de tiempos y entregas."],["Colaboración","Demuestra trabajo en equipo."]]},
Otro:{curriculum:[["Perfil","Explica qué haces y qué oportunidad buscas."],["Experiencia","Prioriza lo más relevante."],["Habilidades","Selecciona las útiles para el puesto."]],portafolio:[["Selección","Muestra tus mejores proyectos."],["Orden","Usa categorías claras."],["Rol","Aclara qué hiciste tú."],["Objetivo","Piensa en el empleador."]],entrevista:[["Proyectos","Conoce tus trabajos."],["Ejemplos","Prepara historias concretas."],["Aporte","Relaciona tus habilidades con el puesto."]]}
};

function cambiar(actual,siguiente){
 actual.classList.add("saliendo");
 setTimeout(()=>{
  actual.classList.add("oculta"); actual.classList.remove("activa","saliendo");
  siguiente.classList.remove("oculta"); siguiente.classList.add("entrando");
  window.scrollTo({top:0,behavior:"smooth"});
  setTimeout(()=>siguiente.classList.remove("entrando"),550);
 },550);
}
btnComenzar.onclick=()=>cambiar(pantallas.inicio,pantallas.registro);

registroForm.onsubmit=e=>{
 e.preventDefault();
 const nombre=$("nombre").value.trim(),correo=$("correo").value.trim(),telefono=$("telefono").value.trim(),profesion=$("profesion").value;
 if(!nombre||!correo||!telefono||!profesion){$("errorRegistro").textContent="Completa todos los campos.";return;}
 usuario={nombre,correo,telefono,profesion}; localStorage.setItem("usuario",JSON.stringify(usuario)); $("errorRegistro").textContent=""; cambiar(pantallas.registro,pantallas.necesidad);
};

opciones.forEach(o=>o.onclick=()=>{
 if(!usuario){$("errorNecesidad").textContent="Primero completa el registro.";return;}
 necesidadActual=o.dataset.necesidad; renderConsejos(); cambiar(pantallas.necesidad,pantallas.consejos);
});

function renderConsejos(){
 const perfil=datos[usuario.profesion]||datos.Otro,items=perfil[necesidadActual];
 $("saludoConsejos").textContent=`Hola, ${usuario.nombre}. Eres ${usuario.profesion}.`;
 $("tituloConsejos").textContent={curriculum:"Cómo mejorar tu currículum",portafolio:"Cómo mejorar tu portafolio",entrevista:"Cómo prepararte para una entrevista"}[necesidadActual];
 $("descripcionNecesidad").textContent={curriculum:"Consejos para presentar mejor tu experiencia.",portafolio:"Consejos para presentar mejor tus proyectos.",entrevista:"Consejos para explicar tu experiencia y destacar."}[necesidadActual];
 $("listaConsejos").innerHTML="";
 items.forEach(([t,p])=>{const a=document.createElement("article");a.className="consejo";a.innerHTML=`<h3>${t}</h3><p>${p}</p>`;$("listaConsejos").appendChild(a);});
 $("btnCrearCurriculum").classList.toggle("oculto",necesidadActual!=="curriculum");
 $("btnCrearPortafolio").classList.toggle("oculto",necesidadActual!=="portafolio");
}

$("btnCrearCurriculum").onclick=()=>{
 renderAyuda("consejosCv","curriculum"); $("cvNombre").value=usuario.nombre; $("cvProfesion").value=usuario.profesion; $("cvContacto").value=`${usuario.correo} · ${usuario.telefono}`; actualizarCV(); cambiar(pantallas.consejos,pantallas.curriculum);
};
$("btnCrearPortafolio").onclick=()=>{renderAyuda("consejosPortafolio","portafolio");cambiar(pantallas.consejos,pantallas.portafolio);};

function renderAyuda(id,tipo){
 const perfil=datos[usuario.profesion]||datos.Otro,items=perfil[tipo],box=$(id); box.innerHTML="";
 items.forEach(([t,p])=>{const d=document.createElement("div");d.className="ayuda-item";d.innerHTML=`<strong>${t}</strong><p>${p}</p>`;box.appendChild(d);});
}
$("btnVolverNecesidad").onclick=()=>cambiar(pantallas.consejos,pantallas.necesidad);
$("btnVolverConsejos").onclick=()=>cambiar(pantallas.curriculum,pantallas.consejos);
$("btnVolverConsejosPortafolio").onclick=()=>cambiar(pantallas.portafolio,pantallas.consejos);

function actualizarCV(){
 $("previewNombre").textContent=$("cvNombre").value||"Tu nombre";
 $("previewProfesion").textContent=$("cvProfesion").value||"Tu profesión";
 $("previewContacto").textContent=$("cvContacto").value||"Tu contacto";
 $("previewPerfil").textContent=$("cvPerfil").value||"Tu perfil aparecerá aquí.";
 $("previewExperiencia").textContent=$("cvExperiencia").value||"Tu experiencia aparecerá aquí.";
 $("previewEducacion").textContent=$("cvEducacion").value||"Tu educación aparecerá aquí.";
 $("previewHabilidades").textContent=$("cvHabilidades").value||"Tus habilidades aparecerán aquí.";
}
["cvNombre","cvProfesion","cvContacto","cvPerfil","cvExperiencia","cvEducacion","cvHabilidades"].forEach(id=>$(id).oninput=actualizarCV);
$("btnDescargarCv").onclick=()=>{actualizarCV();window.print();};

$("btnAgregarProyecto").onclick=()=>{
 const nombre=$("nombreProyecto").value.trim();
 if(!nombre){alert("Escribe el nombre del proyecto.");return;}
 const p={nombre,descripcion:$("descripcionProyecto").value.trim(),rol:$("rolProyecto").value.trim(),herramientas:$("herramientasProyecto").value.trim(),enlace:$("enlaceProyecto").value.trim(),imagen:null};
 const file=$("imagenProyecto").files[0];
 if(file){const r=new FileReader();r.onload=e=>{p.imagen=e.target.result;proyectos.push(p);renderProyectos();limpiarProyecto();};r.readAsDataURL(file);}else{proyectos.push(p);renderProyectos();limpiarProyecto();}
};

function renderProyectos(){
 const box=$("portafolioPreview");box.innerHTML="";
 if(!proyectos.length){box.innerHTML="<p>Aquí aparecerán tus proyectos.</p>";return;}
 proyectos.forEach((p,i)=>{
  const card=document.createElement("article");card.className="proyecto";
  if(p.imagen){const img=document.createElement("img");img.src=p.imagen;img.alt=p.nombre;card.appendChild(img);}
  const h=document.createElement("h3");h.textContent=p.nombre;card.appendChild(h);
  if(p.descripcion){const x=document.createElement("p");x.textContent=p.descripcion;card.appendChild(x);}
  if(p.rol){const x=document.createElement("p");x.innerHTML=`<strong>Mi rol:</strong> ${p.rol}`;card.appendChild(x);}
  if(p.herramientas){const x=document.createElement("p");x.innerHTML=`<strong>Herramientas:</strong> ${p.herramientas}`;card.appendChild(x);}
  if(p.enlace){const a=document.createElement("a");a.href=p.enlace;a.target="_blank";a.rel="noopener";a.textContent="Ver proyecto";card.appendChild(a);}
  const b=document.createElement("button");b.className="boton-eliminar";b.type="button";b.textContent="Eliminar proyecto";b.onclick=()=>{proyectos.splice(i,1);renderProyectos();};card.appendChild(b);box.appendChild(card);
 });
}
function limpiarProyecto(){["nombreProyecto","descripcionProyecto","rolProyecto","herramientasProyecto","imagenProyecto","enlaceProyecto"].forEach(id=>$(id).value="");}

function cargarUsuario(){
 const u=localStorage.getItem("usuario");
 if(!u)return;
 try{usuario=JSON.parse(u);$("nombre").value=usuario.nombre||"";$("correo").value=usuario.correo||"";$("telefono").value=usuario.telefono||"";$("profesion").value=usuario.profesion||"";}catch{localStorage.removeItem("usuario");usuario=null;}
}
cargarUsuario();
renderProyectos();
