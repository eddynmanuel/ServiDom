<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro - ServiDom</title>
    <link rel="stylesheet" href="../../public/css/registro.css">
</head>
<body>
    <div class="registro-container">
        <div class="registro-card">
            <div class="registro-header">
                <div class="logo">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <span>ServiDom</span>
                </div>
                <h1>Crear Cuenta</h1>
                <p>Selecciona el tipo de cuenta que deseas crear</p>
            </div>
            
            <div class="tipo-buttons">
                <button class="tipo-btn" onclick="window.location.href='registro-cliente.php'">
                    <div class="tipo-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                    <div class="tipo-info">
                        <h3>Soy Cliente</h3>
                        <p>Busco profesionales para mi hogar o negocio</p>
                    </div>
                    <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
                
                <button class="tipo-btn" onclick="window.location.href='registro-trabajador.php'">
                    <div class="tipo-icon trabajador">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                        </svg>
                    </div>
                    <div class="tipo-info">
                        <h3>Soy Trabajador</h3>
                        <p>Ofrezco mis servicios profesionales</p>
                    </div>
                    <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
            
            <div class="registro-footer">
                <p>¿Ya tienes cuenta? <a href="login.php">Inicia Sesión</a></p>
                <a href="catalogo.php" class="back-link">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Volver al catálogo
                </a>
            </div>
        </div>
    </div>
    <script src="../Controlador/registro.js"></script>
</body>
</html>