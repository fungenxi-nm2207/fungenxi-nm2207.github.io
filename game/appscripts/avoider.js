// Challenge 1: the box dodger

//export default to export the game onto website

// Getting and creating canvas element
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Variables
let player;
let bullets = [];
let bulletInterval = 0; // Counter for bullet timing
let golds = []; 
let gameOver = false; // Initialised to false. Used to keep track whether player lost
let gameWon = false; // Initialised to false. Used to keep track whether player won
let pressedKeyX = "none"; // Initialised to "none", indicating that no key has been pressed yet
let pressedKeyY = "none";

// Player
class Player {
    constructor() { 
        this.x = 240; // X-coordinate of player's starting point
        this.y = 240; // Y-coordinate of player's starting point
        this.width = 20;
        this.height = 20;
        this.lives = 3;
        this.golds = 0; // Player required to collect certain number of golds, and this number is first initialised to 0
        this.update = function(){
            if (this.lives <= 0) { // If player has less than or equals to 0 lives, game over is true
                gameOver = true;
            }
            if (this.golds >= 8) { // If player has collected 5 golds, player would have fulfilled the first condition. The second condition to win the game would be to reach the portal (below)
                gameWon = true;
            }
        };
        this.draw = function() { // Drawing player on the canvas
            ctx.fillStyle = "blue"; // Fill style to blue
            ctx.fillRect(this.x, this.y, this.width, this.height); // Draws rectangle using player's position and dimensions
            ctx.font = "20px Monospace"; 
            ctx.fillStyle = "white"; // Sets fill style of words to white
            ctx.fillText(this.lives, this.x+5, this.y+16.5); // Within the box itself, the lives will be shown
        };
    }
}
player = new Player; // Updates player's position according to user input
function runPlayer() {
    player.update();
    player.draw();
    if (pressedKeyX == "Left" && player.x > 0) { // If user pressed left arrow key, and player's x position is > 0, player's position is decreased by 2px. This in some sense, controls the speed of how fast the player moves
        player.x -= 2;
    }
    if (pressedKeyX == "Right" && player.x < 480) {
        player.x += 2;
    }
    if (pressedKeyY == "Up" && player.y > 0) {
        player.y -= 2;
    }
    if (pressedKeyY == "Down" && player.y < 480) {
        player.y += 2;
    }        
}    


// Event Listeners
window.addEventListener("keydown", function(e) {
    if (e.code === "ArrowUp" && pressedKeyY == "none") pressedKeyY = "Up";
    else if (e.code === "ArrowDown" && pressedKeyY == "none") pressedKeyY = "Down";
    else if (e.code === "ArrowLeft" && pressedKeyX == "none") pressedKeyX = "Left";
    else if (e.code === "ArrowRight" && pressedKeyX == "none") pressedKeyX = "Right";
});
window.addEventListener("keyup", function(e) {
    if (e.code === "ArrowUp" && pressedKeyY == "Up") pressedKeyY = "none";
    else if (e.code === "ArrowDown" && pressedKeyY == "Down") pressedKeyY = "none";
    else if (e.code === "ArrowLeft" && pressedKeyX == "Left") pressedKeyX = "none";
    else if (e.code === "ArrowRight" && pressedKeyX == "Right") pressedKeyX = "none";
});

// Gold
class Gold {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.width = 25;
        this.height = 25;
        this.collected = false;
        this.image = new Image();
        this.image.src = "css/gold.png";
    }
    update() {
        if(!this.collected && collision(player,this)) {
            this.collected = true;
            player.score++;
        }
    }
    draw() {
        if(!this.collected) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
}

for (let i=0; i<8; i++) {
    let x = Math.floor(Math.random()*(canvas.width - 50)) + 0;
    let y = Math.floor(Math.random()*(canvas.width - 30)) + 0;
    golds.push(new Gold(x,y));
}

function runGolds() {
    for (let i=0; i<golds.length; i++){
        golds[i].update();
        golds[i].draw();
    }
}
  
// Bullets
class Bullet {
    constructor(x, y, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.speedX = speedX;
        this.speedY = speedY;
        this.update = function() {
            this.x += this.speedX;
            this.y += this.speedY;

        }
        this.draw = function() {
            ctx.fillStyle = "red";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
function runBullets() {
    bulletInterval++;
    if (bulletInterval % 52 == 0) {
        let y1 = Math.floor(Math.random () * (491 - 0)) + 0;
        let y2 = Math.floor(Math.random () * (491 - 0)) + 0;
        let x1 = Math.floor(Math.random () * (491 - 0)) + 0;
        let x2 = Math.floor(Math.random () * (491 - 0)) + 0;
        bullets.push(new Bullet(-10, -y1, 5, 0));
        bullets.push(new Bullet(500, y2, -5, 0));
        bullets.push(new Bullet (x1, -10, 0, 5));
        bullets.push(new Bullet(x2, 500, 0, -5));

    }
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].update();
        bullets[i].draw();
        if (bullets[i] &&
            bullets[i].x < -11 || bullets[i].x > 500 ||
            bullets[i].y < -11 || bullets[i].y > 500) {
                bullets.splice(i, 1);
            }
            if (bullets[i] && collision(player, bullets[i])) {
                player.lives--;
                bullets.splice(i,1);
                i--;

            }
    }
}

// Collision
function collision(first,second) {
    if (first.x < second.x + second.width &&
        first.x + first.width > second.x &&
        first.y < second.y + second.height &&
        first.y + first.height > second.y) {
            return true;
        }
}

// Portal
class Portal {
    constructor() {
        this.image = new Image();
        this.image.src = "css/door.png";
        const randomCorner = Math.floor(Math.random()*4);
        if (randomCorner === 0) {
            //top-left corner
            this.x = 10;
            this.y = 10;
        } else if (randomCorner === 1) {
            //top-right corner
            this.x = canvas.width - 50;
            this.y = 10;
        } else if (randomCorner === 2) {
            //bottom-right corner
            this.x = canvas.width - 50;
            this.y = canvas.height - 55;
        } else {
            //bottom-left corner
            this.x = 10;
            this.y = canvas.height - 55;
        }

        this.width = 30;
        this.height = 40;
        this.draw = function(){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }

    update() {
        if(player.score < 5){
            return;
        }
        if(collision(player,this)) {
            gameOver = true;
            gameWon = false;
        }
    }

    draw(){
        if(player.score < 8){
            return;
        }
        ctx.drawImage(this.image, this.x, this.y, 40, 40);
    }

    update() {
        if(player.score >= 8){
            return;
        }
        if(collision(player,this)) {
            gameOver = false;
            gameWon = true;
        }
    }

    draw(){
        if(player.score >= 10){
            return;
        }
        ctx.drawImage(this.image, this.x, this.y, 40, 40);
    }
}

let portal = new Portal();
function runPortal() {
    portal.draw();
    if (collision(player, portal)) {
        gameOver = true;
    }
}


// Run game
function gameLoop(){
   
    ctx.clearRect(0,0, canvas.width, canvas.height);

    runPlayer();
    runBullets();
    runGolds();

// Check for game over
    if(gameOver) {
        ctx.font = "50px Monospace";
        ctx.fillStyle = "red";
        ctx.fillText("Game Over", 133, 250);
    return;
    }
// Check for game won
    if(gameWon) {
        ctx.font = "50px Monospace";
        ctx.fillStyle = "red";
        ctx.fillText("Congrats!", 150, 250);
        return;
    }



    portal.update();
    portal.draw();
    
    window.requestAnimationFrame(gameLoop);
}

gameLoop();















































//const cells = Array.from(document.querySelectorAll(".cell"));
//const enemyCells = cells.slice(0, 30);
//const playerCells = cells.slice(30);
//const scoreDisplay = document.querySelector(".score");
//const audio = document.querySelector("audio");

// Game logic
//let dropCount, speed, score;
//reset();
//document.addEventListener("keydown", e => {
  //  if (!dropCount) {
    //    startGame();
    //}
    //const player = document.querySelector(".player");

    //if (e.key === "ArrowRight" && playerCells.includes(player.parentElement.nextElementSibling)) {
      //  player.parentElement.nextElementSibling.appendChild(player);
    //}

    //if (e.key === "ArrowLeft" && playerCells.includes(player.parentElement.previousElementSibling)) {
      //  player.parentElement.previousElementSibling.appendChild(player);
  //  }
//});

//function reset (){
  //  dropCount = 0;
    //speed = 1000;
    //score = 0;
    //scoreDisplay.innerHTML = "0";

    //cells.forEach(cell => cell.innerHTML = "" );
    //playerCells[1].innerHTML = '<div class="player"></div>';
//}

//function startGame() {
  //  reset();
    //console.log("Starting new game");
    //audio.play(); 
//    loop();
//}

//function loop() {
   // let stopGame = false;
    //for (let i = enemyCells.length -1; i >= 0; i--) {
      //  const cell = enemyCells[i];
      //  const nextCell = cells[i + 3];
      //  const enemy = cell.children[0];

      // if (!enemy) {
         //   continue;
        //}

      //  nextCell.appendChild(enemy);
      //  if (playerCells.includes(nextCell)) {
         //   if (nextCell.querySelector(".player")) {
        //        stopGame = true;
       //     } else {
             //   score++;
    // Making sure that the speed don't go negative
         //       speed = Math.max(100, speed - 15);
        //        scoreDisplay.innerHTML = score;
        //        enemy.remove();
         //   }
      //  }
  //  }

    // Calculate current beat of the music and use it to determine when to drop enemy cells
    //const beatsPerSecond = 1 / (audio.duration / audio.buffered.length);
    //const currentBeat = audio.currentTime * beatsPerSecond;

    // Dropping enemy cells every other beat
   // if (dropCount % 2 === 0){
   //     const position = Math.floor(Math.random()*3);
   //     enemyCells[position].innerHTML = '<div class="enemy"></div>'
   // }
  //  if (stopGame) {
       // audio.pause();
     //   alert('Your score: ' + score + ". Close this window to play again.");
     //   reset();
   // } else {
        //dropCount++;
       //setTimeout(loop, speed);

    //}
//}
