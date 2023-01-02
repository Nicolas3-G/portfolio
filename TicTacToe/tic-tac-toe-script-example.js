const statusDisplay = document.querySelector('#game-status');
const nameInput = document.querySelector('#name-input');
const nameBox = document.querySelector('#name-box');
const playerOneWinCount = document.querySelector('#player-1-wins');
const playerTwoWinCount = document.querySelector('#player-2-wins');
const gameContainer = document.querySelector('.game-container');


let gameActive = false;

let currentPlayer = "X";
let playerOneName = "";
let playerTwoName = "";

let playerOneWins = 0;
let playerTwoWins = 0;

let gameState = ["", "", "", "", "", "", "", "", ""];


const winningMessage = () => {
    if (currentPlayer == "X") {
        return `Player ${playerOneName} has won!`
    } else {
        return `Player ${playerTwoName} has won!`
    }
};
const drawMessage = () => `Game ended in a draw!`;

const currentPlayerTurn = () => {
    if (currentPlayer == "X") {
        if (playerOneName != "") {
            return `It's ${playerOneName}'s turn`
        } else {
            return `It's Player 1's turn`
        }
    } else {
        return `It's ${playerTwoName}'s turn`
    }
};

statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    gameContainer.classList.add('shake');

}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
    handleCardHighlight();

}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            handleHighlightWin(winCondition);
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameContainer.classList.add('win');
        handleAddWins();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;

    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerHTML = "";
        cell.style.color = "black";
    });
    gameContainer.classList.remove('win');


}

function handleEnterNameClick() {
    if (playerOneName == "") {
        if (!nameInput.value) {
            playerOneName = "Player 1";
        } else {
            playerOneName = nameInput.value;
        }
        document.querySelector('#player-1-name-text').innerHTML = playerOneName;
        nameInput.value = "";
        nameInput.placeholder = "Player 2";
    } else {
        if (!nameInput.value) {
            playerTwoName = "Player 2";
        } else {
            playerTwoName = nameInput.value;
        }

        document.querySelector('#player-2-name-text').innerHTML = playerTwoName;
        nameBox.style.visibility = "hidden";
        gameActive = true;
        handleCardHighlight();
        statusDisplay.innerHTML = currentPlayerTurn()
    }
    console.log(playerOneName);
    console.log(playerTwoName);

}

function handleCardHighlight() {
    if (currentPlayer == "X") {
        document.querySelector('#player-1-card').classList.add('highlight');
        document.querySelector('#player-2-card').classList.remove('highlight');
    } else if (currentPlayer == "O") {
        document.querySelector('#player-2-card').classList.add('highlight');
        document.querySelector('#player-1-card').classList.remove('highlight');
    }

}

function handleAddWins() {
    if (currentPlayer == "X") {
        playerOneWins += 1;
    } else {
        playerTwoWins += 1;
    }
    playerOneWinCount.innerHTML = playerOneWins;
    playerTwoWinCount.innerHTML = playerTwoWins;

}

function handleHighlightWin(winningIndexes) {
    console.log("Handling Highlight Win" + winningIndexes);
    document.querySelectorAll('.cell').forEach(cell => {
        if (winningIndexes.includes(parseInt(cell.getAttribute("data-cell-index")))) {
            cell.style.color = "rgb(7, 104, 7)";
        }
    })
}


document.querySelector('#enter-name-button').addEventListener('click', handleEnterNameClick);
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('#game-restart').addEventListener('click', handleRestartGame);
gameContainer.addEventListener('animationend', function () {
    gameContainer.classList.remove("shake");
})
