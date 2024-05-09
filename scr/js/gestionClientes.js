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

// Función para mostrar los clientes en la tabla
function showClients(filteredUsers) {
    document.getElementById('clients').style.display = 'block';

    // Obtener la tabla de clientes
    let tablaClientes = document.getElementById('clients-table');

    // Borrar el contenido de la tabla
    let tbody = tablaClientes.getElementsByTagName('tbody')[0];
    if (tbody) tbody.innerHTML = '';

    // Añadir los usuarios a la tabla de roles
    for (let [index, cliente] of filteredUsers.entries()) {
        let filaCliente = document.createElement('tr');

        // Añadir las celdas a la fila
        addCell(filaCliente, cliente.nombreCliente);
        addCell(filaCliente, cliente.contacto);
        addCell(filaCliente, cliente.rol);

        // Columna de botón Editar Cliente
        let columnaEditar = document.createElement('td');
        let botonEditar = document.createElement('button');
        botonEditar.textContent = 'Editar';
        botonEditar.classList.add('editar-cliente');
        botonEditar.onclick = function() {
            editarCliente(index);
        };
        columnaEditar.appendChild(botonEditar);
        filaCliente.appendChild(columnaEditar);

        // Columna de botón Eliminar Cliente
        let columnaEliminar = document.createElement('td');
        let botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('eliminar-cliente');
        botonEliminar.onclick = function() {
            eliminarCliente(index);
        };
        columnaEliminar.appendChild(botonEliminar);
        filaCliente.appendChild(columnaEliminar);

        // Agregar la fila a la tabla
        tbody.appendChild(filaCliente);
    }
}

// Función para editar un cliente
function editarCliente(index) {
    // Preguntas para la edición de clientes
    let nuevoNombre = prompt("Ingrese el nuevo nombre del cliente:");
    let nuevoContacto;
    let nuevoRol;

    // Verificar si se ingresaron valores y si se hizo clic en "Aceptar"
    if (nuevoNombre !== null && nuevoContacto !== null && nuevoRol !== null) {
        // Actualizar los valores del cliente
        usuariosValidos[index].nombreCliente = nuevoNombre;
        usuariosValidos[index].contacto = nuevoContacto;
        usuariosValidos[index].rol = nuevoRol;

        // Volver a mostrar la tabla con los clientes actualizados
        showClients(usuariosValidos);
    }

    // Solicitar y validar el nuevo correo electrónico del cliente
    do {
        nuevoContacto = prompt("Ingrese el nuevo correo electrónico del cliente:").trim(); // Eliminar espacios al principio y al final

        // Verificar que el correo electrónico tenga "@"
        if (!nuevoContacto.includes('@') || nuevoContacto.includes('@.')) {
            alert("Introduce un correo electrónico válido.");
            continue;
        }

        // Verificar si el correo electrónico tiene '.com' o '.'
        if (!nuevoContacto.includes('.com') && !nuevoContacto.includes('.')) {
            alert("Introduce un correo electrónico válido.");
            continue;
        }

        // Verificar si el correo electrónico no termina en punto '.'
        if (!/^[^@]+@[^.]+\.[a-zA-Z]{2,}(?!\.)$/.test(nuevoContacto)) {
            alert("El correo electrónico no es válido.");
            continue;
        }

        // Verificar si hay dos o más puntos seguidos en el correo electrónico
        let puntosConsecutivos = false;
        for (let i = 0; i < nuevoContacto.length - 1; i++) {
            if (nuevoContacto[i] === '.' && nuevoContacto[i + 1] === '.') {
                puntosConsecutivos = true;
                break;
            }
        }
        if (puntosConsecutivos) {
            alert("El correo electrónico no es válido.");
            continue;
        }

        // Verificar si el correo electrónico ya está registrado (excepto para el usuario actual)
        const usuarioRegistrado = usuariosValidos.find((usuario, i) => i !== index && usuario.contacto === nuevoContacto);
        if (usuarioRegistrado) {
            alert("El correo electrónico ya está registrado.");
            continue;
        }

        // Si no hay errores, salir del bucle
        break;

    } while (true);

    // Solicitar y validar el nuevo rol del cliente
    do {
        nuevoRol = prompt("Ingrese el nuevo rol del cliente (Usuario, Técnico o Administrador):");

        // Verificar si el rol es válido
        if (nuevoRol !== "Usuario" && nuevoRol !== "Técnico" && nuevoRol !== "Administrador") {
            alert("Introduce un rol válido (Usuario, Técnico o Administrador).");
            continue;
        }

        // Si no hay errores, salir del bucle
        break;

    } while (true);

    // Actualizar los valores del cliente solo si se proporcionaron todos los datos válidos
    if (nuevoRol !== null) {
        // Actualizar los valores del cliente
        usuariosValidos[index].nombreCliente = nuevoNombre;
        usuariosValidos[index].contacto = nuevoContacto;
        usuariosValidos[index].rol = nuevoRol;

        // Volver a mostrar la tabla con los clientes actualizados
        showClients(usuariosValidos);
    }
}

// Función para eliminar un cliente
function eliminarCliente(index) {
    // Confirmar si realmente se desea eliminar al cliente
    let confirmacion = confirm("¿Está seguro de que desea eliminar este cliente?");

    if (confirmacion) {
        // Eliminar al cliente del array de usuarios válidos
        usuariosValidos.splice(index, 1);

        // Volver a mostrar la tabla con los clientes actualizados
        showClients(usuariosValidos);
    }
}

// Función para buscar clientes
function searchClients() {
    // Obtener el valor de la barra de búsqueda
    let searchText = document.getElementById('searchClients').value.toLowerCase();

    // Filtrar los usuarios válidos basándose en el texto de búsqueda
    let filteredUsers = usuariosValidos.filter(user => user.nombreCliente.toLowerCase().includes(searchText));

    // Mostrar los usuarios filtrados
    showClients(filteredUsers);
}

// Función para agregar un nuevo cliente
function addClient() {
    // Preguntas para añadir cliente
    let nombre = prompt("Ingrese el nombre del nuevo cliente:");
    let contacto;
    let rol;

    // Si el nombre es null (el usuario hizo clic en "Cancelar"), salir de la función
    if (nombre === null) {
        return;
    }

    // Solicitar el correo electrónico del nuevo cliente y validar
    do {
        contacto = prompt("Ingrese el correo electrónico del nuevo cliente:");

        // Si el contacto es null (el usuario hizo clic en "Cancelar"), salir de la función
        if (contacto === null) {
            return;
        }

        // Verificar que el correo electrónico tenga "@"
        if (!contacto.includes('@') || contacto.includes('@.')) {
            alert("Introduce un correo electrónico válido.");
            continue;
        }

        // Verificar si el correo electrónico tiene '.com' o '.'
        if (!contacto.includes('.com') && !contacto.includes('.')) {
            alert("Introduce un correo electrónico válido.");
            continue;
        }

        // Verificar si el correo electrónico no termina en punto '.'
        if (!/^[^@]+@[^.]+\.[a-zA-Z]{2,}(?!\.)$/.test(contacto)) {
            alert("El correo electrónico no es válido.");
            continue;
        }

        // Verificar si hay dos o más puntos seguidos en el correo electrónico
        let puntosConsecutivos = false;
        for (let i = 0; i < contacto.length - 1; i++) {
            if (contacto[i] === '.' && contacto[i + 1] === '.') {
                puntosConsecutivos = true;
                break;
            }
        }
        if (puntosConsecutivos) {
            alert("El correo electrónico no es válido.");
            continue;
        }

        // Verificar si el correo electrónico ya está registrado
        const usuarioRegistrado = usuariosValidos.find(usuario => usuario.contacto === contacto);
        if (usuarioRegistrado) {
            alert("El correo electrónico ya está registrado.");
            continue;
        }

        // Si no hay errores, salir del bucle
        break;

    } while (true);

    // Validar el rol del nuevo cliente
    do {
        rol = prompt("Ingrese el rol del nuevo cliente (Usuario, Técnico o Administrador):");

        // Si el rol es null (el usuario hizo clic en "Cancelar"), salir de la función
        if (rol === null) {
            return;
        }

        // Verificar si el rol es válido
        if (rol !== "Usuario" && rol !== "Técnico" && rol !== "Administrador") {
            alert("Introduce un rol válido (Usuario, Técnico o Administrador).");
            continue;
        }

        // Si no hay errores, salir del bucle
        break;

    } while (true);

    // Crear el objeto del nuevo cliente
    let nuevoCliente = { nombreCliente: nombre, contacto: contacto, rol: rol };

    // Agregar el nuevo cliente al array de usuarios válidos
    usuariosValidos.push(nuevoCliente);

    // Mostrar la tabla actualizada con el nuevo cliente
    showClients(usuariosValidos);
}

// Función para ordenar la tabla por nombre de cliente
function sortClients() {
    // Cambiar el orden ascendente o descendente
    ascendingOrder = !ascendingOrder;

    // Obtener la tabla de clientes
    let tablaClientes = document.getElementById('clients-table');
    let tbody = tablaClientes.getElementsByTagName('tbody')[0];

    // Convertir las filas de la tabla en un array para facilitar la manipulación
    let rows = Array.from(tbody.getElementsByTagName('tr'));

    // Ordenar las filas en función del nombre del cliente
    rows.sort((a, b) => {
        let nameA = a.cells[0].textContent.toUpperCase();
        let nameB = b.cells[0].textContent.toUpperCase();
        if (nameA < nameB) return ascendingOrder ? -1 : 1;
        if (nameA > nameB) return ascendingOrder ? 1 : -1;
        return 0;
    });

    // Reorganizar las filas en la tabla según el orden
    rows.forEach(row => tbody.appendChild(row));
}

// Función para ordenar la tabla por rol del cliente
function sortClientsByRole() {
    // Cambiar el orden ascendente o descendente
    ascendingOrder = !ascendingOrder;

    // Obtener la tabla de clientes
    let tablaClientes = document.getElementById('clients-table');
    let tbody = tablaClientes.getElementsByTagName('tbody')[0];

    // Convertir las filas de la tabla en un array para facilitar la manipulación
    let rows = Array.from(tbody.getElementsByTagName('tr'));

    // Ordenar las filas en función del rol del cliente
    rows.sort((a, b) => {
        let roleA = a.cells[2].textContent.toUpperCase();
        let roleB = b.cells[2].textContent.toUpperCase();
        if (roleA < roleB) return ascendingOrder ? -1 : 1;
        if (roleA > roleB) return ascendingOrder ? 1 : -1;
        return 0;
    });

    // Reorganizar las filas en la tabla según el orden
    rows.forEach(row => tbody.appendChild(row));
}

// Agregar un controlador de eventos al hacer clic en "Rol del Cliente"
document.querySelector('#clients-table thead tr th:nth-child(3)').addEventListener('click', sortClientsByRole);

// Agregar un controlador de eventos al botón de añadir cliente
document.querySelector('.add-client').addEventListener('click', addClient);

// Agregar un controlador de eventos a la barra de búsqueda
document.getElementById('searchClients').addEventListener('keyup', searchClients);

// Agregar un controlador de eventos al hacer clic en "Nombre del Cliente"
document.querySelector('#clients-table thead tr th:nth-child(1)').addEventListener('click', sortClients);

// Mostrar todos los clientes al cargar la página
showClients(usuariosValidos);