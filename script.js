// Reemplaza con tus credenciales de Supabase
const supabaseUrl = 'https://mlxuipvhcbmyfrmlsuqd.supabase.co'; // Reemplaza 'your-project-id' con el ID de tu proyecto de Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1seHVpcHZoY2JteWZybWxzdXFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzNjQyNjYsImV4cCI6MjA0OTk0MDI2Nn0.BB4kCLmcKEFdx3im3eUvK-70fQG-hDQdXMp8WGU8xVQ'; // Reemplaza 'your-anon-key' con tu clave pública de API
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Función para registrar usuarios
async function registerUser(username, password) {
  try {
    // Inserta el nuevo usuario en la tabla 'users'
    const { data, error } = await supabase
      .from('users')
      .insert([
        { username: username, password: password }
      ]);

    if (error) {
      console.error("Error al registrar el usuario:", error);
      alert("Hubo un error al registrar el usuario.");
    } else {
      console.log("Usuario registrado con éxito:", data);
      alert("Usuario registrado exitosamente!");
    }
  } catch (e) {
    console.error("Error al registrar el usuario:", e);
    alert("Hubo un error al registrar el usuario.");
  }
}

// Función para iniciar sesión
async function loginUser(username, password) {
  try {
    // Busca el usuario con las credenciales dadas
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single(); // Asegura que solo obtienes un resultado

    if (error || !data) {
      alert("Usuario o contraseña incorrectos.");
    } else {
      console.log("Usuario encontrado:", data);
      alert("¡Inicio de sesión exitoso!");
      window.location.href = 'juego.html'; // Redirige al juego
    }
  } catch (e) {
    console.error("Error al intentar iniciar sesión:", e);
    alert("Hubo un error al intentar iniciar sesión.");
  }
}

// Configurar eventos de los botones en el DOM
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Evitar el envío del formulario
      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;
      loginUser(username, password);
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Evitar el envío del formulario
      const username = document.getElementById('register-username').value;
      const password = document.getElementById('register-password').value;
      registerUser(username, password);
    });
  }
});
