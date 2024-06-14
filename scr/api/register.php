<?php
// Destruir cualquier sesión existente
session_start();
session_unset();
session_destroy();

// Iniciar una nueva sesión
session_start();

// Incluir el archivo de conexión a la base de datos
require_once 'includes/connexion.php';

// Verificar si la conexión fue exitosa
if ($connexion->connect_error) {
    die("Connection failed: " . $connexion->connect_error);
}

// Verificar el método de la solicitud
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener el cuerpo de la solicitud
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    // Validar los datos recibidos
    $nombre = $connexion->real_escape_string($data['nombre']);
    $apellido = $connexion->real_escape_string($data['apellido']);
    $correo = $connexion->real_escape_string($data['correo']);
    $contrasena = $connexion->real_escape_string($data['contrasena']);
    $contrasenaConfirm = $connexion->real_escape_string($data['contrasenaConfirm']);

    if (!$nombre || !$apellido || !$correo || !$contrasena || !$contrasenaConfirm) {
        http_response_code(400);
        echo json_encode(['error' => 'Por favor, rellena todos los campos.']);
        exit;
    }

    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Introduce un email válido.']);
        exit;
    }

    if ($contrasena !== $contrasenaConfirm) {
        http_response_code(400);
        echo json_encode(['error' => 'Las contraseñas no coinciden.']);
        exit;
    }

    if (strlen($contrasena) < 8) {
        http_response_code(400);
        echo json_encode(['error' => 'La contraseña debe contener al menos 8 caracteres.']);
        exit;
    }

    // Verificar si el correo ya está registrado
    $sql = "SELECT * FROM usuarios WHERE correo = ?";
    $stmt = $connexion->prepare($sql);

    if (!$stmt) {
        http_response_code(500);
        echo json_encode(['error' => 'Error en la preparación de la consulta: ' . $connexion->error]);
        exit;
    }

    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Este correo electrónico ya está registrado.']);
        exit;
    }

    // Insertar el nuevo usuario en la base de datos
    $sql = "INSERT INTO usuarios (correo, nombre, apellido, contrasenya) VALUES (?, ?, ?, ?)";
    $stmt = $connexion->prepare($sql);

    if (!$stmt) {
        http_response_code(500);
        echo json_encode(['error' => 'Error en la preparación de la consulta de inserción: ' . $connexion->error]);
        exit;
    }

    $stmt->bind_param("ssss", $correo, $nombre, $apellido, $contrasena);

    if ($stmt->execute()) {
        $_SESSION['user'] = [
            'correo' => $correo,
            'nombre' => $nombre,
            'apellido' => $apellido,
            'rol' => 2
        ];

        $sql = "SELECT `usuarios`.`id_usuario`, 
            `usuarios`.`correo`, 
            `roles`.`id` as `idRol`, 
            `roles`.`rol`,
            `usuarios`.`nombre` 
            FROM `usuarios` 
            INNER JOIN `roles` ON `usuarios`.`rol` = `roles`.`id`
            WHERE `usuarios`.`correo` = '$correo' AND `usuarios`.`contrasenya` = '$contrasena'";

        $resultado = mysqli_query($connexion, $sql);


        if (mysqli_affected_rows($connexion) === 1) {
            $registro = mysqli_fetch_assoc($resultado);

            session_start();
            $_SESSION['user'] = $registro;
            $_SESSION['id'] =  $registro['id_usuario'];
            $_SESSION['nombre'] = $registro['nombre'];

            $salida = [];
            $salida['id'] = $registro['id_usuario'];
            $salida['nombre'] = $registro['nombre'];
            $salida['rol'] = $registro['idRol'];

            http_response_code(200);
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE');
            header('Content-Type: application/json; charset=utf-8');

            echo json_encode($salida);
        } else {
            http_response_code(401);
        }


        http_response_code(201);
        echo json_encode(['message' => 'Usuario registrado con éxito']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Error al ejecutar la consulta de inserción: ' . $stmt->error]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
}
?>
