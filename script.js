/* =========================================================
   SORPRESA DE CUMPLEAÑOS — lógica e interacciones
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const screens = [...document.querySelectorAll(".screen")];
  const progressFill = document.getElementById("progressFill");
  const progressText = document.getElementById("progressText");
  const backButton = document.getElementById("backButton");
  const nextButton = document.getElementById("nextButton");
  const startButton = document.getElementById("startButton");
  const replayButton = document.getElementById("replayButton");
  const musicButton = document.getElementById("musicButton");
  const musicLabel = document.getElementById("musicLabel");
  const audio = document.getElementById("backgroundMusic");
  const celebration = document.getElementById("celebration");

  let currentScreen = 0;
  let musicEnabled = false;
  let celebrationStarted = false;

  function showScreen(index) {
    currentScreen = Math.max(0, Math.min(index, screens.length - 1));
    screens.forEach((screen, i) => {
      screen.classList.toggle("active", i === currentScreen);
      screen.setAttribute("aria-hidden", i === currentScreen ? "false" : "true");
    });

    progressFill.style.width = `${((currentScreen + 1) / screens.length) * 100}%`;
    progressText.textContent = `0${currentScreen + 1} / 0${screens.length}`;

    // En la pantalla 1 ya existe el botón principal "Siguiente", ocultamos la barra inferior en esa vista
    backButton.disabled = currentScreen === 0;
    backButton.style.visibility = currentScreen === 0 ? "hidden" : "visible";
    nextButton.hidden = currentScreen === 0 || currentScreen === screens.length - 1;

    nextButton.innerHTML = currentScreen === screens.length - 2
      ? 'Ver la sorpresa <span>♡</span>'
      : 'Siguiente <span>→</span>';

    if (currentScreen === screens.length - 1 && !celebrationStarted) {
      startCelebration();
      celebrationStarted = true;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function startMusic() {
    try {
      await audio.play();
      musicEnabled = true;
      musicButton.classList.add("playing");
      musicLabel.textContent = "Pausar música";
      musicButton.setAttribute("aria-label", "Pausar música");
    } catch (error) {
      // Si no hay archivo de música cargado aún en music/cancion.mp3
      musicLabel.textContent = "Activar música";
    }
  }

  function pauseMusic() {
    audio.pause();
    musicEnabled = false;
    musicButton.classList.remove("playing");
    musicLabel.textContent = "Activar música";
    musicButton.setAttribute("aria-label", "Activar música");
  }

  function startCelebration() {
    celebration.innerHTML = "";
    const balloonColors = ["#d88da4", "#e9c18c", "#b58b9c", "#e8b6bd", "#c6a1aa", "#f0d8c8"];
    for (let i = 0; i < 13; i++) {
      const balloon = document.createElement("span");
      balloon.className = "balloon";
      balloon.style.left = `${Math.random() * 100}%`;
      balloon.style.setProperty("--balloon-color", balloonColors[i % balloonColors.length]);
      balloon.style.background = `radial-gradient(circle at 30% 25%, #ffffff99, transparent 28%), ${balloonColors[i % balloonColors.length]}`;
      balloon.style.setProperty("--duration", `${8 + Math.random() * 7}s`);
      balloon.style.setProperty("--drift", `${Math.random() * 150 - 75}px`);
      balloon.style.animationDelay = `${Math.random() * 3}s`;
      celebration.appendChild(balloon);
    }

    const confettiColors = ["#c98298", "#bd9a68", "#e9c18c", "#9f7183", "#e8b6bd", "#f7dfe2"];
    for (let i = 0; i < 95; i++) {
      const piece = document.createElement("span");
      piece.className = "confetti";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = confettiColors[i % confettiColors.length];
      piece.style.borderRadius = Math.random() > .5 ? "50%" : "2px";
      piece.style.setProperty("--duration", `${3 + Math.random() * 4}s`);
      piece.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);
      piece.style.animationDelay = `${Math.random() * 2.5}s`;
      celebration.appendChild(piece);
    }
  }

  function resetCelebration() {
    celebration.innerHTML = "";
    celebrationStarted = false;
  }

  startButton.addEventListener("click", () => {
    showScreen(1);
    if (!musicEnabled) startMusic();
  });

  nextButton.addEventListener("click", () => {
    showScreen(currentScreen + 1);
  });

  backButton.addEventListener("click", () => {
    showScreen(currentScreen - 1);
  });

  replayButton.addEventListener("click", () => {
    resetCelebration();
    showScreen(0);
  });

  document.getElementById("brandHome").addEventListener("click", (event) => {
    event.preventDefault();
    showScreen(0);
  });

  musicButton.addEventListener("click", () => {
    if (musicEnabled) pauseMusic();
    else startMusic();
  });

  showScreen(0);
});
