<?php
$bbdd_servidor = 'localhost';
$bbdd_nombre = 'greenlife';
$bbdd_user = 'root';
$bbdd_password = '';

try {
	$connexion = mysqli_connect($bbdd_servidor, $bbdd_user, $bbdd_password, $bbdd_nombre);
} catch (Exception $e) {
	http_response_code(500);
	die("Error: " . mysqli_connect_errno() . " " . mysqli_connect_error());
}

mysqli_query($connexion, 'SET NAMES utf8mb4');