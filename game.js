var _a, _b, _c;
function getComputerChoice() {
    var choice = Math.floor(Math.random() * 3);
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
function calcMatchResult(playerChoice, computerChoice) {
    if (computerChoice === "rock") {
        if (playerChoice === "paper")
            return "win";
        if (playerChoice === "scissor")
            return "lose";
    }
    if (computerChoice === "paper") {
        if (playerChoice === "rock")
            return "lose";
        if (playerChoice === "scissor")
            return "win";
    }
    if (computerChoice === "scissor") {
        if (playerChoice === "rock")
            return "win";
        if (playerChoice === "paper")
            return "lose";
    }
    return "draw";
}
function getChoiceDisplayName(choice) {
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
var round = 0;
var computerScore = 0;
var playerScore = 0;
function updatePlayerScore(newScore) {
    playerScore = newScore;
    var elem = document.querySelector(".player-score");
    if (elem != null) {
        elem.textContent = playerScore.toString();
    }
}
function updateComputerScore(newScore) {
    computerScore = newScore;
    var elem = document.querySelector(".computer-score");
    if (elem != null) {
        elem.textContent = computerScore.toString();
    }
}
function updateRound(newRound) {
    round = newRound;
    var elem = document.querySelector(".round-number");
    if (elem != null) {
        elem.textContent = round.toString();
    }
}
function updateGameMessage(newMessage) {
    var elem = document.querySelector(".game-message");
    if (elem != null) {
        elem.textContent = newMessage;
    }
}
function updateScoreboard(playerChoice) {
    var computerChoice = getComputerChoice();
    var result = calcMatchResult(playerChoice, computerChoice);
    var gameMessage = "Computer picked ".concat(getChoiceDisplayName(computerChoice), ".\n");
    if (result === "draw") {
        gameMessage += "A draw!";
    }
    else if (result === "win") {
        gameMessage += "You won!";
        updatePlayerScore(playerScore + 1);
    }
    else {
        gameMessage += "You lose!";
        updateComputerScore(computerScore + 1);
    }
    updateGameMessage(gameMessage);
}
function determineWinner() {
    var gameMessage;
    if (computerScore > playerScore) {
        gameMessage = "You lost to the computer!";
    }
    else if (computerScore < playerScore) {
        gameMessage = "You won! Congratulations!";
    }
    else {
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
function playerChoose(playerChoice) {
    updateScoreboard(playerChoice);
    if (round < 5) {
        updateRound(round + 1);
    }
    else {
        determineWinner();
    }
}
(_a = document.querySelector(".rock-choice")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    playerChoose("rock");
});
(_b = document.querySelector(".paper-choice")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    playerChoose("paper");
});
(_c = document.querySelector(".scissor-choice")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
    playerChoose("scissor");
});
