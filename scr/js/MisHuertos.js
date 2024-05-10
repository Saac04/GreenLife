// Función para inicializar los eventos de eliminación
function inicializarEliminacion() {
    // Obtener todos los botones de eliminar
    var botonesEliminar = document.querySelectorAll('.boton-eliminar');

    // Asignar el evento de clic a cada botón
    botonesEliminar.forEach(function(boton) {
        boton.addEventListener('click', function(event) {
            // Obtener el huerto específico que se va a eliminar
            var huerto = boton.closest('.huerto');

            // Mostrar el popup de confirmación
            var confirmacion = confirm('¿Estás seguro de que quieres eliminar este huerto?');

            // Si el usuario confirma la eliminación
            if (confirmacion) {
                // Eliminar el huerto
                huerto.remove();
            }
            // Si el usuario cancela, simplemente cerrar el popup
        });
    });
}

// Esperar a que el DOM esté completamente cargado antes de inicializar los eventos
document.addEventListener('DOMContentLoaded', inicializarEliminacion);
// Función para inicializar los eventos de edición de nombre
function inicializarEdicionNombre() {
    // Obtener todos los botones de editar nombre
    var botonesEditar = document.querySelectorAll('.boton-editar');

    // Asignar el evento de clic a cada botón
    botonesEditar.forEach(function(boton) {
        boton.addEventListener('click', function(event) {
            // Obtener el huerto específico que se va a editar
            var huerto = boton.closest('.huerto');
            var nombreHuerto = huerto.querySelector('p'); // Asumiendo que el nombre está en un <p>

            // Pedir al usuario el nuevo nombre del huerto
            var nuevoNombre = prompt('Introduce el nuevo nombre para el huerto:', nombreHuerto.textContent);

            // Si el usuario introduce un nombre, actualizar el nombre del huerto
            if (nuevoNombre) {
                nombreHuerto.textContent = nuevoNombre;
            }
        });
    });
}

// Añadir esta nueva función al evento 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', function() {
    inicializarEliminacion();
    inicializarEdicionNombre();
});
