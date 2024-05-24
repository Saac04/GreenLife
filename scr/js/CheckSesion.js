window.onload = function() {
    // Realizar una solicitud AJAX al script PHP
    fetch('../../api/recursos/check_session.php')
        .then(response => response.json()) // Procesar la respuesta como JSON
        .then(data => {
            if (!data.session_exists) {
                // Si no hay sesión, redirigir al login
                window.location.href = '../../inicioSesion.html';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

    // Forzar la recarga de la página al utilizar la navegación hacia atrás del navegador
    if (performance.navigation.type === 2) {
        window.location.reload(true);
    }
};