<?php
session_start();
header('Content-Type: application/json');

require_once 'includes/connexion.php';  // Incluye el archivo de conexión

// Verificar conexión
if ($connexion->connect_error) {
    die(json_encode(['error' => 'Conexión fallida: ' . $connexion->connect_error]));
}

// Obtener el ID de la sonda y las fechas desde los parámetros GET
$id_sonda = $_GET['id_sonda'] ?? null;
$fechaInicio = $_GET['fechaInicio'] ?? null;
$fechaFinal = $_GET['fechaFinal'] ?? null;

if (!$id_sonda || !$fechaInicio || !$fechaFinal) {
    die(json_encode(['error' => 'Datos incompletos']));
}

// Consulta para obtener las lecturas de la sonda especificada dentro del rango de fechas
$sql = "SELECT * FROM lecturas WHERE id_sonda = ? AND fecha_hora BETWEEN ? AND ? ORDER BY fecha_hora DESC";
$stmt = $connexion->prepare($sql);
if ($stmt) {
    $stmt->bind_param("iss", $id_sonda, $fechaInicio, $fechaFinal);
    $stmt->execute();
    $result = $stmt->get_result();

    // Crear un array para almacenar las lecturas
    $lecturas = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            // Agregar cada lectura al array
            $lecturas[] = $row;
        }
    }

    // Devolver las lecturas en formato JSON
    echo json_encode($lecturas);

    $stmt->close();
} else {
    echo json_encode(['error' => 'Error al preparar la consulta: ' . $connexion->error]);
}

$connexion->close();
?>
