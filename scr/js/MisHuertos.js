document.querySelector('.boton_nuevohuerto').addEventListener('click', function() {
    // Cuenta cuántos huertos existen ya
    var numHuertos = document.querySelectorAll('.huerto').length;

    // Determina si el nuevo huerto es par o impar
    var esPar = (numHuertos + 1) % 2 === 0;
    var claseFondo = esPar ? 'fondoPar' : 'fondoImpar';

    // Crea un nuevo div con la estructura de un huerto
    var nuevoHuerto = document.createElement('div');
    nuevoHuerto.className = 'huerto dios ' + claseFondo;
    nuevoHuerto.dataset.id = numHuertos + 1; // Añadir el data-id
    nuevoHuerto.innerHTML = `
      <h3>Huerto ${numHuertos + 1}</h3>
      <div>
        <button class="button" onclick="vincularSonda(${numHuertos + 1})">Añadir Sonda</button>
        <a class="button" href="GraficosHistoricos.html">Ver Gráficas</a>
        <button class="button boton-editar" onclick="abrirEditarPopup(${numHuertos + 1})">Editar Nombre</button>
        <button class="button boton-eliminar" onclick="abrirEliminarPopup(${numHuertos + 1})">Eliminar</button>
      </div>
    `;

    // Añade el nuevo huerto al contenedor de huertos
    document.querySelector('.contendorHuertos').appendChild(nuevoHuerto);
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
        var huerto = document.querySelector(`.huerto[data-id="${currentHuertoId}"]`);
        if (huerto) {
            huerto.remove();
        }
        currentHuertoId = null;
    }
    cerrarPopupEliminar();
}

function cerrarPopupEliminar() {
    var popup = document.getElementById('popupEliminar');
    popup.style.display = 'none';
}

function editarNombre() {
    var popup = document.getElementById('popupEditarNombre');
    if (popup.style.display === 'none' || popup.style.display === '') {
        popup.style.display = 'block';
    } else {
        var nuevoNombre = popup.querySelector('input[type="text"]').value;
        if (nuevoNombre && currentHuertoId !== null) {
            var huerto = document.querySelector(`.huerto[data-id="${currentHuertoId}"] h3`);
            if (huerto) {
                huerto.textContent = nuevoNombre;
            }
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
