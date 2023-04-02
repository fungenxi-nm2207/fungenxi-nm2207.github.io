// Challenge 1: the box dodger
const cells = Array.from(document.querySelectorAll(".cell"));
const enemyCells = cells.slice(0, 30);
const playerCells = cells.slice(30);
const scoreDisplay = document.querySelector(".score");

// Info about state of game
let dropCount, speed, score;

document.addEventListener("keydown", e => {
    const player = document.querySelector(".player");

    if (e.key === "ArrowRight") {
        player.parentElement.nextElementSibling.appendChild(player);
    }

    if (e.key === "ArrowLeft") {
        player.parentElement.previousElementSibling.appendChild(player);
    }
});
