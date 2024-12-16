// Importar Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Configuración de Firebase con los datos proporcionados
const firebaseConfig = {
  apiKey: "AIzaSyB2J3X2lIxa55BQv5z0D8RcyrbIU40IFRs",
  authDomain: "clicksap.firebaseapp.com",
  projectId: "clicksap",
  storageBucket: "clicksap.firebasestorage.app",
  messagingSenderId: "842841718008",
  appId: "1:842841718008:web:3bb7f097558e07b760cf0d",
  measurementId: "G-38NKLTXM5C"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para registrar usuarios
async function registerUser(username, password) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      username: username,
      password: password
    });
    console.log("Usuario registrado con ID: ", docRef.id);
    alert("Usuario registrado exitosamente!");
  } catch (e) {
    console.error("Error añadiendo documento: ", e);
    alert("Hubo un error al registrar el usuario.");
  }
}

// Función para iniciar sesión
async function loginUser(username, password) {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    let userFound = false;

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.username === username && userData.password === password) {
        userFound = true;
        alert("¡Inicio de sesión exitoso!");
        window.location.href = 'juego.html'; // Redirige al juego
      }
    });

    if (!userFound) {
      alert("Usuario o contraseña incorrectos.");
    }
  } catch (e) {
    console.error("Error al obtener documentos: ", e);
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
