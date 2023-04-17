// This JS file mainly sets up the start page and game page structures
// The start page and game pages

const startPage = document.getElementById("start-page");
const gamePage1 = document.getElementById("game-page-1");
const gamePage2 = document.getElementById("game-page-2");
const gamePage3 = document.getElementById("game-page-3");
const gamePage4 = document.getElementById("game-page-4");
// JS prompt code
let urname = prompt("please enter your name!");
// shortcut for if(urname){} else{urname="mysterious stranger"}
urname = urname || "player";
console.log("Hello " + urname + "!");

// Start game button
const startbutton = document.getElementById("start-button");
startbutton.addEventListener("click", function (){
  startPage.classList.add("hidden");
  gamePage1.classList.remove("hidden");
});

// Page 1 (instructions) + JS prompt code

introduction.innerHTML = "<h2>Welcome, " + urname + "!</h2><p> The Box has been waiting for one like you, one with the cunning and courage to navigate its treacherous depths. You have been brought here for a purpose, a purpose that will test you to your very limits. Only you can rise to the challenge... <p> But fear not, for you will not face this journey alone. <p> You will be armed with your wits, your courage, and the clues that lie ahead. Together, we will unlock the secrets of The Box, and only then will you emerge victorious. <p><h2>Are you ready to begin?</h2>"; 

// Page 1 (instructions) next button
const page1Button = document.getElementById("page1-button");
page1Button.addEventListener("click", function (){
  gamePage1.classList.add("hidden");
  gamePage2.classList.remove("hidden");
});

// Page 2 set-up
// Challenge 1: the box dodger
    // using concepts like Array, .slice, const, if
    // power-ups such as invisibility and additional points 




// Page 2 button
const page2Button = document.getElementById("page2-button");
page2Button.addEventListener("click", function (){
  gamePage2.classList.add("hidden");
  gamePage3.classList.remove("hidden");
});

// Page 3 set-up

// Page 3 button
const page3Button = document.getElementById("page3-button");
page3Button.addEventListener("click", function (){
  gamePage3.classList.add("hidden");
  gamePage4.classList.remove("hidden");
});
// Page 4 set-up
  // To explain significance of the game 
// Page 4 button
const page4Button = document.getElementById("page4-button");
page4Button.addEventListener("click", function (){
  gamePage4.classList.add("hidden");
  startPage.classList.remove("hidden");
});




