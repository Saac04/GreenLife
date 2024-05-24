<?php
// obtener_limites.php
$servername = "localhost"; // Cambia esto por tu servidor
$username = "root";     // Cambia esto por tu usuario
$password = "";  // Cambia esto por tu contraseña
$dbname = "greenlife";     // Cambia esto por tu nombre de base de datos

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}


$id_sonda = $_POST['id_sonda'];
$tipo_parametro = $_POST['tipo_parametro'];
$valor_min = $_POST['valor_min'];
$valor_max = $_POST['valor_max'];

$sql = "UPDATE limites SET valor_min = ?, valor_max = ? WHERE id_sonda = ? AND tipo_parametro = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("diss", $valor_min, $valor_max, $id_sonda, $tipo_parametro);

if ($stmt->execute()) {
echo "Límites actualizados correctamente.";
} else {
echo "Error al actualizar los límites.";
}

$stmt->close();
$conn->close();
?>