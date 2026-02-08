// Notificaciones simuladas
const notificacionesSimuladas = [
    { id: 1, mensaje: 'Perfil actualizado correctamente', tiempo: 'Hace 1 día' },
    { id: 2, mensaje: 'Bienvenido a ServiDom', tiempo: 'Hace 3 días' }
];

let datosOriginales = {};

document.addEventListener('DOMContentLoaded', function() {
    verificarSesion();
    cargarDatosPerfil();
    configurarDropdowns();
    cargarNotificaciones();
    cargarEstadisticas();
    cargarEstado();
    actualizarBotonesTema();
    marcarTemaActivo();
});

// Función para toggle del submenú de temas
function toggleTemaSubmenu(event) {
    event.preventDefault();
    event.stopPropagation();
    const submenu = document.getElementById('tema-submenu');
    if (submenu) {
        submenu.classList.toggle('open');
    }
}

// Función global para cambiar tema desde el dropdown
function cambiarTemaDropdown(tema) {
    localStorage.setItem('tema_servidom', tema);
    localStorage.setItem('tema_preferido', tema);
    aplicarTema(tema);
    actualizarBotonesTema();
    marcarTemaActivo();
    
    // Cerrar dropdown
    const dropdown = document.getElementById('dropdown');
    if (dropdown) dropdown.classList.remove('visible');
    
    mostrarToast('Tema cambiado: ' + (tema === 'oscuro' ? 'Oscuro' : tema === 'claro' ? 'Claro' : 'Automático'));
}

function aplicarTema(tema) {
    let temaFinal = tema;
    if (tema === 'auto') {
        temaFinal = window.matchMedia('(prefers-color-scheme: light)').matches ? 'claro' : 'oscuro';
    }
    
    if (temaFinal === 'claro') {
        document.body.classList.add('tema-claro');
    } else {
        document.body.classList.remove('tema-claro');
    }
}

function actualizarBotonesTema() {
    const temaGuardado = localStorage.getItem('tema_servidom') || localStorage.getItem('tema_preferido') || 'oscuro';
    const botones = document.querySelectorAll('.tema-btn');
    
    botones.forEach(btn => {
        btn.classList.remove('activo');
        if (btn.dataset.tema === temaGuardado) {
            btn.classList.add('activo');
        }
    });
}

function marcarTemaActivo() {
    const temaActual = localStorage.getItem('tema_servidom') || localStorage.getItem('tema_preferido') || 'oscuro';
    const opciones = document.querySelectorAll('.tema-option');
    
    opciones.forEach(opcion => {
        const tema = opcion.getAttribute('data-tema');
        if (tema === temaActual) {
            opcion.classList.add('activo');
        } else {
            opcion.classList.remove('activo');
        }
    });
}

function verificarSesion() {
    const usuario = localStorage.getItem('usuario_logueado');
    if (!usuario) {
        window.location.href = 'login.php';
        return;
    }
    
    // Mostrar nombre en header
    const datos = JSON.parse(usuario);
    const nombreHeader = document.getElementById('nombre-header');
    if (nombreHeader) {
        nombreHeader.textContent = datos.nombre || 'Usuario';
    }
}

function cargarDatosPerfil() {
    const usuario = localStorage.getItem('usuario_logueado');
    if (usuario) {
        const datos = JSON.parse(usuario);
        
        // Sidebar
        const sidebarNombre = document.getElementById('sidebar-nombre');
        if (sidebarNombre) sidebarNombre.textContent = datos.nombre || 'Usuario';
        
        const sidebarTipo = document.getElementById('sidebar-tipo');
        if (sidebarTipo) sidebarTipo.textContent = datos.tipo === 'cliente' ? 'Cliente' : 'Trabajador';
        
        const ubicacion = document.getElementById('ubicacion-usuario');
        if (ubicacion) ubicacion.textContent = datos.direccion || 'Lima, Perú';
        
        // Formulario
        const nombreInput = document.getElementById('nombre');
        const apellidoInput = document.getElementById('apellido');
        const emailInput = document.getElementById('email');
        const telefonoInput = document.getElementById('telefono');
        const dniInput = document.getElementById('dni');
        const direccionInput = document.getElementById('direccion');
        
        if (nombreInput) nombreInput.value = datos.nombre || '';
        if (apellidoInput) apellidoInput.value = datos.apellido || '';
        if (emailInput) emailInput.value = datos.email || '';
        if (telefonoInput) telefonoInput.value = datos.telefono || '';
        if (dniInput) dniInput.value = datos.dni || '';
        if (direccionInput) direccionInput.value = datos.direccion || '';
        
        // Guardar datos originales para cancelar
        datosOriginales = { ...datos };
    }
}

function cargarEstadisticas() {
    // Contar anuncios del usuario
    const anuncios = JSON.parse(localStorage.getItem('anuncios_empleo')) || [];
    const usuario = JSON.parse(localStorage.getItem('usuario_logueado'));
    const misAnuncios = anuncios.filter(a => a.cliente === usuario?.nombre);
    
    const statAnuncios = document.getElementById('stat-anuncios');
    if (statAnuncios) statAnuncios.textContent = misAnuncios.length;
    
    // Trabajos completados (simulado)
    const statCompletados = document.getElementById('stat-completados');
    if (statCompletados) statCompletados.textContent = Math.floor(Math.random() * 20) + 5;
    
    // Fecha de registro simulada
    const año = new Date().getFullYear();
    const fechaRegistro = document.getElementById('fecha-registro');
    if (fechaRegistro) fechaRegistro.textContent = año;
}

function cargarEstado() {
    const estadoGuardado = localStorage.getItem('estado_usuario') || 'activo';
    
    // Marcar el radio correcto
    const radioEstado = document.querySelector(`input[name="mi-estado"][value="${estadoGuardado}"]`);
    if (radioEstado) radioEstado.checked = true;
    
    // Actualizar indicador visual
    actualizarIndicadorEstado(estadoGuardado);
}

function cambiarEstado(nuevoEstado) {
    localStorage.setItem('estado_usuario', nuevoEstado);
    actualizarIndicadorEstado(nuevoEstado);
    mostrarToast('Estado actualizado: ' + capitalizar(nuevoEstado));
}

function actualizarIndicadorEstado(estado) {
    const indicador = document.getElementById('mi-estado');
    const textoEstado = document.getElementById('estado-texto');
    
    if (indicador) {
        indicador.className = 'estado-indicator ' + estado;
    }
    
    if (textoEstado) {
        const textos = {
            'activo': 'Disponible',
            'ocupado': 'Ocupado temporalmente',
            'inactivo': 'No disponible'
        };
        textoEstado.textContent = textos[estado] || 'Disponible';
        textoEstado.style.color = estado === 'activo' ? '#10b981' : 
                                   estado === 'ocupado' ? '#f59e0b' : '#94a3b8';
    }
}

function capitalizar(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function configurarDropdowns() {
    // Dropdown de perfil
    const perfilBtn = document.getElementById('perfil-btn');
    const dropdown = document.getElementById('dropdown');
    
    if (perfilBtn && dropdown) {
        perfilBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.classList.toggle('visible');
            const notifDropdown = document.getElementById('notif-dropdown');
            if (notifDropdown) notifDropdown.classList.remove('visible');
        });
    }
    
    // Dropdown de notificaciones
    const notifBtn = document.getElementById('notif-btn');
    const notifDropdown = document.getElementById('notif-dropdown');
    
    if (notifBtn && notifDropdown) {
        notifBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            notifDropdown.classList.toggle('visible');
            if (dropdown) dropdown.classList.remove('visible');
        });
    }
    
    // Cerrar al hacer clic fuera
    document.addEventListener('click', function() {
        if (dropdown) dropdown.classList.remove('visible');
        if (notifDropdown) notifDropdown.classList.remove('visible');
    });
}

function cargarNotificaciones() {
    const lista = document.getElementById('notif-list');
    if (!lista) return;
    
    if (notificacionesSimuladas.length === 0) {
        lista.innerHTML = '<div class="notif-item"><p style="color: var(--text-secondary);">No hay notificaciones</p></div>';
    } else {
        lista.innerHTML = notificacionesSimuladas.map(n => `
            <div class="notif-item" style="padding: 16px; border-bottom: 1px solid var(--border);">
                <div>
                    <p style="font-size: 14px; margin-bottom: 4px;">${n.mensaje}</p>
                    <span style="font-size: 12px; color: var(--text-secondary);">${n.tiempo}</span>
                </div>
            </div>
        `).join('');
    }
}

function habilitarEdicion() {
    const inputs = document.querySelectorAll('#formulario-perfil input');
    inputs.forEach(input => input.disabled = false);
    
    document.getElementById('form-actions').style.display = 'flex';
    document.getElementById('btn-editar').style.display = 'none';
    
    // Focus en el primer input
    document.getElementById('nombre').focus();
}

function cancelarEdicion() {
    // Restaurar datos originales
    document.getElementById('nombre').value = datosOriginales.nombre || '';
    document.getElementById('apellido').value = datosOriginales.apellido || '';
    document.getElementById('email').value = datosOriginales.email || '';
    document.getElementById('telefono').value = datosOriginales.telefono || '';
    document.getElementById('dni').value = datosOriginales.dni || '';
    document.getElementById('direccion').value = datosOriginales.direccion || '';
    
    // Deshabilitar inputs
    const inputs = document.querySelectorAll('#formulario-perfil input');
    inputs.forEach(input => input.disabled = true);
    
    document.getElementById('form-actions').style.display = 'none';
    document.getElementById('btn-editar').style.display = 'flex';
}

function guardarPerfil(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const dni = document.getElementById('dni').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    
    if (!nombre || !email) {
        mostrarToast('El nombre y correo son obligatorios');
        return false;
    }
    
    // Actualizar localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario_logueado'));
    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.email = email;
    usuario.telefono = telefono;
    usuario.dni = dni;
    usuario.direccion = direccion;
    
    localStorage.setItem('usuario_logueado', JSON.stringify(usuario));
    
    // Actualizar sidebar
    document.getElementById('sidebar-nombre').textContent = nombre;
    document.getElementById('nombre-header').textContent = nombre;
    
    // Actualizar datos originales
    datosOriginales = { ...usuario };
    
    // Deshabilitar inputs
    const inputs = document.querySelectorAll('#formulario-perfil input');
    inputs.forEach(input => input.disabled = true);
    
    document.getElementById('form-actions').style.display = 'none';
    document.getElementById('btn-editar').style.display = 'flex';
    
    mostrarToast('Perfil actualizado correctamente');
    return false;
}

function cambiarContrasena() {
    const nuevaContrasena = prompt('Ingresa tu nueva contraseña:');
    if (nuevaContrasena && nuevaContrasena.length >= 6) {
        const usuario = JSON.parse(localStorage.getItem('usuario_logueado'));
        usuario.contrasena = nuevaContrasena;
        localStorage.setItem('usuario_logueado', JSON.stringify(usuario));
        mostrarToast('Contraseña actualizada correctamente');
    } else if (nuevaContrasena) {
        mostrarToast('La contraseña debe tener al menos 6 caracteres');
    }
}

function activar2FA() {
    mostrarToast('Autenticación de dos factores - Próximamente');
}

function cerrarSesion() {
    localStorage.removeItem('usuario_logueado');
    window.location.href = 'catalogo.php';
}

function mostrarToast(mensaje) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 14px 28px;
            border-radius: 14px;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            z-index: 9999;
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        `;
        document.body.appendChild(toast);
    }
    
    toast.textContent = mensaje;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(100px)';
    }, 3000);
}

