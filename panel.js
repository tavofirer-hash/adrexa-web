// ========================================================
// PORTAL CLÍNICO ADREXA - LÓGICA DE CONTROL (NOM-024 / NOM-004)
// ========================================================

const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000/api'
  : 'https://adrexa-backend.onrender.com/api';

// Elementos de la interfaz
const seccionLogin = document.getElementById('seccion-login-terapeuta');
const seccionEscritorio = document.getElementById('seccion-escritorio-terapeuta');
const usuarioBadge = document.getElementById('usuario-badge');
const labelTerapeuta = document.getElementById('nombre-terapeuta-label');
const formLogin = document.getElementById('form-login-terapeuta');
const alertaErrorLogin = document.getElementById('error-login-terapeuta');
const btnLogout = document.getElementById('btn-cerrar-sesion-terapeuta');

const vistaAgenda = document.getElementById('vista-agenda');
const vistaExpediente = document.getElementById('vista-expediente');
const tabAgenda = document.getElementById('tab-agenda');
const tabExpediente = document.getElementById('tab-expediente');

const cuerpoTablaCitas = document.getElementById('cuerpo-tabla-citas');
const btnRefrescarCitas = document.getElementById('btn-refrescar-citas');

const formCrearNota = document.getElementById('form-crear-nota');
const inputNotaFecha = document.getElementById('nota-fecha');
const btnBuscarExpediente = document.getElementById('btn-buscar-expediente');
const contenedorHistorial = document.getElementById('contenedor-historial-notas');

// Inicializar fecha y hora actual en el selector de la nota clínica
if (inputNotaFecha) {
  const ahora = new Date();
  ahora.setMinutes(ahora.getMinutes() - ahora.getTimezoneOffset());
  inputNotaFecha.value = ahora.toISOString().slice(0, 16);
}

// --------------------------------------------------------
// GESTIÓN DE SESIÓN Y AUTENTICACIÓN
// --------------------------------------------------------

function obtenerToken() {
  return localStorage.getItem('adrexa_token');
}

function verificarEstadoSesion() {
  const token = obtenerToken();
  const nombre = localStorage.getItem('adrexa_terapeuta_nombre');

  if (token) {
    if (seccionLogin) seccionLogin.classList.add('hidden');
    if (seccionEscritorio) seccionEscritorio.classList.remove('hidden');
    if (usuarioBadge) usuarioBadge.classList.remove('hidden');
    if (labelTerapeuta && nombre) {
      labelTerapeuta.textContent = `Dr. ${nombre}`;
    }
    cargarAgendaCitas();
  } else {
    if (seccionLogin) seccionLogin.classList.remove('hidden');
    if (seccionEscritorio) seccionEscritorio.classList.add('hidden');
    if (usuarioBadge) usuarioBadge.classList.add('hidden');
  }
}

if (formLogin) {
  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (alertaErrorLogin) alertaErrorLogin.classList.add('hidden');

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    try {
      let respuesta = await fetch(`${API_BASE}/auth/login-terapeuta`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!respuesta.ok) {
        respuesta = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ correo: email, password })
        });
      }

      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(data.error || 'Credenciales incorrectas.');
      }

      localStorage.setItem('adrexa_token', data.token);
      const nombreUsuario = (data.terapeuta && data.terapeuta.nombre) || (data.usuario && data.usuario.nombre) || 'Octavio Cabrera';
      localStorage.setItem('adrexa_terapeuta_nombre', nombreUsuario);

      formLogin.reset();
      verificarEstadoSesion();
    } catch (err) {
      if (alertaErrorLogin) {
        alertaErrorLogin.textContent = err.message;
        alertaErrorLogin.classList.remove('hidden');
      }
    }
  });
}

if (btnLogout) {
  btnLogout.addEventListener('click', () => {
    localStorage.removeItem('adrexa_token');
    localStorage.removeItem('adrexa_terapeuta_nombre');
    verificarEstadoSesion();
  });
}

// --------------------------------------------------------
// CONTROL DE PESTAÑAS
// --------------------------------------------------------

function cambiarPestanaPanel(pestana) {
  if (pestana === 'agenda') {
    if (vistaAgenda) vistaAgenda.classList.remove('hidden');
    if (vistaExpediente) vistaExpediente.classList.add('hidden');
    if (tabAgenda) tabAgenda.classList.add('active');
    if (tabExpediente) tabExpediente.classList.remove('active');
    cargarAgendaCitas();
  } else {
    if (vistaAgenda) vistaAgenda.classList.add('hidden');
    if (vistaExpediente) vistaExpediente.classList.remove('hidden');
    if (tabAgenda) tabAgenda.classList.remove('active');
    if (tabExpediente) tabExpediente.classList.add('active');
  }
}

// --------------------------------------------------------
// MÓDULO 1: GESTIÓN DE CITAS (POSTGRESQL REAL)
// --------------------------------------------------------

async function cargarAgendaCitas() {
  if (!cuerpoTablaCitas) return;
  const token = obtenerToken();
  if (!token) return;

  cuerpoTablaCitas.innerHTML = '<tr><td colspan="6" class="text-center">Consultando citas reales...</td></tr>';

  try {
    const respuesta = await fetch(`${API_BASE}/citas`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!respuesta.ok) {
      throw new Error('No se pudieron consultar las citas.');
    }

    const citas = await respuesta.json();

    if (citas.length === 0) {
      cuerpoTablaCitas.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No hay citas registradas en la clínica.</td></tr>';
      return;
    }

    cuerpoTablaCitas.innerHTML = citas.map(cita => {
      const fecha = cita.fecha ? new Date(cita.fecha).toLocaleDateString('es-MX') : 'Sin fecha';
      const estadoClase = cita.estado === 'confirmada' ? 'badge-confirmada' : (cita.estado === 'cancelada' ? 'badge-cancelada' : 'badge-pendiente');

      return `
        <tr>
          <td><strong>${cita.nombre_paciente || 'Paciente sin nombre'}</strong></td>
          <td>${cita.telefono || 'N/A'}<br><small class="text-muted">${cita.email || ''}</small></td>
          <td>${fecha}<br>${cita.hora_inicio || ''} - ${cita.hora_fin || ''}</td>
          <td><span class="badge-estado badge-confirmada">${cita.modalidad || 'presencial'}</span></td>
          <td><span class="badge-estado ${estadoClase}">${cita.estado || 'pendiente'}</span></td>
          <td>
            ${cita.estado === 'pendiente' 
              ? `<button type="button" class="btn-confirmar-accion" onclick="confirmarCitaBackend(${cita.id})">Confirmar</button>`
              : `<small class="text-muted">Procesada</small>`
            }
          </td>
        </tr>
      `;
    }).join('');

  } catch (error) {
    cuerpoTablaCitas.innerHTML = `<tr><td colspan="6" class="text-center" style="color: #dc2626;">Error al sincronizar con el servidor: ${error.message}</td></tr>`;
  }
}

async function confirmarCitaBackend(citaId) {
  const token = obtenerToken();
  try {
    const res = await fetch(`${API_BASE}/citas/${citaId}/estado`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ estado: 'confirmada' })
    });
    if (res.ok) {
      cargarAgendaCitas();
    } else {
      alert('No se pudo actualizar el estado.');
    }
  } catch (err) {
    alert('Error al conectar con el servidor.');
  }
}

if (btnRefrescarCitas) {
  btnRefrescarCitas.addEventListener('click', cargarAgendaCitas);
}

// --------------------------------------------------------
// MÓDULO 2: EXPEDIENTES Y SELLADO SHA-256 (NOM-024)
// --------------------------------------------------------

// --------------------------------------------------------
// MÓDULO 2: EXPEDIENTES Y SELLADO NOM-024 (AES-256-GCM)
// --------------------------------------------------------

if (formCrearNota) {
  formCrearNota.addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = obtenerToken();
    if (!token) {
      alert('Sesión expirada. Inicie sesión nuevamente.');
      verificarEstadoSesion();
      return;
    }

    const expedienteId = document.getElementById('nota-paciente-id').value.trim();
    const contenido = document.getElementById('nota-contenido').value.trim();
    const fechaSesion = document.getElementById('nota-fecha').value;

    const btnSellar = document.getElementById('btn-sellar-nota');
    if (btnSellar) {
      btnSellar.disabled = true;
      btnSellar.textContent = 'Cifrando y sellando con SHA-256...';
    }

    try {
      const respuesta = await fetch(`${API_BASE}/expedientes/${expedienteId}/notas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          numero_sesion: 1,
          fecha_sesion: fechaSesion,
          objetivo_sesion: 'Sesión psicoterapéutica estructurada',
          intervenciones: contenido,
          observaciones_conductuales: 'Registro conforme a PBE',
          tareas_casa: 'Revisión y seguimiento'
        })
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(resultado.error || 'No se pudo registrar la nota clínica.');
      }

      alert('✅ Nota clínica registrada, cifrada con AES-256-GCM y protegida contra modificaciones.');
      document.getElementById('nota-contenido').value = '';
      
      document.getElementById('buscar-paciente-id').value = expedienteId;
      consultarHistorialClinico(expedienteId);

    } catch (err) {
      alert(`Error al registrar nota: ${err.message}`);
    } finally {
      if (btnSellar) {
        btnSellar.disabled = false;
        btnSellar.textContent = '🔏 Firmar y Sellar con SHA-256';
      }
    }
  });
}

// Consultar expediente clínico y validar integridad criptográfica NOM-024
async function consultarHistorialClinico(expedienteId) {
  const token = obtenerToken();
  if (!token || !contenedorHistorial) return;

  contenedorHistorial.innerHTML = '<p class="text-muted">Auditando integridad SHA-256 con la base de datos...</p>';

  try {
    const respuesta = await fetch(`${API_BASE}/expedientes/${expedienteId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(data.error || 'No se encontró el expediente solicitado.');
    }

    const exp = data.expediente;
    const estatusNom = data.integridad.estado_nom024;
    const colorEstado = estatusNom === 'CONFORME' ? '#16a34a' : '#dc2626';

    let htmlAdendas = '';
    if (exp.adendas && exp.adendas.length > 0) {
      htmlAdendas = exp.adendas.map(ad => `
        <div style="background: #ffffff; border-left: 3px solid #2563eb; padding: 10px; margin-top: 10px; border-radius: 4px;">
          <small style="color: #64748b;">${new Date(ad.fecha).toLocaleString('es-MX')} - <strong>Adenda:</strong> ${ad.motivo}</small>
          <p style="margin: 6px 0; font-size: 13px;">${ad.contenido_adenda}</p>
          <div style="font-size: 10px; word-break: break-all; color: #475569;">
            SHA-256: ${ad.hash_adenda}
          </div>
        </div>
      `).join('');
    }

    contenedorHistorial.innerHTML = `
      <div class="nota-item-card" style="border-left: 4px solid ${colorEstado}; padding: 14px; background: #f8fafc; border-radius: 6px; margin-bottom: 12px;">
        <div class="nota-item-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <strong>Expediente #${exp.id} - ${exp.paciente_nombre}</strong>
          <span style="color: ${colorEstado}; font-weight: bold; font-size: 12px; background: ${colorEstado}15; padding: 2px 8px; border-radius: 4px;">
            NOM-024: ${estatusNom}
          </span>
        </div>
        <p style="margin: 8px 0; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${exp.notas_clinicas || 'Sin notas principales.'}</p>
        <div style="font-size: 10px; word-break: break-all; background: #e2e8f0; padding: 6px; border-radius: 4px; color: #1e293b;">
          <strong>Hash Base:</strong> ${data.integridad.hash_calculado}
        </div>
        ${htmlAdendas ? `<div style="margin-top: 12px;"><strong>Adendas Selladas (Append-Only):</strong>${htmlAdendas}</div>` : ''}
      </div>
    `;

  } catch (error) {
    contenedorHistorial.innerHTML = `<p style="color: #dc2626;">Error al cargar expediente: ${error.message}</p>`;
  }
}

if (btnBuscarExpediente) {
  btnBuscarExpediente.addEventListener('click', () => {
    const inputBusqueda = document.getElementById('buscar-paciente-id');
    const expedienteId = inputBusqueda ? inputBusqueda.value.trim() : '';
    if (expedienteId) {
      consultarHistorialClinico(expedienteId);
    } else {
      alert('Ingrese un ID de expediente para consultar.');
    }
  });
}

// Asignar funciones globales para los onclick del HTML
window.cambiarPestanaPanel = cambiarPestanaPanel;
window.confirmarCitaBackend = confirmarCitaBackend;

// Inicializar estado de sesión
document.addEventListener('DOMContentLoaded', verificarEstadoSesion);
