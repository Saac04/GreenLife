<?php
session_start();
header('Content-Type: application/json');

require_once 'includes/connexion.php';  // Incluye el archivo de conexión

// Verificar conexión
if ($connexion->connect_error) {
    die(json_encode(['error' => 'Conexión fallida: ' . $connexion->connect_error]));
}

$id_sonda = $_GET['id_sonda']; // ID de la sonda pasada como parámetro
$tipo_parametro = $_GET['tipo_parametro']; // Tipo de parámetro pasado como parámetro

// Preparar y ejecutar la declaración SQL para obtener los límites
$sql = "SELECT valor_min, valor_max FROM limites WHERE id_sonda = ? AND tipo_parametro = ?";
$stmt = $connexion->prepare($sql);
if ($stmt) {
    $stmt->bind_param("is", $id_sonda, $tipo_parametro);
    $stmt->execute();
    $result = $stmt->get_result();

    $data = array();
    if ($result->num_rows > 0) {
        $data = $result->fetch_assoc();
    }

    echo json_encode($data);

    $stmt->close();
} else {
    echo json_encode(['error' => 'Error al preparar la consulta: ' . $connexion->error]);
}

$connexion->close();
?>
