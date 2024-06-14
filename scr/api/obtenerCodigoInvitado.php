<?php

session_start();

header('Content-Type: application/json');

require_once 'includes/connexion.php';

// Verificar conexión
if (!$connexion) {
    die(json_encode(['error' => 'Conexión fallida: ' . mysqli_connect_error()]));
}

$id_usuario = $_SESSION['id']; // Aquí puedes cambiar el ID del usuario que quieres buscar

// Escapar el id_usuario para prevenir inyecciones SQL
$id_usuario = mysqli_real_escape_string($connexion, $id_usuario);

$sql = "SELECT codigo_de_invitado FROM usuarios WHERE id_usuario = $id_usuario";
$result = mysqli_query($connexion, $sql);

if ($result) {
    if ($result->num_rows > 0) {
        // Obtener los datos de cada fila
        $row = mysqli_fetch_assoc($result);
        $codigo_de_invitado = $row["codigo_de_invitado"];

        $datos_usuario = array('codigo_de_invitado' => $codigo_de_invitado);
        echo json_encode($datos_usuario, JSON_PRETTY_PRINT);
    } else {
        echo json_encode(['error' => '0 resultados']);
    }
    mysqli_free_result($result);
} else {
    echo json_encode(['error' => 'Error en la consulta: ' . mysqli_error($connexion)]);
}

mysqli_close($connexion);
?>

