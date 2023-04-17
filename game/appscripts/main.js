// The start page and game pages
document.addEventListener('DOMContentLoaded', function() {
const startPage = document.getElementById("start-page");
const gamePage1 = document.getElementById("game-page-1");
const gamePage2 = document.getElementById("game-page-2");
//const gamePage3 = document.getElementById("game-page-3");
//const gamePage4 = document.getElementById("game-page-4");

// JS prompt code
let urname = prompt("please enter your name!");
// same as if(urname){} else{urname="mysterious stranger"}
urname = urname || "Me";
console.log("Hello " + urname + "!");
document.getElementById("line-2").innerHTML = urname + ": Who's there??";
document.getElementById("line-6").innerHTML = urname + ": What help??";
document.getElementById("line-8").innerHTML = urname + ": How did I get here??";
document.getElementById("line-11").innerHTML = urname + ": What do I need to do?";

// Start game button
const startbutton = document.getElementById("start-button");
startbutton.addEventListener("click", function (){
  startPage.classList.add("hidden");
  gamePage1.classList.remove("hidden");
});

// Page 1 set-up
const page1ButtonA = document.getElementById("page1-button-A");
page1ButtonA.addEventListener("click", function (){
  gamePage1.classList.add("hidden");
  instructions.classList.remove("hidden");
});

// Instructions Page set-up
const instructionsButtonX = document.getElementById("instructions-buttonX");
instructionsButtonX.addEventListener("click", function(){
  instructions.classList.add("hidden");
  gamePage2.classList.remove("hidden");
  window.page2Start = true;
  console.log(window.page2Start);
});
  
// Page 2 set-up
// Hide the button initially
const page2Button = document.getElementById("page2-button");
page2Button.classList.add("hidden");

// Show the button when the game is over
function showPage2button(){
  if(window.gameOver) {
    page2Button.classList.remove("hidden");
  }
}

// Call the function whenever the game status changes
  window.addEventListener('gameOver', showPage2button);

// Page 2 button
  page2Button.addEventListener("click", function (){
    gamePage2.classList.add("hidden");
    gamePage1.classList.remove("hidden");
  }); 
});



