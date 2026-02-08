// Datos simulados de conversaciones
const conversaciones = [
    {
        id: 1,
        nombre: 'Carlos Mendez',
        online: true,
        ultimoMensaje: 'Perfecto, entonces nos vemos mañana a las 9am',
        hora: '10:30',
        noLeidos: 2
    },
    {
        id: 2,
        nombre: 'María López',
        online: true,
        ultimoMensaje: '¡Gracias por el servicio! Todo quedó excelente',
        hora: '09:15',
        noLeidos: 0
    },
    {
        id: 3,
        nombre: 'Juan Rodríguez',
        online: false,
        ultimoMensaje: '¿Podría revisar el presupuesto que le envié?',
        hora: 'Ayer',
        noLeidos: 1
    },
    {
        id: 4,
        nombre: 'Ana García',
        online: false,
        ultimoMensaje: 'El trabajo quedó muy bien, muchas gracias',
        hora: 'Lun',
        noLeidos: 0
    }
];

// Mensajes simulados por conversación
const mensajes = {
    1: [
        { id: 1, tipo: 'received', texto: 'Hola, necesito un servicio de plomería urgente', hora: '10:00' },
        { id: 2, tipo: 'sent', texto: '¡Hola! Claro, ¿cuál es el problema?', hora: '10:05' },
        { id: 3, tipo: 'received', texto: 'Tengo una fuga en el baño principal, el agua sale por debajo del lavamanos', hora: '10:10' },
        { id: 4, tipo: 'sent', texto: 'Entiendo. Puedo ir mañana a las 9am, ¿le parece bien?', hora: '10:20' },
        { id: 5, tipo: 'received', texto: 'Perfecto, entonces nos vemos mañana a las 9am', hora: '10:30' }
    ],
    2: [
        { id: 1, tipo: 'received', texto: '¡Hola! ¿Disponible para una limpieza profunda?', hora: '08:30' },
        { id: 2, tipo: 'sent', texto: '¡Hola María! Sí, tengo disponibilidad. ¿Cuándo lo necesitas?', hora: '08:45' },
        { id: 3, tipo: 'received', texto: 'Para mañana en la tarde si es posible', hora: '08:50' },
        { id: 4, tipo: 'sent', texto: 'Perfecto, puedo estar ahí a las 2pm', hora: '09:00' },
        { id: 5, tipo: 'received', texto: '¡Gracias por el servicio! Todo quedó excelente', hora: '09:15' }
    ],
    3: [
        { id: 1, tipo: 'sent', texto: 'Buenos días, le envío el presupuesto para la instalación', hora: '14:00' },
        { id: 2, tipo: 'received', texto: 'Gracias, lo reviso y le confirmo', hora: '14:30' },
        { id: 3, tipo: 'received', texto: '¿Podría revisar el presupuesto que le envié?', hora: '18:00' }
    ],
    4: [
        { id: 1, tipo: 'received', texto: 'Hola, necesito una cotización para pintura', hora: '11:00' },
        { id: 2, tipo: 'sent', texto: '¡Hola Ana! ¿Cuántas habitaciones desea pintar?', hora: '11:15' },
        { id: 3, tipo: 'received', texto: 'Dos habitaciones y el corredor', hora: '11:20' },
        { id: 4, tipo: 'sent', texto: 'El presupuesto total sería de $250.000 incluyendo materiales', hora: '11:30' },
        { id: 5, tipo: 'received', texto: 'El trabajo quedó muy bien, muchas gracias', hora: '16:00' }
    ]
};

let conversacionActiva = null;

document.addEventListener('DOMContentLoaded', function() {
    verificarSesion();
    cargarConversaciones();
    configurarDropdowns();
    configurarEventos();
});

function verificarSesion() {
    const usuario = localStorage.getItem('usuario_logueado');
    if (!usuario) {
        window.location.href = 'login.php';
        return;
    }
    
    const datos = JSON.parse(usuario);
    const nombreUsuario = document.getElementById('nombre-usuario');
    if (nombreUsuario) {
        nombreUsuario.textContent = datos.nombre || 'Usuario';
    }
}

function cargarConversaciones() {
    const lista = document.getElementById('conversations-list');
    if (!lista) return;
    
    lista.innerHTML = conversaciones.map(conv => `
        <div class="conversation-item ${conversacionActiva === conv.id ? 'active' : ''}" 
             data-id="${conv.id}" 
             onclick="abrirConversacion(${conv.id})">
            <div class="conversation-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                ${conv.online ? '<div class="online-indicator"></div>' : ''}
            </div>
            <div class="conversation-content">
                <div class="conversation-header">
                    <span class="conversation-name">${conv.nombre}</span>
                    <span class="conversation-time">${conv.hora}</span>
                </div>
                <div class="conversation-preview">
                    ${conv.ultimoMensaje}
                    ${conv.noLeidos > 0 ? `<span class="unread-badge">${conv.noLeidos}</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function abrirConversacion(id) {
    conversacionActiva = id;
    const conv = conversaciones.find(c => c.id === id);
    
    // Marcar como activa
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.dataset.id) === id) {
            item.classList.add('active');
        }
    });
    
    // Mostrar chat activo
    document.getElementById('chat-empty').style.display = 'none';
    document.getElementById('chat-active').style.display = 'flex';
    
    // Actualizar info del contacto
    document.getElementById('contact-name').textContent = conv.nombre;
    document.getElementById('contact-status').innerHTML = `
        <span class="status-dot ${conv.online ? 'online' : ''}"></span>
        ${conv.online ? 'En línea' : 'Desconectado'}
    `;
    
    // Cargar mensajes
    cargarMensajes(id);
    
    // Marcar como leídos
    conv.noLeidos = 0;
    cargarConversaciones();
}

function cargarMensajes(id) {
    const area = document.getElementById('messages-area');
    const msgs = mensajes[id] || [];
    
    area.innerHTML = msgs.map(msg => `
        <div class="message ${msg.tipo}">
            ${msg.tipo === 'received' ? `
                <div class="message-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
            ` : ''}
            <div class="message-bubble">
                <div class="message-content">${msg.texto}</div>
                <div class="message-time">${msg.hora}</div>
            </div>
            ${msg.tipo === 'sent' ? `
                <div class="message-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
            ` : ''}
        </div>
    `).join('');
    
    // Scroll al final
    area.scrollTop = area.scrollHeight;
}

function configurarEventos() {
    // Enviar mensaje con Enter
    const input = document.getElementById('message-input');
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                enviarMensaje();
            }
        });
    }
    
    // Botón enviar
    const btnSend = document.getElementById('btn-send');
    if (btnSend) {
        btnSend.addEventListener('click', enviarMensaje);
    }
    
    // Botón volver (móvil)
    const btnBack = document.getElementById('btn-back');
    if (btnBack) {
        btnBack.addEventListener('click', function() {
            document.getElementById('chat-empty').style.display = 'flex';
            document.getElementById('chat-active').style.display = 'none';
            conversacionActiva = null;
            cargarConversaciones();
        });
    }
    
    // Búsqueda
    const buscar = document.getElementById('buscar-chat');
    if (buscar) {
        buscar.addEventListener('input', function() {
            filtrarConversaciones(this.value);
        });
    }
}

function enviarMensaje() {
    const input = document.getElementById('message-input');
    const texto = input.value.trim();
    
    if (!texto || !conversacionActiva) return;
    
    // Agregar mensaje
    const hora = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    const nuevoMsg = {
        id: Date.now(),
        tipo: 'sent',
        texto: texto,
        hora: hora
    };
    
    if (!mensajes[conversacionActiva]) {
        mensajes[conversacionActiva] = [];
    }
    mensajes[conversacionActiva].push(nuevoMsg);
    
    // Actualizar último mensaje
    const conv = conversaciones.find(c => c.id === conversacionActiva);
    if (conv) {
        conv.ultimoMensaje = texto;
        conv.hora = hora;
    }
    
    // Limpiar input y recargar
    input.value = '';
    cargarMensajes(conversacionActiva);
    cargarConversaciones();
    
    // Simular respuesta
    setTimeout(() => {
        simularRespuesta();
    }, 1500);
}

function simularRespuesta() {
    if (!conversacionActiva) return;
    
    const respuestas = [
        'Entendido, gracias por la información',
        'Perfecto, me parece bien',
        '¡Excelente! Quedamos así entonces',
        'Ok, le confirmo en un momento',
        'Recibido, cualquier cosa le aviso'
    ];
    
    const hora = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    const respuesta = {
        id: Date.now(),
        tipo: 'received',
        texto: respuestas[Math.floor(Math.random() * respuestas.length)],
        hora: hora
    };
    
    mensajes[conversacionActiva].push(respuesta);
    
    const conv = conversaciones.find(c => c.id === conversacionActiva);
    if (conv) {
        conv.ultimoMensaje = respuesta.texto;
        conv.hora = hora;
    }
    
    cargarMensajes(conversacionActiva);
    cargarConversaciones();
}

function filtrarConversaciones(query) {
    const items = document.querySelectorAll('.conversation-item');
    query = query.toLowerCase();
    
    items.forEach(item => {
        const nombre = item.querySelector('.conversation-name').textContent.toLowerCase();
        const preview = item.querySelector('.conversation-preview').textContent.toLowerCase();
        
        if (nombre.includes(query) || preview.includes(query)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function configurarDropdowns() {
    const perfilBtn = document.getElementById('perfil-btn');
    const dropdown = document.getElementById('dropdown');
    const notifBtn = document.getElementById('notif-btn');
    const notifDropdown = document.getElementById('notif-dropdown');
    
    if (perfilBtn && dropdown) {
        perfilBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.classList.toggle('visible');
            if (notifDropdown) notifDropdown.classList.remove('visible');
        });
    }
    
    if (notifBtn && notifDropdown) {
        notifBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            notifDropdown.classList.toggle('visible');
            if (dropdown) dropdown.classList.remove('visible');
        });
    }
    
    document.addEventListener('click', function() {
        if (dropdown) dropdown.classList.remove('visible');
        if (notifDropdown) notifDropdown.classList.remove('visible');
    });
}

function marcarTodasLeidas() {
    mostrarToastGlobal('Notificaciones marcadas como leídas');
}
