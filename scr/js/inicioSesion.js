function iniciarSesion() {
    var emailInput = document.querySelector('input[type="email"]').value;
    var passwordInput = document.querySelector('input[type="password"]').value;

    // Definir los usuarios válidos
    var usuariosValidos = [
        { correo: "soytecnico@gmail.com", contraseña: "hola1234" },
        { correo: "soyusuario@gmail.com", contraseña: "hola1234" },
        { correo: "soyadministrador@gmail.com", contraseña: "hola1234" }
    ];

    // Verificar si las credenciales coinciden con algún usuario válido
    var usuarioEncontrado = usuariosValidos.find(function(usuario) {
        return usuario.correo === emailInput && usuario.contraseña === passwordInput;
    });

    var mensajeError = document.getElementById('mensaje-error');

    if (usuarioEncontrado) {
        // Redirigir al usuario a una página en el futuro
        // Aquí puedes cambiar la URL por la de la página a la que quieras redirigir al usuario
        window.location.href = "pagina_futura.html";
    } else {
        // Credenciales inválidas
        mensajeError.innerText = "Credenciales inválidas. Por favor, inténtelo de nuevo.";
    }
}

function registrarse() {
    // Aquí puedes cambiar la URL por la de la página a la que quieras redirigir al usuario
    window.location.href = "pagina_registrarse.html";
}

function volver() {
    // Aquí puedes cambiar la URL por la de la página a la que quieras redirigir al usuario
    window.location.href = "pagina_volver.html";
}
