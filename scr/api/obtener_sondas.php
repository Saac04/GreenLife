<?php
// Conexión a la base de datos
$conexion = new mysqli("localhost", "root", "", "greenlife");

// Verificar conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Obtener el ID del huerto (suponiendo que ya lo tienes)
$id_huerto = $_GET['id_huerto'];
//$id_huerto = 1;

// Consulta para obtener las sondas del huerto especificado
$sql = "SELECT * FROM sondas WHERE id_huerto = $id_huerto";

$resultado = $conexion->query($sql);

// Crear un array para almacenar las sondas
$sondas = array();

if ($resultado->num_rows > 0) {
    while($row = $resultado->fetch_assoc()) {
        // Agregar cada sonda al array
        $sondas[] = $row;
    }
}

// Devolver las sondas en formato JSON
echo json_encode($sondas);

// Cerrar la conexión
$conexion->close();
?>