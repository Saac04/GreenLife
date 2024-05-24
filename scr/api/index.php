<?php

// Validar que el usuario esté identificado
session_start();
if(!isset($_SESSION['user'])) {
	http_response_code(401);
	die();
}

require_once 'includes/PeticionREST.inc';

$peticion = new PeticionREST('api');

$recurso = $peticion->recurso();

$metodo = strtolower($peticion->metodo());

$salida = [];

// archivo a importar según el recurso solicitado
$file = "recursos/$recurso.$metodo.inc";
// comprobar que existe, si no, devolver error 400
if(!file_exists($file)) {
	http_response_code(400);
	die();
}
// importar el archivo
require_once $file;

header('Content-Type: application/json; charset=utf-8');
echo json_encode($salida);