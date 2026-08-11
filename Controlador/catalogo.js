// Datos simulados de trabajadores por categoría (para clientes)
const trabajadoresPorCategoria = {
    carpinteria: [
        { id: 1, nombre: 'Juan Pérez', especialidad: 'Muebles a medida', rating: 4.8, trabajos: 125, precio: '$50.000/hora', disponible: true },
        { id: 2, nombre: 'Carlos García', especialidad: 'Restauración de muebles', rating: 4.5, trabajos: 89, precio: '$45.000/hora', disponible: true },
        { id: 3, nombre: 'Miguel López', especialidad: 'Carpintería general', rating: 4.9, trabajos: 156, precio: '$55.000/hora', disponible: false }
    ],
    soldadura: [
        { id: 4, nombre: 'Roberto Torres', especialidad: 'Soldadura MIG/TIG', rating: 4.7, trabajos: 98, precio: '$60.000/hora', disponible: true },
        { id: 5, nombre: 'Andrés Martínez', especialidad: 'Estructuras metálicas', rating: 4.6, trabajos: 76, precio: '$55.000/hora', disponible: true }
    ],
    mecanica: [
        { id: 6, nombre: 'Luis Hernández', especialidad: 'Mecánica automotriz', rating: 4.9, trabajos: 210, precio: '$45.000/hora', disponible: true },
        { id: 7, nombre: 'Pedro Sánchez', especialidad: 'Motos y vehículos pesados', rating: 4.4, trabajos: 65, precio: '$40.000/hora', disponible: false }
    ],
    gasfiteria: [
        { id: 8, nombre: 'José Ramírez', especialidad: 'Plomería residencial', rating: 4.8, trabajos: 145, precio: '$50.000/hora', disponible: true },
        { id: 9, nombre: 'Fernando Castro', especialidad: 'Instalaciones de gas', rating: 4.7, trabajos: 112, precio: '$55.000/hora', disponible: true }
    ],
    cerrajeria: [
        { id: 10, nombre: 'Diego Morales', especialidad: 'Cerrajería 24h', rating: 4.6, trabajos: 89, precio: '$45.000/hora', disponible: true }
    ],
    pintura: [
        { id: 11, nombre: 'Ricardo Vargas', especialidad: 'Pintura decorativa', rating: 4.9, trabajos: 134, precio: '$40.000/hora', disponible: true },
        { id: 12, nombre: 'Mario Díaz', especialidad: 'Pintura industrial', rating: 4.5, trabajos: 78, precio: '$50.000/hora', disponible: true }
    ],
    electricidad: [
        { id: 13, nombre: 'Sergio Gómez', especialidad: 'Instalaciones eléctricas', rating: 4.8, trabajos: 167, precio: '$55.000/hora', disponible: true },
        { id: 14, nombre: 'Raúl Fernández', especialidad: 'Reparaciones eléctricas', rating: 4.6, trabajos: 92, precio: '$50.000/hora', disponible: true }
    ],
    limpieza: [
        { id: 15, nombre: 'María Rodríguez', especialidad: 'Limpieza profunda', rating: 4.9, trabajos: 245, precio: '$35.000/hora', disponible: true },
        { id: 16, nombre: 'Laura Herrera', especialidad: 'Limpieza de oficinas', rating: 4.7, trabajos: 178, precio: '$30.000/hora', disponible: true }
    ],
    jardineria: [
        { id: 17, nombre: 'Antonio Ruiz', especialidad: 'Diseño de jardines', rating: 4.8, trabajos: 89, precio: '$45.000/hora', disponible: true },
        { id: 18, nombre: 'Pablo Mendoza', especialidad: 'Mantenimiento de jardines', rating: 4.5, trabajos: 134, precio: '$35.000/hora', disponible: true }
    ],
    'albañileria': [
        { id: 19, nombre: 'Julio Martín', especialidad: 'Construcción general', rating: 4.7, trabajos: 156, precio: '$50.000/hora', disponible: true },
        { id: 20, nombre: 'Francisco López', especialidad: 'Remodelaciones', rating: 4.6, trabajos: 112, precio: '$55.000/hora', disponible: false }
    ],
    mudanzas: [
        { id: 21, nombre: 'Transportes Rápido', especialidad: 'Mudanzas locales', rating: 4.8, trabajos: 234, precio: '$200.000/viaje', disponible: true },
        { id: 22, nombre: 'Mudanzas Express', especialidad: 'Mudanzas nacionales', rating: 4.6, trabajos: 89, precio: '$500.000/viaje', disponible: true }
    ],
    electrodomesticos: [
        { id: 23, nombre: 'Técnico Oscar', especialidad: 'Lavadoras y secadoras', rating: 4.7, trabajos: 145, precio: '$50.000/visita', disponible: true },
        { id: 24, nombre: 'Electro Servicios', especialidad: 'Todos los electrodomésticos', rating: 4.5, trabajos: 178, precio: '$45.000/visita', disponible: true }
    ],
    refrigeracion: [
        { id: 25, nombre: 'Frío Total', especialidad: 'Aires acondicionados', rating: 4.9, trabajos: 167, precio: '$70.000/visita', disponible: true },
        { id: 26, nombre: 'Clima Perfecto', especialidad: 'Refrigeración industrial', rating: 4.7, trabajos: 89, precio: '$80.000/visita', disponible: true }
    ],
    fumigacion: [
        { id: 27, nombre: 'Fumigaciones Pro', especialidad: 'Control de plagas', rating: 4.8, trabajos: 234, precio: '$100.000/servicio', disponible: true },
        { id: 28, nombre: 'Plagas Cero', especialidad: 'Fumigación residencial', rating: 4.6, trabajos: 156, precio: '$80.000/servicio', disponible: true }
    ],
    vidrieria: [
        { id: 29, nombre: 'Vidrios Express', especialidad: 'Cristales templados', rating: 4.7, trabajos: 112, precio: 'Cotización', disponible: true },
        { id: 30, nombre: 'Cristal Art', especialidad: 'Vidrios decorativos', rating: 4.8, trabajos: 78, precio: 'Cotización', disponible: true }
    ],
    tapiceria: [
        { id: 31, nombre: 'Tapicería Moderna', especialidad: 'Muebles y sillas', rating: 4.9, trabajos: 145, precio: 'Cotización', disponible: true },
        { id: 32, nombre: 'Renovación Total', especialidad: 'Tapizado automotriz', rating: 4.6, trabajos: 89, precio: 'Cotización', disponible: true }
    ]
};

// Ofertas de empleo por categoría (para trabajadores)
const ofertasPorCategoria = {
    carpinteria: [
        { id: 101, titulo: 'Fabricación de closet empotrado', descripcion: 'Necesito un closet de 3 metros de ancho para habitación principal. Material incluido.', cliente: 'María García', ubicacion: 'Bogotá', precio: '$800.000 - $1.200.000', urgente: true, fecha: '2024-02-06' },
        { id: 102, titulo: 'Reparación de puerta principal', descripcion: 'La puerta de entrada está desalineada y no cierra correctamente.', cliente: 'Ana López', ubicacion: 'Medellín', precio: '$80.000 - $120.000', urgente: false, fecha: '2024-02-05' },
        { id: 103, titulo: 'Mesa de comedor a medida', descripcion: 'Quiero una mesa de madera para 8 personas, estilo rústico moderno.', cliente: 'Carlos Pérez', ubicacion: 'Cali', precio: '$500.000 - $700.000', urgente: false, fecha: '2024-02-04' }
    ],
    soldadura: [
        { id: 104, titulo: 'Reja de seguridad para ventanas', descripcion: 'Necesito rejas para 4 ventanas de la casa. Medidas estándar.', cliente: 'Roberto Sánchez', ubicacion: 'Bogotá', precio: '$400.000 - $600.000', urgente: false, fecha: '2024-02-06' },
        { id: 105, titulo: 'Reparación puerta de garaje', descripcion: 'Soldadura urgente en bisagras de puerta metálica de garaje.', cliente: 'Laura Torres', ubicacion: 'Barranquilla', precio: '$150.000 - $200.000', urgente: true, fecha: '2024-02-06' }
    ],
    mecanica: [
        { id: 106, titulo: 'Cambio de motor de arranque', descripcion: 'Chevrolet Spark 2018, el motor de arranque no funciona.', cliente: 'Pedro Martínez', ubicacion: 'Bogotá', precio: '$100.000 - $150.000', urgente: true, fecha: '2024-02-06' },
        { id: 107, titulo: 'Mantenimiento general de moto', descripcion: 'Yamaha FZ 150cc, cambio de aceite, frenos y cadena.', cliente: 'Diego Ramírez', ubicacion: 'Medellín', precio: '$80.000 - $120.000', urgente: false, fecha: '2024-02-05' }
    ],
    gasfiteria: [
        { id: 108, titulo: 'Fuga de agua en baño', descripcion: 'Hay una fuga debajo del lavamanos del baño principal.', cliente: 'Carmen López', ubicacion: 'Bogotá', precio: '$60.000 - $100.000', urgente: true, fecha: '2024-02-06' },
        { id: 109, titulo: 'Instalación de calentador', descripcion: 'Instalar calentador de paso a gas, ya tengo el equipo.', cliente: 'Sofía Díaz', ubicacion: 'Cali', precio: '$120.000 - $180.000', urgente: false, fecha: '2024-02-04' }
    ],
    cerrajeria: [
        { id: 110, titulo: 'Cambio de cerradura', descripcion: 'Cambiar cerradura de puerta principal por una de mayor seguridad.', cliente: 'Jorge Hernández', ubicacion: 'Bogotá', precio: '$80.000 - $150.000', urgente: false, fecha: '2024-02-05' }
    ],
    pintura: [
        { id: 111, titulo: 'Pintar apartamento completo', descripcion: 'Apartamento de 80m², 3 habitaciones, 2 baños. Pintura blanca.', cliente: 'Andrea Castro', ubicacion: 'Bogotá', precio: '$600.000 - $900.000', urgente: false, fecha: '2024-02-03' },
        { id: 112, titulo: 'Pintura decorativa habitación', descripcion: 'Mural en habitación infantil, tema de selva.', cliente: 'Patricia Morales', ubicacion: 'Medellín', precio: '$300.000 - $500.000', urgente: false, fecha: '2024-02-02' }
    ],
    electricidad: [
        { id: 113, titulo: 'Instalación de lámparas LED', descripcion: 'Instalar 8 lámparas LED en apartamento, ya tengo las lámparas.', cliente: 'Fernando Ruiz', ubicacion: 'Bogotá', precio: '$80.000 - $120.000', urgente: false, fecha: '2024-02-06' },
        { id: 114, titulo: 'Revisión eléctrica urgente', descripcion: 'Se dispara el breaker constantemente, necesito revisión.', cliente: 'Marcela Gómez', ubicacion: 'Cali', precio: '$100.000 - $150.000', urgente: true, fecha: '2024-02-06' }
    ],
    limpieza: [
        { id: 115, titulo: 'Limpieza profunda de casa', descripcion: 'Casa de 150m², 4 habitaciones. Limpieza completa.', cliente: 'Rosa Martínez', ubicacion: 'Bogotá', precio: '$150.000 - $200.000', urgente: false, fecha: '2024-02-05' },
        { id: 116, titulo: 'Limpieza post-construcción', descripcion: 'Apartamento nuevo, limpieza después de remodelación.', cliente: 'Carlos Vargas', ubicacion: 'Medellín', precio: '$200.000 - $300.000', urgente: true, fecha: '2024-02-06' }
    ],
    jardineria: [
        { id: 117, titulo: 'Diseño de jardín pequeño', descripcion: 'Jardín de 20m², quiero plantas ornamentales y césped.', cliente: 'Isabel Fernández', ubicacion: 'Bogotá', precio: '$300.000 - $500.000', urgente: false, fecha: '2024-02-04' },
        { id: 118, titulo: 'Mantenimiento jardín mensual', descripcion: 'Jardín de 50m², poda, riego y abono mensual.', cliente: 'Andrés López', ubicacion: 'Cali', precio: '$80.000/mes', urgente: false, fecha: '2024-02-03' }
    ],
    'albañileria': [
        { id: 119, titulo: 'Construcción de muro', descripcion: 'Muro divisorio de 10 metros de largo por 2 de alto.', cliente: 'Miguel Torres', ubicacion: 'Bogotá', precio: '$500.000 - $800.000', urgente: false, fecha: '2024-02-05' },
        { id: 120, titulo: 'Repello y pintura fachada', descripcion: 'Fachada de casa, necesita repello y pintura.', cliente: 'Sandra Moreno', ubicacion: 'Barranquilla', precio: '$400.000 - $600.000', urgente: false, fecha: '2024-02-04' }
    ],
    mudanzas: [
        { id: 121, titulo: 'Mudanza local apartamento', descripcion: 'Apartamento 2 habitaciones, del piso 5 al piso 3, mismo edificio.', cliente: 'Paula Sánchez', ubicacion: 'Bogotá', precio: '$150.000 - $200.000', urgente: false, fecha: '2024-02-06' },
        { id: 122, titulo: 'Mudanza larga distancia', descripcion: 'Casa completa de Bogotá a Medellín.', cliente: 'Ricardo Herrera', ubicacion: 'Bogotá', precio: '$800.000 - $1.200.000', urgente: true, fecha: '2024-02-06' }
    ],
    electrodomesticos: [
        { id: 123, titulo: 'Reparación lavadora Samsung', descripcion: 'Lavadora no centrifuga, modelo de 15kg.', cliente: 'Lucia García', ubicacion: 'Bogotá', precio: '$80.000 - $120.000', urgente: true, fecha: '2024-02-06' },
        { id: 124, titulo: 'Instalación de horno empotrado', descripcion: 'Instalar horno eléctrico empotrado en cocina.', cliente: 'Mario Díaz', ubicacion: 'Medellín', precio: '$60.000 - $100.000', urgente: false, fecha: '2024-02-05' }
    ],
    refrigeracion: [
        { id: 125, titulo: 'Mantenimiento aire acondicionado', descripcion: '3 unidades split de 12000 BTU, limpieza y recarga de gas.', cliente: 'Empresa ABC', ubicacion: 'Bogotá', precio: '$200.000 - $300.000', urgente: false, fecha: '2024-02-05' },
        { id: 126, titulo: 'Instalación de aire nuevo', descripcion: 'Instalar aire acondicionado split 18000 BTU.', cliente: 'Familia Rodríguez', ubicacion: 'Cali', precio: '$150.000 - $200.000', urgente: false, fecha: '2024-02-04' }
    ],
    fumigacion: [
        { id: 127, titulo: 'Fumigación contra cucarachas', descripcion: 'Apartamento 80m², problema de cucarachas en cocina.', cliente: 'Alejandro Vargas', ubicacion: 'Bogotá', precio: '$80.000 - $120.000', urgente: true, fecha: '2024-02-06' },
        { id: 128, titulo: 'Fumigación jardín', descripcion: 'Jardín con plaga de hormigas, 100m².', cliente: 'Mariana López', ubicacion: 'Medellín', precio: '$100.000 - $150.000', urgente: false, fecha: '2024-02-05' }
    ],
    vidrieria: [
        { id: 129, titulo: 'Reemplazo vidrio ventana', descripcion: 'Vidrio roto de ventana 1.5m x 1m.', cliente: 'Felipe Castro', ubicacion: 'Bogotá', precio: '$100.000 - $150.000', urgente: true, fecha: '2024-02-06' },
        { id: 130, titulo: 'División de vidrio para oficina', descripcion: 'División de 3m x 2m en vidrio templado.', cliente: 'Oficinas XYZ', ubicacion: 'Bogotá', precio: '$400.000 - $600.000', urgente: false, fecha: '2024-02-04' }
    ],
    tapiceria: [
        { id: 131, titulo: 'Tapizado de sala completa', descripcion: 'Juego de sala 3-2-1, cambio de tela completo.', cliente: 'Carolina Méndez', ubicacion: 'Bogotá', precio: '$600.000 - $900.000', urgente: false, fecha: '2024-02-05' },
        { id: 132, titulo: 'Tapizado de sillas de comedor', descripcion: '6 sillas de comedor, tela a elección.', cliente: 'Familia Ortiz', ubicacion: 'Cali', precio: '$200.000 - $300.000', urgente: false, fecha: '2024-02-04' }
    ]
};

// Notificaciones simuladas
const notificacionesSimuladas = [
    { id: 1, mensaje: 'Tu anuncio ha sido publicado', tiempo: 'Hace 5 min', icono: 'check' },
    { id: 2, mensaje: 'Un trabajador se interesó en tu anuncio', tiempo: 'Hace 1 hora', icono: 'user' },
    { id: 3, mensaje: 'Tienes un nuevo mensaje', tiempo: 'Hace 2 horas', icono: 'message' }
];

let tipoUsuario = 'cliente';
let nombreUsuario = 'Usuario';
let categoriaActual = null;

document.addEventListener('DOMContentLoaded', function() {
    verificarSesion();
    configurarDropdowns();
    cargarNotificaciones();
    configurarBuscador();
});

function verificarSesion() {
    const usuario = localStorage.getItem('usuario_logueado');
    
    // El catálogo es público - no redirigir a login
    if (!usuario) {
        // Usuario no logueado - mostrar interfaz pública
        mostrarInterfazPublica();
        return;
    }
    
    // Usuario logueado - ocultar secciones de bienvenida
    const heroSection = document.getElementById('hero-section');
    const howItWorks = document.getElementById('como-funciona');
    const footerPublico = document.getElementById('footer-publico');
    if (heroSection) heroSection.style.display = 'none';
    if (howItWorks) howItWorks.style.display = 'none';
    if (footerPublico) footerPublico.style.display = 'none';
    
    const datosUsuario = JSON.parse(usuario);
    nombreUsuario = datosUsuario.nombre || 'Usuario';
    tipoUsuario = datosUsuario.tipo || 'cliente';
    
    const nombreElement = document.getElementById('nombre-usuario');
    if (nombreElement) {
        nombreElement.textContent = nombreUsuario;
    }
    
    // Actualizar título según tipo de usuario
    actualizarInterfazSegunTipo();
}

// Mostrar interfaz para usuarios no logueados
function mostrarInterfazPublica() {
    // Ocultar elementos de usuario logueado
    const perfilContainer = document.querySelector('.perfil-container');
    const notifContainer = document.querySelector('.notif-container');
    const headerActions = document.querySelector('.header-actions');
    
    if (headerActions) {
        // Reemplazar con botón de login
        headerActions.innerHTML = `
            <a href="login.html" class="btn-login">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>
                Iniciar Sesión
            </a>
            <a href="registro.html" class="btn-registro">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                </svg>
                Registrarse
            </a>
        `;
    }
}

function actualizarInterfazSegunTipo() {
    const tituloSeccion = document.querySelector('.section-header h1');
    
    if (tipoUsuario === 'trabajador') {
        if (tituloSeccion) {
            tituloSeccion.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                Encuentra Trabajo
            `;
        }
    }
}

function abrirCategoria(categoria) {
    // Redirigir a la página de categoría con el parámetro
    window.location.href = `categoria.html?cat=${categoria}`;
}

function mostrarTrabajadores(categoria) {
    const trabajadores = trabajadoresPorCategoria[categoria] || [];
    const nombreCategoria = formatearCategoria(categoria);
    
    const modal = crearModalContenido(`
        <div class="modal-header-custom">
            <h2>${nombreCategoria}</h2>
            <p>${trabajadores.length} trabajador${trabajadores.length !== 1 ? 'es' : ''} disponible${trabajadores.length !== 1 ? 's' : ''}</p>
        </div>
        <div class="modal-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" placeholder="Buscar trabajador..." onkeyup="filtrarListaModal(this.value, 'trabajadores')">
        </div>
        <div class="modal-lista" id="modal-lista">
            ${trabajadores.length === 0 ? `
                <div class="empty-modal">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    <p>No hay trabajadores disponibles en esta categoría</p>
                </div>
            ` : trabajadores.map(t => `
                <div class="item-card trabajador-card" onclick="verPerfilTrabajador(${t.id})">
                    <div class="item-avatar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                    <div class="item-info">
                        <div class="item-header">
                            <h4>${t.nombre}</h4>
                            ${t.disponible ? '<span class="badge disponible">Disponible</span>' : '<span class="badge ocupado">Ocupado</span>'}
                        </div>
                        <p class="item-especialidad">${t.especialidad}</p>
                        <div class="item-meta">
                            <span class="meta-rating">
                                <svg viewBox="0 0 24 24" fill="var(--accent)" stroke="var(--accent)" stroke-width="2">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                                ${t.rating}
                            </span>
                            <span class="meta-trabajos">${t.trabajos} trabajos</span>
                            <span class="meta-precio">${t.precio}</span>
                        </div>
                    </div>
                    <button class="btn-contactar" onclick="event.stopPropagation(); contactarTrabajador(${t.id})">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        Contactar
                    </button>
                </div>
            `).join('')}
        </div>
    `);
    
    document.body.appendChild(modal);
}

function mostrarOfertasEmpleo(categoria) {
    const ofertas = ofertasPorCategoria[categoria] || [];
    const nombreCategoria = formatearCategoria(categoria);
    
    const modal = crearModalContenido(`
        <div class="modal-header-custom">
            <h2>Ofertas de ${nombreCategoria}</h2>
            <p>${ofertas.length} oferta${ofertas.length !== 1 ? 's' : ''} disponible${ofertas.length !== 1 ? 's' : ''}</p>
        </div>
        <div class="modal-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" placeholder="Buscar oferta..." onkeyup="filtrarListaModal(this.value, 'ofertas')">
        </div>
        <div class="modal-filtros">
            <button class="filtro-btn active" onclick="filtrarOfertas('todas', this)">Todas</button>
            <button class="filtro-btn" onclick="filtrarOfertas('urgentes', this)">🔥 Urgentes</button>
            <button class="filtro-btn" onclick="filtrarOfertas('recientes', this)">📅 Recientes</button>
        </div>
        <div class="modal-lista" id="modal-lista">
            ${ofertas.length === 0 ? `
                <div class="empty-modal">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                    <p>No hay ofertas disponibles en esta categoría</p>
                </div>
            ` : ofertas.map(o => `
                <div class="item-card oferta-card" data-urgente="${o.urgente}" data-fecha="${o.fecha}">
                    <div class="oferta-header">
                        <div class="oferta-badges">
                            ${o.urgente ? '<span class="badge urgente">🔥 Urgente</span>' : ''}
                            <span class="badge ubicacion">📍 ${o.ubicacion}</span>
                        </div>
                        <span class="oferta-fecha">${formatearFecha(o.fecha)}</span>
                    </div>
                    <h4 class="oferta-titulo">${o.titulo}</h4>
                    <p class="oferta-descripcion">${o.descripcion}</p>
                    <div class="oferta-footer">
                        <div class="oferta-cliente">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            ${o.cliente}
                        </div>
                        <span class="oferta-precio">${o.precio}</span>
                    </div>
                    <div class="oferta-acciones">
                        <button class="btn-postular" onclick="postularOferta(${o.id})">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            Postularme
                        </button>
                        <button class="btn-guardar" onclick="guardarOferta(${o.id})">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `);
    
    document.body.appendChild(modal);
}

function crearModalContenido(contenido) {
    const modalExistente = document.querySelector('.modal-categoria');
    if (modalExistente) modalExistente.remove();
    
    const modal = document.createElement('div');
    modal.className = 'modal-categoria';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="cerrarModalCategoria()"></div>
        <div class="modal-box">
            <button class="btn-cerrar" onclick="cerrarModalCategoria()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            ${contenido}
        </div>
    `;
    return modal;
}

function cerrarModalCategoria() {
    const modal = document.querySelector('.modal-categoria');
    if (modal) {
        modal.classList.add('cerrando');
        setTimeout(() => modal.remove(), 300);
    }
}

function formatearCategoria(cat) {
    const categorias = {
        carpinteria: 'Carpintería',
        soldadura: 'Soldadura',
        mecanica: 'Mecánica',
        gasfiteria: 'Gasfitería',
        cerrajeria: 'Cerrajería',
        pintura: 'Pintura'
    };
    return categorias[cat] || cat;
}

function formatearFecha(fecha) {
    const opciones = { day: 'numeric', month: 'short' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
}

function filtrarListaModal(query, tipo) {
    const items = document.querySelectorAll('.item-card');
    query = query.toLowerCase();
    
    items.forEach(item => {
        const texto = item.textContent.toLowerCase();
        item.style.display = texto.includes(query) ? 'flex' : 'none';
    });
}

function filtrarOfertas(filtro, btn) {
    document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const items = document.querySelectorAll('.oferta-card');
    
    items.forEach(item => {
        if (filtro === 'todas') {
            item.style.display = 'flex';
        } else if (filtro === 'urgentes') {
            item.style.display = item.dataset.urgente === 'true' ? 'flex' : 'none';
        } else if (filtro === 'recientes') {
            const fecha = new Date(item.dataset.fecha);
            const hoy = new Date();
            const diffDias = (hoy - fecha) / (1000 * 60 * 60 * 24);
            item.style.display = diffDias <= 3 ? 'flex' : 'none';
        }
    });
}

function verPerfilTrabajador(id) {
    cerrarModalCategoria();
    mostrarToastGlobal('Abriendo perfil del trabajador...');
    // TODO: Redirigir al perfil del trabajador
}

function contactarTrabajador(id) {
    mostrarToastGlobal('Abriendo chat...');
    setTimeout(() => {
        window.location.href = 'chat.html';
    }, 500);
}

function postularOferta(id) {
    mostrarToastGlobal('¡Te has postulado exitosamente!');
}

function guardarOferta(id) {
    mostrarToastGlobal('Oferta guardada');
}

function configurarBuscador() {
    const buscador = document.getElementById('buscador-global');
    if (buscador) {
        buscador.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const productos = document.querySelectorAll('.producto');
            
            productos.forEach(p => {
                const nombre = p.querySelector('h3').textContent.toLowerCase();
                p.style.display = nombre.includes(query) ? 'block' : 'none';
            });
        });
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
    
    document.addEventListener('click', function(e) {
        if (dropdown && !dropdown.contains(e.target)) {
            dropdown.classList.remove('visible');
        }
        if (notifDropdown && !notifDropdown.contains(e.target)) {
            notifDropdown.classList.remove('visible');
        }
    });
}

function cargarNotificaciones() {
    const lista = document.getElementById('notif-list');
    if (!lista) return;
    
    lista.innerHTML = notificacionesSimuladas.map(n => `
        <div class="notif-item">
            <div class="notif-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    ${n.icono === 'check' ? '<polyline points="20 6 9 17 4 12"></polyline>' : 
                      n.icono === 'user' ? '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>' :
                      '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>'}
                </svg>
            </div>
            <div class="notif-content">
                <p>${n.mensaje}</p>
                <span>${n.tiempo}</span>
            </div>
        </div>
    `).join('');
}

function marcarTodasLeidas() {
    const badge = document.querySelector('.notification-badge');
    if (badge) badge.style.display = 'none';
    document.getElementById('notif-list').innerHTML = '<div class="notif-item"><p style="color: var(--text-secondary); text-align: center; width: 100%;">No hay notificaciones nuevas</p></div>';
}

// Cerrar modal con Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        cerrarModalCategoria();
    }
});
