import { auth, db } from '../Modelo/firebase.js';
import { doc, getDoc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// DOM Elements
const elements = {
    // Form Inputs
    nombre: document.getElementById('nombre'),
    apellido: document.getElementById('apellido'),
    email: document.getElementById('email'),
    telefono: document.getElementById('telefono'),
    dni: document.getElementById('dni'),
    direccion: document.getElementById('direccion'),
    
    // UI displays
    sidebarNombre: document.getElementById('sidebar-nombre'),
    sidebarTipo: document.getElementById('sidebar-tipo'),
    ubicacionUsuario: document.getElementById('ubicacion-usuario'),
    fechaRegistro: document.getElementById('fecha-registro'),
    
    // Status
    estadoIndicador: document.getElementById('mi-estado'),
    estadoTexto: document.getElementById('estado-texto'),
    
    // Action buttons
    btnGuardar: document.getElementById('btnGuardar'),
    btnCancelar: document.getElementById('btnCancelar'),
    btnEditar: document.getElementById('btn-editar'),
    formActions: document.getElementById('form-actions'),
    formulario: document.getElementById('formulario-perfil')
};

let currentUserData = null;
let currentAuthUser = null;

// Initialize
onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentAuthUser = user;
        await cargarDatosPerfil(user);
        setupEventListeners(user.uid);
    } else {
        window.location.href = 'login.html';
    }
});

async function cargarDatosPerfil(user) {
    try {
        const uid = user.uid;
        const docRef = doc(db, 'usuarios', uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            currentUserData = docSnap.data();
        } else {
            // Fallback for new user without firestore doc
            currentUserData = {
                nombre: user.displayName || 'Usuario',
                email: user.email || '',
                rol: 'cliente'
            };
        }
        
        llenarFormulario(currentUserData);
        actualizarUI(currentUserData);
        deshabilitarEdicion();
        
    } catch (error) {
        console.error("Error al cargar perfil:", error);
        mostrarToast("Error al cargar el perfil", "error");
    }
}

function habilitarEdicion() {
    const inputs = elements.formulario.querySelectorAll('input:not(#email)');
    inputs.forEach(input => input.disabled = false);
    
    if (elements.btnEditar) elements.btnEditar.style.display = 'none';
    if (elements.formActions) elements.formActions.style.display = 'flex';
}

function deshabilitarEdicion() {
    const inputs = elements.formulario.querySelectorAll('input');
    inputs.forEach(input => input.disabled = true);
    
    if (elements.btnEditar) elements.btnEditar.style.display = 'inline-flex';
    if (elements.formActions) elements.formActions.style.display = 'none';
}

function llenarFormulario(datos) {
    if (elements.nombre) elements.nombre.value = datos.nombre || '';
    if (elements.apellido) elements.apellido.value = datos.apellido || '';
    if (elements.email) elements.email.value = datos.email || currentAuthUser?.email || '';
    if (elements.telefono) elements.telefono.value = datos.telefono || '';
    if (elements.dni) elements.dni.value = datos.dni || '';
    if (elements.direccion) elements.direccion.value = datos.direccion || '';
}

function actualizarUI(datos) {
    if (elements.sidebarNombre) elements.sidebarNombre.textContent = datos.nombre || 'Usuario';
    if (elements.sidebarTipo) {
        const isWorker = datos.rol === 'trabajador';
        elements.sidebarTipo.textContent = isWorker ? 'Trabajador' : 'Cliente';
    }
    if (elements.ubicacionUsuario) elements.ubicacionUsuario.textContent = datos.direccion || 'No especificada';
    if (elements.fechaRegistro) {
        // Mock date since we don't store createdAt right now
        elements.fechaRegistro.textContent = new Date().getFullYear(); 
    }
}

function setupEventListeners(uid) {
    if (elements.formulario) {
        elements.formulario.addEventListener('submit', (e) => {
            e.preventDefault();
            guardarPerfil(uid);
        });
    }

    if (elements.btnEditar) {
        elements.btnEditar.addEventListener('click', (e) => {
            e.preventDefault();
            habilitarEdicion();
        });
    }

    if (elements.btnCancelar) {
        elements.btnCancelar.addEventListener('click', () => {
            if (currentUserData) llenarFormulario(currentUserData);
            deshabilitarEdicion();
        });
    }

    // Status radio buttons
    const radios = document.querySelectorAll('input[name="mi-estado"]');
    radios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            cambiarEstado(e.target.value);
        });
    });
}

async function guardarPerfil(uid) {
    if (!elements.btnGuardar) return;
    
    const originalText = elements.btnGuardar.innerHTML;
    elements.btnGuardar.innerHTML = 'Guardando...';
    elements.btnGuardar.disabled = true;
    
    try {
        const updateData = {
            nombre: elements.nombre?.value || '',
            apellido: elements.apellido?.value || '',
            telefono: elements.telefono?.value || '',
            dni: elements.dni?.value || '',
            direccion: elements.direccion?.value || ''
        };
        
        await setDoc(doc(db, 'usuarios', uid), updateData, { merge: true });
        
        currentUserData = { ...currentUserData, ...updateData };
        actualizarUI(currentUserData);
        deshabilitarEdicion();
        
        mostrarToast("Perfil actualizado exitosamente");
    } catch (error) {
        console.error("Error al guardar:", error);
        mostrarToast("Error al guardar los cambios", "error");
    } finally {
        elements.btnGuardar.innerHTML = originalText;
        elements.btnGuardar.disabled = false;
    }
}

function cambiarEstado(estado) {
    if (!elements.estadoIndicador || !elements.estadoTexto) return;
    
    elements.estadoIndicador.className = `estado-indicator ${estado}`;
    
    const textos = {
        'activo': 'Disponible',
        'ocupado': 'Ocupado temporalmente',
        'inactivo': 'No disponible'
    };
    const colores = {
        'activo': '#10b981',
        'ocupado': '#f59e0b',
        'inactivo': '#94a3b8'
    };
    
    elements.estadoTexto.textContent = textos[estado] || 'Disponible';
    elements.estadoTexto.style.color = colores[estado] || '#10b981';
    
    mostrarToast(`Estado cambiado a: ${textos[estado]}`);
    // Podríamos guardar esto en Firestore también si lo añadimos al esquema
}

// Simple Toast function if not available globally
function mostrarToast(mensaje, tipo = "success") {
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = tipo === "error" ? '#ef4444' : '#10b981';
    toast.style.color = 'white';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    toast.style.zIndex = '9999';
    toast.style.fontFamily = 'Inter, sans-serif';
    toast.style.fontSize = '14px';
    toast.style.fontWeight = '500';
    toast.textContent = mensaje;
    
    document.body.appendChild(toast);
    
    // Animate in
    toast.animate([
        { transform: 'translateY(100px)', opacity: 0 },
        { transform: 'translateY(0)', opacity: 1 }
    ], { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' });
    
    setTimeout(() => {
        const animation = toast.animate([
            { transform: 'translateY(0)', opacity: 1 },
            { transform: 'translateY(100px)', opacity: 0 }
        ], { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' });
        
        animation.onfinish = () => toast.remove();
    }, 3000);
}
