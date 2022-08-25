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
        return "draw";

    if (computerChoice == "rock") {
        if (playerChoice == "paper")
            return "won";
        if (playerChoice == "scissor")
            return "lose";
    }

    if (computerChoice == "paper") {
        if (playerChoice == "rock")
            return "lose";
        if (playerChoice == "scissor")
            return "won";
    }

    if (computerChoice == "scissor") {
        if (playerChoice == "rock")
            return "won";
        if (playerChoice == "paper")
            return "lose";
    }
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function game() {
    let computerScore = 0;
    let playerScore = 0;

    for (let i = 0; i < 5; i++) {
        let playerChoice = getPlayerChoice();
        let computerChoice = getComputerChoice();

        let result = calcResult(playerChoice, computerChoice);

        if (result === "draw") {
            console.log(`Round ${i + 1}: A draw!`);
        } else if (result === "won") {
            console.log(`Round ${i + 1}: You won! ${capitalize(computerChoice)} is beaten by ${capitalize(playerChoice)}`);
            playerScore++;
        } else {
            console.log(`Round ${i + 1}: You lose! ${capitalize(computerChoice)} beats ${capitalize(playerChoice)}`);
            computerScore++;
        }
    }

    if (computerScore > playerScore) {
        console.log("You lost to the computer!");
    } else if (computerScore < playerScore) {
        console.log("You won! Congratulation!");
    } else {
        console.log("This is a draw!");
    }
    console.log(`Final score: You = ${playerScore} Computer = ${computerScore}`);
}