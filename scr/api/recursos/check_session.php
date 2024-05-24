<?php
session_start();

// Crear un array para almacenar la respuesta
$response = array('session_exists' => false);

// Comprobar si la variable de sesión 'user' está establecida
if (isset($_SESSION['user'])) {
    // Hay una sesión activa
    $response['session_exists'] = true;
}
// Establecer el encabezado como 'application/json'
header('Content-Type: application/json');

// Devolver la respuesta en formato JSON
echo json_encode($response);
?>