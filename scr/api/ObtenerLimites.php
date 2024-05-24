<?php
// Conexión a la base de datos
$conexion = new mysqli("localhost", "root", "", "greenlife");

// Verificar conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
// Obtener el ID de la sonda (suponiendo que ya lo tienes)
$id_sonda = $_GET['id_sonda'];

// Consulta para obtener los límites de la sonda especificada
$sql = "SELECT tipo_parametro, valor_min, valor_max FROM limites WHERE id_sonda = $id_sonda";
$resultado = $conexion->query($sql);

// Crear un array para almacenar los límites
$limites = array();

if ($resultado->num_rows > 0) {
    while($row = $resultado->fetch_assoc()) {
        // Agregar cada límite al array
        $limites[$row['tipo_parametro']] = array(
            'valor_min' => $row['valor_min'],
            'valor_max' => $row['valor_max']
        );
    }
}

// Devolver los límites en formato JSON
echo json_encode($limites);

// Cerrar la conexión
$conexion->close();
?>