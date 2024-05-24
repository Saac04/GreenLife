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

$id_sonda = $_GET['id_sonda']; // ID de la sonda pasada como parámetro
$tipo_parametro = $_GET['tipo_parametro']; // Tipo de parámetro pasado como parámetro

$sql = "SELECT valor_min, valor_max FROM limites WHERE id_sonda = ? AND tipo_parametro = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $id_sonda, $tipo_parametro);
$stmt->execute();
$result = $stmt->get_result();

$data = array();
if ($result->num_rows > 0) {
    $data = $result->fetch_assoc();
}

echo json_encode($data);

$stmt->close();
$conn->close();
?>