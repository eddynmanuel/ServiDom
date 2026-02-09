// Tema global - APLICAR INMEDIATAMENTE antes del render
(function() {
    // Aplicar tema INMEDIATAMENTE al cargar el script (antes del DOM)
    const tema = localStorage.getItem('tema_preferido') || 'oscuro';
    
    function aplicarTemaInicial() {
        let temaFinal = tema;
        if (tema === 'auto') {
            const prefiereLuz = window.matchMedia('(prefers-color-scheme: light)').matches;
            temaFinal = prefiereLuz ? 'claro' : 'oscuro';
        }
        
        if (temaFinal === 'claro') {
            document.documentElement.classList.add('tema-claro');
            document.body && document.body.classList.add('tema-claro');
        } else {
            document.documentElement.classList.remove('tema-claro');
            document.body && document.body.classList.remove('tema-claro');
        }
    }
    
    // Aplicar al documento inmediatamente
    aplicarTemaInicial();
    
    // Volver a aplicar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            aplicarTemaInicial();
            actualizarBotonesTemaDesplegable();
        });
    } else {
        aplicarTemaInicial();
        setTimeout(actualizarBotonesTemaDesplegable, 0);
    }
})();

// Función para toggle del submenú de tema
function toggleTemaSubmenu(event) {
    event.preventDefault();
    event.stopPropagation();
    const submenu = document.getElementById('tema-submenu');
    if (submenu) {
        submenu.classList.toggle('open');
    }
}

// Función para cambiar tema desde dropdown desplegable
function cambiarTemaDropdown(tema) {
    localStorage.setItem('tema_preferido', tema);
    
    let temaFinal = tema;
    if (tema === 'auto') {
        const prefiereLuz = window.matchMedia('(prefers-color-scheme: light)').matches;
        temaFinal = prefiereLuz ? 'claro' : 'oscuro';
    }
    
    if (temaFinal === 'claro') {
        document.documentElement.classList.add('tema-claro');
        document.body.classList.add('tema-claro');
    } else {
        document.documentElement.classList.remove('tema-claro');
        document.body.classList.remove('tema-claro');
    }
    
    actualizarBotonesTemaDesplegable();
    
    // Mostrar feedback
    const nombres = { oscuro: 'Oscuro', claro: 'Claro', auto: 'Sistema' };
    mostrarToastGlobal('Tema: ' + nombres[tema]);
}

// Actualizar botones de tema activo
function actualizarBotonesTemaDesplegable() {
    const temaGuardado = localStorage.getItem('tema_preferido') || 'oscuro';
    const botones = document.querySelectorAll('.tema-option');
    
    botones.forEach(btn => {
        btn.classList.remove('activo');
        if (btn.dataset.tema === temaGuardado) {
            btn.classList.add('activo');
        }
    });
}

// Función legacy para compatibilidad
function toggleTema() {
    const temaActual = localStorage.getItem('tema_preferido') || 'oscuro';
    const nuevoTema = temaActual === 'oscuro' ? 'claro' : 'oscuro';
    cambiarTemaDropdown(nuevoTema);
}

function mostrarToastGlobal(mensaje) {
    let toast = document.getElementById('toast-global');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-global';
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
    }, 2500);
}

// Cerrar sesión global
function cerrarSesion() {
    localStorage.removeItem('usuario_logueado');
    window.location.href = 'catalogo.html';
}

// Cerrar submenús al hacer click fuera
document.addEventListener('click', function(e) {
    const submenu = document.getElementById('tema-submenu');
    if (submenu && !submenu.contains(e.target)) {
        submenu.classList.remove('open');
    }
});

// Escuchar cambios en preferencia del sistema (para modo auto)
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function(e) {
    const temaGuardado = localStorage.getItem('tema_preferido');
    if (temaGuardado === 'auto') {
        if (e.matches) {
            document.documentElement.classList.add('tema-claro');
            document.body.classList.add('tema-claro');
        } else {
            document.documentElement.classList.remove('tema-claro');
            document.body.classList.remove('tema-claro');
        }
    }
});
