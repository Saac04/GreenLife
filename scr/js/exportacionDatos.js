document.querySelector('.button').addEventListener('click', function() {
    var sensor = document.getElementById('sensor').value;
    var username = document.getElementById('nombreUsuario').value;
    var date = document.querySelector('.date-inputs input:first-child').value;

    // Lista de nombres de usuario permitidos
    var allowedUsernames = ['Alejandro Vázquez Remes', 'Alan Guevara Martínez', 'Santiago Alejandro Aguirre Crespo', 'Ferran Sansaloni Prats', 'Imanol Figuero Parras', 'Sergio García Camacho', 'Sergi Puig Biosca'];

    // Comprueba si el nombre de usuario está en la lista de nombres de usuario permitidos
    if (allowedUsernames.indexOf(username) === -1) {
        alert('Usuario no encontrado');
        return; // Sale de la función si el nombre de usuario no está permitido
    }

    // Comprueba si el formato de la fecha es correcto
    var dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(date)) { // Modificado para comprobar una sola fecha
        alert('El formato de fecha no es correcto');
        return; // Sale de la función si el formato de la fecha no es correcto
    }

    // Convierte la fecha a objeto Date
    var start = new Date(date.split('/').reverse().join('-'));
    var end = new Date(start);
    end.setDate(end.getDate() + 1); // Añade un día a la fecha de inicio para obtener la fecha de fin

    // Comprueba si la fecha está en el rango de 2022 a 2024
    var year = start.getFullYear();
    if (year < 2022 || year > 2024) {
        alert('Introduce un rango de 2022 a 2024');
        return; // Sale de la función si la fecha no está en el rango correcto
    }

    // Aquí es donde generarías los datos para el sensor y el usuario seleccionados.
    // Como este es sólo un ejemplo, voy a utilizar datos aleatorios.
    var sensors = sensor === 'Todos' ? ['Humedad', 'Salinidad', 'Temperatura', 'Luminosidad', 'Ph'] : [sensor];

    // Borra las tablas existentes una sola vez antes de empezar a crear nuevas tablas
    var existingTables = document.querySelectorAll('.export-container table');
    existingTables.forEach(function(table) {
        table.remove();
    });

    sensors.forEach(function(sensor) {
        var data = [];
        var magnitude; // Variable para almacenar la magnitud
        for (var i = 0; i < 10; i++) {
            var value;
            switch (sensor) {
                case 'Humedad':
                    value = Math.random() * 100; // Un valor aleatorio entre 0 y 100
                    magnitude = '%'; // Magnitud para Humedad
                    break;
                case 'Salinidad':
                    value = Math.random() * 10000; // Un valor aleatorio para la conductividad eléctrica
                    magnitude = 'cE'; // Magnitud para Salinidad
                    break;
                case 'Temperatura':
                    value = Math.random() * 50; // Un valor aleatorio para la temperatura en grados
                    magnitude = 'ºC'; // Magnitud para Temperatura
                    break;
                case 'Luminosidad':
                    value = Math.random() * 100000; // Un valor aleatorio para la luminosidad en lux
                    magnitude = 'lux'; // Magnitud para Luminosidad
                    break;
                case 'Ph':
                    value = Math.random() * 14; // Un valor aleatorio para el pH
                    magnitude = 'pH'; // Magnitud para pH
                    break;
            }
            var time = new Date(start.getTime() + i * 3 * 60 * 60 * 1000); // Añade 3 horas por cada iteración
            if (time > end) {
                break; // No genera más datos si la hora supera la fecha final
            }
            // Modificado para mostrar la fecha y hora en el formato deseado
            var formattedTime = time.toISOString().split('T')[0] + ' / ' + time.toISOString().split('T')[1].split('.')[0];
            data.push({time: formattedTime, value: value.toFixed(2), magnitude: magnitude});
        }

        // Comprueba si hay datos antes de crear la tabla
        if (data.length > 0) {
            // Crea una nueva tabla para cada sensor
            var table = document.createElement('table');

            // Añade una clase a la tabla
            table.className = 'my-table';

            var header = document.createElement('tr');
            var timeHeader = document.createElement('th');
            timeHeader.textContent = 'Hora';
            var valueHeader = document.createElement('th');
            valueHeader.textContent = 'Valores';
            var sensorHeader = document.createElement('th');
            sensorHeader.textContent = 'Magnitud';
            header.appendChild(timeHeader);
            header.appendChild(valueHeader);
            header.appendChild(sensorHeader);
            table.appendChild(header);
            for (var i = 0; i < data.length; i++) {
                var row = document.createElement('tr');
                var timeCell = document.createElement('td');
                timeCell.textContent = data[i].time; // Modificado para mostrar la fecha y hora en el formato deseado
                var valueCell = document.createElement('td');
                valueCell.textContent = data[i].value;
                var sensorCell = document.createElement('td');
                sensorCell.textContent = data[i].magnitude; // Modificado para mostrar la magnitud
                row.appendChild(timeCell);
                row.appendChild(valueCell);
                row.appendChild(sensorCell);
                table.appendChild(row);
            }

            // Añade la tabla al contenedor
            document.querySelector('.export-container').appendChild(table);
        }
    });
});

