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

// Función para agregar una fila a la tabla
function agregarFila() {
    // Obtener referencia a la tabla
    var tabla = document.querySelector('.consulta-table tbody');

    // Obtener un asunto aleatorio
    var asunto = obtenerAsuntoAleatorio();

    // Obtener la consulta relacionada con el asunto
    var consulta = obtenerConsultaRelacionada(asunto);

    // Crear una nueva fila
    var nuevaFila = document.createElement('tr');

    // HTML de la nueva fila con el asunto, la consulta y el correo generado aleatoriamente
    nuevaFila.innerHTML = `
    <td>${generarCorreoAleatorio()}</td>
    <td>${asunto}</td>
    <td>${consulta}</td>
  `;

    // Agregar la fila a la tabla
    tabla.appendChild(nuevaFila);
}

// Función para agregar múltiples filas al cargar la página
function agregarFilasAlCargar() {
    // Determinar el número de filas a agregar
    var numFilas = 5; // Por ejemplo, agregar 5 filas al cargar la página

    // Agregar las filas a la tabla
    for (var i = 0; i < numFilas; i++) {
        agregarFila();
    }
}

// Ejecutar la función para agregar filas al cargar el contenido del documento
document.addEventListener('DOMContentLoaded', agregarFilasAlCargar);
