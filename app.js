// URL de tu Webhook de Google Apps Script:
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbw9eRjUv819dO8qV514yD1d8mUqPz7_vLqUqU1R38uYm4GfKjH3/exec"; 
// NOTA: Si tu URL era diferente, pon aquí la tuya original.

// 46 REACTIVOS OFICIALES DE LA GUÍA DE REFERENCIA II - NOM-035-STPS-2018
// tipo: "directa" (Siempre=4 ... Nunca=0) | "inversa" (Siempre=0 ... Nunca=4)
const reactivosNOM035 = [
  // CATEGORÍA: AMBIENTE DE TRABAJO
  { id: 1, cat: "Ambiente de trabajo", tipo: "directa", texto: "El espacio donde trabajo me permite realizar mis actividades de manera cómoda y segura." },
  { id: 2, cat: "Ambiente de trabajo", tipo: "directa", texto: "Mi trabajo me exige hacer mucho esfuerzo físico." },
  { id: 3, cat: "Ambiente de trabajo", tipo: "directa", texto: "Me preocupa sufrir un accidente en mi trabajo." },
  { id: 4, cat: "Ambiente de trabajo", tipo: "directa", texto: "Considero que las actividades que realizo son peligrosas." },

  // CATEGORÍA: FACTORES PROPIOS DE LA ACTIVIDAD (Carga de trabajo)
  { id: 5, cat: "Factores propios de la actividad", tipo: "directa", texto: "Por la cantidad de trabajo que tengo debo quedarme tiempo adicional a mi turno." },
  { id: 6, cat: "Factores propios de la actividad", tipo: "directa", texto: "Por la cantidad de trabajo que tengo debo trabajar sin parar." },
  { id: 7, cat: "Factores propios de la actividad", tipo: "directa", texto: "Considero que es necesario mantener un ritmo de trabajo acelerado." },
  { id: 8, cat: "Factores propios de la actividad", tipo: "directa", texto: "Mi trabajo exige que esté muy concentrado." },
  { id: 9, cat: "Factores propios de la actividad", tipo: "directa", texto: "Mi trabajo requiere que memorice mucha información." },
  { id: 10, cat: "Factores propios de la actividad", tipo: "directa", texto: "Mi trabajo me exige atender varios asuntos al mismo tiempo." },
  { id: 11, cat: "Factores propios de la actividad", tipo: "directa", texto: "En mi trabajo soy responsable de cosas de mucho valor." },
  { id: 12, cat: "Factores propios de la actividad", tipo: "directa", texto: "Respondo ante mi jefe por los resultados de toda mi área de trabajo." },
  { id: 13, cat: "Factores propios de la actividad", tipo: "directa", texto: "En mi trabajo me dan órdenes contradictorias." },

  // CATEGORÍA: FACTORES PROPIOS DE LA ACTIVIDAD (Falta de control)
  { id: 14, cat: "Factores propios de la actividad", tipo: "inversa", texto: "Puedo decidir la velocidad a la que realizo mis actividades." },
  { id: 15, cat: "Factores propios de la actividad", tipo: "inversa", texto: "Puedo cambiar el orden de las actividades que realizo en mi trabajo." },
  { id: 16, cat: "Factores propios de la actividad", tipo: "inversa", texto: "Tengo la libertad de decidir cómo hacer mi trabajo." },
  { id: 17, cat: "Factores propios de la actividad", tipo: "inversa", texto: "En mi trabajo me permiten tomar pausas cuando las necesito." },
  { id: 18, cat: "Factores propios de la actividad", tipo: "inversa", texto: "Puedo decidir cuánto trabajo hago durante mi jornada." },
  { id: 19, cat: "Factores propios de la actividad", tipo: "inversa", texto: "Puedo opinar sobre cómo se deben hacer las cosas en mi área de trabajo." },
  { id: 20, cat: "Factores propios de la actividad", tipo: "inversa", texto: "Me informan con claridad cuáles son mis funciones y responsabilidades." },
  { id: 21, cat: "Factores propios de la actividad", tipo: "inversa", texto: "Me informan con quién puedo resolver problemas de trabajo." },
  { id: 22, cat: "Factores propios de la actividad", tipo: "inversa", texto: "Me permiten capacitarme para hacer mejor mi trabajo." },

  // CATEGORÍA: ORGANIZACIÓN DEL TIEMPO DE TRABAJO
  { id: 23, cat: "Organización del tiempo de trabajo", tipo: "directa", texto: "Trabajo horas extras más de tres veces a la semana." },
  { id: 24, cat: "Organización del tiempo de trabajo", tipo: "directa", texto: "Mi trabajo me exige laborar en días de descanso, festivos o fines de semana." },
  { id: 25, cat: "Organización del tiempo de trabajo", tipo: "directa", texto: "En mi trabajo considero que se aplican turnos rotativos sin aviso previo." },
  { id: 26, cat: "Organización del tiempo de trabajo", tipo: "directa", texto: "Por mi trabajo tengo que postergar asuntos personales o familiares." },
  { id: 27, cat: "Organización del tiempo de trabajo", tipo: "directa", texto: "Pienso en las responsabilidades de mi trabajo aun cuando no estoy laborando." },

  // CATEGORÍA: LIDERAZGO Y RELACIONES EN EL TRABAJO (Liderazgo)
  { id: 28, cat: "Liderazgo y relaciones en el trabajo", tipo: "inversa", texto: "Mi jefe ayuda a organizar mejor el trabajo." },
  { id: 29, cat: "Liderazgo y relaciones en el trabajo", tipo: "inversa", texto: "Mi jefe toma en cuenta mis puntos de vista." },
  { id: 30, cat: "Liderazgo y relaciones en el trabajo", tipo: "inversa", texto: "Mi jefe me ayuda a resolver los problemas de trabajo." },
  { id: 31, cat: "Liderazgo y relaciones en el trabajo", tipo: "inversa", texto: "Puedo confiar en mis compañeros de trabajo." },
  { id: 32, cat: "Liderazgo y relaciones en el trabajo", tipo: "inversa", texto: "Cuando tenemos que hacer trabajo de equipo mis compañeros colaboran." },
  { id: 33, cat: "Liderazgo y relaciones en el trabajo", tipo: "inversa", texto: "Mis compañeros de trabajo me ayudan cuando tengo dificultades." },

  // CATEGORÍA: LIDERAZGO Y RELACIONES EN EL TRABAJO (Violencia laboral)
  { id: 34, cat: "Liderazgo y relaciones en el trabajo", tipo: "directa", texto: "En mi trabajo puedo expresarme libremente sin ser criticado." },
  { id: 35, cat: "Liderazgo y relaciones en el trabajo", tipo: "directa", texto: "Se ignoran los comentarios o sugerencias que hago en mi área de trabajo." },
  { id: 36, cat: "Liderazgo y relaciones en el trabajo", tipo: "directa", texto: "Se juzga de manera negativa mi desempeño sin motivos justificados." },
  { id: 37, cat: "Liderazgo y relaciones en el trabajo", tipo: "directa", texto: "Me asignan tareas imposibles de realizar en el tiempo fijado." },
  { id: 38, cat: "Liderazgo y relaciones en el trabajo", tipo: "directa", texto: "Se me asignan actividades por debajo de mi capacidad." },
  { id: 39, cat: "Liderazgo y relaciones en el trabajo", tipo: "directa", texto: "En mi trabajo se reciben burlas, calumnias o difamaciones." },
  { id: 40, cat: "Liderazgo y relaciones en el trabajo", tipo: "directa", texto: "Se presentan agresiones físicas en el centro de trabajo." },

  // ATENCIÓN A CLIENTES / USUARIOS (Reactivos 41 a 43)
  { id: 41, cat: "Atención a clientes y usuarios", tipo: "directa", texto: "En mi trabajo debo brindar servicio o atender a clientes o usuarios enojados." },
  { id: 42, cat: "Atención a clientes y usuarios", tipo: "directa", texto: "Mi trabajo me exige atender situaciones de emergencia o gravedad de personas." },
  { id: 43, cat: "Atención a clientes y usuarios", tipo: "directa", texto: "Se reciben quejas constantes por el servicio que presta el área de trabajo." },

  // CONDICIONES DE JEFATURA (Reactivos 44 a 46)
  { id: 44, cat: "Liderazgo (Personal a cargo)", tipo: "directa", texto: "Comunico oportunamente a mi equipo los cambios en las instrucciones de trabajo." },
  { id: 45, cat: "Liderazgo (Personal a cargo)", tipo: "directa", texto: "Resuelvo las dudas y dificultades técnicas que se presentan con el personal a mi cargo." },
  { id: 46, cat: "Liderazgo (Personal a cargo)", tipo: "directa", texto: "El personal a mi cargo cumple con los estándares y metas de trabajo programadas." }
];

// DIBUJAR AUTOMÁTICAMENTE EL CUESTIONARIO AGRUPADO POR CATEGORÍAS
function renderizarPreguntas() {
  const contenedor = document.getElementById("contenedor-preguntas");
  let categoriaActual = "";

  reactivosNOM035.forEach((item) => {
    // Si cambia de categoría, insertamos un encabezado divisorio
    if (item.cat !== categoriaActual) {
      categoriaActual = item.cat;
      const catHeader = document.createElement("div");
      catHeader.className = "categoria-header";
      catHeader.innerHTML = `<h4>📂 Dimensión: ${categoriaActual}</h4>`;
      contenedor.appendChild(catHeader);
    }

    // Ponderación oficial según el tipo de ítem
    // Directa: Siempre=4, Casi siempre=3, Algunas veces=2, Casi nunca=1, Nunca=0
    // Inversa: Siempre=0, Casi siempre=1, Algunas veces=2, Casi nunca=3, Nunca=4
    const vSiempre = item.tipo === "directa" ? 4 : 0;
    const vCasiSiempre = item.tipo === "directa" ? 3 : 1;
    const vAlgunasVeces = 2;
    const vCasiNunca = item.tipo === "directa" ? 1 : 3;
    const vNunca = item.tipo === "directa" ? 0 : 4;

    const divPregunta = document.createElement("div");
    divPregunta.className = "pregunta-box";
    divPregunta.innerHTML = `
      <p class="pregunta-texto"><strong>${item.id}.</strong> ${item.texto}</p>
      <div class="opciones-nom">
        <label><input type="radio" name="p_${item.id}" value="${vSiempre}" required> Siempre</label>
        <label><input type="radio" name="p_${item.id}" value="${vCasiSiempre}"> Casi siempre</label>
        <label><input type="radio" name="p_${item.id}" value="${vAlgunasVeces}"> Algunas veces</label>
        <label><input type="radio" name="p_${item.id}" value="${vCasiNunca}"> Casi nunca</label>
        <label><input type="radio" name="p_${item.id}" value="${vNunca}"> Nunca</label>
      </div>
    `;
    contenedor.appendChild(divPregunta);
  });
}

// BAREMO OFICIAL GUÍA II (NOM-035-STPS-2018)
function calcularNivelRiesgoGuiaII(puntajeTotal) {
  if (puntajeTotal < 20) return "Nulo o despreciable";
  if (puntajeTotal < 45) return "Bajo";
  if (puntajeTotal < 70) return "Medio";
  if (puntajeTotal < 90) return "Alto";
  return "Muy Alto";
}

// ENVIAR EL FORMULARIO
document.getElementById("formulario-nom035").addEventListener("submit", async function(e) {
  e.preventDefault();

  const boton = document.getElementById("btn-enviar");
  boton.innerText = "Calculando puntajes y guardando...";
  boton.disabled = true;

  // Sumar puntajes de los 46 reactivos seleccionados
  let sumaPuntaje = 0;
  for (let i = 1; i <= reactivosNOM035.length; i++) {
    const radioSeleccionado = document.querySelector(`input[name="p_${i}"]:checked`);
    if (radioSeleccionado) {
      sumaPuntaje += parseInt(radioSeleccionado.value, 10);
    }
  }

  const nivelRiesgo = calcularNivelRiesgoGuiaII(sumaPuntaje);

  const payload = {
    empresa: document.getElementById("empresa").value.trim(),
    idEmpleado: document.getElementById("idEmpleado").value.trim(),
    nombre: document.getElementById("nombre").value.trim() || "Confidencial",
    puesto: document.getElementById("puesto").value.trim(),
    guia: "Guía II Oficial (46 ítems)",
    puntajeTotal: sumaPuntaje,
    nivelRiesgo: nivelRiesgo
  };

  try {
    const respuesta = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });

    const data = await respuesta.json();

    if (data.status === "success") {
      alert(`✅ ¡Cuestionario registrado exitosamente!\n\n` +
            `Empresa: ${payload.empresa}\n` +
            `Colaborador: ${payload.idEmpleado}\n` +
            `Puntaje Obtenido: ${sumaPuntaje} puntos\n` +
            `Nivel de Riesgo Normativo: ${nivelRiesgo}\n\n` +
            `Los datos han sido incorporados en la base diagnóstica de la clínica.`);
      document.getElementById("formulario-nom035").reset();
      window.scrollTo({ top: document.getElementById("nom035").offsetTop, behavior: "smooth" });
    } else {
      alert("Error al guardar: " + data.message);
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    alert("Hubo un problema de conexión al registrar las respuestas. Verifica tu red.");
  } finally {
    boton.innerText = "Enviar Evaluación y Registrar Diagnóstico";
    boton.disabled = false;
  }
});

// Iniciar cuestionario al cargar la página
renderizarPreguntas();