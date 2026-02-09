// Registro Unificado - JS
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

function cambiarTab(tipo) {
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

function registrarUsuario(tipo) {
    const prefix = tipo;
    const nombre = document.getElementById(`${prefix}-nombre`).value.trim();
    const apellido = document.getElementById(`${prefix}-apellido`).value.trim();
    const email = document.getElementById(`${prefix}-email`).value.trim();
    const dni = document.getElementById(`${prefix}-dni`).value.trim();
    const telefono = document.getElementById(`${prefix}-telefono`).value.trim();
    const password = document.getElementById(`${prefix}-password`).value;
    const confirmar = document.getElementById(`${prefix}-confirmar`).value;
    const errorContainer = document.getElementById(tipo === 'cliente' ? 'errorCliente' : 'errorTrabajador');
    
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
    } else {
        // Guardar usuario
        const nuevoUsuario = {
            nombre: nombre + ' ' + apellido,
            email: email,
            password: password,
            tipo: tipo,
            telefono: telefono,
            dni: dni
        };
        
        if (tipo === 'trabajador') {
            nuevoUsuario.ocupacion = ocupacion;
        }
        
        let usuarios = JSON.parse(localStorage.getItem('usuarios_registrados')) || [];
        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios_registrados', JSON.stringify(usuarios));
        
        alert(`${tipo === 'cliente' ? 'Cliente' : 'Trabajador'} registrado exitosamente`);
        window.location.href = 'login.html';
    }
}

function mostrarErrores(container, errores) {
    container.innerHTML = '<ul>' + errores.map(e => `<li>${e}</li>`).join('') + '</ul>';
    container.classList.add('visible');
}

function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
