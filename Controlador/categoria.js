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
        { id: 18, nombre: 'Pablo Mendoza', especialidad: 'Mantenimiento', rating: 4.5, trabajos: 134, precio: '$35.000/hora', disponible: true }
    ],
    albanileria: [
        { id: 19, nombre: 'Julio Martín', especialidad: 'Construcción general', rating: 4.7, trabajos: 156, precio: '$50.000/hora', disponible: true },
        { id: 20, nombre: 'Francisco López', especialidad: 'Remodelaciones', rating: 4.6, trabajos: 112, precio: '$55.000/hora', disponible: false }
    ],
    mudanzas: [
        { id: 21, nombre: 'Transportes Rápido', especialidad: 'Mudanzas locales', rating: 4.8, trabajos: 234, precio: '$200.000/viaje', disponible: true },
        { id: 22, nombre: 'Mudanzas Express', especialidad: 'Mudanzas nacionales', rating: 4.6, trabajos: 89, precio: '$500.000/viaje', disponible: true }
    ],
    electrodomesticos: [
        { id: 23, nombre: 'Técnico Oscar', especialidad: 'Lavadoras y secadoras', rating: 4.7, trabajos: 145, precio: '$50.000/visita', disponible: true },
        { id: 24, nombre: 'Electro Servicios', especialidad: 'Electrodomésticos', rating: 4.5, trabajos: 178, precio: '$45.000/visita', disponible: true }
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
        { id: 101, titulo: 'Fabricación de closet empotrado', descripcion: 'Necesito un closet de 3 metros de ancho para habitación principal. Material incluido.', cliente: { nombre: 'María García', rating: 4.8, trabajos: 12 }, ubicacion: 'Bogotá', precio: '$800.000 - $1.200.000', urgente: true, fecha: '2024-02-06' },
        { id: 102, titulo: 'Reparación de puerta principal', descripcion: 'La puerta de entrada está desalineada y no cierra correctamente.', cliente: { nombre: 'Ana López', rating: 4.5, trabajos: 8 }, ubicacion: 'Medellín', precio: '$80.000 - $120.000', urgente: false, fecha: '2024-02-05' },
        { id: 103, titulo: 'Mesa de comedor a medida', descripcion: 'Quiero una mesa de madera para 8 personas, estilo rústico moderno.', cliente: { nombre: 'Carlos Pérez', rating: 4.9, trabajos: 15 }, ubicacion: 'Cali', precio: '$500.000 - $700.000', urgente: false, fecha: '2024-02-04' }
    ],
    soldadura: [
        { id: 104, titulo: 'Reja de seguridad para ventanas', descripcion: 'Necesito rejas para 4 ventanas de la casa. Medidas estándar.', cliente: { nombre: 'Roberto Sánchez', rating: 4.6, trabajos: 10 }, ubicacion: 'Bogotá', precio: '$400.000 - $600.000', urgente: false, fecha: '2024-02-06' },
        { id: 105, titulo: 'Reparación puerta de garaje', descripcion: 'Soldadura urgente en bisagras de puerta metálica de garaje.', cliente: { nombre: 'Laura Torres', rating: 4.7, trabajos: 5 }, ubicacion: 'Barranquilla', precio: '$150.000 - $200.000', urgente: true, fecha: '2024-02-06' }
    ],
    mecanica: [
        { id: 106, titulo: 'Cambio de motor de arranque', descripcion: 'Chevrolet Spark 2018, el motor de arranque no funciona.', cliente: { nombre: 'Pedro Martínez', rating: 4.4, trabajos: 7 }, ubicacion: 'Bogotá', precio: '$100.000 - $150.000', urgente: true, fecha: '2024-02-06' },
        { id: 107, titulo: 'Mantenimiento general de moto', descripcion: 'Yamaha FZ 150cc, cambio de aceite, frenos y cadena.', cliente: { nombre: 'Diego Ramírez', rating: 4.8, trabajos: 20 }, ubicacion: 'Medellín', precio: '$80.000 - $120.000', urgente: false, fecha: '2024-02-05' }
    ],
    gasfiteria: [
        { id: 108, titulo: 'Fuga de agua en baño', descripcion: 'Hay una fuga debajo del lavamanos del baño principal.', cliente: { nombre: 'Carmen López', rating: 4.9, trabajos: 25 }, ubicacion: 'Bogotá', precio: '$60.000 - $100.000', urgente: true, fecha: '2024-02-06' },
        { id: 109, titulo: 'Instalación de calentador', descripcion: 'Instalar calentador de paso a gas, ya tengo el equipo.', cliente: { nombre: 'Sofía Díaz', rating: 4.5, trabajos: 12 }, ubicacion: 'Cali', precio: '$120.000 - $180.000', urgente: false, fecha: '2024-02-04' }
    ],
    cerrajeria: [
        { id: 110, titulo: 'Cambio de cerradura', descripcion: 'Cambiar cerradura de puerta principal por una de mayor seguridad.', cliente: { nombre: 'Jorge Hernández', rating: 4.6, trabajos: 8 }, ubicacion: 'Bogotá', precio: '$80.000 - $150.000', urgente: false, fecha: '2024-02-05' }
    ],
    pintura: [
        { id: 111, titulo: 'Pintar apartamento completo', descripcion: 'Apartamento de 80m², 3 habitaciones, 2 baños. Pintura blanca.', cliente: { nombre: 'Andrea Castro', rating: 4.8, trabajos: 15 }, ubicacion: 'Bogotá', precio: '$600.000 - $900.000', urgente: false, fecha: '2024-02-03' },
        { id: 112, titulo: 'Pintura decorativa habitación', descripcion: 'Mural en habitación infantil, tema de selva.', cliente: { nombre: 'Patricia Morales', rating: 4.7, trabajos: 10 }, ubicacion: 'Medellín', precio: '$300.000 - $500.000', urgente: false, fecha: '2024-02-02' }
    ],
    electricidad: [
        { id: 113, titulo: 'Instalación de lámparas LED', descripcion: 'Instalar 8 lámparas LED en apartamento.', cliente: { nombre: 'Fernando Ruiz', rating: 4.5, trabajos: 6 }, ubicacion: 'Bogotá', precio: '$80.000 - $120.000', urgente: false, fecha: '2024-02-06' },
        { id: 114, titulo: 'Revisión eléctrica urgente', descripcion: 'Se dispara el breaker constantemente.', cliente: { nombre: 'Marcela Gómez', rating: 4.9, trabajos: 22 }, ubicacion: 'Cali', precio: '$100.000 - $150.000', urgente: true, fecha: '2024-02-06' }
    ],
    limpieza: [
        { id: 115, titulo: 'Limpieza profunda de casa', descripcion: 'Casa de 150m², 4 habitaciones. Limpieza completa.', cliente: { nombre: 'Rosa Martínez', rating: 4.6, trabajos: 18 }, ubicacion: 'Bogotá', precio: '$150.000 - $200.000', urgente: false, fecha: '2024-02-05' },
        { id: 116, titulo: 'Limpieza post-construcción', descripcion: 'Apartamento nuevo, limpieza después de remodelación.', cliente: { nombre: 'Carlos Vargas', rating: 4.8, trabajos: 12 }, ubicacion: 'Medellín', precio: '$200.000 - $300.000', urgente: true, fecha: '2024-02-06' }
    ],
    jardineria: [
        { id: 117, titulo: 'Diseño de jardín pequeño', descripcion: 'Jardín de 20m², quiero plantas ornamentales.', cliente: { nombre: 'Isabel Fernández', rating: 4.7, trabajos: 9 }, ubicacion: 'Bogotá', precio: '$300.000 - $500.000', urgente: false, fecha: '2024-02-04' }
    ],
    albanileria: [
        { id: 119, titulo: 'Construcción de muro', descripcion: 'Muro divisorio de 10 metros de largo por 2 de alto.', cliente: { nombre: 'Miguel Torres', rating: 4.5, trabajos: 14 }, ubicacion: 'Bogotá', precio: '$500.000 - $800.000', urgente: false, fecha: '2024-02-05' }
    ],
    mudanzas: [
        { id: 121, titulo: 'Mudanza local apartamento', descripcion: 'Apartamento 2 habitaciones, mismo edificio.', cliente: { nombre: 'Paula Sánchez', rating: 4.8, trabajos: 20 }, ubicacion: 'Bogotá', precio: '$150.000 - $200.000', urgente: false, fecha: '2024-02-06' }
    ],
    electrodomesticos: [
        { id: 123, titulo: 'Reparación lavadora Samsung', descripcion: 'Lavadora no centrifuga, modelo de 15kg.', cliente: { nombre: 'Lucia García', rating: 4.6, trabajos: 11 }, ubicacion: 'Bogotá', precio: '$80.000 - $120.000', urgente: true, fecha: '2024-02-06' }
    ],
    refrigeracion: [
        { id: 125, titulo: 'Mantenimiento aire acondicionado', descripcion: '3 unidades split de 12000 BTU.', cliente: { nombre: 'Empresa ABC', rating: 4.9, trabajos: 30 }, ubicacion: 'Bogotá', precio: '$200.000 - $300.000', urgente: false, fecha: '2024-02-05' }
    ],
    fumigacion: [
        { id: 127, titulo: 'Fumigación contra cucarachas', descripcion: 'Apartamento 80m², problema en cocina.', cliente: { nombre: 'Alejandro Vargas', rating: 4.7, trabajos: 8 }, ubicacion: 'Bogotá', precio: '$80.000 - $120.000', urgente: true, fecha: '2024-02-06' }
    ],
    vidrieria: [
        { id: 129, titulo: 'Reemplazo vidrio ventana', descripcion: 'Vidrio roto de ventana 1.5m x 1m.', cliente: { nombre: 'Felipe Castro', rating: 4.5, trabajos: 6 }, ubicacion: 'Bogotá', precio: '$100.000 - $150.000', urgente: true, fecha: '2024-02-06' }
    ],
    tapiceria: [
        { id: 131, titulo: 'Tapizado de sala completa', descripcion: 'Juego de sala 3-2-1, cambio de tela.', cliente: { nombre: 'Carolina Méndez', rating: 4.8, trabajos: 15 }, ubicacion: 'Bogotá', precio: '$600.000 - $900.000', urgente: false, fecha: '2024-02-05' }
    ]
};

const iconosCategoria = {
    carpinteria: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>',
    soldadura: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
    mecanica: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>',
    gasfiteria: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>',
    cerrajeria: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>',
    pintura: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path></svg>',
    electricidad: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
    limpieza: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line></svg>',
    jardineria: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
    albanileria: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line></svg>',
    mudanzas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>',
    electrodomesticos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>',
    refrigeracion: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
    fumigacion: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg>',
    vidrieria: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="12" x2="21" y2="12"></line></svg>',
    tapiceria: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"></path><path d="M9 22V12h6v10"></path><path d="M2 10.6L12 2l10 8.6"></path></svg>'
};

const nombresCategoria = {
    carpinteria: 'Carpintería',
    soldadura: 'Soldadura',
    mecanica: 'Mecánica',
    gasfiteria: 'Gasfitería',
    cerrajeria: 'Cerrajería',
    pintura: 'Pintura',
    electricidad: 'Electricidad',
    limpieza: 'Limpieza',
    jardineria: 'Jardinería',
    albanileria: 'Albañilería',
    mudanzas: 'Mudanzas',
    electrodomesticos: 'Electrodomésticos',
    refrigeracion: 'Refrigeración',
    fumigacion: 'Fumigación',
    vidrieria: 'Vidriería',
    tapiceria: 'Tapicería'
};

let categoriaActual = '';
let tipoUsuario = 'cliente';
let datosOriginales = [];

document.addEventListener('DOMContentLoaded', function() {
    verificarSesion();
    obtenerCategoria();
    cargarContenido();
    configurarDropdowns();
    configurarFiltros();
});

function verificarSesion() {
    const usuario = localStorage.getItem('usuario_logueado');
    if (!usuario) {
        window.location.href = 'login.html';
        return;
    }
    
    const datos = JSON.parse(usuario);
    tipoUsuario = datos.tipo || 'cliente';
    
    const nombreUsuario = document.getElementById('nombre-usuario');
    if (nombreUsuario) {
        nombreUsuario.textContent = datos.nombre || 'Usuario';
    }
}

function obtenerCategoria() {
    const params = new URLSearchParams(window.location.search);
    categoriaActual = params.get('cat') || 'carpinteria';
    
    // Actualizar header
    const titulo = document.getElementById('categoria-titulo');
    const descripcion = document.getElementById('categoria-descripcion');
    const icono = document.getElementById('categoria-icon');
    
    if (titulo) titulo.textContent = nombresCategoria[categoriaActual] || categoriaActual;
    if (icono) icono.innerHTML = iconosCategoria[categoriaActual] || '';
    
    if (descripcion) {
        if (tipoUsuario === 'trabajador') {
            descripcion.textContent = 'Encuentra ofertas de empleo en esta categoría';
        } else {
            descripcion.textContent = 'Encuentra profesionales disponibles en esta categoría';
        }
    }
    
    // Actualizar placeholder del buscador
    const buscar = document.getElementById('buscar');
    if (buscar) {
        buscar.placeholder = tipoUsuario === 'trabajador' ? 'Buscar ofertas...' : 'Buscar trabajadores...';
    }
}

function cargarContenido() {
    if (tipoUsuario === 'trabajador') {
        cargarAnuncios();
    } else {
        cargarTrabajadores();
    }
}

function cargarTrabajadores() {
    const grid = document.getElementById('resultados-grid');
    const count = document.getElementById('resultados-count');
    const empty = document.getElementById('empty-state');
    
    const trabajadores = trabajadoresPorCategoria[categoriaActual] || [];
    datosOriginales = [...trabajadores];
    
    const soloDisponibles = document.getElementById('check-disponibles')?.checked;
    let filtrados = soloDisponibles ? trabajadores.filter(t => t.disponible) : trabajadores;
    
    if (filtrados.length === 0) {
        grid.style.display = 'none';
        empty.style.display = 'flex';
        document.getElementById('empty-message').textContent = 'No hay trabajadores disponibles en esta categoría.';
        count.textContent = 'No se encontraron resultados';
        return;
    }
    
    grid.style.display = 'grid';
    empty.style.display = 'none';
    count.textContent = `${filtrados.length} trabajador${filtrados.length !== 1 ? 'es' : ''} encontrado${filtrados.length !== 1 ? 's' : ''}`;
    
    grid.innerHTML = filtrados.map(t => `
        <div class="trabajador-card" onclick="verTrabajador(${t.id})">
            <div class="trabajador-header">
                <div class="trabajador-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
                <div class="trabajador-info">
                    <div class="trabajador-nombre">${t.nombre}</div>
                    <div class="trabajador-especialidad">${t.especialidad}</div>
                </div>
                <span class="trabajador-badge ${t.disponible ? 'disponible' : 'ocupado'}">
                    ${t.disponible ? 'Disponible' : 'Ocupado'}
                </span>
            </div>
            <div class="trabajador-stats">
                <span class="stat-item rating">
                    <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    ${t.rating}
                </span>
                <span class="stat-item precio">${t.precio}</span>
            </div>
            <div class="trabajador-footer">
                <span class="trabajador-trabajos">${t.trabajos} trabajos completados</span>
                <button class="btn-contactar" onclick="event.stopPropagation(); contactarTrabajador(${t.id})">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    Contactar
                </button>
            </div>
        </div>
    `).join('');
}

function cargarAnuncios() {
    const grid = document.getElementById('resultados-grid');
    const count = document.getElementById('resultados-count');
    const empty = document.getElementById('empty-state');
    
    const anuncios = ofertasPorCategoria[categoriaActual] || [];
    datosOriginales = [...anuncios];
    
    if (anuncios.length === 0) {
        grid.style.display = 'none';
        empty.style.display = 'flex';
        document.getElementById('empty-message').textContent = 'No hay ofertas de empleo en esta categoría.';
        count.textContent = 'No se encontraron resultados';
        return;
    }
    
    grid.style.display = 'grid';
    empty.style.display = 'none';
    count.textContent = `${anuncios.length} oferta${anuncios.length !== 1 ? 's' : ''} encontrada${anuncios.length !== 1 ? 's' : ''}`;
    
    grid.innerHTML = anuncios.map(a => `
        <div class="anuncio-card" onclick="verAnuncio(${a.id})">
            <div class="anuncio-badges">
                ${a.urgente ? '<span class="anuncio-urgente">🔥 Urgente</span>' : ''}
                <span class="anuncio-ubicacion">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    ${a.ubicacion}
                </span>
            </div>
            <h3 class="anuncio-titulo">${a.titulo}</h3>
            <p class="anuncio-descripcion">${a.descripcion}</p>
            <div class="anuncio-meta">
                <span class="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    ${formatearFecha(a.fecha)}
                </span>
            </div>
            <div class="anuncio-footer">
                <span class="anuncio-precio">${a.precio}</span>
                <div class="anuncio-cliente">
                    <div class="cliente-avatar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                    <div class="cliente-info">
                        <div class="cliente-nombre">${a.cliente.nombre}</div>
                        <div class="cliente-rating">
                            <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                            ${a.cliente.rating}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function formatearFecha(fecha) {
    const opciones = { day: 'numeric', month: 'short' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
}

function configurarFiltros() {
    const buscar = document.getElementById('buscar');
    const orden = document.getElementById('filtro-orden');
    const disponibles = document.getElementById('check-disponibles');
    
    if (buscar) {
        buscar.addEventListener('input', debounce(aplicarFiltros, 300));
    }
    
    if (orden) orden.addEventListener('change', aplicarFiltros);
    if (disponibles) disponibles.addEventListener('change', cargarContenido);
}

function aplicarFiltros() {
    const busqueda = document.getElementById('buscar')?.value.toLowerCase() || '';
    const grid = document.getElementById('resultados-grid');
    const count = document.getElementById('resultados-count');
    
    let resultados = [...datosOriginales];
    
    if (busqueda) {
        if (tipoUsuario === 'trabajador') {
            resultados = resultados.filter(a => 
                a.titulo.toLowerCase().includes(busqueda) || 
                a.descripcion.toLowerCase().includes(busqueda)
            );
        } else {
            resultados = resultados.filter(t => 
                t.nombre.toLowerCase().includes(busqueda) || 
                t.especialidad.toLowerCase().includes(busqueda)
            );
        }
    }
    
    if (resultados.length === 0) {
        grid.innerHTML = '';
        count.textContent = 'No se encontraron resultados';
        return;
    }
    
    count.textContent = `${resultados.length} resultado${resultados.length !== 1 ? 's' : ''}`;
    
    // Re-render con resultados filtrados
    if (tipoUsuario === 'trabajador') {
        grid.innerHTML = resultados.map(a => crearAnuncioCard(a)).join('');
    } else {
        grid.innerHTML = resultados.map(t => crearTrabajadorCard(t)).join('');
    }
}

function crearTrabajadorCard(t) {
    return `
        <div class="trabajador-card" onclick="verTrabajador(${t.id})">
            <div class="trabajador-header">
                <div class="trabajador-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
                <div class="trabajador-info">
                    <div class="trabajador-nombre">${t.nombre}</div>
                    <div class="trabajador-especialidad">${t.especialidad}</div>
                </div>
                <span class="trabajador-badge ${t.disponible ? 'disponible' : 'ocupado'}">
                    ${t.disponible ? 'Disponible' : 'Ocupado'}
                </span>
            </div>
            <div class="trabajador-stats">
                <span class="stat-item rating">
                    <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    ${t.rating}
                </span>
                <span class="stat-item precio">${t.precio}</span>
            </div>
            <div class="trabajador-footer">
                <span class="trabajador-trabajos">${t.trabajos} trabajos completados</span>
                <button class="btn-contactar" onclick="event.stopPropagation(); contactarTrabajador(${t.id})">Contactar</button>
            </div>
        </div>
    `;
}

function crearAnuncioCard(a) {
    return `
        <div class="anuncio-card" onclick="verAnuncio(${a.id})">
            <div class="anuncio-badges">
                ${a.urgente ? '<span class="anuncio-urgente">🔥 Urgente</span>' : ''}
                <span class="anuncio-ubicacion">${a.ubicacion}</span>
            </div>
            <h3 class="anuncio-titulo">${a.titulo}</h3>
            <p class="anuncio-descripcion">${a.descripcion}</p>
            <div class="anuncio-footer">
                <span class="anuncio-precio">${a.precio}</span>
            </div>
        </div>
    `;
}

function verTrabajador(id) {
    const t = datosOriginales.find(x => x.id === id);
    if (!t) return;
    mostrarToastGlobal(`Abriendo perfil de ${t.nombre}`);
}

function verAnuncio(id) {
    const a = datosOriginales.find(x => x.id === id);
    if (!a) return;
    
    const modal = document.getElementById('modal-detalle');
    const content = document.getElementById('modal-content');
    
    content.innerHTML = `
        <div class="modal-detalle-header">
            <button class="modal-cerrar" onclick="cerrarModalDetalle()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div class="modal-badges">
                ${a.urgente ? '<span class="badge-urgente">🔥 Urgente</span>' : ''}
                <span class="badge-categoria">${nombresCategoria[categoriaActual] || categoriaActual}</span>
            </div>
        </div>
        
        <div class="modal-detalle-body">
            <h2 class="modal-titulo">${a.titulo}</h2>
            
            <div class="modal-info-grid">
                <div class="info-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <div>
                        <span class="info-label">Ubicación</span>
                        <span class="info-value">${a.ubicacion}</span>
                    </div>
                </div>
                <div class="info-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <div>
                        <span class="info-label">Fecha de publicación</span>
                        <span class="info-value">${formatearFecha(a.fecha)}</span>
                    </div>
                </div>
            </div>
            
            <div class="modal-precio-box">
                <span class="precio-label">Presupuesto estimado</span>
                <span class="precio-valor">${a.precio}</span>
            </div>
            
            <div class="modal-descripcion">
                <h3>Descripción del trabajo</h3>
                <p>${a.descripcion}</p>
            </div>
            
            <div class="modal-cliente-card">
                <div class="cliente-avatar-lg">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
                <div class="cliente-detalle">
                    <span class="cliente-nombre-lg">${a.cliente.nombre}</span>
                    <div class="cliente-stats">
                        <span class="cliente-rating-lg">
                            <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                            ${a.cliente.rating}
                        </span>
                        <span class="cliente-trabajos">${a.cliente.trabajos} trabajos contratados</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="modal-detalle-footer">
            <button class="btn-aplicar" onclick="aplicarEmpleo(${a.id})">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                Aplicar al empleo
            </button>
            <button class="btn-guardar" onclick="guardarEmpleo(${a.id})">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
                Guardar empleo
            </button>
        </div>
    `;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function cerrarModalDetalle() {
    const modal = document.getElementById('modal-detalle');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function aplicarEmpleo(id) {
    const a = datosOriginales.find(x => x.id === id);
    if (!a) return;
    cerrarModalDetalle();
    mostrarToastGlobal('¡Te has postulado exitosamente a esta oferta!');
}

function guardarEmpleo(id) {
    mostrarToastGlobal('Empleo guardado en tus favoritos');
}

// Cerrar modal al hacer clic fuera
document.addEventListener('click', function(e) {
    const modal = document.getElementById('modal-detalle');
    if (e.target === modal) {
        cerrarModalDetalle();
    }
});

function contactarTrabajador(id) {
    const t = datosOriginales.find(x => x.id === id);
    if (!t) return;
    window.location.href = `chat.html?contacto=${id}`;
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function cerrarSesion() {
    localStorage.removeItem('usuario_logueado');
    localStorage.removeItem('tipo_usuario');
    window.location.href = 'login.html';
}

function configurarDropdowns() {
    const perfilBtn = document.getElementById('perfil-btn');
    const dropdown = document.getElementById('dropdown');
    
    if (perfilBtn && dropdown) {
        perfilBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.classList.toggle('visible');
        });
    }
    
    document.addEventListener('click', function() {
        if (dropdown) dropdown.classList.remove('visible');
    });
}
