document.addEventListener('DOMContentLoaded', function() {
    // Obtener los datos del archivo PHP
    fetch('../../api/obtenerNombreUsuario.php') // Reemplaza con la ruta correcta a tu archivo PHP
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos del PHP');
            }
            return response.json();
        })
        .then(data => {
            // Verificar que el JSON contiene el nombre del usuario
            if (data.nombre) {
                // Obtener el elemento h2 existente por su ID
                let h2 = document.getElementById('Nombre_Usuario');

                // Establecer el texto del h2 con el nombre del usuario
                h2.textContent = 'Huertos de '+data.nombre;
            } else {
                console.error('El JSON no contiene el nombre del usuario');
            }
        })
        .catch(error => console.error('Error:', error));
});
//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    // Función para cargar los huertos del usuario desde la base de datos
    function cargarHuertos() {
        fetch('../../api/obtenerHuertosYNombres.php') // Reemplaza con la ruta correcta a tu archivo PHP
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del PHP');
                }
                return response.json();
            })
            .then(data => {
                // Verificar que el JSON contiene la lista de huertos
                if (Array.isArray(data)) {
                    let container = document.getElementById('contenedorHuertos'); // Usar el contenedor existente

                    // Limpiar el contenedor antes de añadir nuevos elementos
                    container.innerHTML = '';

                    // Crear los divs para cada huerto
                    data.forEach((huerto, index) => {
                        var esPar = (index + 1) % 2 === 0;
                        var claseFondo = esPar ? 'fondoPar' : 'fondoImpar';

                        let div = document.createElement('div');
                        div.className = 'huerto dios ' + claseFondo;
                        div.dataset.id = huerto.id_huerto;

                        let h3 = document.createElement('h3');
                        h3.textContent = huerto.nombre;
                        div.appendChild(h3);

                        let botonesHuerto = document.createElement('div');
                        botonesHuerto.className = 'botonesHuerto';

                        let botones1 = document.createElement('div');
                        botones1.className = 'botones1';

                        let botonSonda = document.createElement('button');
                        botonSonda.className = 'button';
                        botonSonda.textContent = 'Añadir Sonda';
                        botonSonda.onclick = () => vincularSonda(huerto.id_huerto);
                        botones1.appendChild(botonSonda);

                        let enlaceGraficos = document.createElement('a');
                        enlaceGraficos.className = 'button';
                        enlaceGraficos.href = 'GraficosHistoricos.html';
                        enlaceGraficos.textContent = 'Ver Gráficas';
                        botones1.appendChild(enlaceGraficos);

                        let botones2 = document.createElement('div');
                        botones2.className = 'botones2';

                        let botonEditar = document.createElement('button');
                        botonEditar.className = 'button';
                        botonEditar.textContent = 'Editar Nombre';
                        botonEditar.onclick = () => abrirEditarPopup(huerto.id_huerto);
                        botones2.appendChild(botonEditar);

                        let botonEliminar = document.createElement('button');
                        botonEliminar.className = 'button boton-eliminar';
                        botonEliminar.textContent = 'Eliminar';
                        botonEliminar.onclick = () => abrirEliminarPopup(huerto.id_huerto);
                        botones2.appendChild(botonEliminar);

                        botonesHuerto.appendChild(botones1);
                        botonesHuerto.appendChild(botones2);

                        div.appendChild(botonesHuerto);

                        container.appendChild(div);
                    });
                } else {
                    console.error('El JSON no contiene una lista de huertos');
                }
            })
            .catch(error => console.error('Error:', error));
    }
    // Función para añadir un nuevo huerto
    function añadirHuerto() {
        // Obtener el ID del usuario actual (esto debe estar disponible en tu aplicación)
        var idUsuario = 13; // Reemplaza con el ID del usuario real
        var nombreHuerto = 'Nuevo Huerto'; // Nombre predeterminado para el nuevo huerto

        // Enviar solicitud para crear el nuevo huerto en la base de datos
        fetch('../../api/crearHuerto.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_usuario: idUsuario,
                nombre_huerto: nombreHuerto
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Crear y añadir el nuevo huerto a la interfaz de usuario
                    var numHuertos = document.querySelectorAll('.huerto').length;
                    var esPar = (numHuertos + 1) % 2 === 0;
                    var claseFondo = esPar ? 'fondoPar' : 'fondoImpar';

                    var nuevoHuerto = document.createElement('div');
                    nuevoHuerto.className = 'huerto dios ' + claseFondo;
                    nuevoHuerto.dataset.id = data.id_huerto; // Usar el ID del huerto devuelto por la base de datos
                    nuevoHuerto.innerHTML = `
                    <h3>${nombreHuerto}</h3>
                    <div class="botonesHuerto">
                        <div class="botones1">
                            <button class="button" onclick="vincularSonda(${data.id_huerto})">Añadir Sonda</button>
                            <a class="button" href="GraficosHistoricos.html">Ver Gráficas</a>
                        </div>
                        <div class="botones2">
                            <button class="button boton-editar" onclick="abrirEditarPopup(${data.id_huerto})">Editar Nombre</button>
                            <button class="button boton-eliminar" onclick="abrirEliminarPopup(${data.id_huerto})">Eliminar</button>
                        </div>
                    </div>
                `;

                    document.getElementById('contenedorHuertos').appendChild(nuevoHuerto);
                } else {
                    console.error('Error al crear el huerto:', data.error);
                }
            })
            .catch(error => console.error('Error:', error));
    }

    // Cargar huertos al cargar la página
    cargarHuertos();

    // Añadir evento al botón para añadir nuevo huerto
    document.querySelector('.boton_nuevohuerto').addEventListener('click', añadirHuerto);
});


// Variable para almacenar el ID del huerto que se está editando o eliminando
var currentHuertoId = null;

function abrirEliminarPopup(id) {
    currentHuertoId = id;
    var popup = document.getElementById('popupEliminar');
    popup.style.display = 'block';
}

function abrirEditarPopup(id) {
    currentHuertoId = id;
    var popup = document.getElementById('popupEditarNombre');
    popup.style.display = 'block';
}
function confirmarEliminar() {
    if (currentHuertoId !== null) {
        // Enviar solicitud para eliminar el huerto de la base de datos
        fetch('../../api/eliminarHuerto.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_huerto: currentHuertoId
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Eliminar el huerto de la interfaz de usuario
                    var huerto = document.querySelector(`.huerto[data-id="${currentHuertoId}"]`);
                    if (huerto) {
                        huerto.remove();
                    }
                    currentHuertoId = null;
                } else {
                    console.error('Error al eliminar el huerto:', data.error);
                }
            })
            .catch(error => console.error('Error:', error));
    }
    cerrarPopupEliminar();
}
function cerrarPopupEliminar() {
    var popup = document.getElementById('popupEliminar');
    popup.style.display = 'none';
}
function cerrarPopupVincular() {
    var popup = document.getElementById('popupAñadirSonda');
    popup.style.display = 'none';
}

function editarNombre() {
    var popup = document.getElementById('popupEditarNombre');
    if (popup.style.display === 'none' || popup.style.display === '') {
        popup.style.display = 'block';
    } else {
        var nuevoNombre = popup.querySelector('input[type="text"]').value;
        if (nuevoNombre && currentHuertoId !== null) {
            // Actualizar el nombre en la interfaz de usuario
            var huerto = document.querySelector(`.huerto[data-id="${currentHuertoId}"] h3`);
            if (huerto) {
                huerto.textContent = nuevoNombre;
            }

            // Enviar solicitud para actualizar el nombre en la base de datos
            fetch('../../api/actualizarNombreHuerto.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_huerto: currentHuertoId,
                    nombre: nuevoNombre
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log('Nombre del huerto actualizado correctamente');
                    } else {
                        console.error('Error al actualizar el nombre del huerto:', data.error);
                    }
                })
                .catch(error => console.error('Error:', error));

            currentHuertoId = null;
        }
        popup.style.display = 'none';
    }
}


function vincularSonda() {
    var popup = document.getElementById('popupAñadirSonda');
    popup.style.display = (popup.style.display === 'none') ? 'block' : 'none';
}

// Cerrando los popups
document.querySelector('#popupEditarNombre .cerrar').addEventListener('click', function() {
    document.getElementById('popupEditarNombre').style.display = 'none';
});

document.querySelector('#popupEliminar .cerrar').addEventListener('click', function() {
    cerrarPopupEliminar();
});

document.querySelector('#popupEliminar .button').addEventListener('click', confirmarEliminar);
document.querySelector('#popupEditarNombre .button').addEventListener('click', editarNombre);


