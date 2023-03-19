
// The start page and game pages
const startPage = document.getElementById("start-page");
const gamePage1 = document.getElementById("game-page-1");
const gamePage2 = document.getElementById("game-page-2");
const gamePage3 = document.getElementById("game-page-3");

// Start game button
const startbutton = document.getElementById("start-button");
startbutton.addEventListener("click", function (){
  startPage.classList.add("hidden");
  gamePage1.classList.remove("hidden");
});

// Page 1 button
const page1Button = document.getElementById("page1-button");
page1Button.addEventListener("click", function (){
  gamePage1.classList.add("hidden");
  gamePage2.classList.remove("hidden");
});

// Page 2 button
const page2Button = document.getElementById("page2-button");
page2Button.addEventListener("click", function (){
  gamePage2.classList.add("hidden");
  gamePage3.classList.remove("hidden");
});

// Page 3 button
const page3Button = document.getElementById("page3-button");
page3Button.addEventListener("click", function (){
  gamePage3.classList.add("hidden");
  startPage.classList.remove("hidden");
});




