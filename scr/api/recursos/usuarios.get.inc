<?php
if (!isset($peticion)) {
	http_response_code(500);
	die();
}

// verificar rol de administrador
if($_SESSION['user']['idRol'] !== "1") {
	http_response_code(401);
	die();
}

require_once '../includes/connexion.php';
if (!isset($connexion)) die();

$sql = "SELECT `usuarios`.`id`, 
       `usuarios`.`nombre`, 
       `roles`.`id` as `idRol`, 
       `roles`.`rol` 
	FROM `usuarios` 
		INNER JOIN `roles` ON `usuarios`.`rol` = `roles`.`id`";

// Si hay parámetros en el path
if (count($peticion->parametrosPath()) > 0) {
	// ejecutamos la sentencia SQL añadiéndole el filtrado por la id
	$result = mysqli_query($connexion, $sql . " WHERE `usuarios`.`id` = " . intval($peticion->parametrosPath()[0]));
	// como solo esperamos un resultado, lo ponemos como salida
	$salida = mysqli_fetch_assoc($result);
} else {
	$result = mysqli_query($connexion, $sql);
	while ($row = mysqli_fetch_assoc($result)) {
		$salida[] = $row;
	}
}
