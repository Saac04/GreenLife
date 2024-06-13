document.addEventListener('DOMContentLoaded', function() {
    const mostrarTablaBtn = document.getElementById('mostrarTablaBtn');
    const tablaContainer = document.querySelector('.export-container');

    mostrarTablaBtn.addEventListener('click', function() {
        const nombreUsuario = document.getElementById('nombreUsuario').value;
        const huerto = document.getElementById('Huerto').value;

        // Simulación de datos para diferentes usuarios
        const datosPorUsuario = {
            'Alan': [
                { huerto: 'Huerto 1', sonda: 'Sonda A', estado: 'on' },
                { huerto: 'Huerto 1', sonda: 'Sonda B', estado: 'off' },
                { huerto: 'Huerto 2', sonda: 'Sonda C', estado: 'on' },
                { huerto: 'Huerto 3', sonda: 'Sonda D', estado: 'on' },
                { huerto: 'Huerto 3', sonda: 'Sonda E', estado: 'off' }
            ],
            'Imanol': [
                { huerto: 'Huerto 2', sonda: 'Sonda F', estado: 'off' },
                { huerto: 'Huerto 3', sonda: 'Sonda G', estado: 'on' },
                { huerto: 'Huerto 1', sonda: 'Sonda H', estado: 'on' },
                { huerto: 'Huerto 2', sonda: 'Sonda I', estado: 'off' },
                { huerto: 'Huerto 2', sonda: 'Sonda J', estado: 'on' }
            ],
            'Alex': [
                { huerto: 'Huerto 1', sonda: 'Sonda K', estado: 'on' },
                { huerto: 'Huerto 2', sonda: 'Sonda L', estado: 'off' },
                { huerto: 'Huerto 3', sonda: 'Sonda M', estado: 'on' },
                { huerto: 'Huerto 1', sonda: 'Sonda N', estado: 'off' },
                { huerto: 'Huerto 3', sonda: 'Sonda O', estado: 'on' }
            ]
        };

        // Obtener los datos del usuario actual
        const datos = datosPorUsuario[nombreUsuario] || [];

        // Filtrar datos basados en el huerto seleccionado
        let datosFiltrados = [];
        if (huerto === 'Todos') {
            datosFiltrados = datos; // Mostrar todos los huertos disponibles
        } else {
            datosFiltrados = datos.filter(dato => dato.huerto === huerto);
        }

        // Construir la tabla
        const tabla = document.createElement('table');
        tabla.innerHTML = `
            <thead>
                <tr>
                    <th>Huerto</th>
                    <th>Sonda</th>
                    <th>Estado (on, off)</th>
                </tr>
            </thead>
            <tbody>
                ${datosFiltrados.map(dato => `
                    <tr>
                        <td>${dato.huerto}</td>
                        <td>${dato.sonda}</td>
                        <td class="${dato.estado === 'off' ? 'estado-off' : ''}">${dato.estado}</td>
                    </tr>
                `).join('')}
            </tbody>
        `;

        // Limpiar el contenedor de la tabla y agregar la nueva tabla
        tablaContainer.innerHTML = '';
        tablaContainer.appendChild(tabla);
    });
});
