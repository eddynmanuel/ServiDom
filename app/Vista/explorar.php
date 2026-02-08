<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Explorar Anuncios - ServiDom</title>
    <link rel="stylesheet" href="../../public/css/explorar.css">
</head>
<body>
    <!-- Header con navegación unificada -->
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
                <a href="catalogo-auth.php" class="nav-item">
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
                <a href="explorar.php" class="nav-item active">
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
                    <div class="notif-list" id="notif-list"></div>
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

    <main class="explorar-layout">
        <!-- Sidebar de Filtros -->
        <aside class="filtros-sidebar">
            <div class="sidebar-header">
                <h2>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </svg>
                    Filtros
                </h2>
                <button class="btn-limpiar" onclick="limpiarFiltros()">Limpiar</button>
            </div>
            
            <!-- Búsqueda -->
            <div class="filtro-group">
                <label>Buscar anuncio</label>
                <div class="search-input">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input type="text" id="buscar-anuncio" placeholder="Ej: plomería, electricidad...">
                </div>
            </div>
            
            <!-- Categoría -->
            <div class="filtro-group">
                <label>Categoría</label>
                <select id="filtro-categoria">
                    <option value="">Todas las categorías</option>
                    <option value="plomeria">🔧 Plomería</option>
                    <option value="electricidad">⚡ Electricidad</option>
                    <option value="limpieza">🧹 Limpieza</option>
                    <option value="pintura">🎨 Pintura</option>
                    <option value="jardineria">🌱 Jardinería</option>
                    <option value="electrodomesticos">📺 Electrodomésticos</option>
                    <option value="carpinteria">🪚 Carpintería</option>
                    <option value="otros">📦 Otros</option>
                </select>
            </div>
            
            <!-- Ubicación -->
            <div class="filtro-group">
                <label>Ubicación</label>
                <select id="filtro-ubicacion">
                    <option value="">Todas las ubicaciones</option>
                    <option value="bogota">Bogotá</option>
                    <option value="medellin">Medellín</option>
                    <option value="cali">Cali</option>
                    <option value="barranquilla">Barranquilla</option>
                    <option value="cartagena">Cartagena</option>
                </select>
            </div>
            
            <!-- Rango de precio -->
            <div class="filtro-group">
                <label>Rango de precio</label>
                <div class="precio-range">
                    <input type="number" id="precio-min" placeholder="Mín">
                    <span>-</span>
                    <input type="number" id="precio-max" placeholder="Máx">
                </div>
            </div>
            
            <!-- Urgencia -->
            <div class="filtro-group">
                <label>Urgencia</label>
                <div class="checkbox-group">
                    <label class="checkbox-item">
                        <input type="checkbox" id="urgente" value="urgente">
                        <span class="checkmark"></span>
                        <span class="urgente-badge">🔥 Urgente</span>
                    </label>
                    <label class="checkbox-item">
                        <input type="checkbox" id="flexible" value="flexible">
                        <span class="checkmark"></span>
                        <span>Flexible</span>
                    </label>
                </div>
            </div>
            
            <!-- Ordenar por -->
            <div class="filtro-group">
                <label>Ordenar por</label>
                <select id="ordenar-por">
                    <option value="reciente">Más recientes</option>
                    <option value="precio-asc">Menor precio</option>
                    <option value="precio-desc">Mayor precio</option>
                    <option value="cercanos">Más cercanos</option>
                </select>
            </div>
            
            <button class="btn-aplicar" onclick="aplicarFiltros()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Aplicar Filtros
            </button>
        </aside>

        <!-- Área de Anuncios -->
        <section class="anuncios-area">
            <div class="anuncios-header">
                <div class="header-info">
                    <h1>Anuncios Disponibles</h1>
                    <p id="total-anuncios">Cargando anuncios...</p>
                </div>
                <div class="view-toggle">
                    <button class="view-btn active" data-view="grid" title="Vista cuadrícula">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                    </button>
                    <button class="view-btn" data-view="list" title="Vista lista">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="8" y1="6" x2="21" y2="6"></line>
                            <line x1="8" y1="12" x2="21" y2="12"></line>
                            <line x1="8" y1="18" x2="21" y2="18"></line>
                            <line x1="3" y1="6" x2="3.01" y2="6"></line>
                            <line x1="3" y1="12" x2="3.01" y2="12"></line>
                            <line x1="3" y1="18" x2="3.01" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>
            
            <!-- Grid de anuncios -->
            <div class="anuncios-grid" id="anuncios-grid">
                <!-- Se cargan dinámicamente -->
            </div>
            
            <!-- Estado vacío -->
            <div class="empty-state" id="empty-state" style="display: none;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <h3>No se encontraron anuncios</h3>
                <p>Intenta ajustar los filtros de búsqueda</p>
            </div>
        </section>
    </main>

    <!-- Modal de detalle de anuncio -->
    <div class="modal" id="modal-detalle" style="display: none;">
        <div class="modal-content">
            <button class="btn-cerrar-modal" onclick="cerrarModal()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div id="modal-body">
                <!-- Contenido del anuncio -->
            </div>
        </div>
    </div>

    <script src="../../public/js/tema-global.js"></script>
    <script src="../Controlador/explorar.js"></script>
</body>
</html>
