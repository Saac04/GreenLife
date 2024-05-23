    function toggleActive(button) {
    button.classList.toggle("active");
}

function toggleDropdown() {
    var dropdownContent = document.getElementById("dropdownContent");
    if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
    } else {
        dropdownContent.style.display = "block";
    }
}

function activarUnico(button) {
    var divContenedor = button.parentNode;
    var botones = divContenedor.querySelectorAll("button");
    botones.forEach(function(btn) {
        btn.classList.remove("active");
    });
    button.classList.add("active");
}

    function activarUnicoGH(button) {
        // Obtener todos los botones dentro de los contenedores hermanos
        var botones = button.parentNode.parentNode.parentNode.querySelectorAll("button");

        // Desactivar todos los botones
        botones.forEach(function(btn) {
            btn.classList.remove('active', 'color-humedad-oscuro', 'color-temperatura-oscuro', 'color-luminosidad-oscuro', 'color-salinidad-oscuro', 'color-ph-oscuro');
            btn.setAttribute('data-btn', '0');

        });
        // Activar el botón específico
        //button.classList.add("active");

        if (button.classList.contains('color-humedad')) {
            button.classList.add('color-humedad-oscuro');
            button.setAttribute('data-btn', '1');
        } else if (button.classList.contains('color-temperatura')) {
            button.classList.add('color-temperatura-oscuro');
            button.setAttribute('data-btn', '1');
        } else if (button.classList.contains('color-luminosidad')) {
            button.classList.add('color-luminosidad-oscuro');
            button.setAttribute('data-btn', '1');
        } else if (button.classList.contains('color-salinidad')) {
            button.setAttribute('data-btn', '1');
            button.classList.add('color-salinidad-oscuro');
        } else if (button.classList.contains('color-pH')) {
            button.setAttribute('data-btn', '1');
            button.classList.add('color-ph-oscuro');
        } else if (button.id == 'todo'){
            button.classList.add('active');
            button.setAttribute('data-btn', '1');
        }

    }



    function redirigirAIndex() {
        // Cambia 'pagina.html' por la URL de la página a la que deseas redirigir
        window.location.href = 'index.html';
    }
