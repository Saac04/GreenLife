// Función para mostrar un pop-up con el horario de atención al cliente
function mostrarHorario() {
    alert('Horario de Atención al Cliente:\nLunes - Viernes: 10:00 - 20:00\nSábado: 10:00 - 14:00\nDomingo: Cerrado');
}

// Evento que se ejecuta cuando el DOM está completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Obtener elementos del formulario y del mensaje
    const formulario = document.getElementById("formulario-consulta");
    const nombreInput = document.getElementById("nombre");
    const apellidosInput = document.getElementById("apellidos");
    const problemaTextarea = document.getElementById("problema");
    const destinatarioSelect = document.getElementById("destinatario");
    const mensaje = document.getElementById("mensaje");

    // Agregar un evento de envío al formulario
    formulario.addEventListener("submit", function(event) {
        // Evitar que el formulario se envíe de manera predeterminada
        event.preventDefault();

        // Verificar si se han completado todos los campos y se ha seleccionado un destinatario
        if (!nombreInput.value.trim() || !apellidosInput.value.trim() || !problemaTextarea.value.trim() || !destinatarioSelect.value) {
            // Mostrar un mensaje de error si algún campo está vacío
            mensaje.textContent = "Por favor, completa todos los campos y selecciona un destinatario.";
            mensaje.style.color = "red";
        } else {
            // Mostrar un mensaje de éxito si todos los campos están completos
            mensaje.textContent = "La consulta se ha enviado correctamente.";
            mensaje.style.color = "green";

            // Limpiar los campos del formulario después de enviar
            formulario.reset();
        }
    });
});

// FAQ

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        this.parentElement.classList.toggle("active");

        var pannel = this.nextElementSibling;

        if (pannel.style.display === "block") {
            pannel.style.display = "none";
        } else {
            pannel.style.display = "block";
        }
    });
}