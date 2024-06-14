async function register() {
    const nameInput = document.querySelector('input[placeholder="Nombre"]').value;
    const surnameInput = document.querySelector('input[placeholder="Apellidos"]').value;
    const emailInput = document.querySelector('input[type="email"]').value;
    const passwordInput = document.querySelector('input[type="password"]').value;
    const confirmPasswordInput = document.querySelectorAll('input[type="password"]')[1].value;

    const mensajeError = document.getElementById('mensaje-error');

    // Verificar que todos los campos estén rellenados
    if (!nameInput || !surnameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
        mensajeError.innerText = "Por favor, rellena todos los campos.";
        return;
    }

    // Verificar que el email tiene "@"
    if (!emailInput.includes('@') || emailInput.includes('@.')) {
        mensajeError.innerText = "Introduce un email válido.";
        return;
    }

    // Verificar si el correo electrónico tiene '.com' o '.'
    if (!emailInput.includes('.com') && !emailInput.includes('.')) {
        mensajeError.innerText = "Introduce un email válido.";
        return;
    }

    // Verificar si el correo electrónico no termina en punto '.'
    if (!/^[^@]+@[^.]+\.[a-zA-Z]{2,}(?!\.)$/.test(emailInput)) {
        mensajeError.innerText = "El correo electrónico no es válido.";
        return;
    }

    // Verificar si hay dos o más puntos seguidos en el correo electrónico
    for (var i = 0; i < emailInput.length - 1; i++) {
        if (emailInput[i] === '.' && emailInput[i + 1] === '.') {
            mensajeError.innerText = "El correo electrónico no es válido.";
            return; // Detener la ejecución si hay dos o más puntos seguidos en el correo electrónico
        }
    }

    // Verificar si las contraseñas coinciden
    if (passwordInput !== confirmPasswordInput) {
        mensajeError.innerText = "Las contraseñas no coinciden.";
        return;
    }

    // Verificar que la contraseña tiene al menos 8 caracteres
    if (passwordInput.length < 8) {
        mensajeError.innerText = "La contraseña debe contener al menos 8 caracteres.";
        return;
    }

    const userData = {
        nombre: nameInput,
        apellido: surnameInput,
        correo: emailInput,
        contrasena: passwordInput,
        contrasenaConfirm: confirmPasswordInput
    };

    try {
        const response = await fetch('api/register.php', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (response.ok) {
            // Redirigir al usuario a la página de inicio de sesión
            window.location.href = "app/cliente/MisHuertos.html";
        } else {
            mensajeError.innerText = result.error;
        }
    } catch (error) {
        console.error('Error:', error);
        mensajeError.innerText = "Error al registrar el usuario. Por favor, inténtalo de nuevo.";
    }
}

function tengoCuenta() {
    // Aquí puedes cambiar la URL por la de la página a la que quieras redirigir al usuario
    window.location.href = "inicioSesion.html";
}
