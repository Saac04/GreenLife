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

if (isset($data['id_sonda']) && isset($data['tipo_parametro']) && isset($data['valor_min']) && isset($data['valor_max'])) {
    $id_sonda = $data['id_sonda'];
    $tipo_parametro = $data['tipo_parametro'];
    $valor_min = $data['valor_min'];
    $valor_max = $data['valor_max'];

    // Preparar y ejecutar la declaración SQL para actualizar los límites
    $sql = "UPDATE limites SET valor_min = ?, valor_max = ? WHERE id_sonda = ? AND tipo_parametro = ?";
    $stmt = $connexion->prepare($sql);
    if ($stmt) {
        $stmt->bind_param("diss", $valor_min, $valor_max, $id_sonda, $tipo_parametro);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Límites actualizados correctamente.']);
        } else {
            echo json_encode(['error' => 'Error al actualizar los límites: ' . $stmt->error]);
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
