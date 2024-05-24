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

if (isset($data['id_usuario']) && isset($data['nombre_huerto'])) {
    $id_usuario = $data['id_usuario'];
    $nombre_huerto = $data['nombre_huerto'];

    // Insertar el nuevo huerto en la base de datos
    $sql = "INSERT INTO huertos (id_usuario, nombre) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("is", $id_usuario, $nombre_huerto);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'id_huerto' => $stmt->insert_id]);
    } else {
        echo json_encode(['error' => 'Error al insertar el huerto: ' . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(['error' => 'Datos incompletos']);
}

$conn->close();
?>


