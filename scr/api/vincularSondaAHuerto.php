<?php
require_once 'includes/connexion.php';

if ($connexion->connect_error) {
    die(json_encode(['error' => 'Conexión fallida: ' . $connexion->connect_error]));
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $objeto = json_decode($json);

    $idHuerto = $objeto->id_huerto;
    $numeroSerie = mysqli_real_escape_string($connexion, $objeto->numero_serie);

    // Verificar si la sonda está disponible
    $sql = "SELECT id_sondas FROM sondas WHERE serial = '$numeroSerie' AND id_huerto IS NULL";
    $resultado = mysqli_query($connexion, $sql);

    if (mysqli_num_rows($resultado) > 0) {
        $row = mysqli_fetch_assoc($resultado);
        $idSonda = $row['id_sondas'];

        // Asignar la sonda al huerto especificado
        $sqlAsignacion = "UPDATE sondas SET id_huerto = $idHuerto WHERE id_sondas = $idSonda";
        if (mysqli_query($connexion, $sqlAsignacion)) {
            $response = [
                'success' => true,
                'message' => 'Sonda vinculada correctamente al huerto'
            ];
            http_response_code(200);
        } else {
            $response = [
                'success' => false,
                'error' => 'Error al asignar la sonda al huerto'
            ];
            http_response_code(500);
        }
    } else {
        $response = [
            'success' => false,
            'error' => 'La sonda no está disponible o ya está asignada a otro huerto'
        ];
        http_response_code(400);
    }

    echo json_encode($response);
} else {
    http_response_code(405);
}
?>
