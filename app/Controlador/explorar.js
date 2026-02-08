// Datos simulados de anuncios publicados por clientes
const anunciosSimulados = [
    {
        id: 1,
        titulo: 'Reparación urgente de tubería en baño',
        descripcion: 'Tengo una fuga de agua en el baño principal, necesito un plomero con experiencia para arreglar la tubería lo antes posible.',
        categoria: 'plomeria',
        categoriaIcono: '🔧',
        ubicacion: 'Bogotá',
        precio: '$80.000 - $120.000',
        urgente: true,
        fecha: '2024-02-06',
        cliente: { nombre: 'María García', rating: 4.8, trabajos: 12 }
    },
    {
        id: 2,
        titulo: 'Instalación de lámparas LED en apartamento',
        descripcion: 'Necesito instalar 6 lámparas LED en mi apartamento, ya tengo los materiales. Preferiblemente en horario de tarde.',
        categoria: 'electricidad',
        categoriaIcono: '⚡',
        ubicacion: 'Medellín',
        precio: '$50.000 - $80.000',
        urgente: false,
        fecha: '2024-02-05',
        cliente: { nombre: 'Carlos Rodríguez', rating: 4.5, trabajos: 8 }
    },
    {
        id: 3,
        titulo: 'Limpieza profunda de casa de 3 habitaciones',
        descripcion: 'Requiero limpieza profunda incluyendo cocina, baños y todas las habitaciones. La casa tiene 120m².',
        categoria: 'limpieza',
        categoriaIcono: '🧹',
        ubicacion: 'Cali',
        precio: '$100.000 - $150.000',
        urgente: false,
        fecha: '2024-02-04',
        cliente: { nombre: 'Ana López', rating: 5.0, trabajos: 25 }
    },
    {
        id: 4,
        titulo: 'Pintura de habitación con diseño especial',
        descripcion: 'Quiero pintar una habitación con un degradado de colores y un mural pequeño. La habitación es de 4x4 metros.',
        categoria: 'pintura',
        categoriaIcono: '🎨',
        ubicacion: 'Bogotá',
        precio: '$200.000 - $350.000',
        urgente: false,
        fecha: '2024-02-03',
        cliente: { nombre: 'Pedro Martínez', rating: 4.2, trabajos: 5 }
    },
    {
        id: 5,
        titulo: 'Mantenimiento de jardín mensual',
        descripcion: 'Busco jardinero para mantenimiento mensual de jardín de 50m². Incluye poda, riego y abono.',
        categoria: 'jardineria',
        categoriaIcono: '🌱',
        ubicacion: 'Barranquilla',
        precio: '$60.000 / mes',
        urgente: false,
        fecha: '2024-02-02',
        cliente: { nombre: 'Laura Sánchez', rating: 4.9, trabajos: 15 }
    },
    {
        id: 6,
        titulo: 'Reparación de lavadora Samsung',
        descripcion: 'La lavadora no centrifuga bien y hace ruidos extraños. Modelo Samsung de 15kg, tiene 3 años.',
        categoria: 'electrodomesticos',
        categoriaIcono: '📺',
        ubicacion: 'Medellín',
        precio: '$70.000 - $100.000',
        urgente: true,
        fecha: '2024-02-06',
        cliente: { nombre: 'Jorge Hernández', rating: 4.6, trabajos: 10 }
    },
    {
        id: 7,
        titulo: 'Arreglo de puerta de madera',
        descripcion: 'La puerta principal de mi casa está desalineada y no cierra bien. Necesito un carpintero que la ajuste.',
        categoria: 'carpinteria',
        categoriaIcono: '🪚',
        ubicacion: 'Cartagena',
        precio: '$40.000 - $70.000',
        urgente: false,
        fecha: '2024-02-01',
        cliente: { nombre: 'Sofía Díaz', rating: 4.7, trabajos: 7 }
    },
    {
        id: 8,
        titulo: 'Instalación de aire acondicionado',
        descripcion: 'Necesito instalar un aire acondicionado split de 12000 BTU. Ya tengo el equipo comprado.',
        categoria: 'electricidad',
        categoriaIcono: '⚡',
        ubicacion: 'Bogotá',
        precio: '$150.000 - $200.000',
        urgente: true,
        fecha: '2024-02-06',
        cliente: { nombre: 'Roberto Torres', rating: 4.4, trabajos: 3 }
    }
];

let anunciosFiltrados = [...anunciosSimulados];

document.addEventListener('DOMContentLoaded', function() {
    verificarSesion();
    cargarAnuncios();
    configurarDropdowns();
    configurarFiltros();
    configurarVista();
});

function verificarSesion() {
    const usuario = localStorage.getItem('usuario_logueado');
    const tipoUsuario = localStorage.getItem('tipo_usuario');
    
    if (!usuario) {
        window.location.href = 'login.html';
        return;
    }
    
    // Si es cliente, redirigir a catálogo
    if (tipoUsuario === 'cliente') {
        window.location.href = 'catalogo-auth.html';
        return;
    }
    
    const datos = JSON.parse(usuario);
    const nombreUsuario = document.getElementById('nombre-usuario');
    if (nombreUsuario) {
        nombreUsuario.textContent = datos.nombre || 'Usuario';
    }
}

function cargarAnuncios() {
    const grid = document.getElementById('anuncios-grid');
    const emptyState = document.getElementById('empty-state');
    const totalAnuncios = document.getElementById('total-anuncios');
    
    if (!grid) return;
    
    if (anunciosFiltrados.length === 0) {
        grid.style.display = 'none';
        emptyState.style.display = 'flex';
        totalAnuncios.textContent = 'No se encontraron anuncios';
        return;
    }
    
    grid.style.display = 'grid';
    emptyState.style.display = 'none';
    totalAnuncios.textContent = `${anunciosFiltrados.length} anuncio${anunciosFiltrados.length !== 1 ? 's' : ''} encontrado${anunciosFiltrados.length !== 1 ? 's' : ''}`;
    
    grid.innerHTML = anunciosFiltrados.map(anuncio => `
        <div class="anuncio-card" onclick="verDetalle(${anuncio.id})">
            <div class="anuncio-header">
                <span class="anuncio-categoria">
                    ${anuncio.categoriaIcono} ${formatearCategoria(anuncio.categoria)}
                </span>
                ${anuncio.urgente ? '<span class="anuncio-urgente">🔥 Urgente</span>' : ''}
            </div>
            
            <h3 class="anuncio-titulo">${anuncio.titulo}</h3>
            <p class="anuncio-descripcion">${anuncio.descripcion}</p>
            
            <div class="anuncio-meta">
                <span class="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    ${anuncio.ubicacion}
                </span>
                <span class="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    ${formatearFecha(anuncio.fecha)}
                </span>
            </div>
            
            <div class="anuncio-footer">
                <span class="anuncio-precio">${anuncio.precio}</span>
                <div class="anuncio-cliente">
                    <div class="cliente-avatar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                    <div class="cliente-info">
                        <div class="cliente-nombre">${anuncio.cliente.nombre}</div>
                        <div class="cliente-rating">
                            <svg viewBox="0 0 24 24">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            ${anuncio.cliente.rating} (${anuncio.cliente.trabajos})
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function formatearCategoria(cat) {
    const categorias = {
        plomeria: 'Plomería',
        electricidad: 'Electricidad',
        limpieza: 'Limpieza',
        pintura: 'Pintura',
        jardineria: 'Jardinería',
        electrodomesticos: 'Electrodomésticos',
        carpinteria: 'Carpintería',
        otros: 'Otros'
    };
    return categorias[cat] || cat;
}

function formatearFecha(fecha) {
    const opciones = { day: 'numeric', month: 'short' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
}

function configurarFiltros() {
    // Buscar al escribir
    const buscar = document.getElementById('buscar-anuncio');
    if (buscar) {
        buscar.addEventListener('input', debounce(aplicarFiltros, 300));
    }
    
    // Filtros de select
    ['filtro-categoria', 'filtro-ubicacion', 'ordenar-por'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', aplicarFiltros);
    });
    
    // Checkboxes
    ['urgente', 'flexible'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', aplicarFiltros);
    });
}

function aplicarFiltros() {
    let resultados = [...anunciosSimulados];
    
    // Búsqueda de texto
    const busqueda = document.getElementById('buscar-anuncio')?.value.toLowerCase() || '';
    if (busqueda) {
        resultados = resultados.filter(a => 
            a.titulo.toLowerCase().includes(busqueda) || 
            a.descripcion.toLowerCase().includes(busqueda)
        );
    }
    
    // Categoría
    const categoria = document.getElementById('filtro-categoria')?.value;
    if (categoria) {
        resultados = resultados.filter(a => a.categoria === categoria);
    }
    
    // Ubicación
    const ubicacion = document.getElementById('filtro-ubicacion')?.value;
    if (ubicacion) {
        resultados = resultados.filter(a => a.ubicacion.toLowerCase() === ubicacion.toLowerCase());
    }
    
    // Urgente
    const urgente = document.getElementById('urgente')?.checked;
    if (urgente) {
        resultados = resultados.filter(a => a.urgente);
    }
    
    // Ordenar
    const orden = document.getElementById('ordenar-por')?.value || 'reciente';
    switch (orden) {
        case 'reciente':
            resultados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
            break;
        case 'precio-asc':
            resultados.sort((a, b) => extraerPrecio(a.precio) - extraerPrecio(b.precio));
            break;
        case 'precio-desc':
            resultados.sort((a, b) => extraerPrecio(b.precio) - extraerPrecio(a.precio));
            break;
    }
    
    anunciosFiltrados = resultados;
    cargarAnuncios();
}

function extraerPrecio(precioStr) {
    const match = precioStr.match(/\$?([\d.]+)/);
    return match ? parseFloat(match[1].replace('.', '')) : 0;
}

function limpiarFiltros() {
    document.getElementById('buscar-anuncio').value = '';
    document.getElementById('filtro-categoria').value = '';
    document.getElementById('filtro-ubicacion').value = '';
    document.getElementById('precio-min').value = '';
    document.getElementById('precio-max').value = '';
    document.getElementById('urgente').checked = false;
    document.getElementById('flexible').checked = false;
    document.getElementById('ordenar-por').value = 'reciente';
    
    anunciosFiltrados = [...anunciosSimulados];
    cargarAnuncios();
    mostrarToastGlobal('Filtros limpiados');
}

function configurarVista() {
    const btns = document.querySelectorAll('.view-btn');
    const grid = document.getElementById('anuncios-grid');
    
    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            btns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.dataset.view;
            if (view === 'list') {
                grid.classList.add('list-view');
            } else {
                grid.classList.remove('list-view');
            }
        });
    });
}

function verDetalle(id) {
    const anuncio = anunciosSimulados.find(a => a.id === id);
    if (!anuncio) return;
    
    const modal = document.getElementById('modal-detalle');
    const body = document.getElementById('modal-body');
    
    body.innerHTML = `
        <div style="padding: 24px;">
            <div style="display: flex; gap: 12px; margin-bottom: 16px;">
                <span class="anuncio-categoria">${anuncio.categoriaIcono} ${formatearCategoria(anuncio.categoria)}</span>
                ${anuncio.urgente ? '<span class="anuncio-urgente">🔥 Urgente</span>' : ''}
            </div>
            
            <h2 style="font-size: 22px; margin-bottom: 16px;">${anuncio.titulo}</h2>
            <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px;">${anuncio.descripcion}</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
                <div style="background: var(--bg-dark); padding: 16px; border-radius: 12px;">
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Ubicación</div>
                    <div style="font-weight: 600;">${anuncio.ubicacion}</div>
                </div>
                <div style="background: var(--bg-dark); padding: 16px; border-radius: 12px;">
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Fecha</div>
                    <div style="font-weight: 600;">${formatearFecha(anuncio.fecha)}</div>
                </div>
            </div>
            
            <div style="background: var(--bg-dark); padding: 20px; border-radius: 12px; margin-bottom: 24px;">
                <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 8px;">Presupuesto estimado</div>
                <div style="font-size: 28px; font-weight: 700; color: var(--secondary);">${anuncio.precio}</div>
            </div>
            
            <div style="display: flex; align-items: center; gap: 16px; padding: 16px; background: var(--bg-dark); border-radius: 12px; margin-bottom: 24px;">
                <div class="cliente-avatar" style="width: 50px; height: 50px;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
                <div>
                    <div style="font-weight: 600; font-size: 16px;">${anuncio.cliente.nombre}</div>
                    <div class="cliente-rating" style="color: var(--text-secondary);">
                        <svg viewBox="0 0 24 24" style="width: 14px; height: 14px; fill: var(--accent); stroke: var(--accent);">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        ${anuncio.cliente.rating} · ${anuncio.cliente.trabajos} trabajos contratados
                    </div>
                </div>
            </div>
            
            <div style="display: flex; gap: 12px;">
                <button onclick="postularAnuncio(${anuncio.id})" class="btn-postular" style="flex: 1; padding: 16px;">
                    Postularme al trabajo
                </button>
                <button onclick="guardarAnuncio(${anuncio.id})" style="padding: 16px; background: var(--bg-hover); border: 1px solid var(--border); border-radius: 12px; cursor: pointer;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px; stroke: var(--text-secondary);">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
}

function cerrarModal() {
    document.getElementById('modal-detalle').style.display = 'none';
}

function postularAnuncio(id) {
    cerrarModal();
    mostrarToastGlobal('¡Te has postulado exitosamente!');
}

function guardarAnuncio(id) {
    mostrarToastGlobal('Anuncio guardado');
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
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

function marcarTodasLeidas() {
    mostrarToastGlobal('Notificaciones marcadas como leídas');
}

// Cerrar modal al hacer click fuera
document.addEventListener('click', function(e) {
    const modal = document.getElementById('modal-detalle');
    if (e.target === modal) {
        cerrarModal();
    }
});
