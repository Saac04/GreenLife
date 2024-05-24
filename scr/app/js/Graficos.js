//import * as Utils from "./Utils.js";
var ctx = document.getElementById('myChart').getContext('2d');

var limites = {
    "humedad": [90, 45],
    "temperatura": [30, 15],
    "luminosidad": [40, 10],
    "salinidad": [2.5, 0],
    "pH": [7, 5.5]
};


function generarNumerosAleatorios(tamaño, minimo, maximo) {
    const numeros = [];
    for (let i = 0; i < tamaño; i++) {
        const numeroAleatorio = Math.random() * (maximo - minimo) + minimo;
        numeros.push(numeroAleatorio);
    }
    return numeros;
}


const DATA_COUNT = 7
const DATA_HUMEDAD = generarNumerosAleatorios(DATA_COUNT, 45, 90);
const DATA_TEMPERATURA = generarNumerosAleatorios(DATA_COUNT, 15, 30);
const DATA_LUMINOSIDAD = generarNumerosAleatorios(DATA_COUNT, 10, 40);
const DATA_SALINIDAD = generarNumerosAleatorios(DATA_COUNT, 0, 2.5);
const DATA_PH = generarNumerosAleatorios(DATA_COUNT, 5.5, 7);


var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['09:00', '12:00', '15:00', '18:00', '21:00'],
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
                        family: 'Kanit Light', // Cambiar la familia de fuente de los números en el eje Y
                        size: 18, // Cambiar el tamaño de los números en el eje Y
                        color: '#25A6FF',
                    },
                color: '#25A6FF',
                },
                border:{
                    display:true,
                    color: '#25A6FF',
                    width: 1.5,
                },
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                    tickColor:'#25A6FF',
                    tickWidth: 1.5,
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
                    width: 1.5,
                },
                // grid line settings
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                    tickColor:'#E54D4D',
                    tickWidth: 1.5,
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
                    width: 1.5,
                },
                // grid line settings
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                    tickColor:'#FFCB40',
                    tickWidth: 1.5,
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
                    width: 1.5,
                },
                // grid line settings
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                    tickColor:'#847E7E',
                    tickWidth: 1.5,
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
                    width: 1.5,

                },
                // grid line settings
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                    tickColor:'#0B8C00',
                    tickWidth: 1.5,
                },
                min: 4,
                max: 9,
            },
            x: {
                border:{
                    display:true,
                    color: '#545454',
                    width: 1.5,
                },
            }
        },


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

window.onload = noLegeds()

function  noLegeds (){
    myChart.options.plugins.legend.display = false
    myChart.update()
}


function conversorInputGrafica(input, tipo){

    if( tipo === 'temperatura'){
        return ((input - 5) / 35) * 100
    } else if (tipo === 'salinidad'){
        return (input*100)/3
    } else if (tipo === 'pH') {
        return ((input - 4) / 5) * 100
    }
}
function changeLimtis(i){
    var limiteID = asingNumberToId(i)
    var maximo
    var minimo
    
    var limid = document.getElementsByClassName('active')[0].id


    if ((i === -1 && limid === 'humedad') || ( i === -1 && limid === 'luminosidad' )){

        maximo = document.getElementById("maximo").value
        minimo = document.getElementById("minimo").value

    } else if (i === -1 && limid != 'humedad' && limid != 'luminosidad' ){

        maximo = conversorInputGrafica(document.getElementById("maximo").value, limid)
        minimo = conversorInputGrafica(document.getElementById("minimo").value, limid)

    } else if (limid != 'humedad' && limid != 'luminosidad'){

        maximo = conversorInputGrafica(limites[limiteID][0] , limiteID)
        minimo = conversorInputGrafica(limites[limiteID][1] , limiteID)
    } else {
        maximo = limites[limiteID][0]
        minimo = limites[limiteID][1]
    }
    agregarLineasHorizontales(myChart, maximo, minimo);
}

function agregarLineasHorizontales(chart, maximo, minimo) {

    if(!document.getElementById('todo').classList.contains('active')){
        chart.options.plugins.annotation = {
            annotations: {
                limMax:{
                    type: 'line',
                    yMin: maximo,
                    yMax: maximo,
                    borderColor: 'black',
                    borderWidth: 1.5,
                    borderDash: [5, 5],
                },
                labelMax: {
                    type: 'label',
                    xValue: 3.9,
                    yValue: parseInt(maximo) + 5,
                    color:'black',
                    backgroundColor: 'rgba(0,0,0,0)',
                    content: ['Max'],
                    font: {
                        family:"kanit light",
                        size: 16,
                    }
                },
                LimMin:{
                    type: 'line',
                    yMin: minimo,
                    yMax: minimo,
                    borderColor: 'black',
                    borderWidth: 1,
                    borderDash: [5, 5],
                },
                labelMin: {
                    type: 'label',
                    xValue: 3.9,
                    yValue: parseInt(minimo) + 5,
                    color:'black',
                    backgroundColor: 'rgba(0,0,0,0)',
                    content: ['Min'],
                    font: {
                        family:"kanit light",
                        size: 16,
                    }
                },
            }
        };

        chart.update();
    }else{
        chart.options.plugins.annotation = {
            annotations: {
                limMax:{
                    display: false
                },
                labelMax: {
                    display: false
                },
                LimMin:{
                    display: false
                },
                labelMin: {
                    display: false
                },
            }
        };

        chart.update();
    }
}




document.addEventListener("DOMContentLoaded", function() {
    // Obtener referencia al input
    var maxInput = document.getElementById("maximo");
    var minInput = document.getElementById("minimo");
    var advertencia = document.getElementById('advertencia')

    // Obtener todos los divs con la clase "miDiv"
    var miDivs = document.querySelectorAll(".button-color");
    var botonTodo = document.getElementById('todo')

    // Agregar un evento de clic a cada div
    miDivs.forEach(function(div) {
        div.addEventListener("click", function(event) {
            // Verificar si el objetivo del evento es un botón
            if (event.target.tagName === "BUTTON") {
                // Habilitar el input si se hace clic en un botón dentro del div
                maxInput.disabled = false;
                minInput.disabled = false;
                maxInput.value = undefined;
                minInput.value = undefined;
                advertencia.style.display = "none"
            }
        });
    });

    botonTodo.addEventListener("click", function() {
        // Habilitar el input cuando se hace clic en el botón
        maxInput.disabled = true;
        minInput.disabled = true;
        advertencia.style.display = "block"
    });
});