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
        var botones = button.parentNode.parentNode.querySelectorAll("button");

        // Desactivar todos los botones
        botones.forEach(function(btn) {
            btn.classList.remove("active");
        });

        // Activar el botón específico
        button.classList.add("active");
    }