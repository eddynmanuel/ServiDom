<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Administración - ServiDom</title>
    <link rel="stylesheet" href="../../public/css/admin.css">
</head>
<body>
    <div class="admin-container">
        <div class="admin-header">
            <h1>Panel de Administración</h1>
            <div class="admin-info">
                <span id="admin-nombre">Administrador</span>
                <button onclick="cerrarSesionAdmin()">Cerrar Sesión</button>
            </div>
        </div>
        
        <div class="admin-tabs">
            <button class="tab-btn active" onclick="mostrarSeccion('anuncios')">Anuncios de Empleo</button>
            <button class="tab-btn" onclick="mostrarSeccion('clientes')">Clientes</button>
            <button class="tab-btn" onclick="mostrarSeccion('trabajadores')">Trabajadores</button>
            <button class="tab-btn" onclick="mostrarSeccion('solicitudes')">Solicitudes</button>
        </div>
        
        <!-- Sección Anuncios -->
        <div id="seccion-anuncios" class="admin-seccion active">
            <h2>Monitoreo de Anuncios de Empleo</h2>
            <div id="lista-anuncios-admin"></div>
        </div>
        
        <!-- Sección Clientes -->
        <div id="seccion-clientes" class="admin-seccion">
            <h2>Usuarios Clientes Registrados</h2>
            <div id="lista-clientes-admin"></div>
        </div>
        
        <!-- Sección Trabajadores -->
        <div id="seccion-trabajadores" class="admin-seccion">
            <h2>Usuarios Trabajadores Registrados</h2>
            <div id="lista-trabajadores-admin"></div>
        </div>
        
        <!-- Sección Solicitudes -->
        <div id="seccion-solicitudes" class="admin-seccion">
            <h2>Solicitudes de Empleo</h2>
            <div id="lista-solicitudes-admin"></div>
        </div>
    </div>
    <script src="../Controlador/admin.js"></script>
</body>
</html>