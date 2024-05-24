<?php

session_start();

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

if (isset($data['id_huerto']) && isset($data['nombre'])) {
    $id_huerto = $data['id_huerto'];
    $nombre = $data['nombre'];

    // Actualizar el nombre del huerto en la base de datos
    $sql = "UPDATE huertos SET nombre = ? WHERE id_huerto = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $nombre, $id_huerto);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Error al actualizar el huerto: ' . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(['error' => 'Datos incompletos']);
}

$conn->close();
?>

