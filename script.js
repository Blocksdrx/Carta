/* =========================================================
   SORPRESA DE CUMPLEAÑOS — lógica e interacciones
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const screens = Array.from(document.querySelectorAll(".screen"));
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
      if (i === currentScreen) {
        screen.classList.add("active");
        screen.style.display = "block";
        screen.setAttribute("aria-hidden", "false");
      } else {
        screen.classList.remove("active");
        screen.style.display = "none";
        screen.setAttribute("aria-hidden", "true");
      }
    });

    if (progressFill) {
      progressFill.style.width = `${((currentScreen + 1) / screens.length) * 100}%`;
    }
    if (progressText) {
      progressText.textContent = `0${currentScreen + 1} / 0${screens.length}`;
    }

    if (backButton) {
      backButton.disabled = currentScreen === 0;
      backButton.style.visibility = currentScreen === 0 ? "hidden" : "visible";
    }

    if (nextButton) {
      // Ocultar solo en la última pantalla (pastel)
      if (currentScreen === screens.length - 1) {
        nextButton.style.display = "none";
      } else {
        nextButton.style.display = "inline-flex";
        nextButton.innerHTML = currentScreen === screens.length - 2
          ? 'Ver la sorpresa <span>♡</span>'
          : 'Siguiente <span>→</span>';
      }
    }

    if (currentScreen === screens.length - 1 && !celebrationStarted) {
      startCelebration();
      celebrationStarted = true;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function startMusic() {
    if (!audio) return;
    try {
      await audio.play();
      musicEnabled = true;
      musicButton.classList.add("playing");
      musicLabel.textContent = "Pausar música";
    } catch (error) {
      musicLabel.textContent = "Activar música";
    }
  }

  function pauseMusic() {
    if (!audio) return;
    audio.pause();
    musicEnabled = false;
    musicButton.classList.remove("playing");
    musicLabel.textContent = "Activar música";
  }

  function startCelebration() {
    if (!celebration) return;
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
      piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
      piece.style.setProperty("--duration", `${3 + Math.random() * 4}s`);
      piece.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);
      piece.style.animationDelay = `${Math.random() * 2.5}s`;
      celebration.appendChild(piece);
    }
  }

  function resetCelebration() {
    if (celebration) celebration.innerHTML = "";
    celebrationStarted = false;
  }

  if (startButton) {
    startButton.addEventListener("click", () => {
      showScreen(1);
      if (!musicEnabled) startMusic();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      showScreen(currentScreen + 1);
      if (currentScreen === 1 && !musicEnabled) startMusic();
    });
  }

  if (backButton) {
    backButton.addEventListener("click", () => {
      showScreen(currentScreen - 1);
    });
  }

  if (replayButton) {
    replayButton.addEventListener("click", () => {
      resetCelebration();
      showScreen(0);
    });
  }

  const brandHome = document.getElementById("brandHome");
  if (brandHome) {
    brandHome.addEventListener("click", (event) => {
      event.preventDefault();
      showScreen(0);
    });
  }

  if (musicButton) {
    musicButton.addEventListener("click", () => {
      if (musicEnabled) pauseMusic();
      else startMusic();
    });
  }

  showScreen(0);
});
