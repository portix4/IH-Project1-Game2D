document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-button");
    const startScreen = document.getElementById("start-screen");
    const gameOverScreen = document.getElementById("game-over-screen");
    const restartButton = document.getElementById("restart-button");

    startButton.addEventListener("click", function () {
        startScreen.style.display = "none"; // Oculta la pantalla de inicio
        Game.init();
    });

    restartButton.addEventListener("click", function () {
        gameOverScreen.style.display = "none"; // Oculta la pantalla de Game Over
        Game.init();
    });
});

document.getElementById("restart-button").addEventListener("mouseover", function () {

    this.style.backgroundColor = "rgb(22, 173, 255)"   // Cambia el estilo del botón cuando el ratón pasa por encima
});

document.getElementById("restart-button").addEventListener("mouseout", function () {

    this.style.backgroundColor = "" // Restaura el estilo del botón cuando el ratón sale del área del botón
})