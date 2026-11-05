// PEGA AQUÍ TU URL DE GOOGLE APPS SCRIPT:
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwi55xu70rORMBEjvFt2gS7-LP_E0QlBo_udA1SrjVfJqTqQSG5Jn5QWxWDUKlfZFEoIw/exec";

function clasificarRiesgo(puntaje) {
  if (puntaje <= 3) return "Nulo o despreciable";
  if (puntaje <= 6) return "Bajo";
  if (puntaje <= 9) return "Medio";
  return "Alto";
}

document.getElementById("formulario-nom035").addEventListener("submit", async function(e) {
  e.preventDefault();

  const boton = document.getElementById("btn-enviar");
  boton.innerText = "Enviando a Google Sheets...";
  boton.disabled = true;

  // Sumar radios seleccionados
  let total = 0;
  const radiosSeleccionados = document.querySelectorAll('input[type="radio"]:checked');
  radiosSeleccionados.forEach(r => total += parseInt(r.value, 10));

  const riesgo = clasificarRiesgo(total);

  const payload = {
    empresa: document.getElementById("empresa").value,
    idEmpleado: document.getElementById("idEmpleado").value,
    nombre: document.getElementById("nombre").value || "Confidencial",
    puesto: document.getElementById("puesto").value,
    guia: "Guía II Rápida",
    puntajeTotal: total,
    nivelRiesgo: riesgo
  };

  try {
    const respuesta = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });

    const resultado = await respuesta.json();

    if (resultado.status === "success") {
      alert("✅ ¡Evaluación guardada!\n\nPuntaje: " + total + "\nNivel de Riesgo: " + riesgo + "\n\nSe ha registrado en tu base de datos de Google Sheets.");
      document.getElementById("formulario-nom035").reset();
    } else {
      alert("Error: " + resultado.message);
    }
  } catch (error) {
    alert("Error al conectar con la base de datos.");
    console.error(error);
  } finally {
    boton.innerText = "Calificar y Enviar a la Base de Datos";
    boton.disabled = false;
  }
});