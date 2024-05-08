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
                    tickColor:'#25A6FF',
                    tickWidth: 2,
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
                    tickColor:'#E54D4D',
                    tickWidth: 2,
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
                    tickColor:'#FFCB40',
                    tickWidth: 2,
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
                    tickColor:'#847E7E',
                    tickWidth: 2,
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
                    tickColor:'#0B8C00',
                    tickWidth: 2,
                },
                min: 4,
                max: 9,
            },
            x: {
                border:{
                    display:true,
                    color: '#545454',
                    width: 2,

                },
            }
        }
    }
});

function toggleDataSet(datasetIndex) {
    var chart = myChart;
    var datasets = myChart.data.datasets;

    if (datasetIndex === 5) {
        for (var i = 0; i < datasets.length; i++) {
            showGraphic(i)
        }
        moveYAxis(datasetIndex)
    } else {
        for (var i = 0; i < datasets.length;  i++) {
            if ( i != datasetIndex) {
                hideGraphic(i)
            } else if (i === datasetIndex) {
                showGraphic(i)
                moveYAxis(i)
            }
        }
    }
    chart.update(); // Actualizar el gráfico
}

function showGraphic(i){
    myChart.data.datasets[i].hidden = false;
    if (myChart.options.scales[myChart.data.datasets[i].yAxisID]) {
        myChart.options.scales[myChart.data.datasets[i].yAxisID].display = true;
    }
}

function hideGraphic(i){
    myChart.data.datasets[i].hidden = true;
    if (myChart.options.scales[myChart.data.datasets[i].yAxisID]) {
        myChart.options.scales[myChart.data.datasets[i].yAxisID].display = false;
    }
}

function asingNumberToId (i){
    if (i === 0) {
        return "humedad";
    } else if (i === 1) {
        return "temperatura";
    } else if (i === 2) {
        return "luminosidad";
    } else if (i === 3) {
        return "salinidad";
    } else if (i === 4) {
        return "pH";
    } else if (i === 5){
        return "todo"
    } else {
        return "Otra cosa";
    }
}
function moveYAxis(i){

    if ( i === 1 || i === 3 || i === 4){
        myChart.options.scales[myChart.data.datasets[i].yAxisID].position = 'left'
    } else if (i === 5){
        for (var j = 0; j < myChart.data.datasets.length; j++) {
            if (j === 1 || j === 3 || j === 4){
                myChart.options.scales[myChart.data.datasets[j].yAxisID].position = 'right'
            }
        }
    }

}
