<?php

header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "greenlife";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(['error' => 'Conexión fallida: ' . $conn->connect_error]));
}

// Obtener los datos enviados desde el cliente
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id_huerto'])) {
    $id_huerto = $data['id_huerto'];

    // Eliminar el huerto de la base de datos
    $sql = "DELETE FROM huertos WHERE id_huerto = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id_huerto);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Error al eliminar el huerto: ' . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(['error' => 'Datos incompletos']);
}

$conn->close();
?>
