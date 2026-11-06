// ========================================================
// SISTEMA DE EVALUACIÓN NOM-035: GUÍA II Y GUÍA III ADREXA
// ========================================================

const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwi55xu70rORMBEjvFt2gS7-LP_E0QlBo_udA1SrjVfJqTqQSG5Jn5QWxWDUKlfZFEoIw/exec"; 

// 46 REACTIVOS GUÍA DE REFERENCIA II (16 - 50 TRABAJADORES)
const reactivosGuiaII = [
  { id: 1, cat: "Ambiente de trabajo", tipo: "directa", texto: "El espacio donde trabajo me permite realizar mis actividades de manera cómoda y segura." },
  { id: 2, cat: "Ambiente de trabajo", tipo: "directa", texto: "Mi trabajo me exige hacer mucho esfuerzo físico." },
  { id: 3, cat: "Ambiente de trabajo", tipo: "directa", texto: "Me preocupa sufrir un accidente en mi trabajo." },
  { id: 4, cat: "Ambiente de trabajo", tipo: "directa", texto: "Considero que las actividades que realizo son peligrosas." },
  { id: 5, cat: "Carga de trabajo", tipo: "directa", texto: "Por la cantidad de trabajo que tengo debo quedarme tiempo adicional a mi turno." },
  { id: 6, cat: "Carga de trabajo", tipo: "directa", texto: "Por la cantidad de trabajo que tengo debo trabajar sin parar." },
  { id: 7, cat: "Carga de trabajo", tipo: "directa", texto: "Considero que es necesario mantener un ritmo de trabajo acelerado." },
  { id: 8, cat: "Carga de trabajo", tipo: "directa", texto: "Mi trabajo exige que esté muy concentrado." },
  { id: 9, cat: "Carga de trabajo", tipo: "directa", texto: "Mi trabajo requiere que memorice mucha información." },
  { id: 10, cat: "Carga de trabajo", tipo: "directa", texto: "Mi trabajo me exige atender varios asuntos al mismo tiempo." },
  { id: 11, cat: "Carga de trabajo", tipo: "directa", texto: "En mi trabajo soy responsable de cosas de mucho valor." },
  { id: 12, cat: "Carga de trabajo", tipo: "directa", texto: "Respondo ante mi jefe por los resultados de toda mi área de trabajo." },
  { id: 13, cat: "Carga de trabajo", tipo: "directa", texto: "En mi trabajo me dan órdenes contradictorias." },
  { id: 14, cat: "Falta de control sobre el trabajo", tipo: "inversa", texto: "Puedo decidir la velocidad a la que realizo mis actividades." },
  { id: 15, cat: "Falta de control sobre el trabajo", tipo: "inversa", texto: "Puedo cambiar el orden de las actividades que realizo en mi trabajo." },
  { id: 16, cat: "Falta de control sobre el trabajo", tipo: "inversa", texto: "Tengo la libertad de decidir cómo hacer mi trabajo." },
  { id: 17, cat: "Falta de control sobre el trabajo", tipo: "inversa", texto: "En mi trabajo me permiten tomar pausas cuando las necesito." },
  { id: 18, cat: "Falta de control sobre el trabajo", tipo: "inversa", texto: "Puedo decidir cuánto trabajo hago durante mi jornada." },
  { id: 19, cat: "Falta de control sobre el trabajo", tipo: "inversa", texto: "Puedo opinar sobre cómo se deben hacer las cosas en mi área de trabajo." },
  { id: 20, cat: "Falta de control sobre el trabajo", tipo: "inversa", texto: "Me informan con claridad cuáles son mis funciones y responsabilidades." },
  { id: 21, cat: "Falta de control sobre el trabajo", tipo: "inversa", texto: "Me informan con quién puedo resolver problemas de trabajo." },
  { id: 22, cat: "Falta de control sobre el trabajo", tipo: "inversa", texto: "Me permiten capacitarme para hacer mejor mi trabajo." },
  { id: 23, cat: "Jornada y relación familiar", tipo: "directa", texto: "Trabajo horas extras más de tres veces a la semana." },
  { id: 24, cat: "Jornada y relación familiar", tipo: "directa", texto: "Mi trabajo me exige laborar en días de descanso, festivos o fines de semana." },
  { id: 25, cat: "Jornada y relación familiar", tipo: "directa", texto: "En mi trabajo considero que se aplican turnos rotativos sin aviso previo." },
  { id: 26, cat: "Jornada y relación familiar", tipo: "directa", texto: "Por mi trabajo tengo que postergar asuntos personales o familiares." },
  { id: 27, cat: "Jornada y relación familiar", tipo: "directa", texto: "Pienso en las responsabilidades de mi trabajo aun cuando no estoy laborando." },
  { id: 28, cat: "Liderazgo y relaciones", tipo: "inversa", texto: "Mi jefe ayuda a organizar mejor el trabajo." },
  { id: 29, cat: "Liderazgo y relaciones", tipo: "inversa", texto: "Mi jefe toma en cuenta mis puntos de vista." },
  { id: 30, cat: "Liderazgo y relaciones", tipo: "inversa", texto: "Mi jefe me ayuda a resolver los problemas de trabajo." },
  { id: 31, cat: "Liderazgo y relaciones", tipo: "inversa", texto: "Puedo confiar en mis compañeros de trabajo." },
  { id: 32, cat: "Liderazgo y relaciones", tipo: "inversa", texto: "Cuando tenemos que hacer trabajo de equipo mis compañeros colaboran." },
  { id: 33, cat: "Liderazgo y relaciones", tipo: "inversa", texto: "Mis compañeros de trabajo me ayudan cuando tengo dificultades." },
  { id: 34, cat: "Violencia laboral", tipo: "directa", texto: "En mi trabajo puedo expresarme libremente sin ser criticado." },
  { id: 35, cat: "Violencia laboral", tipo: "directa", texto: "Se ignoran los comentarios o sugerencias que hago en mi área de trabajo." },
  { id: 36, cat: "Violencia laboral", tipo: "directa", texto: "Se juzga de manera negativa mi desempeño sin motivos justificados." },
  { id: 37, cat: "Violencia laboral", tipo: "directa", texto: "Me asignan tareas imposibles de realizar en el tiempo fijado." },
  { id: 38, cat: "Violencia laboral", tipo: "directa", texto: "Se me asignan actividades por debajo de mi capacidad." },
  { id: 39, cat: "Violencia laboral", tipo: "directa", texto: "En mi trabajo se reciben burlas, calumnias o difamaciones." },
  { id: 40, cat: "Violencia laboral", tipo: "directa", texto: "Se presentan agresiones físicas en el centro de trabajo." },
  { id: 41, cat: "Atención a clientes y usuarios", tipo: "directa", texto: "En mi trabajo debo brindar servicio o atender a clientes o usuarios enojados." },
  { id: 42, cat: "Atención a clientes y usuarios", tipo: "directa", texto: "Mi trabajo me exige atender situaciones de emergencia o gravedad de personas." },
  { id: 43, cat: "Atención a clientes y usuarios", tipo: "directa", texto: "Se reciben quejas constantes por el servicio que presta el área de trabajo." },
  { id: 44, cat: "Liderazgo (Personal a cargo)", tipo: "directa", texto: "Comunico oportunamente a mi equipo los cambios en las instrucciones de trabajo." },
  { id: 45, cat: "Liderazgo (Personal a cargo)", tipo: "directa", texto: "Resuelvo las dudas y dificultades técnicas que se presentan con el personal a mi cargo." },
  { id: 46, cat: "Liderazgo (Personal a cargo)", tipo: "directa", texto: "El personal a mi cargo cumple con los estándares y metas de trabajo programadas." }
];

// 72 REACTIVOS GUÍA DE REFERENCIA III (MÁS DE 50 TRABAJADORES)
const reactivosGuiaIII = [
  { id: 1, cat: "Condiciones en el ambiente", tipo: "directa", texto: "El espacio donde trabajo me permite realizar mis actividades de manera cómoda y segura." },
  { id: 2, cat: "Condiciones en el ambiente", tipo: "directa", texto: "Mi trabajo me exige hacer mucho esfuerzo físico." },
  { id: 3, cat: "Condiciones en el ambiente", tipo: "directa", texto: "Me preocupa sufrir un accidente en mi trabajo." },
  { id: 4, cat: "Condiciones en el ambiente", tipo: "directa", texto: "Considero que las actividades que realizo son peligrosas." },
  { id: 5, cat: "Condiciones en el ambiente", tipo: "directa", texto: "Por la suciedad, los olores, las temperaturas extremas o el ruido es desagradable trabajar aquí." },
  { id: 6, cat: "Carga de trabajo", tipo: "directa", texto: "Por la cantidad de trabajo que tengo debo quedarme tiempo adicional a mi turno." },
  { id: 7, cat: "Carga de trabajo", tipo: "directa", texto: "Por la cantidad de trabajo que tengo debo trabajar sin parar." },
  { id: 8, cat: "Carga de trabajo", tipo: "directa", texto: "Considero que es necesario mantener un ritmo de trabajo acelerado." },
  { id: 9, cat: "Carga de trabajo", tipo: "directa", texto: "Mi trabajo exige que esté muy concentrado." },
  { id: 10, cat: "Carga de trabajo", tipo: "directa", texto: "Mi trabajo requiere que memorice mucha información." },
  { id: 11, cat: "Carga de trabajo", tipo: "directa", texto: "Mi trabajo me exige atender varios asuntos al mismo tiempo." },
  { id: 12, cat: "Carga de trabajo", tipo: "directa", texto: "En mi trabajo soy responsable de cosas de mucho valor." },
  { id: 13, cat: "Carga de trabajo", tipo: "directa", texto: "Respondo ante mi jefe por los resultados de toda mi área de trabajo." },
  { id: 14, cat: "Carga de trabajo", tipo: "directa", texto: "En mi trabajo me dan órdenes contradictorias." },
  { id: 15, cat: "Carga de trabajo", tipo: "directa", texto: "Considero que en mi trabajo me piden hacer cosas innecesarias." },
  { id: 16, cat: "Falta de control sobre el trabajo", tipo: "inversa", texto: "Puedo decidir la velocidad a la que realizo mis actividades." },
  { id: 17, cat: "Falta de control sobre el trabajo", tipo: "inversa", texto: "Puedo cambiar el orden de las actividades que realizo en mi trabajo." },
  { id: 18, cat: "Falta de control sobre el trabajo", tipo: "inversa", texto: "Tengo la libertad de decidir cómo hacer mi trabajo." },
  { id: 19, cat: "Falta de control sobre el trabajo", tipo: "inversa", texto: "En mi trabajo me permiten tomar pausas cuando las necesito." },
  { id: 20, cat: "Falta de control sobre el trabajo", tipo: "inversa", texto: "Puedo decidir cuánto trabajo hago durante mi jornada." },
  { id: 21, cat: "Falta de control sobre el trabajo", tipo: "inversa", texto: "Puedo opinar sobre cómo se deben hacer las cosas en mi área de trabajo." },
  { id: 22, cat: "Falta de control sobre el trabajo", tipo: "inversa", texto: "Me informan con claridad cuáles son mis funciones y responsabilidades." },
  { id: 23, cat: "Falta de control sobre el trabajo", tipo: "inversa", texto: "Me informan con quién puedo resolver problemas de trabajo." },
  { id: 24, cat: "Falta de control sobre el trabajo", tipo: "inversa", texto: "Me permiten capacitarme para hacer mejor mi trabajo." },
  { id: 25, cat: "Falta de control sobre el trabajo", tipo: "inversa", texto: "Recibo capacitación útil para el desarrollo de mis labores." },
  { id: 26, cat: "Jornada y relación con la familia", tipo: "directa", texto: "Trabajo horas extras más de tres veces a la semana." },
  { id: 27, cat: "Jornada y relación con la familia", tipo: "directa", texto: "Mi trabajo me exige laborar en días de descanso, festivos o fines de semana." },
  { id: 28, cat: "Jornada y relación con la familia", tipo: "directa", texto: "En mi trabajo considero que se aplican turnos rotativos sin previo aviso." },
  { id: 29, cat: "Jornada y relación con la familia", tipo: "directa", texto: "Por mi trabajo tengo que postergar asuntos personales o familiares." },
  { id: 30, cat: "Jornada y relación con la familia", tipo: "directa", texto: "Pienso en las responsabilidades de mi trabajo aun cuando no estoy laborando." },
  { id: 31, cat: "Liderazgo", tipo: "inversa", texto: "Mi jefe ayuda a organizar mejor el trabajo." },
  { id: 32, cat: "Liderazgo", tipo: "inversa", texto: "Mi jefe toma en cuenta mis puntos de vista." },
  { id: 33, cat: "Liderazgo", tipo: "inversa", texto: "Mi jefe me ayuda a resolver los problemas de trabajo." },
  { id: 34, cat: "Liderazgo", tipo: "inversa", texto: "Mi jefe distribuye equitativamente las tareas de trabajo." },
  { id: 35, cat: "Liderazgo", tipo: "inversa", texto: "Mi jefe me brinda retroalimentación clara sobre mi desempeño." },
  { id: 36, cat: "Relaciones en el trabajo", tipo: "inversa", texto: "Puedo confiar en mis compañeros de trabajo." },
  { id: 37, cat: "Relaciones en el trabajo", tipo: "inversa", texto: "Cuando tenemos que hacer trabajo de equipo mis compañeros colaboran." },
  { id: 38, cat: "Relaciones en el trabajo", tipo: "inversa", texto: "Mis compañeros de trabajo me ayudan cuando tengo dificultades." },
  { id: 39, cat: "Relaciones en el trabajo", tipo: "inversa", texto: "En mi centro de trabajo existe un ambiente de apoyo y camaradería." },
  { id: 40, cat: "Violencia laboral", tipo: "directa", texto: "En mi trabajo puedo expresarme libremente sin ser criticado." },
  { id: 41, cat: "Violencia laboral", tipo: "directa", texto: "Se ignoran los comentarios o sugerencias que hago en mi área de trabajo." },
  { id: 42, cat: "Violencia laboral", tipo: "directa", texto: "Se juzga de manera negativa mi desempeño sin motivos justificados." },
  { id: 43, cat: "Violencia laboral", tipo: "directa", texto: "Me asignan tareas imposibles de realizar en el tiempo fijado." },
  { id: 44, cat: "Violencia laboral", tipo: "directa", texto: "Se me asignan actividades por debajo de mi capacidad." },
  { id: 45, cat: "Violencia laboral", tipo: "directa", texto: "En mi trabajo se reciben burlas, calumnias o difamaciones." },
  { id: 46, cat: "Violencia laboral", tipo: "directa", texto: "Se presentan agresiones físicas en el centro de trabajo." },
  { id: 47, cat: "Reconocimiento y permanencia", tipo: "inversa", texto: "Se reconoce oportunamente mi esfuerzo cuando realizo un buen trabajo." },
  { id: 48, cat: "Reconocimiento y permanencia", tipo: "inversa", texto: "Las recompensas que recibo son justas de acuerdo a mi desempeño." },
  { id: 49, cat: "Reconocimiento y permanencia", tipo: "inversa", texto: "Siento orgullo de laborar en esta organización." },
  { id: 50, cat: "Reconocimiento y permanencia", tipo: "inversa", texto: "Considero que tengo estabilidad y seguridad en mi empleo." },
  { id: 51, cat: "Reconocimiento y permanencia", tipo: "inversa", texto: "Me siento comprometido con los objetivos de mi empresa." },
  { id: 52, cat: "Entorno organizacional", tipo: "inversa", texto: "Me informan con claridad sobre los cambios que ocurren en la empresa." },
  { id: 53, cat: "Entorno organizacional", tipo: "inversa", texto: "Los objetivos y metas de mi centro de trabajo son claros y alcanzables." },
  { id: 54, cat: "Entorno organizacional", tipo: "inversa", texto: "En mi trabajo se promueve el compañerismo y el trabajo en equipo." },
  { id: 55, cat: "Entorno organizacional", tipo: "inversa", texto: "Existe equidad en los procesos de evaluación y ascensos en el personal." },
  { id: 56, cat: "Entorno organizacional", tipo: "inversa", texto: "Se brinda reconocimiento a los trabajadores destacados en la empresa." },
  { id: 57, cat: "Atención a clientes y usuarios", tipo: "directa", texto: "En mi trabajo debo brindar servicio o atender a clientes o usuarios enojados." },
  { id: 58, cat: "Atención a clientes y usuarios", tipo: "directa", texto: "Mi trabajo me exige atender situaciones de emergencia o gravedad de personas." },
  { id: 59, cat: "Atención a clientes y usuarios", tipo: "directa", texto: "Se reciben quejas constantes por el servicio que presta el área de trabajo." },
  { id: 60, cat: "Atención a clientes y usuarios", tipo: "directa", texto: "Debo resolver imprevistos causados por el comportamiento de usuarios o clientes." },
  { id: 61, cat: "Atención a clientes y usuarios", tipo: "directa", texto: "Mi trabajo me expone a maltratos o exigencias desmedidas de personas externas." },
  { id: 62, cat: "Atención a clientes y usuarios", tipo: "directa", texto: "Siento desgaste emocional al atender las problemáticas de los clientes o usuarios." },
  { id: 63, cat: "Atención a clientes y usuarios", tipo: "directa", texto: "Tengo que ocultar mis emociones ante las quejas o agresiones de clientes." },
  { id: 64, cat: "Atención a clientes y usuarios", tipo: "directa", texto: "Considero que el trato directo con usuarios afecta mi estado de ánimo." },
  { id: 65, cat: "Liderazgo (Personal a cargo)", tipo: "directa", texto: "Comunico oportunamente a mi equipo los cambios en las instrucciones de trabajo." },
  { id: 66, cat: "Liderazgo (Personal a cargo)", tipo: "directa", texto: "Resuelvo las dudas y dificultades técnicas que se presentan con el personal a mi cargo." },
  { id: 67, cat: "Liderazgo (Personal a cargo)", tipo: "directa", texto: "El personal a mi cargo cumple con los estándares y metas de trabajo programadas." },
  { id: 68, cat: "Liderazgo (Personal a cargo)", tipo: "directa", texto: "Superviso con regularidad las actividades realizadas por mi equipo." },
  { id: 69, cat: "Liderazgo (Personal a cargo)", tipo: "directa", texto: "Promuevo que el personal a mi cargo reciba la capacitación requerida." },
  { id: 70, cat: "Liderazgo (Personal a cargo)", tipo: "directa", texto: "Distribuyo las tareas considerando las habilidades de cada colaborador." },
  { id: 71, cat: "Liderazgo (Personal a cargo)", tipo: "directa", texto: "Fomento un clima de respeto y comunicación abierta entre mis subordinados." },
  { id: 72, cat: "Liderazgo (Personal a cargo)", tipo: "directa", texto: "Apoyo a mi equipo para gestionar la carga de trabajo en periodos de alta demanda." }
];

function obtenerBateriaActiva() {
  const sel = document.getElementById("selectorGuia");
  return (sel && sel.value === "III") ? reactivosGuiaIII : reactivosGuiaII;
}

function renderizarPreguntas() {
  const contenedor = document.getElementById("contenedor-preguntas");
  if (!contenedor) return;
  contenedor.innerHTML = "";
  const listaReactivos = obtenerBateriaActiva();
  let categoriaActual = "";

  listaReactivos.forEach((item) => {
    if (item.cat !== categoriaActual) {
      categoriaActual = item.cat;
      const catHeader = document.createElement("div");
      catHeader.className = "categoria-header";
      catHeader.innerHTML = `<h4>📂 Dimensión: ${categoriaActual}</h4>`;
      contenedor.appendChild(catHeader);
    }

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

function calcularNivelRiesgo(puntajeTotal, tipoGuia) {
  if (tipoGuia === "II") {
    if (puntajeTotal < 20) return "Nulo o despreciable";
    if (puntajeTotal < 45) return "Bajo";
    if (puntajeTotal < 70) return "Medio";
    if (puntajeTotal < 90) return "Alto";
    return "Muy Alto";
  } else {
    if (puntajeTotal < 50) return "Nulo o despreciable";
    if (puntajeTotal < 75) return "Bajo";
    if (puntajeTotal < 99) return "Medio";
    if (puntajeTotal < 140) return "Alto";
    return "Muy Alto";
  }
}

// TOGGLE POLÍTICA
function togglePolitica() {
  const panel = document.getElementById("contenido-politica");
  const icono = document.getElementById("icono-acordeon");
  if (!panel) return;
  if (panel.style.display === "none" || panel.style.display === "") {
    panel.style.display = "block";
    if (icono) icono.innerText = "▲";
  } else {
    panel.style.display = "none";
    if (icono) icono.innerText = "▼";
  }
}

// ALTERNAR PESTAÑAS (ATS, FACTORES, BUZÓN)
function cambiarModulo(modulo) {
  const modATS = document.getElementById("modulo-ats");
  const modFactores = document.getElementById("modulo-factores");
  const modBuzon = document.getElementById("modulo-buzon");

  const tabATS = document.getElementById("tab-ats");
  const tabFactores = document.getElementById("tab-factores");
  const tabBuzon = document.getElementById("tab-buzon");

  if (modATS) modATS.style.display = modulo === "ATS" ? "block" : "none";
  if (modFactores) {
    modFactores.style.display = modulo === "FACTORES" ? "block" : "none";
    if (modulo === "FACTORES") renderizarPreguntas();
  }
  if (modBuzon) modBuzon.style.display = modulo === "BUZON" ? "block" : "none";

  if (tabATS) tabATS.classList.toggle("active", modulo === "ATS");
  if (tabFactores) tabFactores.classList.toggle("active", modulo === "FACTORES");
  if (tabBuzon) tabBuzon.classList.toggle("active", modulo === "BUZON");
}

function alternarAnonimatoBuzon() {
  const modo = document.getElementById("buzon-modalidad")?.value;
  const bloque = document.getElementById("bloque-datos-promovente");
  if (!bloque) return;
  if (modo === "Anonima") {
    bloque.style.display = "none";
    document.getElementById("buzon-nombre").value = "";
    document.getElementById("buzon-contacto").value = "";
  } else {
    bloque.style.display = "flex";
  }
}

function verificarSeccionI() {
  const r1 = document.querySelector('input[name="ats_1"]:checked')?.value === 'si';
  const r2 = document.querySelector('input[name="ats_2"]:checked')?.value === 'si';
  const r3 = document.querySelector('input[name="ats_3"]:checked')?.value === 'si';
  const r4 = document.querySelector('input[name="ats_4"]:checked')?.value === 'si';

  const bloqueSintomas = document.getElementById("bloque-sintomas-ats");
  if (bloqueSintomas) {
    bloqueSintomas.style.display = (r1 || r2 || r3 || r4) ? "block" : "none";
  }
}

// ==========================================
// INICIALIZACIÓN Y EVENTOS DOM
// ==========================================
document.addEventListener("DOMContentLoaded", () => {

  // GESTIÓN DE ACCESO NOM-035
  const USUARIOS_AUTORIZADOS = {
    "DEMO": "Adrexa123",
    "EMPRESA-01": "Clinica2026*",
    "CHALCO-CORP": "Nom035Eval"
  };

  const btnAbrirInfo = document.getElementById('btn-abrir-info');
  const btnCerrarInfo = document.getElementById('btn-cerrar-info');
  const modalInfo = document.getElementById('modal-info-nom');

  const btnAbrirLogin = document.getElementById('btn-abrir-login');
  const btnCerrarLogin = document.getElementById('btn-cerrar-login');
  const modalLogin = document.getElementById('modal-login-nom');

  const formLogin = document.getElementById('form-login-nom');
  const loginErrorMsg = document.getElementById('login-error-msg');
  const cuestionarioContainer = document.getElementById('cuestionario-privado-container');
  const labelEmpresa = document.getElementById('empresa-autenticada-label');
  const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
  const actionsWrapper = document.querySelector('.nom035-actions-wrapper');

  // Modales
  if (btnAbrirInfo && modalInfo) {
    btnAbrirInfo.addEventListener('click', () => modalInfo.classList.remove('hidden'));
  }
  if (btnCerrarInfo && modalInfo) {
    btnCerrarInfo.addEventListener('click', () => modalInfo.classList.add('hidden'));
  }

  if (btnAbrirLogin && modalLogin) {
    btnAbrirLogin.addEventListener('click', () => modalLogin.classList.remove('hidden'));
  }
  if (btnCerrarLogin && modalLogin) {
    btnCerrarLogin.addEventListener('click', () => {
      modalLogin.classList.add('hidden');
      if (loginErrorMsg) loginErrorMsg.classList.add('hidden');
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modalInfo) modalInfo.classList.add('hidden');
    if (e.target === modalLogin) modalLogin.classList.add('hidden');
  });

  // Login
  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.getElementById('nom-user').value.trim();
      const pass = document.getElementById('nom-pass').value.trim();

      if (USUARIOS_AUTORIZADOS[user] && USUARIOS_AUTORIZADOS[user] === pass) {
        modalLogin.classList.add('hidden');
        if (loginErrorMsg) loginErrorMsg.classList.add('hidden');

        cuestionarioContainer.classList.remove('hidden');
        labelEmpresa.textContent = user;
        if (actionsWrapper) actionsWrapper.classList.add('hidden');

        // Pre-llenar campos de empresa
        const inputsEmpresa = [document.getElementById('empresa'), document.getElementById('empresa-ats'), document.getElementById('buzon-empresa')];
        inputsEmpresa.forEach(input => { if (input) input.value = user; });

        cuestionarioContainer.scrollIntoView({ behavior: 'smooth' });
      } else {
        if (loginErrorMsg) loginErrorMsg.classList.remove('hidden');
      }
    });
  }

  // Logout
  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener('click', () => {
      cuestionarioContainer.classList.add('hidden');
      if (actionsWrapper) actionsWrapper.classList.remove('hidden');
      formLogin.reset();
    });
  }

  // Selector Guía II / III
  const selGuia = document.getElementById("selectorGuia");
  if (selGuia) selGuia.addEventListener("change", renderizarPreguntas);

  // ENVÍO GUÍA II / III
  const formNom = document.getElementById("formulario-nom035");
  if (formNom) {
    formNom.addEventListener("submit", async function(e) {
      e.preventDefault();
      const boton = document.getElementById("btn-enviar");
      boton.innerText = "Calculando dimensiones y enviando a la base...";
      boton.disabled = true;

      const tipoGuia = document.getElementById("selectorGuia").value;
      const listaReactivos = obtenerBateriaActiva();

      let sumaPuntaje = 0;
      let dimAmbiente = 0, dimCargaControl = 0, dimTiempo = 0, dimLiderazgoRelaciones = 0, dimViolencia = 0, dimEntorno = 0;

      for (let i = 1; i <= listaReactivos.length; i++) {
        const radioSeleccionado = document.querySelector(`input[name="p_${i}"]:checked`);
        if (radioSeleccionado) {
          const valor = parseInt(radioSeleccionado.value, 10);
          sumaPuntaje += valor;
          const reactivo = listaReactivos.find(r => r.id === i);
          if (reactivo) {
            const cat = reactivo.cat.toLowerCase();
            if (cat.includes("ambiente") || cat.includes("condiciones")) dimAmbiente += valor;
            else if (cat.includes("carga") || cat.includes("control") || cat.includes("actividad")) dimCargaControl += valor;
            else if (cat.includes("jornada") || cat.includes("tiempo") || cat.includes("familiar")) dimTiempo += valor;
            else if (cat.includes("liderazgo") || cat.includes("relaciones") || cat.includes("cargo")) dimLiderazgoRelaciones += valor;
            else if (cat.includes("violencia")) dimViolencia += valor;
            else if (cat.includes("entorno") || cat.includes("reconocimiento") || cat.includes("permanencia")) dimEntorno += valor;
          }
        }
      }

      const nivelRiesgo = calcularNivelRiesgo(sumaPuntaje, tipoGuia);
      const nombreGuia = tipoGuia === "III" ? "Guía III Oficial (72 ítems)" : "Guía II Oficial (46 ítems)";

      const payload = {
        empresa: document.getElementById("empresa").value.trim(),
        idEmpleado: document.getElementById("idEmpleado").value.trim(),
        nombre: document.getElementById("nombre").value.trim() || "Confidencial",
        puesto: document.getElementById("puesto").value.trim(),
        guia: nombreGuia,
        puntajeTotal: sumaPuntaje,
        nivelRiesgo: nivelRiesgo,
        dimensiones: {
          ambiente: dimAmbiente,
          cargaControl: dimCargaControl,
          tiempo: dimTiempo,
          liderazgoRelaciones: dimLiderazgoRelaciones,
          violencia: dimViolencia,
          entorno: dimEntorno
        }
      };

      try {
        const respuesta = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload)
        });
        const data = await respuesta.json();
        if (data.status === "success") {
          alert(`✅ ¡Cuestionario registrado con éxito!\n\nEmpresa: ${payload.empresa}\nInstrumento: ${nombreGuia}\nPuntaje Total: ${sumaPuntaje} pts\nNivel de Riesgo Global: ${nivelRiesgo}`);
          formNom.reset();
          renderizarPreguntas();
        } else {
          alert("Error al registrar: " + data.message);
        }
      } catch (error) {
        console.error("Error de conexión:", error);
        alert("Hubo un problema de conexión al registrar las respuestas.");
      } finally {
        boton.innerText = "Enviar Evaluación y Registrar Diagnóstico";
        boton.disabled = false;
      }
    });
  }

  // ENVÍO GUÍA I (ATS)
  const formATS = document.getElementById("formulario-ats");
  if (formATS) {
    formATS.addEventListener("submit", async function(e) {
      e.preventDefault();
      const boton = document.getElementById("btn-enviar-ats");
      boton.innerText = "Evaluando tamizaje...";
      boton.disabled = true;

      const r1 = document.querySelector('input[name="ats_1"]:checked')?.value === 'si';
      const r2 = document.querySelector('input[name="ats_2"]:checked')?.value === 'si';
      const r3 = document.querySelector('input[name="ats_3"]:checked')?.value === 'si';
      const r4 = document.querySelector('input[name="ats_4"]:checked')?.value === 'si';
      const vivioEvento = (r1 || r2 || r3 || r4);

      let requiereValoracion = false;
      let dictamenATS = "No requiere valoración clínica por Acontecimientos Traumáticos Severos.";

      if (vivioEvento) {
        const secII = [5, 6].filter(id => document.querySelector(`input[name="ats_${id}"]:checked`)?.value === 'si').length;
        const secIII = [7, 8, 9, 10, 11].filter(id => document.querySelector(`input[name="ats_${id}"]:checked`)?.value === 'si').length;
        const secIV = [12, 13, 14, 15, 16].filter(id => document.querySelector(`input[name="ats_${id}"]:checked`)?.value === 'si').length;
        if (secII >= 1 || secIII >= 3 || secIV >= 2) {
          requiereValoracion = true;
          dictamenATS = "REQUIERE VALORACIÓN CLÍNICA INMEDIATA por afectación postraumática.";
        }
      }

      const payload = {
        empresa: document.getElementById("empresa-ats").value.trim(),
        idEmpleado: document.getElementById("idEmpleado-ats").value.trim(),
        nombre: document.getElementById("nombre-ats").value.trim() || "Confidencial",
        puesto: document.getElementById("puesto-ats").value.trim(),
        guia: "Guía I Oficial (Acontecimientos Traumáticos - ATS)",
        puntajeTotal: vivioEvento ? 1 : 0,
        nivelRiesgo: requiereValoracion ? "Alto (Canalización Urgente)" : "Nulo / Sin afectación",
        dictamenATS: dictamenATS
      };

      try {
        const respuesta = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload)
        });
        const data = await respuesta.json();
        if (data.status === "success") {
          alert(`✅ Cuestionario registrado exitosamente.\n\nColaborador: ${payload.idEmpleado}\nDictamen: ${dictamenATS}`);
          formATS.reset();
          verificarSeccionI();
        } else {
          alert("Error al registrar: " + data.message);
        }
      } catch (err) {
        console.error(err);
        alert("Error de conexión al enviar el tamizaje.");
      } finally {
        boton.innerText = "Registrar Tamizaje ATS";
        boton.disabled = false;
      }
    });
  }

  // ENVÍO BUZÓN DE DENUNCIAS
  const formBuzon = document.getElementById("formulario-buzon");
  if (formBuzon) {
    formBuzon.addEventListener("submit", async function(e) {
      e.preventDefault();
      const boton = document.getElementById("btn-enviar-buzon");
      boton.innerText = "Registrando denuncia confidencial...";
      boton.disabled = true;

      const modalidad = document.getElementById("buzon-modalidad").value;
      const payload = {
        tipoEnvio: "BUZON",
        empresa: document.getElementById("buzon-empresa").value.trim(),
        modalidad: modalidad === "Anonima" ? "Anónima" : "Identificada",
        nombre: modalidad === "Anonima" ? "Anónimo (Protegido)" : (document.getElementById("buzon-nombre").value.trim() || "No especificado"),
        contacto: modalidad === "Anonima" ? "Anónimo" : (document.getElementById("buzon-contacto").value.trim() || "No especificado"),
        personaSenalada: document.getElementById("buzon-senalado").value.trim(),
        conducta: document.getElementById("buzon-conducta").value,
        hechos: document.getElementById("buzon-hechos").value.trim()
      };

      try {
        const respuesta = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload)
        });
        const data = await respuesta.json();
        if (data.status === "success") {
          alert("🛡️ DENUNCIA REGISTRADA CON ÉXITO\n\nSe ha generado su folio confidencial en el sistema.");
          formBuzon.reset();
          alternarAnonimatoBuzon();
        } else {
          alert("Error al registrar: " + data.message);
        }
      } catch (err) {
        console.error(err);
        alert("Error de conexión al enviar el reporte.");
      } finally {
        boton.innerText = "Enviar Denuncia Confidencial";
        boton.disabled = false;
      }
    });
  }
});