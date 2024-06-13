<?php

session_start();
header('Content-Type: application/json');

require_once 'includes/connexion.php';  // Incluye el archivo de conexión

// Verificar conexión
if ($connexion->connect_error) {
    die(json_encode(['error' => 'Conexión fallida: ' . $connexion->connect_error]));
}

// Obtener los datos enviados desde el cliente
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id_huerto'])) {
    $id_huerto = $data['id_huerto'];

    // Eliminar el huerto de la base de datos
    $sql = "DELETE FROM huertos WHERE id_huerto = ?";
    $stmt = $connexion->prepare($sql);
    if ($stmt) {
        $stmt->bind_param("i", $id_huerto);

        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['error' => 'Error al eliminar el huerto: ' . $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(['error' => 'Error al preparar la consulta: ' . $connexion->error]);
    }
} else {
    echo json_encode(['error' => 'Datos incompletos']);
}

$connexion->close();
?>
