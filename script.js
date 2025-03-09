function openLetter() {
    document.getElementById("envelope").style.display = "block";
    document.getElementById("bg-music").play(); // Reproduce la música
    setTimeout(() => {
        document.querySelector(".cover").style.transform = "translateY(-100px)";
        document.querySelector(".letter").style.transform = "translateY(0)";
    }, 200);
}

function closeLetter() {
    document.querySelector(".letter").style.transform = "translateY(100%)";
    document.querySelector(".cover").style.transform = "translateY(0)";
    document.getElementById("bg-music").pause(); // Pausa la música al cerrar
    setTimeout(() => {
        document.getElementById("envelope").style.display = "none";
    }, 500);
}
