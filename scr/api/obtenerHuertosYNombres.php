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

$id_usuario = $_SESSION['id']; // ID del usuario que quieres buscar

// Consulta para obtener los huertos asociados al usuario
$sql_huertos = "SELECT huertos.id_huerto, huertos.nombre FROM huertos WHERE huertos.id_usuario = $id_usuario";
$result_huertos = $conn->query($sql_huertos);

$huertos = array();
if ($result_huertos->num_rows > 0) {
    while($row = $result_huertos->fetch_assoc()) {
        $huertos[] = array(
            'id_huerto' => $row["id_huerto"],
            'nombre' => $row["nombre"]
        );
    }
}

echo json_encode($huertos, JSON_PRETTY_PRINT);

$conn->close();
?>


