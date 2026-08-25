import { auth, db } from '../Modelo/firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { collection, query, onSnapshot, addDoc, serverTimestamp, orderBy, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

letcurrentUser = null;
let anunciosReales = [];
let anunciosFiltrados = [];

// Mapa de iconos SVG por categoría
const iconosCategoria = {
    plomeria: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
    electricidad: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
    limpieza: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
    pintura: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2c2.1 0 4.1.8 5.6 2.3 3.1 3.1 3.1 8.2 0 11.3l-5.6 5.6c-.8.8-2 .8-2.8 0l-5.6-5.6c-3.1-3.1-3.1-8.2 0-11.3C5.1 2.8 7.1 2 9.2 2H12z"></path><circle cx="12" cy="14" r="2"></circle></svg>`,
    jardineria: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c4-4 8-9 8-14a8 8 0 1 0-16 0c0 5 4 10 8 14z"></path></svg>`,
    electrodomesticos: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>`,
    carpinteria: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="8" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="8" x2="6" y2="16"></line><line x1="10" y1="8" x2="10" y2="16"></line><line x1="14" y1="8" x2="14" y2="16"></line><line x1="18" y1="8" x2="18" y2="16"></line></svg>`,
    otros: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="21 12 16.5 14.6 16.5 19.79"></polyline><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`
};

document.addEventListener('DOMContentLoaded', function() {
    onAuthStateChanged(auth, (user) => {
        currentUser = user;
    });

    escucharAnuncios();
    configurarDropdowns();
    configurarFiltros();
    configurarVista();
});

function escucharAnuncios() {
    const anunciosRef = collection(db, 'anuncios');
    const q = query(anunciosRef, orderBy('fecha', 'desc'));

    onSnapshot(q, async (snapshot) => {
        const nuevosAnuncios = [];
        for (const docSnap of snapshot.docs) {
            const data = docSnap.data();
            
            // Si quieres fetch de datos de usuario:
            let autorInfo = { nombre: 'Usuario Anónimo', rating: 5.0, trabajos: 1 };
            if (data.autorId) {
                const userSnap = await getDoc(doc(db, 'users', data.autorId));
                if (userSnap.exists()) {
                    autorInfo = { 
                        nombre: userSnap.data().nombre,
                        rating: 5.0, 
                        trabajos: 1
                    };
                }
            }
            
            nuevosAnuncios.push({
                id: docSnap.id,
                ...data,
                cliente: autorInfo,
                fechaFormat: data.fecha ? data.fecha.toDate() : new Date()
            });
        }
        
        anunciosReales = nuevosAnuncios;
        
        // Si no hay ninguno, crear uno de prueba
        if (anunciosReales.length === 0 && currentUser) {
            crearAnuncioDePrueba();
        } else {
            aplicarFiltros();
        }
    });
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
    
    grid.innerHTML = anunciosFiltrados.map(anuncio => {
        const icono = iconosCategoria[anuncio.categoria] || iconosCategoria['otros'];
        const precioText = typeof anuncio.precio === 'number' ? `$${anuncio.precio.toLocaleString()}` : anuncio.precio;

        return `
        <div class="anuncio-card" onclick="window.verDetalle('${anuncio.id}')">
            <div class="anuncio-header">
                <span class="anuncio-categoria" style="display: flex; align-items: center; gap: 8px;">
                    <div style="width: 18px; height: 18px;">${icono}</div> ${formatearCategoria(anuncio.categoria)}
                </span>
                ${anuncio.urgente ? `
                <span class="anuncio-urgente" style="display: flex; align-items: center; gap: 4px;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px; color: #ef4444;">
                        <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"></path>
                    </svg>
                    Urgente
                </span>` : ''}
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
                    ${formatearFecha(anuncio.fechaFormat)}
                </span>
            </div>
            
            <div class="anuncio-footer">
                <span class="anuncio-precio">${precioText}</span>
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
        `;
    }).join('');
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
    return fecha.toLocaleDateString('es-ES', opciones);
}

function configurarFiltros() {
    // Buscar al escribir
    const buscar = document.getElementById('buscar-anuncio');
    if (buscar) {
        buscar.addEventListener('input', () => {
            clearTimeout(window.searchTimeout);
            window.searchTimeout = setTimeout(aplicarFiltros, 300);
        });
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
    let resultados = [...anunciosReales];
    
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
            resultados.sort((a, b) => b.fechaFormat - a.fechaFormat);
            break;
        case 'precio-asc':
            resultados.sort((a, b) => parsePrecio(a.precio) - parsePrecio(b.precio));
            break;
        case 'precio-desc':
            resultados.sort((a, b) => parsePrecio(b.precio) - parsePrecio(a.precio));
            break;
    }
    
    anunciosFiltrados = resultados;
    cargarAnuncios();
}

function parsePrecio(precio) {
    if (typeof precio === 'number') return precio;
    const numeros = precio.match(/\d+/g);
    if (!numeros) return 0;
    return parseInt(numeros[0]) * 1000;
}

window.limpiarFiltros = function() {
    const inputs = ['buscar-anuncio'];
    const selects = ['filtro-categoria', 'filtro-ubicacion'];
    const checks = ['urgente', 'flexible'];
    
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    
    selects.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    
    checks.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.checked = false;
    });
    
    document.getElementById('ordenar-por').value = 'reciente';
    aplicarFiltros();
}

function configurarVista() {
    const btns = document.querySelectorAll('.view-btn');
    const grid = document.getElementById('anuncios-grid');
    
    if (!grid) return;
    
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

function configurarDropdowns() {
    // Dropdowns ya manejados globalmente, se deja vacío para compatibilidad o si hay extras
}

// Modal Functions
window.abrirModalPublicar = function() {
    if (!currentUser) {
        alert("Debes iniciar sesión para publicar anuncios.");
        return;
    }
    const modal = document.getElementById('modal-publicar');
    if (modal) modal.style.display = 'flex';
}

window.cerrarModalPublicar = function() {
    const modal = document.getElementById('modal-publicar');
    if (modal) modal.style.display = 'none';
}

window.publicarNuevoAnuncio = async function(e) {
    e.preventDefault();
    if (!currentUser) return;
    
    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Publicando...';
    
    const titulo = document.getElementById('pub-titulo').value;
    const categoria = document.getElementById('pub-categoria').value;
    const ubicacion = document.getElementById('pub-ubicacion').value;
    const precio = document.getElementById('pub-precio').value;
    const descripcion = document.getElementById('pub-descripcion').value;
    const urgente = document.getElementById('pub-urgente').checked;
    
    try {
        await addDoc(collection(db, 'anuncios'), {
            titulo,
            categoria,
            ubicacion,
            precio: parseInt(precio),
            descripcion,
            urgente,
            autorId: currentUser.uid,
            fecha: serverTimestamp()
        });
        
        cerrarModalPublicar();
        e.target.reset();
        alert('Anuncio publicado con éxito');
    } catch (error) {
        console.error("Error al publicar:", error);
        alert('Error al publicar el anuncio');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Publicar Trabajo';
    }
}

window.verDetalle = function(id) {
    const anuncio = anunciosFiltrados.find(a => a.id === id);
    if (!anuncio) return;
    
    const modal = document.getElementById('modal-detalle');
    const body = document.getElementById('modal-body');
    const icono = iconosCategoria[anuncio.categoria] || iconosCategoria['otros'];
    
    if (modal && body) {
        const precioText = typeof anuncio.precio === 'number' ? `$${anuncio.precio.toLocaleString()}` : anuncio.precio;
        body.innerHTML = `
            <div class="anuncio-detalle">
                <div class="detalle-header" style="margin-bottom: 20px;">
                    <span class="anuncio-categoria" style="display: inline-flex; align-items: center; gap: 8px; margin-bottom: 12px; background: rgba(99, 102, 241, 0.1); color: var(--primary); padding: 6px 12px; border-radius: 20px;">
                        <div style="width: 18px; height: 18px;">${icono}</div> ${formatearCategoria(anuncio.categoria)}
                    </span>
                    <h2 style="font-size: 24px; color: var(--text-primary); margin-bottom: 10px;">${anuncio.titulo}</h2>
                    <div style="display: flex; gap: 16px; color: var(--text-secondary); font-size: 14px;">
                        <span style="display: flex; align-items: center; gap: 4px;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            ${anuncio.ubicacion}
                        </span>
                        <span style="display: flex; align-items: center; gap: 4px;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            ${formatearFecha(anuncio.fechaFormat)}
                        </span>
                    </div>
                </div>
                
                <div class="detalle-descripcion" style="margin-bottom: 24px; line-height: 1.6; color: var(--text-secondary);">
                    <h3>Descripción</h3>
                    <p style="margin-top: 8px;">${anuncio.descripcion}</p>
                </div>
                
                <div class="detalle-footer" style="display: flex; justify-content: space-between; align-items: center; padding-top: 20px; border-top: 1px solid var(--border);">
                    <div>
                        <p style="font-size: 13px; color: var(--text-secondary);">Presupuesto</p>
                        <p style="font-size: 20px; font-weight: 700; color: #10b981;">${precioText}</p>
                    </div>
                    <button class="btn-publicar" style="padding: 12px 24px; font-size: 16px; border-radius: 12px; background: var(--primary); color: white; border: none; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: transform 0.2s;" onclick="alert('Funcionalidad de postular en desarrollo')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px;"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        Postular a Trabajo
                    </button>
                </div>
            </div>
        `;
        modal.style.display = 'flex';
    }
}

window.cerrarModal = function() {
    const modal = document.getElementById('modal-detalle');
    if (modal) modal.style.display = 'none';
}

// Cierra modales con Esc o clic fuera
window.onclick = function(event) {
    const modalDetalle = document.getElementById('modal-detalle');
    const modalPublicar = document.getElementById('modal-publicar');
    if (event.target == modalDetalle) {
        modalDetalle.style.display = 'none';
    }
    if (event.target == modalPublicar) {
        modalPublicar.style.display = 'none';
    }
}

// Crear anuncios de prueba iniciales
async function crearAnuncioDePrueba() {
    try {
        await addDoc(collection(db, 'anuncios'), {
            titulo: 'Ejemplo: Instalación de Repisas',
            descripcion: 'Este es un anuncio de prueba generado automáticamente. Necesito instalar 3 repisas en la sala de mi apartamento.',
            categoria: 'carpinteria',
            ubicacion: 'Bogotá',
            precio: 45000,
            urgente: false,
            autorId: currentUser.uid,
            fecha: serverTimestamp()
        });
        console.log("Anuncio de prueba creado.");
    } catch (e) {
        console.error("Error creating test ad", e);
    }
}
