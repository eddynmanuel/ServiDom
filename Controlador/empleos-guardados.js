// Datos simulados
const empleosGuardados = [
    {
        id: 1,
        titulo: 'Reparación de Plomería Urgente',
        descripcion: 'Necesito un plomero para arreglar una fuga en el baño principal. Es urgente.',
        categoria: 'Plomería',
        ubicacion: 'Bogotá, Centro',
        fecha: '2024-01-20',
        precio: '$50.000 - $80.000',
        cliente: 'Juan Pérez'
    },
    {
        id: 2,
        titulo: 'Instalación de Lámparas LED',
        descripcion: 'Busco electricista para instalar 5 lámparas LED en todo el apartamento.',
        categoria: 'Electricidad',
        ubicacion: 'Medellín, Poblado',
        fecha: '2024-01-18',
        precio: '$100.000 - $150.000',
        cliente: 'María García'
    }
];

const empleosPostulados = [
    {
        id: 3,
        titulo: 'Limpieza Profunda de Apartamento',
        descripcion: 'Limpieza completa de apartamento de 3 habitaciones, incluye cocina y baños.',
        categoria: 'Limpieza',
        ubicacion: 'Bogotá, Chapinero',
        fecha: '2024-01-15',
        precio: '$120.000',
        cliente: 'Carlos Rodríguez',
        estado: 'pendiente'
    },
    {
        id: 4,
        titulo: 'Pintura de Sala y Comedor',
        descripcion: 'Necesito pintar sala y comedor de blanco, materiales incluidos.',
        categoria: 'Pintura',
        ubicacion: 'Cali, Norte',
        fecha: '2024-01-12',
        precio: '$250.000',
        cliente: 'Ana López',
        estado: 'aceptado'
    }
];

const empleosProcesados = [
    {
        id: 5,
        titulo: 'Reparación de Refrigerador',
        descripcion: 'Refrigerador Samsung no enfría correctamente, necesita revisión.',
        categoria: 'Electrodomésticos',
        ubicacion: 'Bogotá, Usaquén',
        fecha: '2024-01-10',
        precio: '$180.000',
        cliente: 'Pedro Sánchez',
        estado: 'proceso',
        progreso: 60
    }
];

document.addEventListener('DOMContentLoaded', function() {
    verificarSesion();
    configurarDropdowns();
    configurarTabs();
    cargarEmpleos();
    actualizarContadores();
});

function verificarSesion() {
    const usuario = localStorage.getItem('usuario_logueado');
    if (!usuario) {
        window.location.href = 'login.html';
        return;
    }
    
    const datos = JSON.parse(usuario);
    const nombreUsuario = document.getElementById('nombre-usuario');
    if (nombreUsuario) {
        nombreUsuario.textContent = datos.nombre || 'Usuario';
    }
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

function configurarTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.tab-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Quitar clase active de todos
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // Agregar clase active al seleccionado
            this.classList.add('active');
            document.getElementById(`panel-${targetTab}`).classList.add('active');
        });
    });
}

function cargarEmpleos() {
    cargarGuardados();
    cargarPostulados();
    cargarProcesados();
}

function cargarGuardados() {
    const grid = document.getElementById('grid-guardados');
    const empty = document.getElementById('empty-guardados');
    
    if (empleosGuardados.length === 0) {
        grid.style.display = 'none';
        empty.style.display = 'block';
        return;
    }
    
    grid.style.display = 'grid';
    empty.style.display = 'none';
    
    grid.innerHTML = empleosGuardados.map(empleo => `
        <div class="empleo-card" data-id="${empleo.id}">
            <div class="empleo-header">
                <span class="empleo-categoria">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    ${empleo.categoria}
                </span>
                <div class="empleo-acciones">
                    <button class="btn-accion guardado" onclick="quitarGuardado(${empleo.id})" title="Quitar de guardados">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <h3 class="empleo-titulo">${empleo.titulo}</h3>
            <p class="empleo-descripcion">${empleo.descripcion}</p>
            <div class="empleo-meta">
                <span class="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    ${empleo.ubicacion}
                </span>
                <span class="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                    </svg>
                    ${formatearFecha(empleo.fecha)}
                </span>
            </div>
            <div class="empleo-footer">
                <span class="empleo-precio">${empleo.precio}</span>
                <button class="btn-postular" onclick="postularEmpleo(${empleo.id})">Postularme</button>
            </div>
        </div>
    `).join('');
}

function cargarPostulados() {
    const grid = document.getElementById('grid-postulados');
    const empty = document.getElementById('empty-postulados');
    
    if (empleosPostulados.length === 0) {
        grid.style.display = 'none';
        empty.style.display = 'block';
        return;
    }
    
    grid.style.display = 'grid';
    empty.style.display = 'none';
    
    grid.innerHTML = empleosPostulados.map(empleo => `
        <div class="empleo-card" data-id="${empleo.id}">
            <div class="empleo-header">
                <span class="empleo-categoria">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    ${empleo.categoria}
                </span>
                <span class="status-badge ${empleo.estado}">${getTextoEstado(empleo.estado)}</span>
            </div>
            <h3 class="empleo-titulo">${empleo.titulo}</h3>
            <p class="empleo-descripcion">${empleo.descripcion}</p>
            <div class="empleo-meta">
                <span class="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    ${empleo.cliente}
                </span>
                <span class="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    ${empleo.ubicacion}
                </span>
            </div>
            <div class="empleo-footer">
                <span class="empleo-precio">${empleo.precio}</span>
            </div>
        </div>
    `).join('');
}

function cargarProcesados() {
    const grid = document.getElementById('grid-procesados');
    const empty = document.getElementById('empty-procesados');
    
    if (empleosProcesados.length === 0) {
        grid.style.display = 'none';
        empty.style.display = 'block';
        return;
    }
    
    grid.style.display = 'grid';
    empty.style.display = 'none';
    
    grid.innerHTML = empleosProcesados.map(empleo => `
        <div class="empleo-card" data-id="${empleo.id}">
            <div class="empleo-header">
                <span class="empleo-categoria">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    ${empleo.categoria}
                </span>
                <span class="status-badge ${empleo.estado}">${getTextoEstado(empleo.estado)}</span>
            </div>
            <h3 class="empleo-titulo">${empleo.titulo}</h3>
            <p class="empleo-descripcion">${empleo.descripcion}</p>
            <div class="empleo-meta">
                <span class="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    ${empleo.cliente}
                </span>
                <span class="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    ${empleo.ubicacion}
                </span>
            </div>
            <div class="empleo-footer">
                <span class="empleo-precio">${empleo.precio}</span>
            </div>
        </div>
    `).join('');
}

function getTextoEstado(estado) {
    const textos = {
        pendiente: 'Pendiente',
        aceptado: 'Aceptado',
        proceso: 'En Proceso',
        completado: 'Completado'
    };
    return textos[estado] || estado;
}

function formatearFecha(fecha) {
    const opciones = { day: 'numeric', month: 'short' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
}

function actualizarContadores() {
    document.getElementById('count-guardados').textContent = empleosGuardados.length;
    document.getElementById('count-postulados').textContent = empleosPostulados.length;
    document.getElementById('count-procesados').textContent = empleosProcesados.length;
}

function quitarGuardado(id) {
    const index = empleosGuardados.findIndex(e => e.id === id);
    if (index > -1) {
        empleosGuardados.splice(index, 1);
        cargarGuardados();
        actualizarContadores();
        mostrarToastGlobal('Empleo quitado de guardados');
    }
}

function postularEmpleo(id) {
    const empleo = empleosGuardados.find(e => e.id === id);
    if (empleo) {
        empleosGuardados.splice(empleosGuardados.indexOf(empleo), 1);
        empleosPostulados.push({ ...empleo, estado: 'pendiente' });
        cargarGuardados();
        cargarPostulados();
        actualizarContadores();
        mostrarToastGlobal('¡Te has postulado exitosamente!');
        
        // Cambiar a pestaña de postulados
        document.querySelector('.tab-btn[data-tab="postulados"]').click();
    }
}

function marcarTodasLeidas() {
    mostrarToastGlobal('Notificaciones marcadas como leídas');
}
