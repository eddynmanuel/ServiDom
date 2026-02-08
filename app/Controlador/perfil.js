document.addEventListener('DOMContentLoaded', function() {
    verificarSesion();
    configurarHeader();
    cargarDatosTrabajador();
    cargarNotificaciones();
});

function verificarSesion() {
    const usuario = localStorage.getItem('usuario_logueado');
    if (!usuario) {
        window.location.href = 'login.php';
        return;
    }
    
    const datos = JSON.parse(usuario);
    const nombreHeader = document.getElementById('nombre-header');
    if (nombreHeader) {
        nombreHeader.textContent = datos.nombre || 'Usuario';
    }
}

function configurarHeader() {
    // Dropdown de perfil
    const perfilBtn = document.getElementById('perfil-btn');
    const dropdown = document.getElementById('dropdown');
    
    if (perfilBtn && dropdown) {
        perfilBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.classList.toggle('visible');
            document.getElementById('notif-dropdown')?.classList.remove('visible');
        });
    }
    
    // Dropdown de notificaciones
    const notifBtn = document.getElementById('notif-btn');
    const notifDropdown = document.getElementById('notif-dropdown');
    
    if (notifBtn && notifDropdown) {
        notifBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            notifDropdown.classList.toggle('visible');
            dropdown?.classList.remove('visible');
        });
    }
    
    document.addEventListener('click', function() {
        dropdown?.classList.remove('visible');
        notifDropdown?.classList.remove('visible');
    });
}

function cargarNotificaciones() {
    const lista = document.getElementById('notif-list');
    if (!lista) return;
    
    lista.innerHTML = `
        <div class="notif-item">
            <div>
                <strong>Perfil visitado</strong>
                <p style="font-size: 13px; color: var(--text-secondary);">Estás viendo un perfil de trabajador</p>
            </div>
        </div>
        <div class="notif-item">
            <div>
                <strong>Nuevo mensaje</strong>
                <p style="font-size: 13px; color: var(--text-secondary);">Tienes mensajes pendientes</p>
            </div>
        </div>
    `;
}

function cargarDatosTrabajador() {
    const trabajadorGuardado = localStorage.getItem('trabajador_seleccionado');
    
    if (trabajadorGuardado) {
        const trabajador = JSON.parse(trabajadorGuardado);
        
        const nombreEl = document.getElementById('nombre-trabajador');
        const ocupacionEl = document.getElementById('ocupacion-trabajador');
        const ubicacionEl = document.getElementById('ubicacion-trabajador');
        const experienciaEl = document.getElementById('experiencia-trabajador');
        const puntuacionEl = document.getElementById('puntuacion');
        
        if (nombreEl) nombreEl.textContent = trabajador.nombre + ' ' + trabajador.apellido;
        if (ocupacionEl) ocupacionEl.textContent = trabajador.ocupacion;
        if (ubicacionEl) ubicacionEl.textContent = 'Lima, Perú';
        if (experienciaEl) experienciaEl.textContent = '5 años de experiencia';
        if (puntuacionEl) puntuacionEl.textContent = trabajador.valoracion || '4.8';
    }
}

function cerrarSesion() {
    localStorage.removeItem('usuario_logueado');
    window.location.href = 'catalogo.php';
}