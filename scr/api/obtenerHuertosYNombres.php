<?php

session_start();
header('Content-Type: application/json');

require_once 'includes/connexion.php';  // Incluye el archivo de conexión

// Verificar conexión
if ($connexion->connect_error) {
    die(json_encode(['error' => 'Conexión fallida: ' . $connexion->connect_error]));
}

$id_usuario = $_SESSION['id']; // ID del usuario que quieres buscar

// Escapar el id_usuario para prevenir inyecciones SQL
$id_usuario = mysqli_real_escape_string($connexion, $id_usuario);

// Consulta para obtener los huertos asociados al usuario
$sql_huertos = "SELECT huertos.id_huerto, huertos.nombre FROM huertos WHERE huertos.id_usuario = $id_usuario";
$result_huertos = $connexion->query($sql_huertos);

$huertos = array();
if ($result_huertos) {
    if ($result_huertos->num_rows > 0) {
        while ($row = $result_huertos->fetch_assoc()) {
            $huertos[] = array(
                'id_huerto' => $row["id_huerto"],
                'nombre' => $row["nombre"]
            );
        }
    }
} else {
    echo json_encode(['error' => 'Error en la consulta: ' . $connexion->error]);
    exit;
}

echo json_encode($huertos, JSON_PRETTY_PRINT);

$connexion->close();
?>
