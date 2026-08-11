import { auth } from '../Modelo/firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    // Escuchar cambios de estado de autenticación
    onAuthStateChanged(auth, (user) => {
        const headerActions = document.querySelector('.header-actions');
        
        if (user) {
            // Usuario está conectado
            if (headerActions) {
                // Reemplazar botones de login/registro por perfil y cerrar sesión
                headerActions.innerHTML = `
                    <div class="user-profile">
                        <span style="margin-right: 15px; font-weight: 500; color: var(--text-primary);">Hola, ${user.email.split('@')[0]}</span>
                        <a href="perfil.html" class="icon-btn hover-icon-bounce" title="Mi Perfil" style="text-decoration:none; margin-right: 10px;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </a>
                        <button id="btnLogout" class="btn-secondary" style="padding: 8px 16px;">
                            Cerrar Sesión
                        </button>
                    </div>
                `;
                
                // Agregar evento de logout
                document.getElementById('btnLogout').addEventListener('click', async () => {
                    try {
                        await signOut(auth);
                        window.location.href = "login.html";
                    } catch (error) {
                        console.error("Error al cerrar sesión", error);
                    }
                });
            }
            
            // Si estamos en login o registro y ya estamos conectados, redirigir al catálogo
            const currentPath = window.location.pathname;
            if (currentPath.includes('login.html') || currentPath.includes('registro.html')) {
                window.location.href = 'catalogo.html';
            }
            
        } else {
            // Usuario no está conectado
            if (headerActions) {
                // Restaurar botones de login/registro
                headerActions.innerHTML = `
                    <a href="login.html" class="btn-secondary">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                            <polyline points="10 17 15 12 10 7"></polyline>
                            <line x1="15" y1="12" x2="3" y2="12"></line>
                        </svg>
                        Iniciar Sesión
                    </a>
                    <a href="registro.html" class="btn-primary">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="8.5" cy="7" r="4"></circle>
                            <line x1="20" y1="8" x2="20" y2="14"></line>
                            <line x1="23" y1="11" x2="17" y2="11"></line>
                        </svg>
                        Registrarse
                    </a>
                `;
            }
        }
    });
});
