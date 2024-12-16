import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

// Configuración de Firebase (reemplaza con tus credenciales)
const firebaseConfig = {
    apiKey: "AIzaSyB2J3X2lIxa55BQv5z0D8RcyrbIU40IFRs",
    authDomain: "clicksap.firebaseapp.com",
    projectId: "clicksap",
    storageBucket: "clicksap.firebasestorage.app",
    messagingSenderId: "842841718008",
    appId: "1:842841718008:web:3bb7f097558e07b760cf0d"
    measurementId: "G-38NKLTXM5C"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
