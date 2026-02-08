// Configuracion.js - Funcionalidad específica de la página de configuración
// NOTA: El header, dropdowns y notificaciones son manejados por catalogo-auth.js

document.addEventListener('DOMContentLoaded', function() {
    // Solo funcionalidad específica de la página de configuración
    cargarDatosConfiguracion();
    configurarNavegacionSidebar();
    cargarPreferencias();
});

function cargarDatosConfiguracion() {
    const usuario = localStorage.getItem('usuario_logueado');
    if (usuario) {
        const datos = JSON.parse(usuario);
        
        const nombreInput = document.getElementById('config-nombre');
        const emailInput = document.getElementById('config-email');
        const telefonoInput = document.getElementById('config-telefono');
        const direccionInput = document.getElementById('config-direccion');
        
        if (nombreInput) nombreInput.value = datos.nombre || '';
        if (emailInput) emailInput.value = datos.email || '';
        if (telefonoInput) telefonoInput.value = datos.telefono || '';
        if (direccionInput) direccionInput.value = datos.direccion || '';
    }
}

function configurarNavegacionSidebar() {
    const navItems = document.querySelectorAll('.sidebar-item, .nav-item[data-section]');
    const sections = document.querySelectorAll('.config-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const sectionId = this.getAttribute('data-section');
            if (!sectionId) return;
            
            e.preventDefault();
            
            // Remover active de todos
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(sec => sec.classList.remove('active'));
            
            // Activar actual
            this.classList.add('active');
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
}

function cargarPreferencias() {
    // Cargar estado
    const estadoGuardado = localStorage.getItem('estado_usuario') || 'activo';
    const estadoRadios = document.querySelectorAll('input[name="estado"]');
    
    estadoRadios.forEach(radio => {
        if (radio.value === estadoGuardado) {
            radio.checked = true;
        }
        
        radio.addEventListener('change', function() {
            localStorage.setItem('estado_usuario', this.value);
            mostrarToastConfig('Estado actualizado: ' + this.value);
        });
    });
    
    // Configurar radios de tema si existen
    const temaRadios = document.querySelectorAll('input[name="tema"]');
    const temaGuardado = localStorage.getItem('tema_servidom') || 'oscuro';
    
    temaRadios.forEach(radio => {
        if (radio.value === temaGuardado) {
            radio.checked = true;
        }
        
        radio.addEventListener('change', function() {
            if (typeof aplicarTema === 'function') {
                aplicarTema(this.value);
            }
            localStorage.setItem('tema_servidom', this.value);
            mostrarToastConfig('Tema actualizado correctamente');
        });
    });
}

function guardarCuenta() {
    const nombre = document.getElementById('config-nombre')?.value;
    const email = document.getElementById('config-email')?.value;
    const telefono = document.getElementById('config-telefono')?.value;
    const direccion = document.getElementById('config-direccion')?.value;
    
    const usuario = JSON.parse(localStorage.getItem('usuario_logueado')) || {};
    usuario.nombre = nombre;
    usuario.email = email;
    usuario.telefono = telefono;
    usuario.direccion = direccion;
    
    localStorage.setItem('usuario_logueado', JSON.stringify(usuario));
    
    // Actualizar nombre en header (catalogo-auth.js lo maneja)
    const nombreUsuario = document.getElementById('nombre-usuario');
    if (nombreUsuario) {
        nombreUsuario.textContent = nombre || 'Usuario';
    }
    
    mostrarToastConfig('Información guardada correctamente');
}

function desactivarCuenta() {
    if (confirm('¿Estás seguro de que deseas desactivar tu cuenta? Podrás reactivarla iniciando sesión nuevamente.')) {
        localStorage.setItem('estado_usuario', 'inactivo');
        mostrarToastConfig('Cuenta desactivada');
    }
}

function eliminarCuenta() {
    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
        if (confirm('Esta es tu última oportunidad. ¿Realmente deseas eliminar tu cuenta permanentemente?')) {
            localStorage.removeItem('usuario_logueado');
            localStorage.removeItem('estado_usuario');
            window.location.href = 'login.php';
        }
    }
}

function mostrarToastConfig(mensaje) {
    // Usar la función de catalogo-auth.js si existe, sino crear una propia
    if (typeof mostrarToast === 'function') {
        mostrarToast(mensaje);
        return;
    }
    
    // Crear toast si no existe
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 14px 28px;
            border-radius: 14px;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            z-index: 9999;
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        `;
        document.body.appendChild(toast);
    }
    
    toast.textContent = mensaje;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(100px)';
    }, 3000);
}
