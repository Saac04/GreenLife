<?php
// Conexión a la base de datos
$conexion = new mysqli("localhost", "root", "", "greenlife");

// Verificar conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Obtener el ID de la sonda (suponiendo que ya lo tienes)
$id_sonda = $_GET['id_sonda'];

// Obtener las fechas de inicio y finalización de la solicitud
$fechaInicio = $_GET['fechaInicio'];
$fechaFinal = $_GET['fechaFinal'];

// Consulta para obtener las lecturas de la sonda especificada dentro del rango de fechas
$sql = "SELECT * FROM lecturas WHERE id_sonda = $id_sonda AND fecha_hora BETWEEN '$fechaInicio' AND '$fechaFinal' ORDER BY fecha_hora DESC";

$resultado = $conexion->query($sql);

// Crear un array para almacenar las lecturas
$lecturas = array();

if ($resultado->num_rows > 0) {
    while($row = $resultado->fetch_assoc()) {
        // Agregar cada lectura al array
        $lecturas[] = $row;
    }
}

// Devolver las lecturas en formato JSON
echo json_encode($lecturas);

// Cerrar la conexión
$conexion->close();
?>
