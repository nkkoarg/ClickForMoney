document.addEventListener("DOMContentLoaded", function () {
    let count = localStorage.getItem("clickCount") || 0;
    document.getElementById("clickCount").textContent = count;

    let adButton = document.getElementById("adButton");
    let waiting = false;

    adButton.addEventListener("click", function () {
        if (waiting) return;

        count++;
        localStorage.setItem("clickCount", count);
        document.getElementById("clickCount").textContent = count;

        // Efecto de luz al hacer clic
        document.body.style.transition = "background 0.2s";
        document.body.style.background = "white";
        setTimeout(() => document.body.style.background = "black", 100);

        // Mostrar anuncio
        let adContainer = document.getElementById("adContainer");
        adContainer.innerHTML = '<iframe src="https://www.example.com/ad" width="300" height="250"></iframe>';

        // Deshabilitar botón y empezar contador
        adButton.disabled = true;
        adButton.style.opacity = "0.5";
        let seconds = 30;
        adButton.textContent = `⏳ Espera ${seconds} seg`;

        waiting = true;
        let interval = setInterval(() => {
            seconds--;
            adButton.textContent = `⏳ Espera ${seconds} seg`;

            if (seconds <= 0) {
                clearInterval(interval);
                adButton.disabled = false;
                adButton.style.opacity = "1";
                adButton.textContent = "💸 VER ANUNCIO 💸";
                waiting = false;
            }
        }, 1000);
    });
});
