<?php
session_start();
header('Content-Type: application/json');

require_once 'includes/connexion.php';

// Verificar conexión
if (!$connexion) {
    die(json_encode(['error' => 'Conexión fallida: ' . mysqli_connect_error()]));
}

// Obtener los datos del POST
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['nuevoCodigo'])) {
    echo json_encode(['error' => 'Código no proporcionado']);
    exit();
}

$nuevoCodigo = $data['nuevoCodigo'];
$id_usuario = $_SESSION['id']; // Aquí puedes cambiar el ID del usuario que quieres buscar

// Escapar los valores para prevenir inyecciones SQL
$id_usuario = mysqli_real_escape_string($connexion, $id_usuario);
$nuevoCodigo = mysqli_real_escape_string($connexion, $nuevoCodigo);

$sql = "UPDATE usuarios SET codigo_de_invitado = '$nuevoCodigo' WHERE id_usuario = $id_usuario";

if (mysqli_query($connexion, $sql)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => 'Error en la actualización: ' . mysqli_error($connexion)]);
}

mysqli_close($connexion);
?>
