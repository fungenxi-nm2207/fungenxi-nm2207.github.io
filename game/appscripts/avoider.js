// Level 1: Collect 8 coins, reach portal, 3 lives
// Getting and creating canvas element
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const page2Button = document.getElementById("page2-button");

// Variables
let player;
let bullets = []; // Since there can be multiple bullets on the screen at the same time, so storing them in arrays allows for the program to track ad update their positions and states independently.
let bulletInterval = 0; // Counter for bullet timing
let golds = []; // Same logic as the bullets array
let gameOver = false; // Initialised to false. Used to keep track whether player lost
let gameWon = false; // Initialised to false. Used to keep track whether player won
let pressedKeyX = "none"; // Initialised to "none", indicating that no key has been pressed yet
let pressedKeyY = "none";

// Defining the starting conditions of the Player, using Class, since it makes the Player a reusable code that can be modified 
class Player {
    constructor() { 
        this.x = 240; // X-coordinate of player's starting point
        this.y = 240; // Y-coordinate of player's starting point
        this.width = 20;
        this.height = 20;
        this.lives = 3;
        this.score = 0;
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


// Event Listeners, one for keydown and one for keyup

// When a key is pressed down, the event listener updates the value of a variable to the corresponding direction
window.addEventListener("keydown", function(e) {
    if (e.code === "ArrowUp" && pressedKeyY == "none") pressedKeyY = "Up"; // Checks to see value of the 'code' property of the 'e' event object, to determine which arrow key released
    else if (e.code === "ArrowDown" && pressedKeyY == "none") pressedKeyY = "Down";
    else if (e.code === "ArrowLeft" && pressedKeyX == "none") pressedKeyX = "Left";
    else if (e.code === "ArrowRight" && pressedKeyX == "none") pressedKeyX = "Right";
});

// When a key is released, the event listener updates the value of a variable to the corresponding direction
window.addEventListener("keyup", function(e) {
    if (e.code === "ArrowUp" && pressedKeyY == "Up") pressedKeyY = "none";
    else if (e.code === "ArrowDown" && pressedKeyY == "Down") pressedKeyY = "none";
    else if (e.code === "ArrowLeft" && pressedKeyX == "Left") pressedKeyX = "none";
    else if (e.code === "ArrowRight" && pressedKeyX == "Right") pressedKeyX = "none";
});

// Gold

// Creates class Gold, which takes in 2 arguments, x and y, which are the coordinates of the gold object on the canvas
class Gold {
    constructor(x,y) { // Used the constructor function to 
        this.x = x;
        this.y = y;
        this.width = 25;
        this.height = 25;
        this.collected = false;
        this.image = new Image();
        this.image.src = "css/gold.png";
    }

    // Checks if gold has been collected by player using collision detection function and if it hasn't, increments the player's score and sets the collected property to true.
    update() {
        if(!this.collected && collision(player,this)) {
            this.collected = true;
            player.score++;
            console.log(player.score);
        }
    }

    // Draws gold object on canvas only if it hasn't been collected yet
    draw() {
        if(!this.collected) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
}

// Loop to create 8 gold objects with randomly generated x and y coordinates
for (let i=0; i<8; i++) {
    let x = Math.floor(Math.random()*(canvas.width - 50)) + 0;
    let y = Math.floor(Math.random()*(canvas.width - 30)) + 0;
    // Stored in the "golds" array, learnt from class
    golds.push(new Gold(x,y));
}

function runGolds() {

    // Loop that iterates over all elements in "golds" array, starts by initialising variable "i" to 0, then checks whether "i" is less than the length of the "golds" array. If it is, execute code inside loop body
    for (let i=0; i<golds.length; i++){
        // which updates and draws gold objects at the index position of "i"
        golds[i].update();
        golds[i].draw();
    } // After executing the code inside the loop body, increments of "i" by 1 and goes back to check the condition again. Loop continue until "i" is no longer less than the length of the "golds" array
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

// Manages game bullets
function runBullets() {
    bulletInterval++;

    // Checks if bulletInterval is multiple of 52. If it is, function generates 4 new bullets with random coordinates and speeds, and adds them to the "bullets" array
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
    // Iterates through each bullet in the "bullets" array, calling the update() and draw() methods on each one to move and display them on the canvas
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].update();
        bullets[i].draw();
        // Checks if a bullet is outside of the game's bounds. If it is outside of bounds, it is removed from the "bullets" array using splice()
        if (bullets[i] &&
            bullets[i].x < -11 || bullets[i].x > 500 ||
            bullets[i].y < -11 || bullets[i].y > 500) {
                // Removes bullets that collides with the player
                bullets.splice(i, 1);
            }
            // Checks if a bullet is colliding with player. If collision detected, player's lives property decremented, and bullet is removed from "bullets" array. i-- used to prevent skipping a bullet in the array when one is removed
            if (bullets[i] && collision(player, bullets[i])) {
                player.lives--;
                bullets.splice(i,1);
                i--;
            }
    }
}

// Collision

// function takes in 2 objects, first and second as parameters and checks if their rectangular areas overlap. If they do, it returns 'true', indicating that collision occured
function collision(first,second) {
    if (first.x < second.x + second.width &&
        first.x + first.width > second.x &&
        first.y < second.y + second.height &&
        first.y + first.height > second.y) {
            return true;
        }
}

// Portal

// Portal class represents portal object
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
    // Checks if player's score is less than 8. If it is, then it returns and does not draw portal on the canvas. 
    draw(){
        if(player.score < 8){
            return;
        }
        ctx.drawImage(this.image, this.x, this.y, 40, 40);
    }

    // Checks if it is less than 8. If it is, checks for collision. If collision occurs, decides whether gameOver or gameWon.
    update() {
        if(player.score < 8){
            return;
        }
        if(collision(player,this)) {
            gameOver = false;
            gameWon = true;
        }
    }

    //If score is greater than or equal to 8, draws portal image. If less than 10, draws portal image on canvas at the current 'x' and 'y' position of portal object, with width and height of 40px.
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


// Run game in the background while the game is being played
function gameLoop(){

    //Checks whether page2Start variable is true or not. If not true, gameLoop() is called again after a delay of 100 milliseconds, using window.setTimeout() function
    if (!window.page2Start) {
        window.setTimeout(gameLoop, 100);
        return
    }; // Done to prevent game loop from running until the player has started the game

    // If page2Start is true, canvas is cleared using below method, which clears entire canvas before each frame of game loop is rendered.
    ctx.clearRect(0,0, canvas.width, canvas.height);

    runPlayer();
    runBullets();
    runGolds();

// Check for game over
    if(gameOver) {
        ctx.font = "50px Monospace";
        ctx.fillStyle = "red";
        ctx.fillText("Game Over", 133, 250);
        page2Button.classList.remove("hidden");
    return;
    }
// Check for game won
    if(gameWon) {
        ctx.font = "50px Monospace";
        ctx.fillStyle = "red";
        ctx.fillText("Congrats!", 150, 250);
        console.log(player.score);
        page2Button.classList.remove("hidden");
        return;
    }

    // Checks for collision between player and portal
    portal.update();
    // Draws portal on canvas
    portal.draw();
    
    //Request that the gameLoop() functions be called again before the next repaint of canvas, creating a continuous game loop that updates and draws game elements
    window.requestAnimationFrame(gameLoop);
}

// Calls for the game to loop
gameLoop();