import { auth } from '../Modelo/firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

async function validarFormulario(event) {
    if (event) event.preventDefault();
    
    const email = document.getElementById("email").value;
    const contraseña = document.getElementById("contraseña").value;
    const errorDiv = document.getElementById("error");
    const btnSubmit = document.querySelector(".btn-login");

    if (email === "" || contraseña === "") {
        errorDiv.innerText = "Por favor, completa todos los campos.";
        errorDiv.style.display = "block";
        return false;
    }

    // Mostrar estado de carga
    const textoOriginal = btnSubmit.innerHTML;
    btnSubmit.innerHTML = 'Iniciando sesión...';
    btnSubmit.disabled = true;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, contraseña);
        const user = userCredential.user;
        
        console.log("Inicio de sesión exitoso:", user);
        
        // Redirigir al catálogo después de iniciar sesión
        window.location.href = "catalogo.html";
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        
        // Manejar errores comunes de Firebase
        let mensajeError = "Error al iniciar sesión. Inténtalo de nuevo.";
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            mensajeError = "Correo o contraseña incorrectos.";
        } else if (error.code === 'auth/too-many-requests') {
            mensajeError = "Demasiados intentos fallidos. Intenta más tarde.";
        }
        
        errorDiv.innerText = mensajeError;
        errorDiv.style.display = "block";
        
        // Restaurar botón
        btnSubmit.innerHTML = textoOriginal;
        btnSubmit.disabled = false;
    }
    
    return false;
}

window.mostrarContraseña = function() {
    const contraseña = document.getElementById("contraseña");
    if (contraseña.type === "password") {
        contraseña.type = "text";
    } else {
        contraseña.type = "password";
    }
}

// Agregar evento submit al formulario
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', validarFormulario);
    }
});
