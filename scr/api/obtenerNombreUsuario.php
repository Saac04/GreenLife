<?php

header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "greenlife"; // Reemplaza esto con el nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(['error' => 'Conexión fallida: ' . $conn->connect_error]));
}

$id_usuario = 13; // Aquí puedes cambiar el ID del usuario que quieres buscar

$sql = "SELECT nombre FROM usuarios WHERE id_usuario = $id_usuario";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Obtener los datos de cada fila
    while($row = $result->fetch_assoc()) {
        $nombre = $row["nombre"];
    }
    $datos_usuario = array('nombre' => $nombre);
    echo json_encode($datos_usuario, JSON_PRETTY_PRINT);
} else {
    echo json_encode(['error' => '0 resultados']);
}

$conn->close();
?>
