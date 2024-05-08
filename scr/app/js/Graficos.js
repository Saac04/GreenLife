//import * as Utils from "./Utils.js";
var ctx = document.getElementById('myChart').getContext('2d');

function generarNumerosAleatorios(tamaño, minimo, maximo) {
    const numeros = [];
    for (let i = 0; i < tamaño; i++) {
        const numeroAleatorio = Math.random() * (maximo - minimo) + minimo;
        numeros.push(numeroAleatorio);
    }
    return numeros;
}


const DATA_COUNT = 7
const DATA_HUMEDAD = generarNumerosAleatorios(DATA_COUNT, 0, 100);
const DATA_TEMPERATURA = generarNumerosAleatorios(DATA_COUNT, 6, 36);
const DATA_LUMINOSIDAD = generarNumerosAleatorios(DATA_COUNT, 0, 100);
const DATA_SALINIDAD = generarNumerosAleatorios(DATA_COUNT, 0, 3);
const DATA_PH = generarNumerosAleatorios(DATA_COUNT, 4, 9);


var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
        datasets: [
            {
                label: 'HUMEDAD (%)',
                data: DATA_HUMEDAD,
                yAxisID: 'y',
                borderColor: '#25A6FF',
                borderWidth: 2
            },
            {
                label: 'TEMPERATURA',
                data: DATA_TEMPERATURA,
                yAxisID: 'y1',
                borderColor: ' #E54D4D',
                borderWidth: 2
            },
            {
                label: 'LUMINOSIDAD',
                data: DATA_LUMINOSIDAD,
                yAxisID: 'y2',
                borderColor: '#FFCB40',
                borderWidth: 2
            },
            {
                label: 'SALINIDAD',
                data: DATA_SALINIDAD,
                yAxisID: 'y3',
                borderColor: '#847E7E',
                borderWidth: 2
            },
            {
                label: 'PH',
                data: DATA_PH,
                yAxisID: 'y4',
                borderColor: '#0B8C00',
                borderWidth: 2
            }
        ]
    },
    options: {
        datasets: {
            display:false
        },
        responsive: true,
        maintainAspectRatio:true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Chart.js Line Chart - Multi Axis'
            }
        },
        scales: {

            y: {
                type: 'linear',
                display: true,
                position: 'left',
                weight: 0,
                ticks: {
                    font: {
                        family: 'Kanit Light', // Cambiar la familia de fuente de los números en el eje Y
                        size: 18, // Cambiar el tamaño de los números en el eje Y
                        color: '#25A6FF',
                    },
                color: '#25A6FF',
                },
                border:{
                    display:true,
                    color: '#25A6FF',
                    width: 2,
                },
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
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
                        family: 'Kanit Light', // Cambiar la familia de fuente de los números en el eje Y
                        size: 18, // Cambiar el tamaño de los números en el eje Y
                    },
                    color:'#E54D4D'
                },
                border:{
                    display:true,
                    color: '#E54D4D',
                    width: 2,
                },
                // grid line settings
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
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
                        family: 'Kanit Light', // Cambiar la familia de fuente de los números en el eje Y
                        size: 18 // Cambiar el tamaño de los números en el eje Y
                    },
                    color:'#FFCB40'
                },
                border:{
                    display:true,
                    color: '#FFCB40',
                    width: 2,
                },
                // grid line settings
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
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
                        family: 'Kanit Light', // Cambiar la familia de fuente de los números en el eje Y
                        size: 18 // Cambiar el tamaño de los números en el eje Y
                    },
                    color: '#847E7E'
                },
                border:{
                    display:true,
                    color: '#847E7E',
                    width: 2,
                },
                // grid line settings
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
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
                        family: 'Kanit Light', // Cambiar la familia de fuente de los números en el eje Y
                        size: 18 // Cambiar el tamaño de los números en el eje Y
                    },
                    color: '#0B8C00'
                },
                border:{
                    display:true,
                    color: '#0B8C00',
                    width: 2,

                },
                // grid line settings
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
                min: 4,
                max: 9,
            }
        }
    }
});

function toggleDataSet(datasetIndex) {
    var chart = myChart;
    var datasets = chart.data.datasets;
    var dataset = chart.data.datasets[datasetIndex];

    if (datasetIndex === 5) {

        for (var i = 0; i < datasets.length; i++) {
            datasets[i].hidden = false
            datasets[i].
        }
    } else {
        for (var i = 0; i < datasets.length;  i++) {
            if ( i != datasetIndex) {
                datasets[i].hidden = true;
            } else if (i === datasetIndex) {
                datasets[i].hidden = false
            }
        }
    }
    chart.update(); // Actualizar el gráfico
}

