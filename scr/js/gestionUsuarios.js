// Lista de usuarios válidos con nombre, contacto y rol
let usuariosValidos = [
    { nombreUsuario: "Juan Perez", contacto: "juan.perez@example.com", rol: "Administrador" },
    { nombreUsuario: "Maria Lopez", contacto: "maria.lopez@example.com", rol: "Usuario" },
    { nombreUsuario: "Carlos Garcia", contacto: "carlos.garcia@example.com", rol: "Usuario" },
    { nombreUsuario: "Ana Martinez", contacto: "ana.martinez@example.com", rol: "Administrador" }
];

// Dirección de ordenamiento inicial para nombre y rol
let sortDirection = {
    nombreUsuario: true,
    rol: true
};

// Al cargar el documento, se ejecutan las funciones fillTable y setupMenu
document.addEventListener("DOMContentLoaded", function () {
    fillTable();
    setupMenu();
});

// Función para llenar la tabla con los usuarios válidos
function fillTable() {
    let tableBody = document.querySelector("#clients-table tbody");
    tableBody.innerHTML = ''; // Limpiar el contenido actual de la tabla

    // Iterar sobre los usuarios y agregar filas a la tabla
    usuariosValidos.forEach((usuario, index) => {
        let row = document.createElement('tr');
        addCell(row, usuario.nombreUsuario, "Nombre del Usuario");
        addCell(row, usuario.contacto, "Correo Electrónico");
        addCell(row, usuario.rol, "Rol");

        // Celda para el botón de editar
        let editCell = document.createElement('td');
        let editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('editar-usuario');
        editButton.setAttribute('data-index', index);
        editButton.addEventListener('click', function () {
            let usuarioIndex = this.getAttribute('data-index');
            document.getElementById('usuarioIndex').value = usuarioIndex;
            document.getElementById('nuevoNombreUsuario').value = usuariosValidos[usuarioIndex].nombreUsuario;
            document.getElementById('nuevoCorreoUsuario').value = usuariosValidos[usuarioIndex].contacto;
            document.getElementById('nuevoRolUsuario').value = usuariosValidos[usuarioIndex].rol;
            togglePopup('miPopup2'); // Mostrar el popup de edición
        });
        editCell.appendChild(editButton);
        row.appendChild(editCell);

        // Celda para el botón de eliminar
        let deleteCell = document.createElement('td');
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('eliminar-usuario');
        deleteButton.setAttribute('data-index', index);
        deleteButton.addEventListener('click', function () {
            document.getElementById('usuarioEliminarIndex').value = this.getAttribute('data-index');
            togglePopup('miPopupEliminar'); // Mostrar el popup de eliminación
        });
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
    });
}

// Función para agregar celdas a una fila de la tabla
function addCell(row, text, label) {
    let cell = document.createElement('td');
    cell.textContent = text;
    cell.setAttribute('data-label', label); // Etiqueta de la celda para dispositivos móviles
    row.appendChild(cell);
}

// Función para mostrar u ocultar popups
function togglePopup(popupId) {
    let popup = document.getElementById(popupId);
    popup.style.display = popup.style.display === 'flex' ? 'none' : 'flex';
}

// Configuración del menú de navegación
function setupMenu() {
    document.querySelector('#menuToggle input').addEventListener('change', function () {
        let menu = document.querySelector('#menu');
        menu.style.display = this.checked ? 'block' : 'none'; // Mostrar u ocultar el menú
    });
}

// Confirmar y editar la información del usuario
function confirmarEditarUsuario() {
    let usuarioIndex = document.getElementById('usuarioIndex').value;
    let nuevoNombre = document.getElementById('nuevoNombreUsuario').value;
    let nuevoCorreo = document.getElementById('nuevoCorreoUsuario').value;
    let nuevoRol = document.getElementById('nuevoRolUsuario').value;
    let errorEditar = document.getElementById('errorEditar');

    // Validar la información ingresada
    if (nuevoNombre.trim() === "" || nuevoCorreo.trim() === "" || nuevoRol === "" || !validarCorreo(nuevoCorreo)) {
        errorEditar.style.display = 'block';
        return;
    } else {
        errorEditar.style.display = 'none';
    }

    // Actualizar la información del usuario
    usuariosValidos[usuarioIndex].nombreUsuario = nuevoNombre;
    usuariosValidos[usuarioIndex].contacto = nuevoCorreo;
    usuariosValidos[usuarioIndex].rol = nuevoRol;

    fillTable(); // Actualizar la tabla
    togglePopup('miPopup2'); // Ocultar el popup de edición
}

// Función para validar la dirección de correo electrónico
function validarCorreo(correo) {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el formato del correo
    return re.test(correo);
}

// Confirmar y eliminar un usuario
function confirmarEliminar() {
    let usuarioIndex = document.getElementById('usuarioEliminarIndex').value;
    usuariosValidos.splice(usuarioIndex, 1); // Eliminar el usuario de la lista
    fillTable(); // Actualizar la tabla
    togglePopup('miPopupEliminar'); // Ocultar el popup de eliminación
}

// Función para buscar clientes en la tabla
function searchClients() {
    let input = document.getElementById("searchClients");
    let filter = input.value.toLowerCase();
    let rows = document.querySelectorAll("#clients-table tbody tr");

    // Mostrar u ocultar filas según el criterio de búsqueda
    rows.forEach(row => {
        let nombreUsuario = row.querySelector("td[data-label='Nombre del Usuario']").textContent.toLowerCase();
        if (nombreUsuario.indexOf(filter) > -1) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

// Función para guardar cambios en la base de datos
function guardarBBDD() {
    // Mostrar el mensaje de confirmación
    let mensaje = document.querySelector('.guardarBBDD');
    mensaje.style.display = 'block';

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
        mensaje.style.display = 'none';
    }, 3000);
}

// Función para ordenar la tabla por una propiedad específica
function sortTable(property) {
    usuariosValidos.sort((a, b) => {
        let textA = a[property].toUpperCase();
        let textB = b[property].toUpperCase();
        if (textA < textB) return sortDirection[property] ? -1 : 1;
        if (textA > textB) return sortDirection[property] ? 1 : -1;
        return 0;
    });
    sortDirection[property] = !sortDirection[property]; // Cambiar la dirección de ordenamiento
    fillTable(); // Actualizar la tabla
}
