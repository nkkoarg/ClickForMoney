// Variables globales
let clickCount = 0;
let username = localStorage.getItem('username');
let ipAddress = "Desconocida"; // No estamos usando IP real sin backend, esto es solo un ejemplo.
const rankingList = JSON.parse(localStorage.getItem('ranking')) || [];

// Usamos BroadcastChannel para comunicación entre diferentes pestañas
const channel = new BroadcastChannel('click_game_channel');

document.addEventListener('DOMContentLoaded', function () {
    // Mostrar IP simulada
    document.getElementById("ip-span").innerText = "192.168.0.1";  // En un caso real, aquí se debería capturar la IP.

    // Si el usuario ya tiene un nombre registrado, muestra su información
    if (username) {
        document.getElementById("username-container").classList.add("hidden");
        document.getElementById("user-ip").innerText = `Tu IP es: ${ipAddress}`;
    } else {
        document.getElementById("username-container").classList.remove("hidden");
    }

    // Mostrar el ranking actual
    displayRanking();
});

// Función para registrar un clic
function registerClick() {
    // Si no se ha registrado un nombre de usuario, pide uno
    if (!username) {
        alert("Primero debes registrar un nombre de usuario.");
        return;
    }

    // Incrementar contador de clics
    clickCount++;
    document.getElementById("click-count").innerText = clickCount;

    // Guardar el nuevo puntaje en localStorage
    updateRanking(username, clickCount);
}

// Función para actualizar el ranking
function updateRanking(username, clickCount) {
    // Buscar si el usuario ya está en el ranking
    const userIndex = rankingList.findIndex(user => user.username === username);

    if (userIndex !== -1) {
        // Si el usuario ya está, actualizar su puntaje
        rankingList[userIndex].clickCount = clickCount;
    } else {
        // Si no está, agregarlo al ranking
        rankingList.push({ username, clickCount });
    }

    // Ordenar el ranking por clics en orden descendente
    rankingList.sort((a, b) => b.clickCount - a.clickCount);

    // Guardar el ranking actualizado en localStorage
    localStorage.setItem('ranking', JSON.stringify(rankingList));

    // Actualizar el ranking en la interfaz para todos los usuarios
    displayRanking();

    // Enviar el ranking actualizado a otras pestañas o ventanas
    channel.postMessage(rankingList);
}

// Función para mostrar el ranking
function displayRanking() {
    const rankingDiv = document.getElementById("ranking");
    rankingDiv.innerHTML = ""; // Limpiar el ranking antes de mostrarlo

    rankingList.forEach(user => {
        const userElement = document.createElement("p");
        userElement.innerText = `${user.username}: ${user.clickCount} clics`;
        rankingDiv.appendChild(userElement);
    });
}

// Función para registrar el nombre de usuario
function setUsername() {
    const usernameInput = document.getElementById("username").value;

    if (usernameInput) {
        username = usernameInput;
        localStorage.setItem('username', username);

        document.getElementById("username-container").classList.add("hidden");
        document.getElementById("user-ip").innerText = `Tu IP es: ${ipAddress}`;

        alert(`¡Hola ${username}! ¡Bienvenido al juego!`);
    } else {
        alert("Por favor, ingresa un nombre de usuario.");
    }
}

// Escuchar cambios en otras pestañas para actualizar el ranking
channel.onmessage = function(event) {
    const updatedRanking = event.data;
    // Actualizar el ranking de esta pestaña con el nuevo ranking
    rankingList.length = 0;  // Vaciar el ranking local
    rankingList.push(...updatedRanking);  // Agregar el ranking actualizado
    displayRanking();  // Mostrar el ranking actualizado
};
