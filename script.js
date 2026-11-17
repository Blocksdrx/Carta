
document.addEventListener("DOMContentLoaded", () => {

    const screens = [...document.querySelectorAll(".screen")];

    const progressFill = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");

    const backButton = document.getElementById("backButton");
    const nextButton = document.getElementById("nextButton");

    const replayButton = document.getElementById("replayButton");

    const musicButton = document.getElementById("musicButton");
    const musicLabel = document.getElementById("musicLabel");

    const audio = document.getElementById("backgroundMusic");

    const celebration = document.getElementById("celebration");

    let currentScreen = 0;
    let musicEnabled = true;
    let celebrationStarted = false;


    // CAMBIAR DE PANTALLA

    function showScreen(index) {

        currentScreen = Math.max(
            0,
            Math.min(index, screens.length - 1)
        );

        screens.forEach((screen, i) => {

            screen.classList.toggle(
                "active",
                i === currentScreen
            );

            screen.setAttribute(
                "aria-hidden",
                i === currentScreen ? "false" : "true"
            );

        });

document.addEventListener("DOMContentLoaded", () => {
    const musica = document.getElementById("musica");

    musica.volume = 0.5;

    const reproducirMusica = () => {
        musica.play().catch(error => {
            console.log("Esperando interacción del usuario para reproducir música.");
        });
    };

    reproducirMusica();

    document.addEventListener("click", reproducirMusica, { once: true });
});
        // ACTUALIZAR PROGRESO

        progressFill.style.width =
            `${((currentScreen + 1) / screens.length) * 100}%`;

        progressText.textContent =
            `${String(currentScreen + 1).padStart(2, "0")} / ${String(screens.length).padStart(2, "0")}`;


        // BOTÓN ANTERIOR

        backButton.disabled = currentScreen === 0;


        // OCULTAR BOTÓN SIGUIENTE EN LA ÚLTIMA PANTALLA

        nextButton.hidden =
            currentScreen === screens.length - 1;


        // TEXTO DEL BOTÓN SIGUIENTE

        if (currentScreen === screens.length - 2) {

            nextButton.innerHTML = 'Ver el final <span>♡</span>';

        } else {

            nextButton.innerHTML = 'Siguiente <span>→</span>';

        }


        // INICIAR CELEBRACIÓN

        if (
            currentScreen === screens.length - 1 &&
            !celebrationStarted
        ) {

            startCelebration();

            celebrationStarted = true;

        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    // CONTROL DE MÚSICA

    async function toggleMusic() {

        if (musicEnabled) {

            audio.pause();

            musicEnabled = false;

            musicButton.classList.remove("playing");

            musicLabel.textContent = "Activar música";

            return;

        }

        try {

            await audio.play();

            musicEnabled = true;

            musicButton.classList.add("playing");

            musicLabel.textContent = "Pausar música";

        } catch (error) {

            musicLabel.textContent =
                "./cancion.mp3";

        }

    }


    // CREAR GLOBOS Y CONFETI

    function startCelebration() {

        celebration.innerHTML = "";


        const balloonColors = [
            "#d88da4",
            "#e9c18c",
            "#b58b9c",
            "#e8b6bd",
            "#c6a1aa",
            "#f0d8c8"
        ];


        // GLOBOS

        for (let i = 0; i < 13; i++) {

            const balloon = document.createElement("span");

            balloon.className = "balloon";

            balloon.style.left = `${Math.random() * 100}%`;

            balloon.style.background =
                `radial-gradient(circle at 30% 25%, #ffffff99, transparent 28%), ${balloonColors[i % balloonColors.length]}`;

            balloon.style.setProperty(
                "--duration",
                `${8 + Math.random() * 7}s`
            );

            balloon.style.setProperty(
                "--drift",
                `${Math.random() * 150 - 75}px`
            );

            balloon.style.animationDelay =
                `${Math.random() * 3}s`;

            celebration.appendChild(balloon);

        }


        // CONFETI

        const confettiColors = [
            "#c98298",
            "#bd9a68",
            "#e9c18c",
            "#9f7183",
            "#e8b6bd",
            "#f7dfe2"
        ];


        for (let i = 0; i < 95; i++) {

            const piece = document.createElement("span");

            piece.className = "confetti";

            piece.style.left = `${Math.random() * 100}%`;

            piece.style.background =
                confettiColors[i % confettiColors.length];

            piece.style.borderRadius =
                Math.random() > 0.5 ? "50%" : "2px";

            piece.style.setProperty(
                "--duration",
                `${3 + Math.random() * 4}s`
            );

            piece.style.setProperty(
                "--drift",
                `${Math.random() * 180 - 90}px`
            );

            piece.style.animationDelay =
                `${Math.random() * 2.5}s`;

            celebration.appendChild(piece);

        }

    }


    // REINICIAR CELEBRACIÓN

    function resetCelebration() {

        celebration.innerHTML = "";

        celebrationStarted = false;

    }


    // BOTÓN SIGUIENTE

    nextButton.addEventListener("click", () => {

        showScreen(currentScreen + 1);

    });


    // BOTÓN ANTERIOR

    backButton.addEventListener("click", () => {

        showScreen(currentScreen - 1);

    });


    // VOLVER A INICIAR

    replayButton.addEventListener("click", () => {

        resetCelebration();

        showScreen(0);

    });


    // VOLVER AL INICIO DESDE EL LOGO

    document.getElementById("brandHome")
        .addEventListener("click", event => {

            event.preventDefault();

            showScreen(0);

        });


    // BOTÓN DE MÚSICA

    musicButton.addEventListener("click", toggleMusic);


    // INICIAR PÁGINA

    showScreen(0);

});
