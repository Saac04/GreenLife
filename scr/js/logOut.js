async function logOut(){

    try {
        const respuesta = await fetch('../../api/sesion/', {
            method: 'DELETE'

        });
        console.log('Código de estado:', respuesta.status);

        if (respuesta.status === 200) {
            // Procesa los datos
            window.location.href = '../../index.html';
        } else {
            // La respuesta no es 200-299
            throw new Error('Respuesta no exitosa del servidor');
        }
    } catch (error) {
        console.error('Error al procesar la respuesta:', error);
        // Aquí puedes manejar el error, mostrar un mensaje al usuario, etc.
        document.getElementById("login-error").style.visibility='visible';
        document.getElementById("login-error").innerText = 'Error al iniciar sesión. Por favor, inténtelo de nuevo.';
    }

}