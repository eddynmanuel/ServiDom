// Datos simulados de anuncios de empleo (creados por clientes)
const anunciosSimulados = [
    { id: 1, titulo: 'Se necesita carpintero', descripcion: 'Busco carpintero para elaboración de muebles de cocina. Trabajo en Lima. Pago: S/. 100 por día. Experiencia mínima 2 años.', cliente: 'María López', categoria: 'carpinteria' },
    { id: 2, titulo: 'Soldador con experiencia', descripcion: 'Empresa requiere soldador para trabajos industriales. Tiempo completo. Sueldo: S/. 2500 mensual. Conocimiento en soldadura MIG/TIG.', cliente: 'Carlos Empresa SAC', categoria: 'soldadura' },
    { id: 3, titulo: 'Mecánico automotriz', descripcion: 'Taller busca mecánico con experiencia en autos japoneses. Horario flexible. Incluye herramientas y uniforme.', cliente: 'Auto Taller Peru', categoria: 'mecanica' },
    { id: 4, titulo: 'Gasfitero urgente', descripcion: 'Necesito gasfitero para reparación de tuberías en domicilio. Zona Miraflores. Pago al contado S/. 150.', cliente: 'Juan Pérez', categoria: 'gasfiteria' }
];

// Cargar anuncios al iniciar
document.addEventListener('DOMContentLoaded', function() {
    cargarAnuncios();
});

function cargarAnuncios() {
    const listaAnuncios = document.getElementById('lista-anuncios');
    if (!listaAnuncios) return;
    
    // Combinar anuncios simulados con los guardados en localStorage
    let todosAnuncios = [...anunciosSimulados];
    const anunciosGuardados = JSON.parse(localStorage.getItem('anuncios_empleo')) || [];
    todosAnuncios = [...todosAnuncios, ...anunciosGuardados];
    
    listaAnuncios.innerHTML = '';
    
    todosAnuncios.forEach(function(anuncio) {
        const div = document.createElement('div');
        div.className = 'anuncio';
        div.innerHTML = `
            <h3>${anuncio.titulo}</h3>
            <p>${anuncio.descripcion}</p>
            <p><small>Publicado por: ${anuncio.cliente}</small></p>
            <p><small>Categoría: ${anuncio.categoria}</small></p>
            <button class="solicitar-trabajo" onclick="intentarPostular(${anuncio.id})">Postular a este empleo</button>
        `;
        listaAnuncios.appendChild(div);
    });
}

function intentarPostular(anuncioId) {
    // Mostrar aviso de que debe registrarse o iniciar sesión
    if (confirm('Para postular a este empleo debes registrarte o iniciar sesión.\n\n¿Deseas ir a la página de inicio de sesión?')) {
        window.location.href = 'login.php';
    }
}

function abrirCategoria(categoria) {
    // Guardar categoría seleccionada y redirigir a trabajadores.php
    localStorage.setItem('categoria_seleccionada', categoria);
    window.location.href = 'trabajadores.php?categoria=' + categoria;
}

function abrirPagina(url) {
    window.location.href = url;
}