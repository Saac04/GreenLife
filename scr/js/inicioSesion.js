document.getElementById("login-container").addEventListener('submit', inicioSesion);

/**
 * Se ejecutará cuando se envíe el formulario.
 * Puesto que se usa fetch, es una función asíncrona
 * @param event Objeto con información del evento.
 */

/**
 * Obtiene todos los usuarios
 * @returns {Promise<any|boolean>}
 */

async function inicioSesion(event){
    event.preventDefault();

    // Obtener referencia al elemento de mensaje de error
    const mensajeError = document.getElementById('mensaje-error');
    // Limpiar mensaje de error previo
    mensajeError.textContent = '';

    const formData = new FormData(event.target);

    var email = document.querySelector('input[type="email"]').value;
    var password = document.querySelector('input[type="password"]').value;

    console.log(JSON.stringify({ email, password }))

    var Objeto = JSON.stringify({ email, password })

    // Validar campos vacíos
    if (!email) {
        mensajeError.textContent = 'Por favor, introduzca su correo electrónico.';
        return;
    }

    if (!password) {
        mensajeError.textContent = 'Por favor, introduzca su contraseña.';
        return;
    }

    try {
        const respuesta = await fetch('api/sesion/', {
            method: 'POST',
            body: Objeto,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Código de estado:', respuesta.status);

        const respuestaTexto = await respuesta.text(); // Obtener el texto de la respuesta

        console.log('Respuesta del servidor:', respuestaTexto); // Registrar la respuesta del servidor

        if (respuesta.status === 200) {
            // Procesa los datos
            console.log("Mis_Hue...html")
            window.location.href = 'app/cliente/MisHuertos.html';
        } else {
            mensajeError.textContent = 'Por favor, introduzca su contraseña.'
            // La respuesta no es 200-299
            const data = (respuestaTexto); // Intenta analizar la respuesta como JSON
            if(data.error === "Credenciales incorrectas") {
                throw new Error("Credenciales inválidas, por favor introdúcelas de nuevo.");
            } else {
                throw new Error(data.message || 'Respuesta no exitosa del servidor');
            }
        }
    } catch (error) {
        console.error('Error al procesar la respuesta:', error);
        // Mostrar mensaje de error al usuario
        mensajeError.textContent = error.message || 'Error al iniciar sesión. Por favor, inténtelo de nuevo.';
    }
}

class UsuarioModel{
    url = '../api/usuarios/';
}
