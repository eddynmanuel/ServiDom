<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Categoría - ServiDom</title>
    <link rel="stylesheet" href="../../public/css/catalogo-auth.css">
    <link rel="stylesheet" href="../../public/css/categoria.css">
</head>
<body>
    <!-- Header con navegación y perfil -->
    <header class="main-header">
        <div class="header-left">
            <div class="logo">
                <svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>ServiDom</span>
            </div>
            
            <!-- Navegación Principal -->
            <nav class="main-nav">
                <a href="catalogo-auth.php" class="nav-item active">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <span>Inicio</span>
                </a>
                <a href="chat.php" class="nav-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span>Mensajes</span>
                </a>
                <a href="explorar.php" class="nav-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    <span>Explorar</span>
                </a>
            </nav>
        </div>
        
        <div class="header-actions">
            <!-- Notificaciones -->
            <div class="notif-container">
                <button class="icon-btn" id="notif-btn" title="Notificaciones">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    <span class="notification-badge">3</span>
                </button>
                <div class="notif-dropdown" id="notif-dropdown">
                    <div class="notif-header">
                        <h3>Notificaciones</h3>
                        <button onclick="marcarTodasLeidas()">Marcar leídas</button>
                    </div>
                    <div class="notif-list" id="notif-list">
                        <!-- Se cargan dinámicamente -->
                    </div>
                </div>
            </div>
            
            <!-- Perfil -->
            <div class="perfil-container">
                <button class="perfil-btn" id="perfil-btn">
                    <div class="avatar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                    <span class="nombre-perfil" id="nombre-usuario">Usuario</span>
                    <svg class="dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>
                
                <div class="dropdown-menu" id="dropdown">
                    <a href="perfil-personal.php" class="dropdown-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <span>Mi Perfil</span>
                    </a>
                    
                    <!-- Selector de Tema Desplegable -->
                    <div class="dropdown-submenu" id="tema-submenu">
                        <div class="dropdown-item submenu-trigger" onclick="toggleTemaSubmenu(event)">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                            </svg>
                            <span>Cambiar Tema</span>
                            <svg class="submenu-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </div>
                        <div class="submenu-content" id="submenu-tema">
                            <button class="tema-option" data-tema="oscuro" onclick="cambiarTemaDropdown('oscuro')">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                </svg>
                                <span>Oscuro</span>
                            </button>
                            <button class="tema-option" data-tema="claro" onclick="cambiarTemaDropdown('claro')">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="5"></circle>
                                    <line x1="12" y1="1" x2="12" y2="3"></line>
                                    <line x1="12" y1="21" x2="12" y2="23"></line>
                                </svg>
                                <span>Claro</span>
                            </button>
                            <button class="tema-option" data-tema="auto" onclick="cambiarTemaDropdown('auto')">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                    <line x1="8" y1="21" x2="16" y2="21"></line>
                                    <line x1="12" y1="17" x2="12" y2="21"></line>
                                </svg>
                                <span>Sistema</span>
                            </button>
                        </div>
                    </div>
                    
                    <div class="dropdown-divider"></div>
                    
                    <a href="empleos-guardados.php" class="dropdown-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <span>Empleos Guardados</span>
                    </a>
                    <a href="historial.php" class="dropdown-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>Historial</span>
                    </a>
                    <a href="configuracion.php" class="dropdown-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                        </svg>
                        <span>Configuración</span>
                    </a>
                    
                    <div class="dropdown-divider"></div>
                    
                    <a href="#" class="dropdown-item logout" onclick="cerrarSesion()">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        <span>Cerrar Sesión</span>
                    </a>
                </div>
            </div>
        </div>
    </header>

    <main class="categoria-main">
        <!-- Botón Volver -->
        <a href="catalogo-auth.php" class="btn-volver">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Volver al catálogo
        </a>

        <!-- Header de categoría -->
        <div class="categoria-header">
            <div class="categoria-icon" id="categoria-icon"></div>
            <div class="categoria-info">
                <h1 id="categoria-titulo">Cargando...</h1>
                <p id="categoria-descripcion">Cargando contenido...</p>
            </div>
        </div>

        <!-- Barra de búsqueda y filtros -->
        <div class="filtros-bar">
            <div class="search-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input type="text" id="buscar" placeholder="Buscar...">
            </div>
            <div class="filtros-grupo">
                <select id="filtro-orden">
                    <option value="relevancia">Más relevantes</option>
                    <option value="rating">Mejor valorados</option>
                    <option value="precio-asc">Precio: menor a mayor</option>
                    <option value="precio-desc">Precio: mayor a menor</option>
                    <option value="reciente">Más recientes</option>
                </select>
                <div class="filtro-toggle" id="solo-disponibles">
                    <input type="checkbox" id="check-disponibles" checked>
                    <label for="check-disponibles">Solo disponibles</label>
                </div>
            </div>
        </div>

        <!-- Contenedor principal de resultados -->
        <div class="resultados-container">
            <div class="resultados-count" id="resultados-count">Cargando...</div>
            <div class="resultados-grid" id="resultados-grid">
                <!-- Se llena dinámicamente -->
            </div>
            <div class="empty-state" id="empty-state" style="display: none;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                <h3>No hay resultados</h3>
                <p id="empty-message">No se encontraron elementos en esta categoría.</p>
            </div>
        </div>
    </main>

    <!-- Modal de detalle -->
    <div class="modal-detalle" id="modal-detalle">
        <div class="modal-content" id="modal-content">
            <!-- Se llena dinámicamente -->
        </div>
    </div>

    <script src="../Controlador/categoria.js"></script>
</body>
</html>
