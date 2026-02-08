// Datos simulados de trabajadores por categoría
const trabajadoresPorCategoria = {
    carpinteria: [
        { id: 1, nombre: 'Carlos', apellido: 'García', ocupacion: 'Carpintero', telefono: '999888777', dni: '12345678', correo: 'carlos@email.com', valoracion: 4.8 },
        { id: 2, nombre: 'Juan', apellido: 'Martínez', ocupacion: 'Carpintero', telefono: '988777666', dni: '87654321', correo: 'juan@email.com', valoracion: 4.5 },
        { id: 3, nombre: 'Pedro', apellido: 'López', ocupacion: 'Ebanista', telefono: '977666555', dni: '11223344', correo: 'pedro@email.com', valoracion: 4.9 }
    ],
    soldadura: [
        { id: 4, nombre: 'Miguel', apellido: 'Rodríguez', ocupacion: 'Soldador Industrial', telefono: '966555444', dni: '44332211', correo: 'miguel@email.com', valoracion: 4.7 },
        { id: 5, nombre: 'Roberto', apellido: 'Sánchez', ocupacion: 'Soldador MIG/TIG', telefono: '955444333', dni: '55443322', correo: 'roberto@email.com', valoracion: 4.6 }
    ],
    mecanica: [
        { id: 6, nombre: 'Fernando', apellido: 'Torres', ocupacion: 'Mecánico Automotriz', telefono: '944333222', dni: '66554433', correo: 'fernando@email.com', valoracion: 4.8 },
        { id: 7, nombre: 'Luis', apellido: 'Gonzales', ocupacion: 'Mecánico Diésel', telefono: '933222111', dni: '77665544', correo: 'luis@email.com', valoracion: 4.4 }
    ],
    gasfiteria: [
        { id: 8, nombre: 'Alberto', apellido: 'Ramírez', ocupacion: 'Gasfitero', telefono: '922111000', dni: '88776655', correo: 'alberto@email.com', valoracion: 4.9 },
        { id: 9, nombre: 'José', apellido: 'Fernández', ocupacion: 'Instalador Sanitario', telefono: '911000999', dni: '99887766', correo: 'jose@email.com', valoracion: 4.5 }
    ],
    cerrajeria: [
        { id: 10, nombre: 'Ricardo', apellido: 'Díaz', ocupacion: 'Cerrajero', telefono: '900999888', dni: '10987654', correo: 'ricardo@email.com', valoracion: 4.7 },
        { id: 11, nombre: 'Andrés', apellido: 'Vargas', ocupacion: 'Cerrajero Automotriz', telefono: '899888777', dni: '21098765', correo: 'andres@email.com', valoracion: 4.6 }
    ],
    pintura: [
        { id: 12, nombre: 'Pablo', apellido: 'Mendoza', ocupacion: 'Pintor de Interiores', telefono: '888777666', dni: '32109876', correo: 'pablo@email.com', valoracion: 4.8 },
        { id: 13, nombre: 'Diego', apellido: 'Castro', ocupacion: 'Pintor Industrial', telefono: '877666555', dni: '43210987', correo: 'diego@email.com', valoracion: 4.5 }
    ]
};

const categoriasNombres = {
    carpinteria: { titulo: 'Carpinteros', subcategorias: ['Todos', 'Elaboración de muebles', 'Armado de muebles', 'Reparación de muebles'] },
    soldadura: { titulo: 'Soldadores', subcategorias: ['Todos', 'Soldadura Industrial', 'Soldadura MIG/TIG', 'Soldadura Automotriz'] },
    mecanica: { titulo: 'Mecánicos', subcategorias: ['Todos', 'Mecánica Automotriz', 'Mecánica Diésel', 'Frenos y Suspensión'] },
    gasfiteria: { titulo: 'Gasfiteros', subcategorias: ['Todos', 'Instalaciones Sanitarias', 'Reparación de Tuberías', 'Mantenimiento'] },
    cerrajeria: { titulo: 'Cerrajeros', subcategorias: ['Todos', 'Cerrajería Residencial', 'Cerrajería Automotriz', 'Instalación de Chapas'] },
    pintura: { titulo: 'Pintores', subcategorias: ['Todos', 'Pintura de Interiores', 'Pintura de Exteriores', 'Acabados Decorativos'] }
};

document.addEventListener('DOMContentLoaded', function() {
    verificarSesion();
    configurarHeader();
    cargarCategoria();
    cargarNotificaciones();
});

function verificarSesion() {
    const usuario = localStorage.getItem('usuario_logueado');
    if (!usuario) {
        window.location.href = 'login.php';
        return;
    }
    
    const datos = JSON.parse(usuario);
    const nombreHeader = document.getElementById('nombre-header');
    if (nombreHeader) {
        nombreHeader.textContent = datos.nombre || 'Usuario';
    }
}

function configurarHeader() {
    // Dropdown de perfil
    const perfilBtn = document.getElementById('perfil-btn');
    const dropdown = document.getElementById('dropdown');
    
    if (perfilBtn && dropdown) {
        perfilBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.classList.toggle('visible');
            document.getElementById('notif-dropdown')?.classList.remove('visible');
        });
    }
    
    // Dropdown de notificaciones
    const notifBtn = document.getElementById('notif-btn');
    const notifDropdown = document.getElementById('notif-dropdown');
    
    if (notifBtn && notifDropdown) {
        notifBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            notifDropdown.classList.toggle('visible');
            dropdown?.classList.remove('visible');
        });
    }
    
    document.addEventListener('click', function() {
        dropdown?.classList.remove('visible');
        notifDropdown?.classList.remove('visible');
    });
}

function cargarNotificaciones() {
    const lista = document.getElementById('notif-list');
    if (!lista) return;
    
    lista.innerHTML = `
        <div class="notif-item">
            <div>
                <strong>Nuevos trabajadores</strong>
                <p style="font-size: 13px; color: var(--text-secondary);">5 nuevos en tu zona</p>
            </div>
        </div>
        <div class="notif-item">
            <div>
                <strong>Oferta especial</strong>
                <p style="font-size: 13px; color: var(--text-secondary);">Descuento en servicios</p>
            </div>
        </div>
        <div class="notif-item">
            <div>
                <strong>Valoración pendiente</strong>
                <p style="font-size: 13px; color: var(--text-secondary);">Valora el servicio recibido</p>
            </div>
        </div>
    `;
}

function cargarCategoria() {
    const urlParams = new URLSearchParams(window.location.search);
    let categoria = urlParams.get('categoria') || localStorage.getItem('categoria_seleccionada') || 'carpinteria';
    
    // Actualizar título
    const tituloElement = document.getElementById('categoria-titulo');
    if (tituloElement && categoriasNombres[categoria]) {
        tituloElement.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            ${categoriasNombres[categoria].titulo}
        `;
    }
    
    cargarSubcategorias(categoria);
    cargarTrabajadores(categoria);
}

function cargarSubcategorias(categoria) {
    const lista = document.getElementById('subcategorias-lista');
    if (!lista || !categoriasNombres[categoria]) return;
    
    lista.innerHTML = '';
    categoriasNombres[categoria].subcategorias.forEach(function(sub, index) {
        const li = document.createElement('li');
        li.textContent = sub;
        if (index === 0) li.classList.add('active');
        li.onclick = function() {
            document.querySelectorAll('#subcategorias-lista li').forEach(el => el.classList.remove('active'));
            this.classList.add('active');
        };
        lista.appendChild(li);
    });
}

function cargarTrabajadores(categoria) {
    const grid = document.getElementById('trabajadores-grid');
    if (!grid) return;
    
    const trabajadores = trabajadoresPorCategoria[categoria] || trabajadoresPorCategoria.carpinteria;
    
    grid.innerHTML = trabajadores.map(t => `
        <div class="trabajador-card" onclick="verPerfil(${t.id}, '${categoria}')">
            <div class="avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            </div>
            <h3>${t.nombre} ${t.apellido}</h3>
            <p class="ocupacion">${t.ocupacion}</p>
            <div class="valoracion">
                <span>★</span>
                <span>${t.valoracion}</span>
            </div>
        </div>
    `).join('');
}

function verPerfil(id, categoria) {
    const trabajadores = trabajadoresPorCategoria[categoria] || [];
    const trabajador = trabajadores.find(t => t.id === id);
    if (trabajador) {
        localStorage.setItem('trabajador_seleccionado', JSON.stringify(trabajador));
        window.location.href = 'perfil.php?id=' + id + '&categoria=' + categoria;
    }
}

function cerrarSesion() {
    localStorage.removeItem('usuario_logueado');
    window.location.href = 'catalogo.php';
}
