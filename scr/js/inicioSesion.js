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
    // eliminamos el mensaje de error previo, si lo hay
    //const output = document.getElementById("login-error");
    event.preventDefault();


    const formData = new FormData(event.target);
    /*for (const entry of formData.entries()) {

        console.log(entry[0], entry[1]);
    }*/

    var email = document.querySelector('input[type="email"]').value;
    var password = document.querySelector('input[type="password"]').value;

    //const email = formData.get('email');
    //const password = formData.get('password');
    console.log(JSON.stringify({ email, password }))

    var Objeto = JSON.stringify({ email, password })


    try {
        const respuesta = await fetch('api/sesion/', {
            method: 'POST',
            body: Objeto,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Código de estado:', respuesta.status);

        if (respuesta.status === 200) {
            // Procesa los datos
            console.log("Mis_Hue...html")
            window.location.href = 'app/cliente/MisHuertos.html';
        } else {
            // La respuesta no es 200-299
            throw new Error('Respuesta no exitosa del servidor');
        }
    } catch (error) {
        console.error('Error al procesar la respuesta:', error);
        // Aquí puedes manejar el error, mostrar un mensaje al usuario, etc.
        //document.getElementById("login-error").style.visibility='visible';
        //document.getElementById("login-error").innerText = 'Error al iniciar sesión. Por favor, inténtelo de nuevo.';
    }
}
class UsuarioModel{

    url = '../api/usuarios/';

}
function OlvidarContrasenya() {
    var popup = document.getElementById('miPopup');
    popup.style.display = (popup.style.display === 'none') ? 'block' : 'none';
}
function CodigoInvitado() {
    var popup = document.getElementById('miPopup2');
    popup.style.display = (popup.style.display === 'none') ? 'block' : 'none';
}
