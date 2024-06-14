// Lista de asuntos predefinidos
var listaAsuntos = [
    "Problemas de inicio de sesión",
    "Dudas sobre productos",
    "Solicitud de información",
    "Consulta sobre envíos",
    "Problemas técnicos",
    "Otro"
];

// Objeto de consultas relacionadas con cada asunto
var consultasRelacionadas = {
    "Problemas de inicio de sesión": [
        "No puedo iniciar sesión en mi cuenta",
        "Olvidé mi contraseña, ¿cómo puedo recuperarla?",
        "El sistema no reconoce mi dirección de correo electrónico"
    ],
    "Dudas sobre productos": [
        "Quiero saber más sobre las características del producto X",
        "¿El producto Y está disponible en otros colores?",
        "¿Cuál es el precio del producto Z?"
    ],
    "Solicitud de información": [
        "¿Pueden proporcionarme información sobre sus servicios?",
        "¿Cómo puedo contactar con su servicio de atención al cliente?",
        "¿Cuáles son sus horas de atención?"
    ],
    "Consulta sobre envíos": [
        "¿Cuál es el tiempo estimado de entrega para mi pedido?",
        "¿Puedo realizar un seguimiento de mi pedido?",
        "¿Qué debo hacer si mi pedido no llega a tiempo?"
    ],
    "Problemas técnicos": [
        "Mi página web no se muestra correctamente en algunos navegadores",
        "Recibo errores al intentar procesar pagos en mi tienda en línea",
        "¿Cómo puedo optimizar el rendimiento de mi sitio web?"
    ],
    "Otro": [
        "Tengo una consulta que no se encuentra en las opciones anteriores",
        "¿Pueden ayudarme con un problema no especificado?",
        "Necesito hablar con un representante sobre un tema personalizado"
    ]
};

var listaNombres = [
    "Sofía",
    "Juan",
    "María",
    "Carlos",
    "Ana",
    "Pedro",
    "Laura",
    "Diego",
    "Elena",
    "Luisa"
];

// Función para generar un correo electrónico aleatorio
function generarCorreoAleatorio() {
    var caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var longitud = 10; // Longitud del correo electrónico aleatorio
    var correo = '';
    for (var i = 0; i < longitud; i++) {
        correo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return correo + '@example.com';
}

// Función para obtener una consulta relacionada con un asunto dado
function obtenerConsultaRelacionada(asunto) {
    var consultas = consultasRelacionadas[asunto];
    var indice = Math.floor(Math.random() * consultas.length);
    return consultas[indice];
}

// Función para obtener un asunto aleatorio de la lista de asuntos
function obtenerAsuntoAleatorio() {
    var indice = Math.floor(Math.random() * listaAsuntos.length);
    return listaAsuntos[indice];
}

// Función para generar una fecha aleatoria entre un rango de fechas
function generarFechaAleatoria(start, end) {
    var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0]; // Devuelve la fecha en formato YYYY-MM-DD
}

// Función para agregar una fila a la tabla
function agregarFila() {
    // Obtener referencia a la tabla
    var tabla = document.querySelector('.consulta-table tbody');

    // Obtener un asunto aleatorio
    var asunto = obtenerAsuntoAleatorio();

    // Crear una nueva fila
    var nuevaFila = document.createElement('tr');

    //Generar fecha aleatoria
    var fechaAleatoria = generarFechaAleatoria(new Date(2022, 0, 1), new Date()); // Rango de fecha aleatorio

    // HTML de la nueva fila con el asunto, la consulta y el correo generado aleatoriamente
    nuevaFila.innerHTML = `
        <td class="p p2">${generarCorreoAleatorio()}</td>
        <td class="p p2">${asunto}</td>
        <td class="p p2">${fechaAleatoria}</td>
        <td class="p p2"><div class="contenido-casilla"><input type="checkbox" class="finalizado checkbox"></div></td>
        <td class="p p2"><div class="contenido-casilla"><button class="abrir-consulta-btn" onclick="abrirConsulta(event, this)">Abrir</button></div></td>
        <td class="p p2"><div class="contenido-casilla"><button class="eliminar-consulta-btn" onclick="abrirPopupEliminar(event, this)">Eliminar</button></div></td>
    `;

    // Agregar la fila a la tabla
    tabla.appendChild(nuevaFila);
}

// Función para agregar múltiples filas al cargar la página
function agregarFilasAlCargar() {
    // Determinar el número de filas a agregar
    var numFilas = 20; // Por ejemplo, agregar 20 filas al cargar la página

    // Agregar las filas a la tabla
    for (var i = 0; i < numFilas; i++) {
        agregarFila();
    }
}

// Ejecutar la función para agregar filas al cargar el contenido del documento
document.addEventListener('DOMContentLoaded', agregarFilasAlCargar);

// Función para rellenar los divs con los valores de un tr
function rellenarDivsDesdeTR(trElement) {
    // Obtener los td dentro del tr
    var tds = trElement.querySelectorAll('td');

    // Obtener los valores de los td
    var correo = tds[0].textContent;
    var asunto = tds[1].textContent;

    var nombre = listaNombres[Math.floor(Math.random() * listaNombres.length)];
    var consulta = obtenerConsultaRelacionada(asunto);

    // Seleccionar el div con la clase "consulta"
    var divConsulta = document.querySelector('.consulta');

    // Rellenar los divs con los valores obtenidos
    divConsulta.querySelector('.nombre').textContent = nombre;
    divConsulta.querySelector('.usuario').textContent = correo;
    divConsulta.querySelector('.asunto').textContent = asunto;
    divConsulta.querySelector('.consultaTexto').textContent = consulta;
}

// Función para manejar el evento de clic en el botón "Abrir"
function abrirConsulta(event, button) {
    // Detener la propagación del evento clic
    event.stopPropagation();

    // Obtener el tr que contiene el botón clicado
    var trElement = button.closest('tr');

    // Llamar a la función para rellenar los divs con los valores del tr
    rellenarDivsDesdeTR(trElement);

    // Mostrar el div de consulta
    var popup = document.getElementById('miPopupConsulta');
    popup.style.display = 'block';
}

// Función para manejar el evento de clic en el botón "Eliminar"
function abrirPopupEliminar(event, button) {
    // Detener la propagación del evento clic
    event.stopPropagation();

    // Obtener el tr que contiene el botón clicado
    var trElement = button.closest('tr');

    // Guardar la referencia al tr a eliminar
    consultaEliminar = trElement;

    // Mostrar el popup de eliminar
    var popup = document.getElementById('miPopupEliminar');
    popup.style.display = 'block';
}

// Función para cerrar el popup de eliminar
function cerrarPopupEliminar() {
    var popup = document.getElementById('miPopupEliminar');
    popup.style.display = 'none';
}

// Función para eliminar la consulta seleccionada
function eliminarConsulta() {
    // Eliminar la fila de la tabla
    consultaEliminar.remove();

    // Cerrar el popup de eliminar
    cerrarPopupEliminar();
}

// Función para filtrar las consultas por estado
function filtrarPorEstado() {
    var selectorEstado = document.getElementById('selectorEstado');
    var estadoSeleccionado = selectorEstado.value;
    var filas = document.querySelectorAll('.consulta-table tbody tr');

    filas.forEach(function(fila) {
        var checkbox = fila.querySelector('input[type="checkbox"]');
        var estaContestada = checkbox.checked;

        if (estadoSeleccionado === 'Todos' ||
            (estadoSeleccionado === 'Contestadas' && estaContestada) ||
            (estadoSeleccionado === 'No contestadas' && !estaContestada)) {
            fila.style.display = '';
        } else {
            fila.style.display = 'none';
        }
    });
}

// Agregar evento para el selector de estado
document.getElementById('selectorEstado').addEventListener('change', filtrarPorEstado);

document.getElementById('selectorFechas').addEventListener('change', function() {
    const order = this.value;
    const table = document.querySelector('.consulta-table tbody');
    const rows = Array.from(table.rows);

    rows.sort((a, b) => {
        const dateA = new Date(a.cells[2].innerText);
        const dateB = new Date(b.cells[2].innerText);

        if (order === 'Ascendente') {
            return dateA - dateB;
        } else {
            return dateB - dateA;
        }
    });

    rows.forEach(row => table.appendChild(row));
});

// Función para abrir el popup de responder consulta
function abrirPopupResponder(event, button) {
    event.stopPropagation();
    var nombre = document.querySelector('.consulta .nombre').textContent;
    if (nombre.trim() === '') {
        alert('Por favor, abre una consulta antes de responder.');
        return;
    }
    consultaResponder = button.closest('tr');
    var popup = document.getElementById('miPopupResponder');
    popup.style.display = 'block';
}

// Función para cerrar el popup de responder consulta
function cerrarPopupResponder() {
    var popup = document.getElementById('miPopupResponder');
    popup.style.display = 'none';
}

// Función para enviar la respuesta a la consulta
function enviarRespuesta() {
    var respuesta = document.getElementById('respuestaConsulta').value;
    var error = document.querySelector('.error_consulta');
    var enviado = document.querySelector('.exito_consulta')

    if (respuesta.trim() !== '') {
        enviado.style.visibility = 'visible';
        setTimeout(function () {
            enviado.style.visibility = 'hidden';
            cerrarPopupResponder()
        }, 3000)

    } else {
        error.style.visibility = 'visible'; // Mostrar el mensaje de error
        setTimeout(function() {
            error.style.visibility = 'hidden'; // Esconder el mensaje de error después de 3 segundos
        }, 3000);
    }
}
