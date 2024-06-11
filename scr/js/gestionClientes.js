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
            let clienteIndex = this.getAttribute('data-index');
            document.getElementById('clienteEliminarIndex').value = clienteIndex;
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

document.getElementById('editarClienteForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let clienteIndex = document.getElementById('clienteIndex').value;
    let nuevoNombre = document.getElementById('nuevoNombreCliente').value;
    let nuevoCorreo = document.getElementById('nuevoCorreoCliente').value;
    let nuevoRol = document.getElementById('nuevoRolCliente').value;

    if (nuevoNombre.trim() !== "") {
        usuariosValidos[clienteIndex].nombreCliente = nuevoNombre.trim();
    }
    if (nuevoCorreo.trim() !== "") {
        usuariosValidos[clienteIndex].contacto = nuevoCorreo.trim();
    }
    if (nuevoRol.trim() !== "") {
        usuariosValidos[clienteIndex].rol = nuevoRol.trim();
    }
    fillTable();
    togglePopup('miPopup2');
});

document.getElementById('agregarClienteForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let nuevoNombre = document.getElementById('nuevoNombreClienteAdd').value;
    let nuevoCorreo = document.getElementById('nuevoCorreoClienteAdd').value;
    let nuevoRol = document.getElementById('nuevoRolClienteAdd').value;

    if (nuevoNombre.trim() !== "" && nuevoCorreo.trim() !== "" && nuevoRol.trim() !== "") {
        usuariosValidos.push({ nombreCliente: nuevoNombre.trim(), contacto: nuevoCorreo.trim(), rol: nuevoRol.trim() });
        fillTable();
        togglePopup('miPopupAdd');
    }
});

function searchClients() {
    let input = document.getElementById('searchClients');
    let filter = input.value.toLowerCase();
    let rows = document.querySelectorAll('#clients-table tbody tr');

    rows.forEach(row => {
        let cells = row.querySelectorAll('td');
        let match = false;

        cells.forEach(cell => {
            if (cell.textContent.toLowerCase().includes(filter)) {
                match = true;
            }
        });

        row.style.display = match ? '' : 'none';
    });
}

function sortTable(column) {
    let direction = sortDirection[column];
    usuariosValidos.sort((a, b) => {
        let textA = a[column].toLowerCase();
        let textB = b[column].toLowerCase();
        if (textA < textB) return direction ? -1 : 1;
        if (textA > textB) return direction ? 1 : -1;
        return 0;
    });
    sortDirection[column] = !direction;
    fillTable();
}

document.querySelectorAll('#clients-table th').forEach((header, index) => {
    header.addEventListener('click', function () {
        if (index === 0) {
            sortTable('nombreCliente');
        } else if (index === 2) {
            sortTable('rol');
        }
    });
});

function confirmarCambioNombre() {
    let clienteIndex = document.getElementById('clienteIndex').value;
    let nuevoNombre = document.getElementById('nuevoNombreCliente').value;
    let nuevoCorreo = document.getElementById('nuevoCorreoCliente').value;
    let nuevoRol = document.getElementById('nuevoRolCliente').value;

    if (nuevoNombre.trim() !== "") {
        usuariosValidos[clienteIndex].nombreCliente = nuevoNombre.trim();
    }
    if (nuevoCorreo.trim() !== "") {
        usuariosValidos[clienteIndex].contacto = nuevoCorreo.trim();
    }
    if (nuevoRol.trim() !== "") {
        usuariosValidos[clienteIndex].rol = nuevoRol.trim();
    }
    fillTable();
    togglePopup('miPopup2');
}


function confirmarEliminar() {
    let clienteIndex = document.getElementById('clienteEliminarIndex').value;
    usuariosValidos.splice(clienteIndex, 1);
    fillTable();
    togglePopup('miPopupEliminar');
}

function confirmarAñadir() {
    let nuevoNombre = document.getElementById('nuevoNombreClienteAdd').value;
    let nuevoCorreo = document.getElementById('nuevoCorreoClienteAdd').value;
    let nuevoRol = document.getElementById('nuevoRolClienteAdd').value;
    usuariosValidos.push({ nombreCliente: nuevoNombre, contacto: nuevoCorreo, rol: nuevoRol });
    fillTable();
    togglePopup('miPopupAdd');
}
