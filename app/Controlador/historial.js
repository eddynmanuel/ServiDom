// Datos simulados de historial
const historialSimulado = [
    {
        id: 1,
        titulo: 'Reparación de Plomería',
        descripcion: 'Arreglo de tubería con fuga en el baño principal',
        trabajador: 'Carlos Mendez',
        fecha: '2024-01-15',
        precio: '$45.000',
        estado: 'completado',
        categoria: 'plomeria'
    },
    {
        id: 2,
        titulo: 'Instalación Eléctrica',
        descripcion: 'Instalación de nuevos tomacorrientes en la sala',
        trabajador: 'Ana García',
        fecha: '2024-01-12',
        precio: '$65.000',
        estado: 'completado',
        categoria: 'electricidad'
    },
    {
        id: 3,
        titulo: 'Limpieza Profunda',
        descripcion: 'Limpieza general del apartamento de 3 habitaciones',
        trabajador: 'María López',
        fecha: '2024-01-10',
        precio: '$80.000',
        estado: 'proceso',
        categoria: 'limpieza'
    },
    {
        id: 4,
        titulo: 'Reparación de Refrigerador',
        descripcion: 'Cambio de motor del compresor',
        trabajador: 'Juan Rodríguez',
        fecha: '2024-01-08',
        precio: '$120.000',
        estado: 'cancelado',
        categoria: 'electrodomesticos'
    },
    {
        id: 5,
        titulo: 'Pintura de Habitación',
        descripcion: 'Pintura completa de habitación principal',
        trabajador: 'Pedro Sánchez',
        fecha: '2024-01-05',
        precio: '$150.000',
        estado: 'completado',
        categoria: 'pintura'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    verificarSesion();
    cargarHistorial();
    configurarDropdowns();
    configurarFiltros();
    actualizarEstadisticas();
});

function verificarSesion() {
    const usuario = localStorage.getItem('usuario_logueado');
    if (!usuario) {
        window.location.href = 'login.php';
        return;
    }
    
    const datos = JSON.parse(usuario);
    const nombreUsuario = document.getElementById('nombre-usuario');
    if (nombreUsuario) {
        nombreUsuario.textContent = datos.nombre || 'Usuario';
    }
}

function cargarHistorial(filtroTipo = 'todos', filtroFecha = 'reciente') {
    const container = document.getElementById('historial-list');
    const emptyState = document.getElementById('empty-state');
    
    if (!container) return;
    
    let items = [...historialSimulado];
    
    // Aplicar filtro de tipo
    if (filtroTipo !== 'todos') {
        items = items.filter(item => item.estado === filtroTipo.replace('s', ''));
    }
    
    // Aplicar filtro de fecha
    if (filtroFecha === 'antiguo') {
        items.reverse();
    }
    
    if (items.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    container.style.display = 'flex';
    emptyState.style.display = 'none';
    
    container.innerHTML = items.map(item => `
        <div class="historial-item" data-id="${item.id}">
            <div class="historial-icon">
                ${getIconoCategoria(item.categoria)}
            </div>
            <div class="historial-content">
                <h3>${item.titulo}</h3>
                <p>${item.descripcion}</p>
                <div class="historial-meta">
                    <span class="meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        ${item.trabajador}
                    </span>
                    <span class="meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        ${formatearFecha(item.fecha)}
                    </span>
                    <span class="meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="1" x2="12" y2="23"></line>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                        ${item.precio}
                    </span>
                </div>
            </div>
            <div class="historial-status">
                <span class="status-badge ${item.estado}">${getTextoEstado(item.estado)}</span>
            </div>
        </div>
    `).join('');
}

function getIconoCategoria(categoria) {
    const iconos = {
        plomeria: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 16.5c2.76 0 5 2.24 5 5v.5H1v-.5c0-2.76 2.24-5 5-5zm0-6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm12 6c2.76 0 5 2.24 5 5v.5h-10v-.5c0-2.76 2.24-5 5-5zm0-6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"/></svg>',
        electricidad: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
        limpieza: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
        electrodomesticos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line></svg>',
        pintura: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path></svg>'
    };
    return iconos[categoria] || iconos.limpieza;
}

function getTextoEstado(estado) {
    const textos = {
        completado: 'Completado',
        proceso: 'En Proceso',
        cancelado: 'Cancelado'
    };
    return textos[estado] || estado;
}

function formatearFecha(fecha) {
    const opciones = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
}

function configurarDropdowns() {
    const perfilBtn = document.getElementById('perfil-btn');
    const dropdown = document.getElementById('dropdown');
    const notifBtn = document.getElementById('notif-btn');
    const notifDropdown = document.getElementById('notif-dropdown');
    
    if (perfilBtn && dropdown) {
        perfilBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.classList.toggle('visible');
            if (notifDropdown) notifDropdown.classList.remove('visible');
        });
    }
    
    if (notifBtn && notifDropdown) {
        notifBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            notifDropdown.classList.toggle('visible');
            if (dropdown) dropdown.classList.remove('visible');
        });
    }
    
    document.addEventListener('click', function() {
        if (dropdown) dropdown.classList.remove('visible');
        if (notifDropdown) notifDropdown.classList.remove('visible');
    });
}

function configurarFiltros() {
    const filtroTipo = document.getElementById('filtro-tipo');
    const filtroFecha = document.getElementById('filtro-fecha');
    
    if (filtroTipo) {
        filtroTipo.addEventListener('change', function() {
            cargarHistorial(this.value, filtroFecha?.value || 'reciente');
        });
    }
    
    if (filtroFecha) {
        filtroFecha.addEventListener('change', function() {
            cargarHistorial(filtroTipo?.value || 'todos', this.value);
        });
    }
}

function actualizarEstadisticas() {
    const completados = historialSimulado.filter(i => i.estado === 'completado').length;
    const proceso = historialSimulado.filter(i => i.estado === 'proceso').length;
    const cancelados = historialSimulado.filter(i => i.estado === 'cancelado').length;
    
    const elCompletados = document.getElementById('stat-completados');
    const elProceso = document.getElementById('stat-proceso');
    const elCancelados = document.getElementById('stat-cancelados');
    
    if (elCompletados) elCompletados.textContent = completados;
    if (elProceso) elProceso.textContent = proceso;
    if (elCancelados) elCancelados.textContent = cancelados;
}

function marcarTodasLeidas() {
    mostrarToastGlobal('Notificaciones marcadas como leídas');
}
