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
function changeLimtis(maximo, minimo ){

    var boton = document.querySelector('button[data-btn="1"]');
    var limid = boton.id


    if (limid != 'humedad' && limid != 'luminosidad' ){

        maximo = conversorInputGrafica(maximo, limid)
        minimo = conversorInputGrafica(minimo, limid)
    }


    console.log(maximo)
    console.log(minimo)

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
                    xValue: 5.9,
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
                    xValue: 5.9,
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

    cargarSondas();



});

function validarLimites() {
    var maximo = document.getElementById("maximo").value;
    var minimo = document.getElementById("minimo").value;
    var advertencia = document.getElementById("advertencia");

    var sondaDropdown = document.getElementsByClassName('dropdown-option')[0];
    var idSonda = sondaDropdown.value;

    var boton = document.querySelector('button[data-btn="1"]');
    parametro = boton.id

    if (parametro === 'luminosidad'){
        parametro = 'lux'
    }

    if (maximo !== '' && minimo !== '' && Number(maximo) < Number(minimo)) {
        advertencia.textContent = "Asegúrese de que el máximo no sea menor que el mínimo";
        advertencia.style.display = "block"; // Mostrar advertencia
    } else {
        // advertencia.textContent = "Valores aceptados";
        advertencia.style.display = "none"; // Ocultar advertencia
        actualizarLimites(idSonda, parametro); // Ejemplo: sonda 1, parámetro 'humedad'
        cargarLimites(idSonda, parametro)
    }
}





function detectarCambioAnchura() {
    if (window.innerWidth < 500) {
        cambiarFontSizeY(12)
    } else if (window.innerWidth > 500){
        cambiarFontSizeY(18)
    }
}

window.addEventListener('resize', detectarCambioAnchura);

function cambiarFontSizeY(fontSize) {
    // Obtener la configuración de cada eje Y y actualizar el tamaño de fuente
    myChart.options.scales.y.ticks.font.size = fontSize;
    myChart.options.scales.y1.ticks.font.size = fontSize;
    myChart.options.scales.y2.ticks.font.size = fontSize;
    myChart.options.scales.y3.ticks.font.size = fontSize;
    myChart.options.scales.y4.ticks.font.size = fontSize;

    // Actualizar el gráfico para reflejar los cambios
    myChart.update();
}

function cargarSondas() {
    // Obtener el ID del huerto (puedes pasarlo directamente desde PHP o desde un elemento HTML)
    var id_huerto =/* <?php echo $_GET['id_huerto']; ?>;*/ 1

    // Hacer la solicitud al servidor
    fetch('../../api/obtener_sondas.php?id_huerto=' + id_huerto)
        .then(response => response.json())
        .then(data => {
            var dropdown = document.getElementById('sonda');
            dropdown.innerHTML = ''; // Limpiar el dropdown

            // Agregar una opción predeterminada
            /*var defaultOption = document.createElement('option');
            defaultOption.text = 'Selecciona una sonda';
            defaultOption.disabled = true;
            defaultOption.selected = true;
            defaultOption.className = 'dropdown-option';
            dropdown.appendChild(defaultOption);
*/

            // Agregar cada sonda al dropdown
            data.forEach(s => {
                var option = document.createElement('option');
                option.text = s.nombre;
                option.value = s.id_sondas;
                option.className = 'dropdown-option';
                dropdown.appendChild(option);
            });
            if (data.length > 0) {
                var firstSondaId = data[0].id_sondas;

                // Obtener la fecha actual
                var fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ');


                // Calcular la fecha de inicio retrocediendo 5 registros
                var fechaInicio = new Date();
                fechaInicio.setHours(fechaInicio.getHours() - 20); // Retroceder 5 horas


                // Llamar a la función cargarLecturas con las fechas calculadas
                cargarLecturas(firstSondaId, fechaInicio.toISOString().slice(0, 19).replace('T', ' '), fechaActual);
            }

        })


        .catch(error => console.error('Error:', error));
}

function cargarLecturas(id_sonda, fechaInicio, fechaFin) {
    // Hacer la solicitud al servidor para obtener las lecturas de la sonda dentro del rango de fechas
    fetch('../../api/ObtenerDatosSonda.php?id_sonda='+ id_sonda + '&fechaInicio=' + fechaInicio + '&fechaFinal=' + fechaFin)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                alert("No hay lecturas disponibles para las fechas seleccionadas.");
                return;
            }
            var humedad = data.map(lectura => lectura.humedad);
            var temperatura = data.map(lectura => lectura.temperatura);
            var luminosidad = data.map(lectura => lectura.lux);
            var salinidad = data.map(lectura => lectura.salinidad);
            var pH = data.map(lectura => lectura.pH);


            // Dividir los promedios totales en 7 partes iguales
            var promediosHumedad = calcularPromedios(humedad);
            var promediosTemperatura = calcularPromedios(temperatura);
            var promediosLuminosidad = calcularPromedios(luminosidad.map(valor => valor / 100));
            var promediosSalinidad = calcularPromedios(salinidad);
            var promediosPH = calcularPromedios(pH);

            // Actualizar los datos de la gráfica
            myChart.data.datasets[0].data = promediosHumedad;
            myChart.data.datasets[1].data = promediosTemperatura;
            myChart.data.datasets[2].data = promediosLuminosidad;
            myChart.data.datasets[3].data = promediosSalinidad;
            myChart.data.datasets[4].data = promediosPH;



            // Actualizar las etiquetas del eje x
            myChart.data.labels = ['1', '2', '3', '4', '5', '6', '7'];

            // Actualizar la gráfica
            myChart.update();

        })
        .catch(error => console.error('Error:', error));
}

function cargarLimites() {
    var sondaDropdown = document.getElementsByClassName('dropdown-option')[0];
    var idSonda = sondaDropdown.value;

    var boton = document.querySelector('button[data-btn="1"]');
    parametro = boton.id

    if (parametro === 'luminosidad'){
        parametro = 'lux'
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../../api/obtener_limites.php?id_sonda=' + idSonda + '&tipo_parametro=' + parametro, true);
    xhr.onload = function() {
        if (this.status == 200) {
            var datos = JSON.parse(this.responseText);
            document.getElementById('maximo').value = datos.valor_max;
            document.getElementById('minimo').value = datos.valor_min;

            changeLimtis(datos.valor_max, datos.valor_min )

        }
    };
    xhr.send();
}

function actualizarLimites(idSonda, tipoParametro) {
    var valorMax = document.getElementById('maximo').value;
    var valorMin = document.getElementById('minimo').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '../../api/actualizar_limites.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (this.status == 200) {
            alert('Límites actualizados correctamente.');
        } else {
            alert('Error al actualizar los límites.');
        }
    };
    xhr.send('id_sonda=' + idSonda + '&tipo_parametro=' + tipoParametro + '&valor_max=' + valorMax + '&valor_min=' + valorMin);

    changeLimtis(valorMax,valorMin)
}
// Esta función calculará el promedio de un conjunto de números
function calcularPromedios(lecturas) {
    var lecturasTotales = lecturas.length;
    var promedios = [];

    var tamanoParte = Math.floor(lecturasTotales / 7); // Redondear hacia arriba para asegurar que todas las partes tengan al menos un elemento

    // Iterar sobre las partes
    for (var i = 0; i < 7; i++) {
        var inicio = i * tamanoParte;
        var fin = Math.min((i + 1) * tamanoParte, lecturasTotales); // Asegurar que el índice final esté dentro del rango

        var parteLecturas = lecturas.slice(inicio, fin); // Obtener la parte actual de las lecturas
        var suma = parteLecturas.reduce((total, lectura) => total + lectura, 0); // Calcular la suma de la parte actual

        var promedio = parseFloat(suma) / parteLecturas.length; // Calcular el promedio de la parte actual

        promedios.push(promedio); // Agregar el promedio al array de promedios
    }

    return promedios;
}


document.addEventListener('DOMContentLoaded', function() {
    // Agregar evento de escucha al botón "Ver Datos"
    document.getElementById('button_tiempo').addEventListener('click', function() {
        // Obtener las fechas de inicio y fin de los campos de entrada
        var fechaInicio = document.getElementById('fechaIni').value;
        var fechaFin = document.getElementById('fechaFin').value;

        // Verificar si la fecha de inicio es posterior a la fecha final
        if (fechaInicio > fechaFin) {
            alert("La fecha de inicio no puede ser posterior a la fecha de fin.");
            return;
        }

        // Obtener el ID de la primera sonda seleccionada en el dropdown
        var id_sonda = document.getElementById('sonda').value;

        // Llamar a la función cargarLecturas con las fechas y el ID de la sonda
        cargarLecturas(id_sonda, fechaInicio, fechaFin);
    });
});



fetch('../../api/ObtenerDatosSonda.php?id_sonda='+ id_sonda)