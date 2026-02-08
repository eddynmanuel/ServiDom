let valoracionSeleccionada = 0;
const textos = ['', 'Muy malo', 'Malo', 'Regular', 'Bueno', 'Excelente'];

document.addEventListener('DOMContentLoaded', function() {
    verificarSesion();
    configurarHeader();
    configurarEstrellas();
    cargarDatosTrabajador();
    cargarNotificaciones();
});

function verificarSesion() {
    const usuario = localStorage.getItem('usuario_logueado');
    if (!usuario) {
        window.location.href = 'login.html';
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
                <strong>Valoración pendiente</strong>
                <p style="font-size: 13px; color: var(--text-secondary);">Valora el servicio recibido</p>
            </div>
        </div>
        <div class="notif-item">
            <div>
                <strong>Servicio completado</strong>
                <p style="font-size: 13px; color: var(--text-secondary);">El trabajador ha finalizado</p>
            </div>
        </div>
    `;
}

function cargarDatosTrabajador() {
    const trabajador = localStorage.getItem('trabajador_seleccionado');
    if (trabajador) {
        const datos = JSON.parse(trabajador);
        document.getElementById('nombre-trabajador').textContent = datos.nombre + ' ' + datos.apellido;
        document.getElementById('ocupacion-trabajador').textContent = datos.ocupacion;
    }
}

function configurarEstrellas() {
    const estrellas = document.querySelectorAll('.estrella');
    
    estrellas.forEach(function(estrella) {
        estrella.addEventListener('click', function() {
            valoracionSeleccionada = parseInt(this.dataset.valor);
            actualizarEstrellas();
        });
        
        estrella.addEventListener('mouseenter', function() {
            const valor = parseInt(this.dataset.valor);
            highlightEstrellas(valor);
        });
    });
    
    document.getElementById('estrellas')?.addEventListener('mouseleave', function() {
        actualizarEstrellas();
    });
}

function highlightEstrellas(hasta) {
    const estrellas = document.querySelectorAll('.estrella');
    estrellas.forEach(function(e, i) {
        if (i < hasta) {
            e.classList.add('active');
        } else {
            e.classList.remove('active');
        }
    });
    document.getElementById('valoracion-texto').textContent = textos[hasta];
}

function actualizarEstrellas() {
    highlightEstrellas(valoracionSeleccionada);
    if (valoracionSeleccionada === 0) {
        document.getElementById('valoracion-texto').textContent = 'Selecciona una calificación';
    }
}

function enviarValoracion() {
    const comentario = document.getElementById('comentario').value;
    
    if (valoracionSeleccionada === 0) {
        alert('⚠️ Por favor selecciona una calificación');
        return;
    }
    
    if (!comentario.trim()) {
        alert('⚠️ Por favor escribe un comentario');
        return;
    }
    
    const trabajador = JSON.parse(localStorage.getItem('trabajador_seleccionado') || '{}');
    const valoracion = {
        trabajadorId: trabajador.id,
        trabajadorNombre: trabajador.nombre + ' ' + trabajador.apellido,
        estrellas: valoracionSeleccionada,
        comentario: comentario,
        fecha: new Date().toISOString()
    };
    
    let valoraciones = JSON.parse(localStorage.getItem('valoraciones')) || [];
    valoraciones.push(valoracion);
    localStorage.setItem('valoraciones', JSON.stringify(valoraciones));
    
    alert('✅ ¡Gracias por tu valoración!\n\nCalificación: ' + '★'.repeat(valoracionSeleccionada));
    window.history.back();
}

function cerrarSesion() {
    localStorage.removeItem('usuario_logueado');
    window.location.href = 'catalogo.html';
}
