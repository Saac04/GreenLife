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

if (isset($data['id_usuario']) && isset($data['nombre_huerto'])) {
    $id_usuario = $data['id_usuario'];
    $nombre_huerto = $data['nombre_huerto'];

    // Insertar el nuevo huerto en la base de datos
    $sql = "INSERT INTO huertos (id_usuario, nombre) VALUES (?, ?)";
    $stmt = $connexion->prepare($sql);
    if ($stmt) {
        $stmt->bind_param("is", $id_usuario, $nombre_huerto);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'id_huerto' => $stmt->insert_id]);
        } else {
            echo json_encode(['error' => 'Error al insertar el huerto: ' . $stmt->error]);
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
