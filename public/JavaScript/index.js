//Starts Game Cells as Empty
let board = ["", "", "", "", "", "", "", "", ""];

//Sets Starting Player as Player X
let currentPlayer = "X";

//Player VS Player Start Button
let start = document.getElementById("start");

//Player VS Computer Start Button
let computer = document.getElementById("computer");

//Game Status Text
let statusText = document.getElementById("status-text");

//Player Names
let playerNameInput = document.getElementById("player-form");

//Game Timer
let clock = document.getElementById("clock");

//Empty Player Name Text
let playerOne = "";
let playerTwo = "";

//Submit Form Starts as Deactivated
submit.disabled = true;

//Event Listener placed to allow Players to Enter their Names
playerNameInput.addEventListener("submit", (evt) => {
  evt.preventDefault();
  playerOne = document.getElementById("player-one");
  playerTwo = document.getElementById("player-two");
  if (playerOne.value !== undefined) {
    statusText.textContent = `${playerOne.value}'s Move`;
  } else {
    statusText.textContent = `Player X's Move`;
  }
});

//Stored Winning Cell Combinations
let winCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//Checks Winning Combinations Against Player Cells
function winCheck() {
  for (let winner of winCombo) {
    let winOne = board[winner[0]];
    let winTwo = board[winner[1]];
    let winThree = board[winner[2]];
    if (winOne === "" || winTwo === "" || winThree === "") {
      continue;
    }

    //Checks Winning Combinations Against Player O
    if (winOne === winTwo && winTwo === winThree && winOne.includes("O")) {
      document.querySelectorAll(".cell").forEach((cell) => {
        if (winner.includes(parseInt(cell.id.split("-")[1]))) {
          cell.style.textDecoration = "line-through";
          cell.style.backgroundColor = "red";
          cell.style.color = "black";
        }
      });

      //Inserts Player Name if Entered in Form
      if (playerOne.value !== undefined) {
        statusText.textContent = `${playerTwo.value} wins!`;
        start.disabled = false;
        computer.disabled = false;
      } else {
        statusText.textContent = "Player O wins!";
        start.disabled = false;
        computer.disabled = false;
      }

      //Stops the clock from continuing to count after the game has been won
      clearInterval(newCount);

      //Refreshes Page after Game Over
      setTimeout(() => {
        document.location = "/";
      }, 3000);

      //Checks Winning Combinations Against Player X
    } else if (
      winOne === winTwo &&
      winTwo === winThree &&
      winOne.includes("X")
    ) {
      //Crosses Out Winning Combination
      document.querySelectorAll(".cell").forEach((cell) => {
        if (winner.includes(parseInt(cell.id.split("-")[1]))) {
          cell.style.textDecoration = "line-through";
          cell.style.backgroundColor = "red";
          cell.style.color = "black";
        }
      });

      //Inserts Player Name if Entered in Form
      if (playerOne.value !== undefined) {
        statusText.textContent = `Player ${playerOne.value} wins!`;
        start.disabled = false;
        computer.disabled = false;
      } else {
        statusText.textContent = `Player X wins!`;
        start.disabled = false;
        computer.disabled = false;
      }

      //Stops the Clock from continuing to count after the game has been won
      clearInterval(newCount);

      //Refreshes Page after Game Over
      setTimeout(() => {
        document.location = "/";
      }, 3000);

      //Checks for a Draw
    } else if (
      !board.includes("") &&
      !statusText.textContent.includes("wins!")
    ) {
      statusText.textContent = "Draw!";

      //Stops the clock from continuing to count after the a draw has occurred
      clearInterval(newCount);

      //Refreshes Page after Game Over
      setTimeout(() => {
        document.location = "/";
      }, 3000);
    }
  }
}

//Player VS Player Game
//Start Button Event Chain Reaction
start.addEventListener("click", (evt) => {
  startCount();
  start.disabled = true;
  computer.disabled = true;
  submit.disabled = false;
  statusText.textContent = "Enter Player Names";

  //User Input Cell Click Event Chain Reaction
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", (evt) => {
      //Checks if Start Button was Pressed and If the Cell is Occupied
      if (start.disabled === true) {
        if (cell.textContent === "O" || cell.textContent === "X") {
          statusText.textContent = "Please select an empty cell.";

          //Player X Input Translation
        } else if (currentPlayer === "X") {
          cell.style.color = "red";
          board[cell.textContent] = currentPlayer;
          cell.textContent = "X";
          currentPlayer = "O";
          if (playerTwo.value !== undefined) {
            statusText.textContent = `${playerTwo.value}'s Move`;
          } else {
            statusText.textContent = "Player O's Move";
          }

          //Checks for Player O Turn and Input Translation
        } else {
          cell.style.color = "red";
          board[cell.textContent] = currentPlayer;
          cell.textContent = "O";
          currentPlayer = "X";
          if (playerOne.value !== undefined) {
            statusText.textContent = `${playerOne.value}'s Move`;
          } else {
            statusText.textContent = "Player X's Move";
          }
        }

        //Checks if Game Over
        winCheck();
      }
    });
  });
});

//Computer VS Player Game
//Start Button Event Chain Reaction
computer.addEventListener("click", (evt) => {
  startCount();
  computer.disabled = true;
  start.disabled = true;
  statusText.textContent = "You are player X, good luck!";

  //User Input Cell Click Event Chain Reaction
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", (evt) => {
      //Checks if Start Button was Pressed and If the Cell is Occupied
      if (computer.disabled === true) {
        if (cell.textContent === "O" || cell.textContent === "X") {
          statusText.textContent = "Please select an empty cell.";

          //Updates to Generic Status and Translates User Click Input
        } else {
          statusText.textContent = "Human : X and Computer : O";
          cell.style.color = "red";
          board[cell.textContent] = currentPlayer;
          cell.textContent = "X";

          //Checks if Game is Over
          winCheck();

          //If Game Isn't Over the Computer Takes a Turn
          if (
            !statusText.textContent.includes("wins!") &&
            !statusText.textContent.includes("Draw!")
          ) {
            //Computer Picks a Random Cell
            let randomMove = Math.floor(Math.random() * 9);

            //Random Cell is Available
            if (board[randomMove] !== "X" && board[randomMove] !== "O") {
              board[randomMove] = "O";

              //Random Cell is Set to O and a Victory Check Occurs
              document.querySelectorAll(".cell").forEach((newCell) => {
                if (parseInt(newCell.textContent) === randomMove) {
                  newCell.style.color = "red";
                  newCell.textContent = "O";

                  //Checks if Game is Over
                  winCheck();
                }
              });

              //If Random Number Fails, First Available Cell is Set to O and a Victory Check Occurs
            } else {
              document.querySelectorAll(".cell").forEach((newerCell) => {
                if (
                  newerCell.textContent !== "X" &&
                  newerCell.textContent !== "O"
                ) {
                  newerCell.style.color = "red";
                  board[newerCell.textContent] = "O";
                  newerCell.textContent = "O";

                  //Checks is Game Over
                  winCheck();

                  //Hail Mary - Kicks Loop When Cell is Converted
                  throw "This works! (and is intentional)";
                }
              });
            }
          }
        }
      }
    });
  });
});

//Time Keepers
let hour = 0;
let minute = 0;
let seconds = 0;

//Formatting Placeholders for Single Digits
placeHolderS = 0;
placeHolderM = 0;
placeHolderH = 0;

//Timer Incrementing and Display Management
function timer() {
  seconds += 1;

  //Seconds Management
  if (seconds > 59) {
    minute += 1;
    seconds = 0;
  }
  if (seconds > 9) {
    placeHolderS = "";
  }
  if (seconds < 10) {
    placeHolderS = 0;
  }

  //Minute Management
  if (minute > 59) {
    hour += 1;
    minute = 0;
  }
  if (minute > 9) {
    placeHolderM = "";
  }
  if (minute < 10) {
    placeHolderM = 0;
  }

  //Hour Management
  if (hour > 99) {
    hour = 0;
  }
  if (hour > 9) {
    placeHolderH = "";
  }
  if (hour < 10) {
    placeHolderH = 0;
  }

  //Element Display Management
  clock.textContent = ` Time Elapsed : ${placeHolderH}${hour}:${placeHolderM}${minute}:${placeHolderS}${seconds} `;
}

//Complete Timer Event
let startCount = (evt) => {
  newCount = setInterval(timer, 1000);
};
