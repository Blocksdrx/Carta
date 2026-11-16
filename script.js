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
  let selectedAudioUrl = null;
  let celebrationStarted = false;
  const photoUrls = [null, null, null];

  const defaultCaptions = [
    "Un recuerdo que siempre me hace sonreír.",
    "De esos momentos que quisiera repetir.",
    "Y todavía quedan muchos por vivir."
  ];

  function valueOr(id, fallback) {
    const value = document.getElementById(id).value.trim();
    return value || fallback;
  }

  function applyPersonalization() {
    const name = valueOr("recipientName", "mi amor");
    document.getElementById("finalName").textContent = name;
    document.getElementById("welcomeTitle").innerHTML =
      `Hoy el mundo<br><em>celebra tu existencia.</em>`;
    const welcome = document.getElementById("messageOne").value.trim();
    if (welcome) document.querySelector(".intro-text").textContent = welcome;

    const letter = document.getElementById("letterMessage").value.trim();
    if (letter) document.getElementById("letterPreview").textContent = letter;

    for (let i = 1; i <= 3; i++) {
      const caption = valueOr(`caption${i}`, defaultCaptions[i - 1]);
      document.getElementById(`captionPreview${i}`).textContent = caption;
    }
  }

  function showScreen(index) {
    currentScreen = Math.max(0, Math.min(index, screens.length - 1));
    screens.forEach((screen, i) => {
      screen.classList.toggle("active", i === currentScreen);
      screen.setAttribute("aria-hidden", i === currentScreen ? "false" : "true");
    });

    progressFill.style.width = `${((currentScreen + 1) / screens.length) * 100}%`;
    progressText.textContent = `0${currentScreen + 1} / 0${screens.length}`;
    backButton.disabled = currentScreen === 0;
    nextButton.hidden = currentScreen === screens.length - 1;
    nextButton.innerHTML = currentScreen === screens.length - 2
      ? 'Ver la sorpresa <span>♡</span>'
      : 'Continuar <span>→</span>';

    if (currentScreen === screens.length - 1 && !celebrationStarted) {
      startCelebration();
      celebrationStarted = true;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function startMusic() {
    if (!audio.src) {
      musicLabel.textContent = "Carga una canción";
      document.querySelector(".customize-panel").open = true;
      return;
    }
    try {
      await audio.play();
      musicEnabled = true;
      musicButton.classList.add("playing");
      musicLabel.textContent = "Pausar música";
      musicButton.setAttribute("aria-label", "Pausar música");
    } catch (error) {
      musicLabel.textContent = "Pulsa para escuchar";
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
    applyPersonalization();
    showScreen(1);
    if (audio.src && !musicEnabled) startMusic();
  });

  nextButton.addEventListener("click", () => {
    applyPersonalization();
    showScreen(currentScreen + 1);
  });

  backButton.addEventListener("click", () => showScreen(currentScreen - 1));

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

  // Permite cargar las tres fotografías desde el dispositivo.
  for (let i = 1; i <= 3; i++) {
    const input = document.getElementById(`photo${i}`);
    input.addEventListener("change", () => {
      const file = input.files && input.files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        alert("Selecciona un archivo de imagen.");
        input.value = "";
        return;
      }
      if (photoUrls[i - 1]) URL.revokeObjectURL(photoUrls[i - 1]);
      photoUrls[i - 1] = URL.createObjectURL(file);
      document.getElementById(`preview${i}`).src = photoUrls[i - 1];
    });
  }

  // Permite elegir un archivo de audio. El navegador puede exigir
  // que la reproducción comience después de una acción del usuario.
  document.getElementById("musicFile").addEventListener("change", () => {
    const file = document.getElementById("musicFile").files[0];
    if (!file) return;
    if (!file.type.startsWith("audio/")) {
      alert("Selecciona un archivo de audio compatible.");
      return;
    }
    if (selectedAudioUrl) URL.revokeObjectURL(selectedAudioUrl);
    selectedAudioUrl = URL.createObjectURL(file);
    audio.src = selectedAudioUrl;
    audio.load();
    pauseMusic();
    musicLabel.textContent = "Música lista";
  });

  // Actualiza los textos de las tarjetas en cuanto se editan.
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`caption${i}`).addEventListener("input", () => {
      document.getElementById(`captionPreview${i}`).textContent =
        valueOr(`caption${i}`, defaultCaptions[i - 1]);
    });
  }
  document.getElementById("letterMessage").addEventListener("input", () => {
    document.getElementById("letterPreview").textContent =
      valueOr("letterMessage", "Te deseo un cumpleaños lleno de momentos bonitos.");
  });
  document.getElementById("recipientName").addEventListener("input", () => {
    document.getElementById("finalName").textContent = valueOr("recipientName", "mi amor");
  });

  showScreen(0);
});
