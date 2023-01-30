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

let round = 1;
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

function updateMatchResultMsg(newMessage: string): void {
  const elem = document.querySelector(".match-result");
  if (elem != null) {
    elem.textContent = newMessage;
  }
}

function setShowElement(elem: Element, isShown: boolean): void {
  if (isShown) {
    elem.removeAttribute("hidden");
  } else {
    elem.setAttribute("hidden", "");
  }
}

function setShowResultUI(isShown: boolean): void {
  const newGameBtn = document.querySelector(".new-game");
  setShowElement(newGameBtn!, isShown);

  const finalResultMsg = document.querySelector(".final-result");
  setShowElement(finalResultMsg!, isShown);

  const roundNumberTitle = document.querySelector(".round-number-title");
  setShowElement(roundNumberTitle!, !isShown);

  const roundNumber = document.querySelector(".round-number");
  setShowElement(roundNumber!, !isShown);

  document.querySelectorAll(".player-choice").forEach((elem) => {
    setShowElement(elem, !isShown);
  });
}

function updateScoreboard(playerChoice: Choice): void {
  const computerChoice = getComputerChoice();
  const result = calcMatchResult(playerChoice, computerChoice);

  let matchResultMsg = `Computer picked ${getChoiceDisplayName(computerChoice)}.\n`;

  if (result === "draw") {
    matchResultMsg += "This match is a draw!";
  } else if (result === "win") {
    matchResultMsg += "You won this match!";
    updatePlayerScore(playerScore + 1);
  } else {
    matchResultMsg += "You lose this match!";
    updateComputerScore(computerScore + 1);
  }

  updateMatchResultMsg(matchResultMsg);
}

function determineWinner(): void {
  let finalResultMsg: string;
  if (computerScore > playerScore) {
    finalResultMsg = "You lost the game! Good luck next time!";
  } else if (computerScore < playerScore) {
    finalResultMsg = "You won the game! Congratulations!";
  } else {
    finalResultMsg = "This is a draw!";
  }

  const elem = document.querySelector(".final-result");
  elem!.textContent = finalResultMsg;
}

function startNewGame(): void {
  updatePlayerScore(0);
  updateComputerScore(0);
  updateRound(1);
  updateMatchResultMsg("Make your first move!");
  setShowResultUI(false);
}

function playerChoose(playerChoice: Choice): void {
  updateScoreboard(playerChoice);
  if (round < 5) {
    updateRound(round + 1);
  } else {
    determineWinner();
    setShowResultUI(true);
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

startNewGame();
