//Getting elements
const inputButtons = document.querySelectorAll(".btn-option");
const scoreBoard = document.getElementById("score");
const gameEle = document.querySelector(".game");
const gameOnEle = document.querySelector(".game-on");
const plyBoxWaiting = document.querySelector(".ply-box");
const cpuBoxWaiting = document.querySelector(".cpu-box");
const placeholder = document.querySelector(".placeholder");
const resultBoard = document.querySelector(".result-board");
const playAgain = document.querySelector("#play-again");

//Variables
const options = ["rock", "paper", "scissors"];
let score = 0;

//Eventlisteners
inputButtons.forEach((button) =>
  button.addEventListener("click", () => {
    const plyInput = button.getAttribute("data-choice");
    const cpuInput = pickRandomOption(options);
    displayResult(plyInput, cpuInput);
  })
);

playAgain.addEventListener("click", () => {
  toggleHide(gameEle);
  toggleHide(gameOnEle);
  toggleHide(placeholder);
  toggleHide(cpuBoxWaiting);
  toggleHide(resultBoard);
});

//Functions
function pickRandomOption(options) {
  return options[Math.floor(Math.random() * options.length)];
}

function optionSetter(box, currChoice) {
  const boxButton = box.querySelector(".btn-circle");
  const boxImg = box.querySelector("img");
  const prevChoice = box.querySelector("img").getAttribute("alt");
  boxButton.classList.remove(`btn-${prevChoice}`);
  boxButton.classList.add(`btn-${currChoice}`);
  boxImg.setAttribute("src", `./images/icon-${currChoice}.svg`);
  boxImg.setAttribute("alt", `${currChoice}`);
}

function findWinner(plyInput, cpuInput) {
  if (plyInput === cpuInput) {
    return "draw";
  } else if (plyInput === "rock" && cpuInput === "scissors") {
    return "win";
  } else if (plyInput === "paper" && cpuInput === "rock") {
    return "win";
  } else if (plyInput === "scissors" && cpuInput === "paper") {
    return "win";
  } else {
    return "lose";
  }
}

function toggleHide(element) {
  element.classList.toggle("hide");
}

function displayResult(plyInput, cpuInput) {
  optionSetter(plyBoxWaiting, plyInput);
  optionSetter(cpuBoxWaiting, cpuInput);
  toggleHide(gameEle);
  toggleHide(gameOnEle);
  setTimeout(() => {
    toggleHide(placeholder);
    toggleHide(cpuBoxWaiting);
    const result = findWinner(plyInput, cpuInput);
    if (result === "draw") {
      document.getElementById("result-text").textContent = "It's a draw!";
    } else if (result === "win") {
      document.getElementById("result-text").textContent = "You won :)";
      score++;
    } else {
      document.getElementById("result-text").textContent = "You lost :(";
      score--;
    }
    scoreBoard.textContent = `${score}`;
    resultBoard.classList.toggle("hide");
  }, 500);
}
