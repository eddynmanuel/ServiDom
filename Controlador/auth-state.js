import { auth } from '../Modelo/firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    // Escuchar cambios de estado de autenticación
    onAuthStateChanged(auth, (user) => {
        const headerActions = document.querySelector('.header-actions');
        
        if (user) {
            // Usuario está conectado
            if (headerActions) {
                // Obtener nombre de usuario
                const username = user.email.split('@')[0];
                
                // Reemplazar botones de login/registro por perfil y cerrar sesión
                headerActions.innerHTML = `
                    <div class="notif-container" style="margin-right: 15px; position: relative;">
                        <button class="icon-btn hover-icon-bounce" id="notif-btn" title="Notificaciones" style="background: none; border: 1px solid var(--border); border-radius: 12px; padding: 8px; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px; stroke: var(--text-secondary);">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                            </svg>
                            <span class="notification-badge" style="top: -5px; right: -5px; position: absolute; background: #ef4444; color: white; border-radius: 50%; width: 18px; height: 18px; font-size: 11px; display: flex; align-items: center; justify-content: center; font-weight: bold;">3</span>
                        </button>
                    </div>
                    
                    <div class="perfil-container" style="position: relative;">
                        <button class="perfil-btn" id="perfil-btn" style="display: flex; align-items: center; gap: 10px; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border); padding: 4px 16px 4px 4px; border-radius: 30px; cursor: pointer; transition: all 0.3s;">
                            <div class="avatar" style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), #a855f7); display: flex; align-items: center; justify-content: center; color: white;">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px;">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <span class="nombre-perfil" id="nombre-usuario" style="font-weight: 500; color: var(--text-primary); font-size: 14px;">${username}</span>
                            <svg class="dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px; stroke: var(--text-secondary); transition: transform 0.3s;">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>
                        
                        <div class="dropdown-menu" id="dropdown" style="position: absolute; top: calc(100% + 12px); right: 0; background: rgba(15, 23, 42, 0.95); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; width: 220px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); opacity: 0; visibility: hidden; transform: translateY(-10px); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); z-index: 1000; padding: 8px 0; backdrop-filter: blur(12px);">
                            <a href="perfil.html" class="dropdown-item" style="display: flex; align-items: center; gap: 12px; padding: 12px 20px; color: var(--text-primary); text-decoration: none; font-size: 14px; transition: background 0.2s;">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px; stroke: var(--text-secondary);"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                <span>Mi Perfil</span>
                            </a>
                            <a href="empleos-guardados.html" class="dropdown-item" style="display: flex; align-items: center; gap: 12px; padding: 12px 20px; color: var(--text-primary); text-decoration: none; font-size: 14px; transition: background 0.2s;">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px; stroke: var(--text-secondary);"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                                <span>Mis Postulaciones</span>
                            </a>
                            <a href="configuracion.html" class="dropdown-item" style="display: flex; align-items: center; gap: 12px; padding: 12px 20px; color: var(--text-primary); text-decoration: none; font-size: 14px; transition: background 0.2s;">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px; stroke: var(--text-secondary);"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                                <span>Configuración</span>
                            </a>
                            <div style="height: 1px; background: rgba(255,255,255,0.08); margin: 8px 0;"></div>
                            <a href="#" class="dropdown-item logout" id="btnLogoutDropdown" style="display: flex; align-items: center; gap: 12px; padding: 12px 20px; color: #ef4444; text-decoration: none; font-size: 14px; transition: background 0.2s;">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px;"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                <span>Cerrar Sesión</span>
                            </a>
                        </div>
                    </div>
                `;
                
                // Configurar eventos del dropdown
                const perfilBtn = document.getElementById('perfil-btn');
                const dropdown = document.getElementById('dropdown');
                
                if (perfilBtn && dropdown) {
                    // Hover effects para dropdown items
                    const dropdownItems = dropdown.querySelectorAll('.dropdown-item');
                    dropdownItems.forEach(item => {
                        item.addEventListener('mouseenter', () => {
                            if(!item.classList.contains('logout')) {
                                item.style.background = 'rgba(255,255,255,0.05)';
                            } else {
                                item.style.background = 'rgba(239, 68, 68, 0.1)';
                            }
                        });
                        item.addEventListener('mouseleave', () => {
                            item.style.background = 'transparent';
                        });
                    });

                    // Toggle dropdown
                    perfilBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const isVisible = dropdown.style.visibility === 'visible';
                        
                        if (isVisible) {
                            dropdown.style.opacity = '0';
                            dropdown.style.visibility = 'hidden';
                            dropdown.style.transform = 'translateY(-10px)';
                            perfilBtn.querySelector('.dropdown-arrow').style.transform = 'rotate(0deg)';
                            perfilBtn.style.background = 'rgba(255, 255, 255, 0.03)';
                        } else {
                            dropdown.style.opacity = '1';
                            dropdown.style.visibility = 'visible';
                            dropdown.style.transform = 'translateY(0)';
                            perfilBtn.querySelector('.dropdown-arrow').style.transform = 'rotate(180deg)';
                            perfilBtn.style.background = 'rgba(255, 255, 255, 0.1)';
                        }
                    });
                    
                    // Close dropdown clicking outside
                    document.addEventListener('click', (e) => {
                        if (dropdown.style.visibility === 'visible' && !perfilBtn.contains(e.target) && !dropdown.contains(e.target)) {
                            dropdown.style.opacity = '0';
                            dropdown.style.visibility = 'hidden';
                            dropdown.style.transform = 'translateY(-10px)';
                            perfilBtn.querySelector('.dropdown-arrow').style.transform = 'rotate(0deg)';
                            perfilBtn.style.background = 'rgba(255, 255, 255, 0.03)';
                        }
                    });
                }
                
                // Hover effect del perfil btn
                if (perfilBtn) {
                    perfilBtn.addEventListener('mouseenter', () => {
                        if (dropdown.style.visibility !== 'visible') {
                            perfilBtn.style.background = 'rgba(255, 255, 255, 0.08)';
                        }
                    });
                    perfilBtn.addEventListener('mouseleave', () => {
                        if (dropdown.style.visibility !== 'visible') {
                            perfilBtn.style.background = 'rgba(255, 255, 255, 0.03)';
                        }
                    });
                }

                // Agregar evento de logout
                const btnLogout = document.getElementById('btnLogoutDropdown');
                if (btnLogout) {
                    btnLogout.addEventListener('click', async (e) => {
                        e.preventDefault();
                        try {
                            await signOut(auth);
                            window.location.href = "login.html";
                        } catch (error) {
                            console.error("Error al cerrar sesión", error);
                        }
                    });
                }
            }
            
            // Si estamos en login o registro y ya estamos conectados, redirigir al catálogo
            const currentPath = window.location.pathname;
            if (currentPath.includes('login.html') || currentPath.includes('registro.html')) {
                window.location.href = 'catalogo.html';
            }
            
            // Ocultar la sección Hero y Cómo Funciona en el catálogo si existen
            const heroSection = document.getElementById('hero-section');
            if (heroSection) {
                heroSection.style.display = 'none';
            }
            
            const comoFuncionaSection = document.getElementById('como-funciona');
            if (comoFuncionaSection) {
                comoFuncionaSection.style.display = 'none';
            }
            
            // Mostrar la navegación principal si el usuario está conectado
            document.querySelectorAll('.main-nav').forEach(nav => nav.classList.remove('hidden-nav'));
            
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
            
            
            // Restaurar la sección Hero y Cómo funciona si existen (cuando no hay sesión)
            const heroSection = document.getElementById('hero-section');
            if (heroSection) {
                heroSection.style.display = '';
            }
            
            const comoFuncionaSection = document.getElementById('como-funciona');
            if (comoFuncionaSection) {
                comoFuncionaSection.style.display = '';
            }
            
            // Ocultar la navegación principal si el usuario NO está conectado
            document.querySelectorAll('.main-nav').forEach(nav => nav.classList.add('hidden-nav'));
            
            // Proteger rutas privadas (redirigir al login si intenta entrar sin sesión)
            const currentPath = window.location.pathname;
            const protectedRoutes = ['chat.html', 'explorar.html', 'perfil.html', 'empleos-guardados.html', 'historial.html', 'configuracion.html'];
            const isProtected = protectedRoutes.some(route => currentPath.includes(route));
            
            if (isProtected) {
                window.location.href = 'login.html';
            }
        }
    });
});
