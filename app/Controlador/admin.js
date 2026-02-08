// Datos simulados del sistema
const anunciosSimulados = [
    { id: 1, titulo: 'Se necesita carpintero', descripcion: 'Busco carpintero para muebles de cocina.', cliente: 'María López', categoria: 'carpinteria', fecha: '2026-02-01' },
    { id: 2, titulo: 'Soldador con experiencia', descripcion: 'Empresa requiere soldador industrial.', cliente: 'Carlos Empresa SAC', categoria: 'soldadura', fecha: '2026-02-02' },
    { id: 3, titulo: 'Mecánico automotriz', descripcion: 'Taller busca mecánico.', cliente: 'Auto Taller Peru', categoria: 'mecanica', fecha: '2026-02-03' },
    { id: 4, titulo: 'Gasfitero urgente', descripcion: 'Reparación de tuberías.', cliente: 'Juan Pérez', categoria: 'gasfiteria', fecha: '2026-02-04' }
];

const clientesSimulados = [
    { id: 1, nombre: 'María López', email: 'maria@email.com', telefono: '999111222', dni: '12345678', fechaRegistro: '2026-01-15' },
    { id: 2, nombre: 'Juan Pérez', email: 'cliente@servidom.com', telefono: '999333444', dni: '87654321', fechaRegistro: '2026-01-20' },
    { id: 3, nombre: 'Ana García', email: 'ana@email.com', telefono: '999555666', dni: '11223344', fechaRegistro: '2026-01-25' }
];

const trabajadoresSimulados = [
    { id: 1, nombre: 'Carlos García', email: 'trabajador@servidom.com', telefono: '988111222', dni: '44556677', ocupacion: 'Carpintero', fechaRegistro: '2026-01-10' },
    { id: 2, nombre: 'Pedro López', email: 'pedro@email.com', telefono: '988333444', dni: '55667788', ocupacion: 'Soldador', fechaRegistro: '2026-01-12' },
    { id: 3, nombre: 'Miguel Rodríguez', email: 'miguel@email.com', telefono: '988555666', dni: '66778899', ocupacion: 'Mecánico', fechaRegistro: '2026-01-18' }
];

const solicitudesSimuladas = [
    { id: 1, anuncio: 'Se necesita carpintero', trabajador: 'Carlos García', fecha: '2026-02-02', estado: 'Pendiente' },
    { id: 2, anuncio: 'Soldador con experiencia', trabajador: 'Pedro López', fecha: '2026-02-03', estado: 'Aprobada' },
    { id: 3, anuncio: 'Mecánico automotriz', trabajador: 'Miguel Rodríguez', fecha: '2026-02-04', estado: 'Pendiente' }
];

document.addEventListener('DOMContentLoaded', function() {
    verificarAdmin();
    cargarAnuncios();
    cargarClientes();
    cargarTrabajadores();
    cargarSolicitudes();
});

function verificarAdmin() {
    const usuario = localStorage.getItem('usuario_logueado');
    if (!usuario) {
        window.location.href = 'login.html';
        return;
    }
    const datos = JSON.parse(usuario);
    // Solo admin puede acceder
    if (datos.email !== 'admin@servidom.com') {
        alert('Acceso denegado. Solo administradores pueden acceder.');
        window.location.href = 'catalogo-auth.html';
        return;
    }
    document.getElementById('admin-nombre').textContent = datos.nombre;
}

function mostrarSeccion(seccion) {
    // Ocultar todas las secciones
    document.querySelectorAll('.admin-seccion').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    
    // Mostrar sección seleccionada
    document.getElementById('seccion-' + seccion).classList.add('active');
    event.target.classList.add('active');
}

function cargarAnuncios() {
    const lista = document.getElementById('lista-anuncios-admin');
    let todosAnuncios = [...anunciosSimulados];
    const guardados = JSON.parse(localStorage.getItem('anuncios_empleo')) || [];
    todosAnuncios = [...todosAnuncios, ...guardados];
    
    lista.innerHTML = `
        <table class="admin-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Cliente</th>
                    <th>Categoría</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${todosAnuncios.map(a => `
                    <tr>
                        <td>${a.id}</td>
                        <td>${a.titulo}</td>
                        <td>${a.cliente}</td>
                        <td>${a.categoria}</td>
                        <td>${a.fecha || 'Reciente'}</td>
                        <td>
                            <button class="btn-ver" onclick="verDetalleAnuncio(${a.id})">Ver</button>
                            <button class="btn-eliminar" onclick="eliminarAnuncio(${a.id})">Eliminar</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function cargarClientes() {
    const lista = document.getElementById('lista-clientes-admin');
    let todosClientes = [...clientesSimulados];
    const registrados = JSON.parse(localStorage.getItem('usuarios_registrados')) || [];
    const clientesReg = registrados.filter(u => u.tipo === 'cliente');
    todosClientes = [...todosClientes, ...clientesReg];
    
    lista.innerHTML = `
        <table class="admin-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>DNI</th>
                    <th>Registro</th>
                </tr>
            </thead>
            <tbody>
                ${todosClientes.map((c, i) => `
                    <tr>
                        <td>${c.id || i+1}</td>
                        <td>${c.nombre}</td>
                        <td>${c.email}</td>
                        <td>${c.telefono || 'N/A'}</td>
                        <td>${c.dni || 'N/A'}</td>
                        <td>${c.fechaRegistro || 'Reciente'}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function cargarTrabajadores() {
    const lista = document.getElementById('lista-trabajadores-admin');
    let todosTrabajadores = [...trabajadoresSimulados];
    const registrados = JSON.parse(localStorage.getItem('usuarios_registrados')) || [];
    const trabajadoresReg = registrados.filter(u => u.tipo === 'trabajador');
    todosTrabajadores = [...todosTrabajadores, ...trabajadoresReg];
    
    lista.innerHTML = `
        <table class="admin-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Ocupación</th>
                    <th>Teléfono</th>
                    <th>Registro</th>
                </tr>
            </thead>
            <tbody>
                ${todosTrabajadores.map((t, i) => `
                    <tr>
                        <td>${t.id || i+1}</td>
                        <td>${t.nombre}</td>
                        <td>${t.email}</td>
                        <td>${t.ocupacion || 'N/A'}</td>
                        <td>${t.telefono || 'N/A'}</td>
                        <td>${t.fechaRegistro || 'Reciente'}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function cargarSolicitudes() {
    const lista = document.getElementById('lista-solicitudes-admin');
    let todasSolicitudes = [...solicitudesSimuladas];
    const guardadas = JSON.parse(localStorage.getItem('solicitudes_empleo')) || [];
    todasSolicitudes = [...todasSolicitudes, ...guardadas.map((s, i) => ({
        id: solicitudesSimuladas.length + i + 1,
        anuncio: 'Anuncio #' + s.anuncioId,
        trabajador: s.trabajador,
        fecha: s.fecha ? s.fecha.split('T')[0] : 'Reciente',
        estado: 'Pendiente'
    }))];
    
    lista.innerHTML = `
        <table class="admin-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Anuncio</th>
                    <th>Trabajador</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${todasSolicitudes.map(s => `
                    <tr>
                        <td>${s.id}</td>
                        <td>${s.anuncio}</td>
                        <td>${s.trabajador}</td>
                        <td>${s.fecha}</td>
                        <td><span class="estado-${s.estado.toLowerCase()}">${s.estado}</span></td>
                        <td>
                            <button class="btn-aprobar" onclick="aprobarSolicitud(${s.id})">Aprobar</button>
                            <button class="btn-rechazar" onclick="rechazarSolicitud(${s.id})">Rechazar</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function verDetalleAnuncio(id) {
    alert('Mostrando detalle del anuncio #' + id);
}

function eliminarAnuncio(id) {
    if (confirm('¿Estás seguro de eliminar este anuncio?')) {
        alert('Anuncio #' + id + ' eliminado');
        // En producción eliminaría del localStorage
    }
}

function aprobarSolicitud(id) {
    alert('Solicitud #' + id + ' aprobada');
}

function rechazarSolicitud(id) {
    if (confirm('¿Rechazar esta solicitud?')) {
        alert('Solicitud #' + id + ' rechazada');
    }
}

function cerrarSesionAdmin() {
    localStorage.removeItem('usuario_logueado');
    window.location.href = 'catalogo.html';
}
