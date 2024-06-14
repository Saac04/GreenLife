async function inicioSesion(event){
    event.preventDefault();

    const mensajeError = document.getElementById('mensaje-error');
    mensajeError.textContent = '';

    const formData = new FormData(event.target);

    var email = document.querySelector('input[type="email"]').value;
    var password = document.querySelector('input[type="password"]').value;

    var Objeto = JSON.stringify({ email, password });

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

        const data = await respuesta.json();

        if (respuesta.status === 200) {
            switch (data.rol) {
                case "0":
                    window.location.href = 'app/admin/gestionUsuarios.html';
                    break;
                case "1":
                    window.location.href = 'app/tecnico/ConsultasTecnico.html';
                    break;
                case "2":
                    window.location.href = 'app/cliente/MisHuertos.html';
                    break;
                default:
                    throw new Error('Rol de usuario no reconocido.');
            }
        } else {
            mensajeError.textContent = 'Por favor, introduzca su contraseña.';
            if(data.error === "Credenciales incorrectas") {
                throw new Error("Credenciales inválidas, por favor introdúcelas de nuevo.");
            } else {
                throw new Error(data.message || 'Respuesta no exitosa del servidor');
            }
        }
    } catch (error) {
        console.error('Error al procesar la respuesta:', error);
        mensajeError.textContent = error.message || 'Error al iniciar sesión. Por favor, inténtelo de nuevo.';
    }
}

class UsuarioModel{
    url = '../api/usuarios/';

}
function OlvidarContrasenya() {
    var popup = document.getElementById('miPopup');
    // Verificar si el estilo 'display' está configurado como 'block'
    if (popup.style.display === 'block') {
        popup.style.display = 'none';
    } else {
        popup.style.display = 'block';
    }
}

function CodigoInvitado() {
    var popup = document.getElementById('miPopup2');
    // Verificar si el estilo 'display' está configurado como 'block'
    if (popup.style.display === 'block') {
        popup.style.display = 'none';
    } else {
        popup.style.display = 'block';
    }
}
