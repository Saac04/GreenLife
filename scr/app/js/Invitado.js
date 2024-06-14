var ctx = document.getElementById('myChart').getContext('2d');

// Datos iniciales (ejemplo)
var huertos = {
    'Huerto 1': {
        humedad: [65, 70, 68, 72, 69, 67, 66], // Datos de humedad para 7 días
        temperatura: [20, 22, 21, 23, 24, 22, 21], // Datos de temperatura para 7 días
        luminosidad: [80, 85, 82, 88, 84, 81, 79], // Datos de luminosidad para 7 días
        salinidad: [1.2, 1.3, 1.1, 1.4, 1.3, 1.2, 1.3], // Datos de salinidad para 7 días
        ph: [6.5, 6.6, 6.7, 6.8, 6.9, 7.0, 6.9] // Datos de pH para 7 días
    },
    'Huerto 2': {
        humedad: [70, 72, 71, 69, 73, 70, 68],
        temperatura: [22, 23, 24, 25, 23, 22, 21],
        luminosidad: [85, 87, 83, 89, 86, 84, 82],
        salinidad: [1.3, 1.4, 1.2, 1.5, 1.4, 1.3, 1.2],
        ph: [6.6, 6.7, 6.8, 6.9, 7.0, 7.1, 7.0]
    }
};


// Configuración inicial del gráfico
var myChart;

function inicializarGrafico(huertoSeleccionado) {
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [1, 2, 3, 4, 5, 6, 7],
            datasets: [
                {
                    label: 'HUMEDAD (%)',
                    data: huertos[huertoSeleccionado].humedad,
                    yAxisID: 'y', // Asignado al eje 'y'
                    borderColor: '#25A6FF',
                    borderWidth: 2,
                    hidden: true // Inicialmente oculto
                },
                {
                    label: 'TEMPERATURA',
                    data: huertos[huertoSeleccionado].temperatura,
                    yAxisID: 'y1', // Asignado al eje 'y1'
                    borderColor: '#E54D4D',
                    borderWidth: 2,
                    hidden: true // Inicialmente oculto
                },
                {
                    label: 'LUMINOSIDAD',
                    data: huertos[huertoSeleccionado].luminosidad,
                    yAxisID: 'y2', // Asignado al eje 'y2'
                    borderColor: '#FFCB40',
                    borderWidth: 2,
                    hidden: true // Inicialmente oculto
                },
                {
                    label: 'SALINIDAD',
                    data: huertos[huertoSeleccionado].salinidad,
                    yAxisID: 'y3', // Asignado al eje 'y3'
                    borderColor: '#847E7E',
                    borderWidth: 2,
                    hidden: true // Inicialmente oculto
                },
                {
                    label: 'PH',
                    data: huertos[huertoSeleccionado].ph,
                    yAxisID: 'y4', // Asignado al eje 'y4'
                    borderColor: '#0B8C00',
                    borderWidth: 2,
                    hidden: true // Inicialmente oculto
                }
            ]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            stacked: false,
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        font: {
                            family: 'Kanit Light',
                            size: 18,
                            color: '#25A6FF',
                        },
                    },
                    grid: {
                        drawOnChartArea: false,
                        tickColor: '#25A6FF',
                    },
                    min: 0,
                    max: 100,
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        font: {
                            family: 'Kanit Light',
                            size: 18,
                        },
                    },
                    grid: {
                        drawOnChartArea: false,
                        tickColor: '#E54D4D',
                    },
                    min: 5,
                    max: 40,
                },
                y2: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        font: {
                            family: 'Kanit Light',
                            size: 18
                        },
                    },
                    grid: {
                        drawOnChartArea: false,
                        tickColor: '#FFCB40',
                    },
                    min: 0,
                    max: 100,
                },
                y3: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        font: {
                            family: 'Kanit Light',
                            size: 18
                        },
                    },
                    grid: {
                        drawOnChartArea: false,
                        tickColor: '#847E7E',
                    },
                    min: 0,
                    max: 3,
                },
                y4: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        font: {
                            family: 'Kanit Light',
                            size: 18
                        },
                    },
                    grid: {
                        drawOnChartArea: false,
                        tickColor: '#0B8C00',
                    },
                    min: 4,
                    max: 9,
                },
            },
        }
    });
}

// Función para generar datos aleatorios (solo para ejemplo)
function generarDatosAleatorios() {
    var data = [];
    for (var i = 0; i < 7; i++) {
        data.push(Math.floor(Math.random() * 100)); // Genera números aleatorios entre 0 y 100
    }
    return data;
}

// Función para actualizar los datos del gráfico según el huerto seleccionado
function actualizarGrafico() {
    var huertoSeleccionado = document.getElementById('huerto').value;

    myChart.data.datasets.forEach(function(dataset) {
        dataset.data = huertos[huertoSeleccionado][dataset.label.toLowerCase()];
    });

    myChart.update();
}

// Evento cuando se cambia el huerto
document.getElementById('huerto').addEventListener('change', function() {
    actualizarGrafico();
});

// Función para activar un único botón y actualizar el gráfico según el botón seleccionado
// Función para activar un único botón y actualizar el gráfico según el botón seleccionado
function activarUnicoGH(button) {
    var buttons = document.querySelectorAll('.button');
    buttons.forEach(function(btn) {
        btn.classList.remove('active');
    });
    button.classList.add('active');

    // Obtener el índice del botón seleccionado
    var btnIndex = parseInt(button.getAttribute('data-btn'));

    toggleDataSet(btnIndex);
}

// Función para alternar entre diferentes datasets
function toggleDataSet(btnIndex) {
    var huertoSeleccionado = document.getElementById('huerto').value;

    if (btnIndex === 5) { // Si se selecciona el botón "Todo"
        myChart.data.datasets.forEach(function(dataset) {
            dataset.hidden = false; // Mostrar todos los datasets
        });
    } else {
        myChart.data.datasets.forEach(function(dataset, index) {
            if (index < 5) { // Solo aplicar filtros a los primeros 5 datasets
                dataset.hidden = (index !== btnIndex); // Ocultar todos excepto el dataset seleccionado
            }
        });
    }

    // Verificar si algún dataset está visible
    var anyVisible = myChart.data.datasets.some(function(dataset) {
        return !dataset.hidden;
    });

    // Si no hay datasets visibles, mostrar por defecto el primer dataset (HUMEDAD (%))
    if (!anyVisible) {
        myChart.data.datasets[0].hidden = false;
    }

    myChart.update();
}


// Inicializar gráfico con el huerto seleccionado por defecto
var huertoInicial = document.getElementById('huerto').value;
inicializarGrafico(huertoInicial);
