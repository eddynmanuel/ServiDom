function mostrarUsuarios() {
    var categoriaSeleccionada = document.getElementById("categorias").value;
    var perfiles = document.querySelectorAll(".perfiles > div");
    
    // Ocultar todos los perfiles
    perfiles.forEach(function(perfil) {
        perfil.style.display = "none";
    });
    
    // Mostrar perfiles de la categoría seleccionada
    if (categoriaSeleccionada) {
        var perfilMostrar = document.getElementById("usuarios_" + categoriaSeleccionada);
        if (perfilMostrar) {
            perfilMostrar.style.display = "block";
        }
    }
}

function irAPerfil(nombreUsuario) {
    // Aquí puedes implementar la lógica para redirigir al perfil del usuario
    console.log("Redirigir al perfil de " + nombreUsuario);
    // Ejemplo de redirección a una página de perfil
    // window.location.href = "perfil.html?usuario=" + nombreUsuario;
}