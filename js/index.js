document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-button");
    const startScreen = document.getElementById("start-screen");
    startButton.addEventListener("click", function () {
        startScreen.style.display = "none"; // Oculta la pantalla de inicio
        Game.init();
    });
});