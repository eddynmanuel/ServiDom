// Registro de cliente con datos simulados
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formRegistroCliente');
    if (form) {
        form.addEventListener('submit', validarRegistroCliente);
    }
});

function validarRegistroCliente(event) {
    if (event) event.preventDefault();
    
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const DNI = document.getElementById('dni').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const password = document.getElementById('password').value;
    const confirmarPassword = document.getElementById('confirmar-password').value;
    const errorContainer = document.getElementById('errorContainer');

    let errores = [];

    // Validaciones
    if (nombre.length < 2) {
        errores.push('El nombre debe tener al menos 2 caracteres.');
    }
    if (apellido.length < 2) {
        errores.push('El apellido debe tener al menos 2 caracteres.');
    }
    if (!validarEmail(email)) {
        errores.push('Por favor, ingresa un correo electrónico válido.');
    }
    if (DNI.length !== 8 || isNaN(DNI)) {
        errores.push('El DNI debe tener 8 dígitos.');
    }
    if (telefono.length !== 9 || isNaN(telefono)) {
        errores.push('El teléfono debe tener 9 dígitos.');
    }
    if (password.length < 6) {
        errores.push('La contraseña debe tener al menos 6 caracteres.');
    }
    if (password !== confirmarPassword) {
        errores.push('Las contraseñas no coinciden.');
    }

    if (errores.length > 0) {
        let errorHtml = '<ul>';
        errores.forEach(function(error) {
            errorHtml += '<li>' + error + '</li>';
        });
        errorHtml += '</ul>';
        errorContainer.innerHTML = errorHtml;
    } else {
        // Simular registro guardando en localStorage
        const nuevoUsuario = {
            nombre: nombre + ' ' + apellido,
            email: email,
            password: password,
            tipo: 'cliente',
            telefono: telefono,
            dni: DNI
        };
        
        // Guardar usuario simulado
        let usuarios = JSON.parse(localStorage.getItem('usuarios_registrados')) || [];
        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios_registrados', JSON.stringify(usuarios));
        
        alert('Cliente registrado exitosamente');
        window.location.href = 'login.html';
    }
    return false;
}

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
