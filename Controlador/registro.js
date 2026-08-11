import { auth, db } from '../Modelo/firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', function() {
    const formCliente = document.getElementById('formCliente');
    const formTrabajador = document.getElementById('formTrabajador');
    
    if (formCliente) {
        formCliente.addEventListener('submit', function(e) {
            e.preventDefault();
            registrarUsuario('cliente');
        });
    }
    
    if (formTrabajador) {
        formTrabajador.addEventListener('submit', function(e) {
            e.preventDefault();
            registrarUsuario('trabajador');
        });
    }
});

window.cambiarTab = function(tipo) {
    // Cambiar tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tipo) {
            btn.classList.add('active');
        }
    });
    
    // Cambiar formularios
    document.querySelectorAll('.registro-form').forEach(form => {
        form.classList.remove('active');
    });
    
    if (tipo === 'cliente') {
        document.getElementById('formCliente').classList.add('active');
    } else {
        document.getElementById('formTrabajador').classList.add('active');
    }
}

async function registrarUsuario(tipo) {
    const prefix = tipo;
    const nombre = document.getElementById(`${prefix}-nombre`).value.trim();
    const apellido = document.getElementById(`${prefix}-apellido`).value.trim();
    const email = document.getElementById(`${prefix}-email`).value.trim();
    const dni = document.getElementById(`${prefix}-dni`).value.trim();
    const telefono = document.getElementById(`${prefix}-telefono`).value.trim();
    const password = document.getElementById(`${prefix}-password`).value;
    const confirmar = document.getElementById(`${prefix}-confirmar`).value;
    const errorContainer = document.getElementById(tipo === 'cliente' ? 'errorCliente' : 'errorTrabajador');
    const btnSubmit = document.querySelector(`#form${tipo.charAt(0).toUpperCase() + tipo.slice(1)} button[type="submit"]`);
    
    let ocupacion = '';
    if (tipo === 'trabajador') {
        ocupacion = document.getElementById('trabajador-ocupacion').value.trim();
    }
    
    let errores = [];
    
    // Validaciones
    if (nombre.length < 2) errores.push('El nombre debe tener al menos 2 caracteres.');
    if (apellido.length < 2) errores.push('El apellido debe tener al menos 2 caracteres.');
    if (tipo === 'trabajador' && ocupacion.length < 2) errores.push('La ocupación debe tener al menos 2 caracteres.');
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
            tipo: tipo,
            telefono: telefono,
            dni: dni,
            fechaRegistro: new Date()
        };
        
        if (tipo === 'trabajador') {
            userData.ocupacion = ocupacion;
        }

        // Guardar el documento en la colección 'usuarios'
        await setDoc(doc(db, "usuarios", user.uid), userData);

        console.log("Usuario registrado con éxito:", user.uid);
        alert(`${tipo === 'cliente' ? 'Cliente' : 'Trabajador'} registrado exitosamente`);
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
