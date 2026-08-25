import { auth, db } from '../Modelo/firebase.js';
import { doc, getDoc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { onAuthStateChanged, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// DOM Elements
const elements = {
    // Nav
    navItems: document.querySelectorAll('.sidebar-item, .nav-item[data-section]'),
    sections: document.querySelectorAll('.config-section'),
    
    // Cuenta Inputs
    email: document.getElementById('config-email'),
    tipo: document.getElementById('config-tipo'),
    
    // Buttons
    btnCambiarPass: document.getElementById('btn-cambiar-pass')
};

let currentUser = null;
let currentProfileData = null;

onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;
        configurarNavegacionSidebar();
        await cargarDatosConfiguracion(user.uid);
        setupEventListeners();
    } else {
        window.location.href = 'login.html';
    }
});

async function cargarDatosConfiguracion(uid) {
    try {
        const docRef = doc(db, 'usuarios', uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            currentProfileData = docSnap.data();
        } else {
            currentProfileData = {
                tipo: 'cliente',
                email: currentUser.email || ''
            };
        }
        
        llenarFormulario(currentProfileData);
    } catch (error) {
        console.error("Error cargando configuración:", error);
    }
}

function llenarFormulario(datos) {
    if (elements.email) elements.email.value = currentUser.email || datos.email || '';
    if (elements.tipo) elements.tipo.value = datos.tipo || 'Usuario Regular';
}

function configurarNavegacionSidebar() {
    elements.navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const sectionId = this.getAttribute('data-section');
            if (!sectionId) return;
            
            e.preventDefault();
            
            elements.navItems.forEach(nav => nav.classList.remove('active'));
            elements.sections.forEach(sec => sec.classList.remove('active'));
            
            this.classList.add('active');
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
}

function setupEventListeners() {
    // La sección de Cuenta ya no se edita desde aquí, se edita desde Mi Perfil.
    
    if (elements.btnCambiarPass) {
        elements.btnCambiarPass.addEventListener('click', async () => {
            const currentPass = prompt("Ingresa tu contraseña actual:");
            if (!currentPass) return;
            
            const newPass = prompt("Ingresa tu nueva contraseña:");
            if (!newPass) return;
            
            try {
                const credential = EmailAuthProvider.credential(currentUser.email, currentPass);
                await reauthenticateWithCredential(currentUser, credential);
                await updatePassword(currentUser, newPass);
                mostrarToast("Contraseña actualizada exitosamente");
            } catch (error) {
                console.error(error);
                mostrarToast("Error: Verifica tu contraseña actual e intenta de nuevo", "error");
            }
        });
    }
}

// Re-usar Toast Function
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
