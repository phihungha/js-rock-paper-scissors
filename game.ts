type Choice = "rock" | "paper" | "scissor";

type MatchResult = "win" | "lose" | "draw";

function getComputerChoice(): Choice {
  const choice = Math.floor(Math.random() * 3);
  switch (choice) {
    case 0:
      return "rock";
    case 1:
      return "paper";
    case 2:
      return "scissor";
    default:
      throw new Error("Illegal choice");
  }
}

function calcMatchResult(playerChoice: Choice, computerChoice: Choice): MatchResult {
  if (computerChoice === "rock") {
    if (playerChoice === "paper") return "win";
    if (playerChoice === "scissor") return "lose";
  }

  if (computerChoice === "paper") {
    if (playerChoice === "rock") return "lose";
    if (playerChoice === "scissor") return "win";
  }

  if (computerChoice === "scissor") {
    if (playerChoice === "rock") return "win";
    if (playerChoice === "paper") return "lose";
  }

  return "draw";
}

function getChoiceDisplayName(choice: Choice): string {
  switch (choice) {
    case "paper":
      return "Paper";
    case "scissor":
      return "Scissor";
    case "rock":
      return "Rock";
    default:
      throw new Error("Illegal choice");
  }
}

let round = 0;
let computerScore = 0;
let playerScore = 0;

function updatePlayerScore(newScore: number): void {
  playerScore = newScore;
  const elem = document.querySelector(".player-score");
  if (elem != null) {
    elem.textContent = playerScore.toString();
  }
}

function updateComputerScore(newScore: number): void {
  computerScore = newScore;
  const elem = document.querySelector(".computer-score");
  if (elem != null) {
    elem.textContent = computerScore.toString();
  }
}

function updateRound(newRound: number): void {
  round = newRound;
  const elem = document.querySelector(".round-number");
  if (elem != null) {
    elem.textContent = round.toString();
  }
}

function setShowElement(elem: Element, isShown: boolean): void {
  if (isShown) {
    elem.removeAttribute("hidden");
  } else {
    elem.setAttribute("hidden", "");
  }
}

function setShowNewGameBtn(isShown: boolean): void {
  const newGameBtn = document.querySelector(".new-game");
  if (newGameBtn != null) {
    setShowElement(newGameBtn, isShown);
  }

  document.querySelectorAll(".player-choice").forEach((elem) => {
    setShowElement(elem, !isShown);
  });
}

function updateGameMessage(newMessage: string): void {
  const elem = document.querySelector(".game-message");
  if (elem != null) {
    elem.textContent = newMessage;
  }
}

function updateScoreboard(playerChoice: Choice): void {
  const computerChoice = getComputerChoice();
  const result = calcMatchResult(playerChoice, computerChoice);

  let gameMessage = `Computer picked ${getChoiceDisplayName(computerChoice)}.\n`;

  if (result === "draw") {
    gameMessage += "A draw!";
  } else if (result === "win") {
    gameMessage += "You won!";
    updatePlayerScore(playerScore + 1);
  } else {
    gameMessage += "You lose!";
    updateComputerScore(computerScore + 1);
  }

  updateGameMessage(gameMessage);
}

function determineWinner(): void {
  let gameMessage: string;
  if (computerScore > playerScore) {
    gameMessage = "You lost to the computer!";
  } else if (computerScore < playerScore) {
    gameMessage = "You won! Congratulations!";
  } else {
    gameMessage = "This is a draw!";
  }
  updateGameMessage(gameMessage);
}

function startNewGame(): void {
  updatePlayerScore(0);
  updateComputerScore(0);
  updateRound(0);
  updateGameMessage("Make your first move!");
  setShowNewGameBtn(false);
}

function playerChoose(playerChoice: Choice): void {
  updateScoreboard(playerChoice);
  if (round < 5) {
    updateRound(round + 1);
  } else {
    determineWinner();
    setShowNewGameBtn(true);
  }
}

document.querySelector(".rock-choice")?.addEventListener("click", () => {
  playerChoose("rock");
});

document.querySelector(".paper-choice")?.addEventListener("click", () => {
  playerChoose("paper");
});

document.querySelector(".scissor-choice")?.addEventListener("click", () => {
  playerChoose("scissor");
});

document.querySelector(".new-game")?.addEventListener("click", () => {
  startNewGame();
});
