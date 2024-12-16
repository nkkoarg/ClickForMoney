// Esperamos a que todo el contenido del documento esté cargado
document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    
    // Simulamos las credenciales correctas para el inicio de sesión
    const validUsername = 'usuario123';
    const validPassword = 'contraseña123';
    
    // Añadimos el evento de submit al formulario
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitamos que el formulario se envíe y recargue la página
        
        // Obtenemos los valores de los campos de usuario y contraseña
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Verificamos si las credenciales son correctas
        if (username === validUsername && password === validPassword) {
            alert('¡Inicio de sesión exitoso!');
            window.location.href = 'juego.html';  // Aquí iría el enlace a tu página del juego
        } else {
            // Si las credenciales no coinciden, mostramos el mensaje de error
            errorMessage.style.display = 'block';
        }
    });
});
