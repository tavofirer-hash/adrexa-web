// ========================================================
// ADREXA · clinic-adrexa.com: agendar en línea, menú del celular y aviso de privacidad
// (Los cuestionarios NOM-035, cookies y avisos legales están en app.js)
// ========================================================

// Si la página la sirve el propio servidor (Render o tu computadora), se usa la ruta relativa /api.
// Solo si se abre desde otro sitio se llama al servidor de Render por su dirección completa.
const SERVIDOR_RENDER = 'https://adrexa-backend.onrender.com';
const API_BASE_URL = ['localhost', '127.0.0.1', 'adrexa-backend.onrender.com'].includes(window.location.hostname)
  ? '/api'
  : `${SERVIDOR_RENDER}/api`;

const ZONA_CLINICA = 'America/Mexico_City';
const horaLocal = (iso) => new Date(iso).toLocaleTimeString('en-GB', { timeZone: ZONA_CLINICA, hour: '2-digit', minute: '2-digit', hour12: false });
const etiquetaHora = (iso) => new Date(iso).toLocaleTimeString('es-MX', { timeZone: ZONA_CLINICA, hour: '2-digit', minute: '2-digit', hour12: true });

// Horarios que ofrece la clínica ese día, según la agenda de los terapeutas
async function consultarDisponibilidad(fechaSeleccionada) {
  try {
    const respuesta = await fetch(`${API_BASE_URL}/citas/disponibilidad?fecha=${fechaSeleccionada}`);
    if (!respuesta.ok) throw new Error('Error al consultar horarios.');
    const data = await respuesta.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error al verificar disponibilidad:', error);
    return null;
  }
}

async function cargarSlotsHorarios(fecha) {
  const contenedor = document.getElementById('contenedor-slots-horarios');
  const inputHoraInicio = document.getElementById('cita-hora-inicio');
  const inputHoraFin = document.getElementById('cita-hora-fin');

  if (!contenedor) return;
  contenedor.innerHTML = '<p class="slot-info-muted">Consultando disponibilidad...</p>';
  inputHoraInicio.value = '';
  inputHoraFin.value = '';

  const franjas = await consultarDisponibilidad(fecha);
  if (franjas === null) {
    contenedor.innerHTML = '<p class="slot-info-muted">No se pudo consultar la agenda. Intenta de nuevo.</p>';
    return;
  }
  if (franjas.length === 0) {
    contenedor.innerHTML = '<p class="slot-info-muted">No hay atención este día. Elige otra fecha.</p>';
    return;
  }

  contenedor.innerHTML = '';
  franjas.forEach(franja => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `slot-btn ${franja.disponible ? '' : 'ocupado'}`;
    btn.textContent = etiquetaHora(franja.inicio);

    if (!franja.disponible) {
      btn.disabled = true;
      btn.title = 'Horario no disponible';
    } else {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        inputHoraInicio.value = `${horaLocal(franja.inicio)}:00`;
        inputHoraFin.value = `${horaLocal(franja.fin)}:00`;
      });
    }
    contenedor.appendChild(btn);
  });
}

// Menú del celular
const btnMenu = () => document.getElementById('btn-menu');
function cerrarMenu() {
  document.getElementById('menu-movil')?.classList.remove('abierto');
  btnMenu()?.setAttribute('aria-expanded', 'false');
}
function cerrarVentana(m) { m.classList.add('hidden'); m.style.display = 'none'; }

document.addEventListener("DOMContentLoaded", () => {
  btnMenu()?.addEventListener('click', () => {
    const abierto = document.getElementById('menu-movil').classList.toggle('abierto');
    btnMenu().setAttribute('aria-expanded', String(abierto));
  });
  document.querySelectorAll('#menu-movil a[href^="#"]:not([data-agendar])').forEach((a) => a.addEventListener('click', cerrarMenu));

  // Ventanas: se cierran con la X, tocando fuera o con Esc
  document.querySelectorAll('.modal-overlay').forEach((m) => {
    m.addEventListener('click', (e) => { if (e.target === m || e.target.closest('[data-cerrar]')) cerrarVentana(m); });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.querySelectorAll('.modal-overlay:not(.hidden)').forEach(cerrarVentana);
  });

  // Aviso de privacidad (el texto vigente lo da el servidor)
  const modalAviso = document.getElementById('modal-aviso');
  document.querySelectorAll('[data-aviso]').forEach((a) => a.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!modalAviso) return;
    modalAviso.classList.remove('hidden');
    modalAviso.style.display = 'flex';
    const caja = document.getElementById('aviso-texto');
    try {
      const r = await fetch(`${API_BASE_URL}/citas/aviso-privacidad`);
      if (!r.ok) throw new Error();
      const d = await r.json();
      caja.textContent = d.texto || '';
    } catch (err) {
      caja.textContent = 'No se pudo cargar el aviso. Escríbenos por WhatsApp y te lo enviamos.';
    }
  }));


  const modalCita = document.getElementById('modal-agendar-cita');
  const btnAbrirCita = document.getElementById('btn-abrir-agendar');
  const btnCerrarCita = document.getElementById('btn-cerrar-agendar');
  const inputFecha = document.getElementById('cita-fecha');
  const formCita = document.getElementById('form-reservar-cita');

  if (inputFecha) {
    inputFecha.min = new Date().toISOString().split('T')[0];
    inputFecha.addEventListener('change', (e) => {
      if (e.target.value) cargarSlotsHorarios(e.target.value);
    });
  }

  // Todos los botones «Agendar» de la página abren la misma ventana
  if (modalCita) {
    document.querySelectorAll('[data-agendar]').forEach((b) => b.addEventListener('click', (e) => {
      e.preventDefault();
      cerrarMenu();
      modalCita.classList.remove('hidden');
      modalCita.style.display = 'flex';
      setTimeout(() => document.getElementById('cita-nombre')?.focus(), 50);
    }));
  }

  if (btnCerrarCita && modalCita) {
    btnCerrarCita.addEventListener('click', (e) => {
      e.preventDefault();
      modalCita.classList.add('hidden');
      modalCita.style.display = 'none';
    });
  }

  if (formCita) {
    formCita.addEventListener('submit', async (e) => {
      e.preventDefault();
      const horaInicio = document.getElementById('cita-hora-inicio').value;
      const horaFin = document.getElementById('cita-hora-fin').value;

      if (!horaInicio || !horaFin) {
        alert('Por favor selecciona un horario disponible de la lista.');
        return;
      }

      const btnConfirmar = document.getElementById('btn-confirmar-cita');
      btnConfirmar.disabled = true;
      btnConfirmar.textContent = 'Procesando reservación...';

      // Teléfono a formato E.164: 10 dígitos → +52XXXXXXXXXX
      const rawTel = document.getElementById('cita-telefono').value.trim().replace(/\D/g, '');
      const telefonoE164 = rawTel.length === 10 ? `+52${rawTel}` : `+${rawTel}`;
      const fechaSeleccionada = document.getElementById('cita-fecha').value;

      // Plan Fase 3: "inicio" con zona horaria explícita (Ciudad de México, UTC-6 sin horario de verano)
      const consentimiento = document.getElementById('check-privacidad-cita');
      const payloadCita = {
        nombre_completo: document.getElementById('cita-nombre').value.trim(),
        telefono: telefonoE164,
        email: document.getElementById('cita-email').value.trim() || null,
        modalidad: document.getElementById('cita-modalidad').value,
        inicio: `${fechaSeleccionada}T${horaInicio.substring(0, 5)}:00-06:00`,
        duracion_min: 60,
        consentimiento: consentimiento ? consentimiento.checked : true,
        whatsapp_opt_in: true
      };

      try {
        const res = await fetch(`${API_BASE_URL}/citas/agendar`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payloadCita)
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          alert(`⚠️ No se pudo reservar: ${data.error || 'Horario no disponible'}`);
          cargarSlotsHorarios(fechaSeleccionada);
          return;
        }

        alert('✅ ¡Tu cita ha sido solicitada con éxito!\nNos pondremos en contacto contigo por WhatsApp.');
        formCita.reset();
        modalCita.classList.add('hidden');
        modalCita.style.display = 'none';

        const textoWA = encodeURIComponent(`Hola, acabo de solicitar mi cita psicológica para el día ${fechaSeleccionada} a las ${horaInicio.substring(0, 5)} hrs.`);
        window.open(`https://wa.me/5215538154148?text=${textoWA}`, '_blank');
      } catch (err) {
        alert('Error al conectar con el servidor.');
      } finally {
        btnConfirmar.disabled = false;
        btnConfirmar.textContent = 'Confirmar y Reservar Cita';
      }
    });
  }

});