const choices = document.querySelectorAll(".choice");
const gameResult = document.getElementById("game-result");
const scoreDisplay = document.getElementById("score");
const playerChoiceImage = document.getElementById("player-choice-img");
const computerChoiceImage = document.getElementById("computer-choice-img");
const resetButton = document.getElementById("reset");

// Initial Starting Scoires/Reset Scores
let playerScore = 0;
let computerScore = 0;
let playerWins = 0;
let computerWins = 0;
let round = 1;
const maxRounds = 3;

// Function to determine the winner
function determineWinner(playerChoice, computerChoice) {
  const rules = {
    rock: ["scissors", "lizard"],
    paper: ["rock", "spock"],
    scissors: ["paper", "lizard"],
    lizard: ["spock", "paper"],
    spock: ["scissors", "rock"],
  };

  if (playerChoice === computerChoice) {
    return { result: "It's a tie!", color: "orange" };
  } else if (rules[playerChoice].includes(computerChoice)) {
    playerScore++;
    return { result: "You win!", color: "green" };
  } else {
    computerScore++;
    return { result: "You lose!", color: "red" };
  }
}

// Function to generate a random computer choice
function computerHand() {
  const choices = ["rock", "paper", "scissors", "lizard", "spock"];
  return choices[Math.floor(Math.random() * choices.length)];
}

// Function to update the score display
function updateScore() {
  scoreDisplay.textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
}

// Function to update the images for player and computer choices
function updateChoiceImages(playerChoice, computerChoice) {
  playerChoiceImage.innerHTML = `<img src="images/${playerChoice}.png" alt="${playerChoice}">`;
  computerChoiceImage.innerHTML = `<img src="images/${computerChoice}.png" alt="${computerChoice}">`;
}

// Function to reset the game
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerWins = 0;
  computerWins = 0;
  round = 1;
  updateScore();
  gameResult.textContent = "Choose your option!";
  gameResult.style.color = "black"; // Reset text color
  playerChoiceImage.innerHTML = "";
  computerChoiceImage.innerHTML = "";
}

// Event listener for the reset button
resetButton.addEventListener("click", resetGame);

// Event listeners for player choices
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    if (playerWins < 2 && computerWins < 2) {
      const playerChoice = choice.id; // Get the choice (id of button clicked)
      const computerChoice = computerHand();
      const { result, color } = determineWinner(playerChoice, computerChoice);

      gameResult.textContent = `Round ${round}: You chose ${playerChoice}, computer chose ${computerChoice}. ${result}`;
      gameResult.style.color = color; // Apply the color based on the result
      updateScore(); // Update the score
      updateChoiceImages(playerChoice, computerChoice); // Update the images

      // Track the wins
      if (result === "You win!") {
        playerWins++;
      } else if (result === "You lose!") {
        computerWins++;
      }

      // If a player reaches 2 wins, end the game
      if (playerWins === 2) {
        gameResult.textContent = `You win the match! Score: Player : ${playerWins} | Computer : ${computerWins}`;
        gameResult.style.color = "green";
        resetButton.style.display = "inline-block"; // Show reset button
      } else if (computerWins === 2) {
        gameResult.textContent = `You lose the match! Score: Player : ${playerWins} | Computer : ${computerWins}`;
        gameResult.style.color = "red";
        resetButton.style.display = "inline-block"; // Show reset button
      } else {
        round++;
      }
    }
  });
});
