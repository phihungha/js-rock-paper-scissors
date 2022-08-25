function getComputerChoice() {
    let choice = Math.floor(Math.random() * 3);
    switch (choice) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissor";
    }
}

function getPlayerChoice() {
    let choice = prompt("Enter your choice (rock, paper, or scissor):");
    return choice.toLowerCase();
}

function calcResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice)
        return "A draw!";

    if (computerChoice == "rock") {
        if (playerChoice == "paper")
            return "You won! Rock is beaten by Paper";
        if (playerChoice == "scissor")
            return "You lose! Rock beats Scissor";
    }

    if (computerChoice == "paper") {
        if (playerChoice == "rock")
            return "You lose! Paper beats Rock";
        if (playerChoice == "scissor")
            return "You won! Paper is beaten by Scissor";
    }

    if (computerChoice == "scissor") {
        if (playerChoice == "rock")
            return "You won! Scissor is beaten by Rock";
        if (playerChoice == "paper")
            return "You lose! Scissor beats Paper";
    }
}