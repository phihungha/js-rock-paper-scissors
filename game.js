var _a, _b, _c, _d;
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
var round = 1;
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
function updateMatchResultMsg(newMessage) {
    var elem = document.querySelector(".match-result");
    if (elem != null) {
        elem.textContent = newMessage;
    }
}
function setShowElement(elem, isShown) {
    if (isShown) {
        elem.removeAttribute("hidden");
    }
    else {
        elem.setAttribute("hidden", "");
    }
}
function setShowResultUI(isShown) {
    var newGameBtn = document.querySelector(".new-game");
    setShowElement(newGameBtn, isShown);
    var finalResultMsg = document.querySelector(".final-result");
    setShowElement(finalResultMsg, isShown);
    var roundNumberTitle = document.querySelector(".round-number-title");
    setShowElement(roundNumberTitle, !isShown);
    var roundNumber = document.querySelector(".round-number");
    setShowElement(roundNumber, !isShown);
    document.querySelectorAll(".player-choice").forEach(function (elem) {
        setShowElement(elem, !isShown);
    });
}
function updateScoreboard(playerChoice) {
    var computerChoice = getComputerChoice();
    var result = calcMatchResult(playerChoice, computerChoice);
    var matchResultMsg = "Computer picked ".concat(getChoiceDisplayName(computerChoice), ".\n");
    if (result === "draw") {
        matchResultMsg += "This match is a draw!";
    }
    else if (result === "win") {
        matchResultMsg += "You won this match!";
        updatePlayerScore(playerScore + 1);
    }
    else {
        matchResultMsg += "You lose this match!";
        updateComputerScore(computerScore + 1);
    }
    updateMatchResultMsg(matchResultMsg);
}
function determineWinner() {
    var finalResultMsg;
    if (computerScore > playerScore) {
        finalResultMsg = "You lost the game! Good luck next time!";
    }
    else if (computerScore < playerScore) {
        finalResultMsg = "You won the game! Congratulations!";
    }
    else {
        finalResultMsg = "This is a draw!";
    }
    var elem = document.querySelector(".final-result");
    elem.textContent = finalResultMsg;
}
function startNewGame() {
    updatePlayerScore(0);
    updateComputerScore(0);
    updateRound(1);
    updateMatchResultMsg("Make your first move!");
    setShowResultUI(false);
}
function playerChoose(playerChoice) {
    updateScoreboard(playerChoice);
    if (round < 5) {
        updateRound(round + 1);
    }
    else {
        determineWinner();
        setShowResultUI(true);
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
(_d = document.querySelector(".new-game")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
    startNewGame();
});
startNewGame();
