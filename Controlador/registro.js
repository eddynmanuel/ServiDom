import { auth, db } from '../Modelo/firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', function() {
    const formRegistro = document.getElementById('formRegistro');
    
    if (formRegistro) {
        formRegistro.addEventListener('submit', function(e) {
            e.preventDefault();
            registrarUsuario();
        });
    }
});

async function registrarUsuario() {
    const nombre = document.getElementById('registro-nombre').value.trim();
    const apellido = document.getElementById('registro-apellido').value.trim();
    const email = document.getElementById('registro-email').value.trim();
    const dni = document.getElementById('registro-dni').value.trim();
    const telefono = document.getElementById('registro-telefono').value.trim();
    const password = document.getElementById('registro-password').value;
    const confirmar = document.getElementById('registro-confirmar').value;
    const errorContainer = document.getElementById('errorRegistro');
    const btnSubmit = document.querySelector('#formRegistro button[type="submit"]');
    
    let errores = [];
    
    // Validaciones
    if (nombre.length < 2) errores.push('El nombre debe tener al menos 2 caracteres.');
    if (apellido.length < 2) errores.push('El apellido debe tener al menos 2 caracteres.');
    if (!validarEmail(email)) errores.push('Ingresa un correo electrónico válido.');
    if (dni.length !== 8 || isNaN(dni)) errores.push('El DNI debe tener 8 dígitos.');
    if (telefono.length !== 9 || isNaN(telefono)) errores.push('El teléfono debe tener 9 dígitos.');
    if (password.length < 6) errores.push('La contraseña debe tener al menos 6 caracteres.');
    if (password !== confirmar) errores.push('Las contraseñas no coinciden.');
    
    if (errores.length > 0) {
        mostrarErrores(errorContainer, errores);
        return;
    }

    // Mostrar estado de carga
    const textoOriginal = btnSubmit.innerHTML;
    btnSubmit.innerHTML = 'Creando cuenta...';
    btnSubmit.disabled = true;

    try {
        // Crear usuario en Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Guardar información adicional en Firestore
        const userData = {
            uid: user.uid,
            nombre: nombre,
            apellido: apellido,
            email: email,
            tipo: 'usuario', // Tipo unificado
            telefono: telefono,
            dni: dni,
            fechaRegistro: new Date()
        };

        // Guardar el documento en la colección 'usuarios'
        await setDoc(doc(db, "usuarios", user.uid), userData);

        console.log("Usuario registrado con éxito:", user.uid);
        alert(`Cuenta creada exitosamente`);
        window.location.href = 'login.html';

    } catch (error) {
        console.error("Error al registrar:", error);
        let mensajeError = "Error al crear la cuenta.";
        if (error.code === 'auth/email-already-in-use') {
            mensajeError = "Este correo ya está registrado.";
        }
        mostrarErrores(errorContainer, [mensajeError]);
    } finally {
        // Restaurar botón
        btnSubmit.innerHTML = textoOriginal;
        btnSubmit.disabled = false;
    }
}

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function mostrarErrores(container, errores) {
    container.innerHTML = '<ul>' + errores.map(e => `<li>${e}</li>`).join('') + '</ul>';
    container.classList.add('visible');
    container.style.display = 'block';
}

window.mostrarContraseña = function(id) {
    const input = document.getElementById(id);
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}
