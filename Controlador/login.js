// Datos simulados de usuarios
const usuariosSimulados = [
    { email: 'cliente@servidom.com', password: '123456', nombre: 'Juan Pérez', tipo: 'cliente' },
    { email: 'trabajador@servidom.com', password: '123456', nombre: 'Carlos García', tipo: 'trabajador' },
    { email: 'admin@servidom.com', password: 'admin', nombre: 'Administrador', tipo: 'trabajador' }
];

function validarFormulario(event) {
    if (event) event.preventDefault();
    
    var email = document.getElementById("email").value;
    var contraseña = document.getElementById("contraseña").value;
    var errorDiv = document.getElementById("error");

    if (email === "" || contraseña === "") {
        errorDiv.innerText = "Por favor, completa todos los campos.";
        errorDiv.style.display = "block";
        return false;
    }

    // Buscar usuario en datos simulados
    var usuario = usuariosSimulados.find(u => u.email === email && u.password === contraseña);
    
    if (usuario) {
        // Guardar datos en localStorage para simular sesión
        localStorage.setItem('usuario_logueado', JSON.stringify(usuario));
        localStorage.setItem('nombre_completo', usuario.nombre);
        localStorage.setItem('tipo_usuario', usuario.tipo);
        
        // Redirigir según tipo de usuario
        if (usuario.email === 'admin@servidom.com') {
            window.location.href = "admin.html";
        } else {
            window.location.href = "catalogo.html";
        }
    } else {
        errorDiv.innerText = "Correo o contraseña incorrectos.";
        errorDiv.style.display = "block";
    }
    return false;
}

function mostrarContraseña() {
    var contraseña = document.getElementById("contraseña");
    if (contraseña.type === "password") {
        contraseña.type = "text";
    } else {
        contraseña.type = "password";
    }
}

// Agregar evento submit al formulario
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', validarFormulario);
    }
});
