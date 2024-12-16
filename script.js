import { auth, db } from "./firebase-config.js";
import { signInAnonymously } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { doc, setDoc, updateDoc, increment, getDocs, query, collection, orderBy, limit } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

const loginButton = document.getElementById('login-button');
const clickButton = document.getElementById('click-button');
const leaderboardList = document.getElementById('leaderboard-list');

let userId = null;

// Iniciar sesión anónima
loginButton.addEventListener('click', async () => {
    const result = await signInAnonymously(auth);
    userId = result.user.uid;

    // Crear documento inicial en Firestore
    const userDoc = doc(db, "users", userId);
    await setDoc(userDoc, { clicks: 0 });

    alert("¡Sesión iniciada!");
});

// Incrementar clics
clickButton.addEventListener('click', async () => {
    if (!userId) {
        alert("Inicia sesión primero.");
        return;
    }

    const userDoc = doc(db, "users", userId);
    await updateDoc(userDoc, { clicks: increment(1) });

    alert("¡Click registrado!");
});

// Actualizar tabla de líderes
async function updateLeaderboard() {
    const leaderboardQuery = query(collection(db, "users"), orderBy("clicks", "desc"), limit(10));
    const querySnapshot = await getDocs(leaderboardQuery);

    leaderboardList.innerHTML = "";
    querySnapshot.forEach(doc => {
        const data = doc.data();
        leaderboardList.innerHTML += `<li>${data.clicks} clicks</li>`;
    });
}

// Actualizar tabla cada 5 segundos
setInterval(updateLeaderboard, 5000);
