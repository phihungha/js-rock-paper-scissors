const Choices = {
  Rock: Symbol("rock"),
  Paper: Symbol("paper"),
  Scissor: Symbol("scissor"),
};

const MatchResult = {
  Win: Symbol("win"),
  Lose: Symbol("lose"),
  Draw: Symbol("draw"),
};

function getComputerChoice() {
  const choice = Math.floor(Math.random() * 3);
  switch (choice) {
    case 0:
      return Choices.Rock;
    case 1:
      return Choices.Paper;
    case 2:
      return Choices.Scissor;
  }
}

function calcResult(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return MatchResult.Draw;

  if (computerChoice === Choices.Rock) {
    if (playerChoice === Choices.Paper) return MatchResult.Win;
    if (playerChoice === Choices.Scissor) return MatchResult.Lose;
  }

  if (computerChoice === Choices.Paper) {
    if (playerChoice === Choices.Rock) return MatchResult.Lose;
    if (playerChoice === Choices.Scissor) return MatchResult.Win;
  }

  if (computerChoice === Choices.Scissor) {
    if (playerChoice === Choices.Rock) return MatchResult.Win;
    if (playerChoice === Choices.Paper) return MatchResult.Lose;
  }
}

function getChoiceDisplayName(choice) {
  switch (choice) {
    case Choices.Paper:
      return "Paper";
    case Choices.Scissor:
      return "Scissor";
    case Choices.Rock:
      return "Rock";
    default:
      throw new Error("Illegal choice");
  }
}

let round = 0;
let computerScore = 0;
let playerScore = 0;

function updatePlayerScore(newScore) {
  playerScore = newScore;
  document.querySelector(".player-score").textContent = playerScore;
}

function updateComputerScore(newScore) {
  computerScore = newScore;
  document.querySelector(".computer-score").textContent = computerScore;
}

function updateRound(newRound) {
  round = newRound;
  document.querySelector(".round-number").textContent = round;
}

function updateGameMessage(newMessage) {
  document.querySelector(".game-message").textContent = newMessage;
}

function updateScoreboard(playerChoice) {
  const computerChoice = getComputerChoice();
  const result = calcResult(playerChoice, computerChoice);

  let gameMessage = `Computer picked ${getChoiceDisplayName(computerChoice)}.\n`;

  if (result === MatchResult.Draw) {
    gameMessage += "A draw!";
  } else if (result === MatchResult.Win) {
    gameMessage += "You won!";
    updatePlayerScore(playerScore + 1);
  } else {
    gameMessage += "You lose!";
    updateComputerScore(computerScore + 1);
  }

  updateGameMessage(gameMessage);
}

function determineWinner() {
  let gameMessage;
  if (computerScore > playerScore) {
    gameMessage = "You lost to the computer!";
  } else if (computerScore < playerScore) {
    gameMessage = "You won! Congratulations!";
  } else {
    gameMessage = "This is a draw!";
  }
  updateGameMessage(gameMessage);
}

function startNewGame() {
  updatePlayerScore(0);
  updateComputerScore(0);
  updateRound(0);
  updateGameMessage("Make your first move!");
}

function finishRound(playerChoice) {
  updateScoreboard(playerChoice);
  if (round < 5) {
    updateRound(round + 1);
  } else {
    determineWinner();
  }
}

document.querySelector(".rock-choice").addEventListener("click", () => {
  finishRound(Choices.Rock);
});

document.querySelector(".paper-choice").addEventListener("click", () => {
  finishRound(Choices.Paper);
});

document.querySelector(".scissor-choice").addEventListener("click", () => {
  finishRound(Choices.Scissor);
});
