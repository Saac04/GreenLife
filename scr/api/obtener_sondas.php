<?php
session_start();
header('Content-Type: application/json');

require_once 'includes/connexion.php';  // Incluye el archivo de conexión

// Verificar conexión
if ($connexion->connect_error) {
    die(json_encode(['error' => 'Conexión fallida: ' . $connexion->connect_error]));
}

// Obtener el ID del huerto desde los parámetros GET
$id_huerto = $_GET['id_huerto'] ?? null;

if (!$id_huerto) {
    die(json_encode(['error' => 'ID de huerto no proporcionado']));
}

// Consulta para obtener las sondas del huerto especificado
$sql = "SELECT * FROM sondas WHERE id_huerto = ?";
$stmt = $connexion->prepare($sql);
if ($stmt) {
    $stmt->bind_param("i", $id_huerto);
    $stmt->execute();
    $result = $stmt->get_result();

    // Crear un array para almacenar las sondas
    $sondas = array();

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            // Agregar cada sonda al array
            $sondas[] = $row;
        }
    }

    // Devolver las sondas en formato JSON
    echo json_encode($sondas);

    $stmt->close();
} else {
    echo json_encode(['error' => 'Error al preparar la consulta: ' . $connexion->error]);
}

$connexion->close();
?>
