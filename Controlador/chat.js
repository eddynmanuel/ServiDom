import { auth, db } from '../Modelo/firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, orderBy, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

let currentUser = null;
let conversacionActiva = null;
let chatsUnsub = null;
let messagesUnsub = null;

// Cache of users we have fetched
const userCache = {};

document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            currentUser = user;
            // Guardar al usuario en la colección users si es su primera vez en chat
            guardarUsuarioActual();
            cargarConversaciones();
            configurarEventos();
        } else {
            // Redirigir si no está autenticado
            window.location.href = '../index.html';
        }
    });
});

async function guardarUsuarioActual() {
    if (!currentUser) return;
    const userRef = doc(db, 'users', currentUser.uid);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
        await setDoc(userRef, {
            nombre: currentUser.email.split('@')[0],
            email: currentUser.email,
            online: true
        });
    }
}

async function getUserInfo(uid) {
    if (userCache[uid]) return userCache[uid];
    try {
        const userRef = doc(db, 'users', uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            userCache[uid] = docSnap.data();
            return userCache[uid];
        }
    } catch (e) {
        console.error("Error fetching user", e);
    }
    return { nombre: 'Usuario Desconocido', online: false };
}

function cargarConversaciones() {
    const lista = document.getElementById('conversations-list');
    if (!lista) return;

    const chatsRef = collection(db, 'chats');
    const q = query(chatsRef, where('participants', 'array-contains', currentUser.uid));

    if (chatsUnsub) chatsUnsub();

    chatsUnsub = onSnapshot(q, async (snapshot) => {
        if (snapshot.empty) {
            lista.innerHTML = `
                <div style="padding: 20px; text-align: center; color: var(--text-secondary);">
                    <p>No tienes conversaciones aún.</p>
                    <button onclick="iniciarChatDePrueba()" style="margin-top: 10px; padding: 8px 16px; background: var(--primary); color: white; border: none; border-radius: 8px; cursor: pointer;">
                        Iniciar Chat de Prueba
                    </button>
                </div>
            `;
            return;
        }

        const chats = [];
        for (const document of snapshot.docs) {
            const data = document.data();
            const otherUserId = data.participants.find(id => id !== currentUser.uid) || currentUser.uid; // If chatting with self
            const otherUser = await getUserInfo(otherUserId);
            
            let timeStr = '';
            if (data.lastMessageTime) {
                const date = data.lastMessageTime.toDate();
                timeStr = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
            }

            chats.push({
                id: document.id,
                ...data,
                otherUser,
                timeStr
            });
        }

        // Sort by lastMessageTime descending
        chats.sort((a, b) => {
            const timeA = a.lastMessageTime ? a.lastMessageTime.toMillis() : 0;
            const timeB = b.lastMessageTime ? b.lastMessageTime.toMillis() : 0;
            return timeB - timeA;
        });

        lista.innerHTML = chats.map(conv => `
            <div class="conversation-item ${conversacionActiva === conv.id ? 'active' : ''}" 
                 data-id="${conv.id}" 
                 onclick="abrirConversacion('${conv.id}', '${conv.otherUser.nombre}', ${conv.otherUser.online})">
                <div class="conversation-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    ${conv.otherUser.online ? '<div class="online-indicator"></div>' : ''}
                </div>
                <div class="conversation-content">
                    <div class="conversation-header">
                        <span class="conversation-name">${conv.otherUser.nombre}</span>
                        <span class="conversation-time">${conv.timeStr}</span>
                    </div>
                    <div class="conversation-preview">
                        ${conv.lastMessage || 'Sin mensajes'}
                    </div>
                </div>
            </div>
        `).join('');
    });
}

window.abrirConversacion = function(chatId, nombre, online) {
    conversacionActiva = chatId;
    
    // Marcar como activa en UI
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.id === chatId) {
            item.classList.add('active');
        }
    });
    
    // Mostrar chat activo
    document.getElementById('chat-empty').style.display = 'none';
    document.getElementById('chat-active').style.display = 'flex';
    
    // Actualizar info del contacto
    document.getElementById('contact-name').textContent = nombre;
    document.getElementById('contact-status').innerHTML = `
        <span class="status-dot ${online ? 'online' : ''}"></span>
        ${online ? 'En línea' : 'Desconectado'}
    `;
    
    // Cargar mensajes en tiempo real
    if (messagesUnsub) messagesUnsub();

    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    messagesUnsub = onSnapshot(q, (snapshot) => {
        const area = document.getElementById('messages-area');
        
        area.innerHTML = snapshot.docs.map(docSnap => {
            const msg = docSnap.data();
            const esMio = msg.senderId === currentUser.uid;
            const tipo = esMio ? 'sent' : 'received';
            
            let timeStr = '';
            if (msg.timestamp) {
                timeStr = msg.timestamp.toDate().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
            }

            return `
                <div class="message ${tipo}">
                    ${!esMio ? `
                        <div class="message-avatar">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                    ` : ''}
                    <div class="message-bubble">
                        <div class="message-content">${msg.text}</div>
                        <div class="message-time">${timeStr}</div>
                    </div>
                    ${esMio ? `
                        <div class="message-avatar">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
        
        // Scroll al final
        area.scrollTop = area.scrollHeight;
    });
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
            // No recargamos conversaciones porque onSnapshot lo mantiene actualizado
        });
    }
    
    // Búsqueda (filtrado local)
    const buscar = document.getElementById('buscar-chat');
    if (buscar) {
        buscar.addEventListener('input', function() {
            filtrarConversaciones(this.value);
        });
    }
}

async function enviarMensaje() {
    const input = document.getElementById('message-input');
    const texto = input.value.trim();
    
    if (!texto || !conversacionActiva || !currentUser) return;
    
    // Limpiar input inmediatamente para buena UX
    input.value = '';
    
    try {
        // Agregar a subcoleccion messages
        const messagesRef = collection(db, 'chats', conversacionActiva, 'messages');
        await addDoc(messagesRef, {
            senderId: currentUser.uid,
            text: texto,
            timestamp: serverTimestamp()
        });
        
        // Actualizar último mensaje en el chat
        const chatRef = doc(db, 'chats', conversacionActiva);
        await setDoc(chatRef, {
            lastMessage: texto,
            lastMessageTime: serverTimestamp()
        }, { merge: true });
        
    } catch (e) {
        console.error("Error al enviar mensaje:", e);
        alert("Error al enviar el mensaje. Inténtalo de nuevo.");
    }
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

// Función auxiliar para probar el chat real si la base de datos está vacía
window.iniciarChatDePrueba = async function() {
    if (!currentUser) return;
    
    try {
        const chatsRef = collection(db, 'chats');
        
        // Creamos un usuario bot de prueba en Firestore
        const botId = "bot_soporte_123";
        const userRef = doc(db, 'users', botId);
        await setDoc(userRef, {
            nombre: 'Soporte ServiDom',
            email: 'soporte@servidom.com',
            online: true
        });
        
        // Creamos el chat
        await addDoc(chatsRef, {
            participants: [currentUser.uid, botId],
            lastMessage: '¡Bienvenido al chat de prueba!',
            lastMessageTime: serverTimestamp()
        });
        
        // Note: No necesitamos abrirlo manualmente, el onSnapshot actualizará la lista y el usuario podrá hacer click
    } catch (e) {
        console.error("Error al crear chat de prueba:", e);
    }
}
