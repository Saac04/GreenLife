let usuariosValidos = [
    { nombreCliente: "Juan Perez", contacto: "juan.perez@example.com", rol: "Administrador" },
    { nombreCliente: "Maria Lopez", contacto: "maria.lopez@example.com", rol: "Usuario" },
    { nombreCliente: "Carlos Garcia", contacto: "carlos.garcia@example.com", rol: "Usuario" },
    { nombreCliente: "Ana Martinez", contacto: "ana.martinez@example.com", rol: "Administrador" }
];

let sortDirection = {
    nombreCliente: true,
    rol: true
};

document.addEventListener("DOMContentLoaded", function () {
    fillTable();
    setupMenu();
});

function fillTable() {
    let tableBody = document.querySelector("#clients-table tbody");
    tableBody.innerHTML = '';

    usuariosValidos.forEach((usuario, index) => {
        let row = document.createElement('tr');
        addCell(row, usuario.nombreCliente, "Nombre del Cliente");
        addCell(row, usuario.contacto, "Correo Electrónico");
        addCell(row, usuario.rol, "Rol");

        // Celda para el botón de editar
        let editCell = document.createElement('td');
        let editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('editar-cliente');
        editButton.setAttribute('data-index', index);
        editButton.addEventListener('click', function () {
            let clienteIndex = this.getAttribute('data-index');
            document.getElementById('clienteIndex').value = clienteIndex;
            document.getElementById('nuevoNombreCliente').value = usuariosValidos[clienteIndex].nombreCliente;
            document.getElementById('nuevoCorreoCliente').value = usuariosValidos[clienteIndex].contacto;
            document.getElementById('nuevoRolCliente').value = usuariosValidos[clienteIndex].rol;
            togglePopup('miPopup2');
        });
        editCell.appendChild(editButton);
        row.appendChild(editCell);

        // Celda para el botón de eliminar
        let deleteCell = document.createElement('td');
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('eliminar-cliente');
        deleteButton.setAttribute('data-index', index);
        deleteButton.addEventListener('click', function () {
            document.getElementById('clienteEliminarIndex').value = this.getAttribute('data-index');
            togglePopup('miPopupEliminar');
        });
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
    });
}

function addCell(row, text, label) {
    let cell = document.createElement('td');
    cell.textContent = text;
    cell.setAttribute('data-label', label);
    row.appendChild(cell);
}

function togglePopup(popupId) {
    let popup = document.getElementById(popupId);
    popup.style.display = popup.style.display === 'flex' ? 'none' : 'flex';
}

function setupMenu() {
    document.querySelector('#menuToggle input').addEventListener('change', function () {
        let menu = document.querySelector('#menu');
        menu.style.display = this.checked ? 'block' : 'none';
    });
}

function confirmarEditarCliente() {
    let clienteIndex = document.getElementById('clienteIndex').value;
    let nuevoNombre = document.getElementById('nuevoNombreCliente').value;
    let nuevoCorreo = document.getElementById('nuevoCorreoCliente').value;
    let nuevoRol = document.getElementById('nuevoRolCliente').value;
    let errorEditar = document.getElementById('errorEditar');

    if (nuevoNombre.trim() === "" || nuevoCorreo.trim() === "" || nuevoRol === "" || !validarCorreo(nuevoCorreo)) {
        errorEditar.style.display = 'block';
        return;
    } else {
        errorEditar.style.display = 'none';
    }

    usuariosValidos[clienteIndex].nombreCliente = nuevoNombre;
    usuariosValidos[clienteIndex].contacto = nuevoCorreo;
    usuariosValidos[clienteIndex].rol = nuevoRol;

    fillTable();
    togglePopup('miPopup2');
}

function confirmarAnyadir() {
    // Ocultar el mensaje de error
    document.getElementById('errorAgregar').style.display = 'none';

    let nuevoNombre = document.getElementById('nuevoNombreClienteAdd').value.trim();
    let nuevoCorreo = document.getElementById('nuevoCorreoClienteAdd').value.trim();
    let nuevoRol = document.getElementById('nuevoRolClienteAdd').value.trim();

    if (nuevoNombre !== "" && nuevoCorreo !== "" && nuevoRol !== "") {
        // Validar el formato del correo electrónico
        if (validarCorreo(nuevoCorreo)) {
            usuariosValidos.push({ nombreCliente: nuevoNombre, contacto: nuevoCorreo, rol: nuevoRol });
            fillTable();
            togglePopup('miPopupAdd');
        } else {
            // Mostrar mensaje de error
            document.getElementById('errorAgregar').style.display = 'block';
        }
    } else {
        // Mostrar mensaje de error
        document.getElementById('errorAgregar').style.display = 'block';
    }
}

function validarCorreo(correo) {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(correo);
}

function confirmarEliminar() {
    let clienteIndex = document.getElementById('clienteEliminarIndex').value;
    usuariosValidos.splice(clienteIndex, 1);
    fillTable();
    togglePopup('miPopupEliminar');
}

function searchClients() {
    let input = document.getElementById("searchClients");
    let filter = input.value.toLowerCase();
    let rows = document.querySelectorAll("#clients-table tbody tr");

    rows.forEach(row => {
        let nombreCliente = row.querySelector("td[data-label='Nombre del Cliente']").textContent.toLowerCase();
        if (nombreCliente.indexOf(filter) > -1) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

function guardarBBDD() {
    // Mostrar el mensaje de confirmación
    let mensaje = document.querySelector('.guardarBBDD');
    mensaje.style.display = 'block';

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
        mensaje.style.display = 'none';
    }, 3000);
}


function sortTable(property) {
    usuariosValidos.sort((a, b) => {
        let textA = a[property].toUpperCase();
        let textB = b[property].toUpperCase();
        if (textA < textB) return sortDirection[property] ? -1 : 1;
        if (textA > textB) return sortDirection[property] ? 1 : -1;
        return 0;
    });
    sortDirection[property] = !sortDirection[property];
    fillTable();
}
