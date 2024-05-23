// Definir los usuarios válidos
let usuariosValidos = [
    { nombreCliente: "José Pereira", contacto: "josepereira@gmail.com", rol: "Técnico" },
    { nombreCliente: "Daniel Peris", contacto: "danielperis31@gmail.com", rol: "Usuario" },
    { nombreCliente: "Laura Díaz", contacto: "lauradiaz@gmail.com", rol: "Administrador" },
    { nombreCliente: "Carlos Martínez", contacto: "carlosmartinez@gmail.com", rol: "Administrador" }
];

// Variable para controlar el orden ascendente (true) o descendente (false)
let ascendingOrder = true;

// Función para crear una celda de la tabla y añadirla a una fila
function addCell(row, text) {
    let cell = document.createElement('td');
    cell.textContent = text;
    row.appendChild(cell);
}

// Función para rellenar la tabla con los datos de los usuarios
function fillTable() {
    let tableBody = document.querySelector("#clients-table tbody");
    tableBody.innerHTML = '';

    usuariosValidos.forEach((usuario, index) => {
        let row = document.createElement('tr');
        addCell(row, usuario.nombreCliente);
        addCell(row, usuario.contacto);
        addCell(row, usuario.rol);

        let editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('editar-cliente');
        editButton.setAttribute('data-index', index);
        editButton.addEventListener('click', function() {
            let clienteIndex = this.getAttribute('data-index');
            document.getElementById('clienteIndex').value = clienteIndex;
            document.getElementById('nuevoNombreCliente').value = usuariosValidos[clienteIndex].nombreCliente;
            togglePopup('miPopup2');
        });

        let editCell = document.createElement('td');
        editCell.appendChild(editButton);
        row.appendChild(editCell);

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('eliminar-cliente');
        deleteButton.setAttribute('data-index', index);
        deleteButton.addEventListener('click', function() {
            let clienteIndex = this.getAttribute('data-index');
            document.getElementById('clienteEliminarIndex').value = clienteIndex;
            togglePopup('miPopupEliminar');
        });

        let deleteCell = document.createElement('td');
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
    });
}

// Función para abrir y cerrar el popup
function togglePopup(popupId) {
    let popup = document.getElementById(popupId);
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
}

// Función para confirmar el cambio de nombre del cliente
function confirmarCambioNombre() {
    let clienteIndex = document.getElementById('clienteIndex').value;
    let nuevoNombre = document.getElementById('nuevoNombreCliente').value;

    if (clienteIndex !== null && nuevoNombre.trim() !== "") {
        usuariosValidos[clienteIndex].nombreCliente = nuevoNombre.trim();
        fillTable();
        togglePopup('miPopup2');
    }
}

// Función para confirmar la eliminación del cliente
function confirmarEliminar() {
    let clienteIndex = document.getElementById('clienteEliminarIndex').value;

    if (clienteIndex !== null) {
        usuariosValidos.splice(clienteIndex, 1);
        fillTable();
        togglePopup('miPopupEliminar');
    }
}

// Función para buscar clientes en la tabla
function searchClients() {
    let input = document.getElementById("searchClients");
    let filter = input.value.toLowerCase();
    let table = document.getElementById("clients-table");
    let tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            let txtValue = td.textContent || td.innerText;
            tr[i].style.display = txtValue.toLowerCase().indexOf(filter) > -1 ? "" : "none";
        }
    }
}

// Inicializar la tabla al cargar la página
window.onload = function() {
    fillTable();
};
