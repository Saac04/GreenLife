<?php
session_start();
header('Content-Type: application/json');

require_once 'includes/connexion.php';

// Manejo de errores para ver si hay algún problema en el script
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Verificar conexión
if (!$connexion) {
    echo json_encode(['error' => 'Conexión fallida: ' . mysqli_connect_error()]);
    exit();
}

// Obtener los datos del POST
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['correoActual']) || !isset($data['correoNuevo']) || !isset($data['contraseñaCorreo'])) {
    echo json_encode(['error' => 'Datos incompletos']);
    exit();
}

$correoActual = $data['correoActual'];
$correoNuevo = $data['correoNuevo'];
$contraseñaCorreo = $data['contraseñaCorreo'];
$id_usuario  = $_SESSION['id']; // Asegúrate de que el ID del usuario está en la sesión

// Escapar los valores para prevenir inyecciones SQL
$correoActual = mysqli_real_escape_string($connexion, $correoActual);
$correoNuevo = mysqli_real_escape_string($connexion, $correoNuevo);
$contrasenyaCorreo = mysqli_real_escape_string($connexion, $contraseñaCorreo);

// Verificar que la contraseña actual sea correcta
$sql = "SELECT contrasenya FROM usuarios WHERE id_usuario = $id_usuario AND correo = '$correoActual'";
$result = mysqli_query($connexion, $sql);

if ($result && mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    if (passwordVerify($contrasenyaCorreo, $row['contrasenya'])) {
        // Actualizar el correo electrónico
        $sql_update = "UPDATE usuarios SET correo = '$correoNuevo' WHERE id_usuario = $id_usuario";
        if (mysqli_query($connexion, $sql_update)) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['error' => 'Error en la actualización: ' . mysqli_error($connexion)]);
        }
    } else {
        echo json_encode(['error' => 'Contraseña incorrecta']);
    }
} else {
    echo json_encode(['error' => 'Correo actual no encontrado o incorrecto']);
}

mysqli_close($connexion);
?>
