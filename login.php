<?php
// Verificamos si se envió el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Procesar login aquí (solo redirige por ahora)
    header("Location: home.php");
    exit();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
</head>
<body>
    <h2>Iniciar sesión</h2>
    <form method="post" action="login.php">
        <input type="text" name="username" placeholder="Usuario" required><br><br>
        <input type="password" name="password" placeholder="Contraseña" required><br><br>
        <input type="submit" value="Entrar">
    </form>
</body>
</html>
