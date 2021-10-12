// initial state
const state = {
    board: Array(7).fill().map(() => Array(6).fill(null, 0, 6)), // generate 2D array of given size
    playerID: 1,
    turnCount: 0,
    winner: null
}

clearBoard()

// Clear down the elements drawn on the board.
function clearBoard() {
    for (let rowIndex = 0; rowIndex < 7; rowIndex++) {
        for (let columnIndex = 0; columnIndex < 6; columnIndex++) {
            document.getElementById(`row-${rowIndex}-column-${columnIndex}`).innerHTML = `${rowIndex}-${columnIndex}`
        }
    }
}

// Populate the grid with images based on the board state.
function setBoard(board) {
    clearBoard();
    for (let rowIndex = 0; rowIndex < 7; rowIndex++) {
        for (let columnIndex = 0; columnIndex < 6; columnIndex++) {
            if (!board[rowIndex][columnIndex]) {
                continue;
            }
            document.getElementById(`row-${rowIndex}-column-${columnIndex}`).innerText = board[rowIndex][columnIndex] === "red" ? "🔴" : "🟡";
        }
    }
}

function isValidRowOrColumn(array) {
    return Array.isArray(array) && (array.length === 6 || array.length === 7);
}

function isValidColumn(columnArray) {
    return isValidRowOrColumn(columnArray) && columnArray.every(function (item) { return ["red", "yellow", null].includes(item); });
}

// A grid position was clicked call the game's turn function, redraw and then check for a winner.
function positionClick(rowIndex, columnIndex, event) {

    takeTurn(rowIndex, columnIndex, state);

    const board = state.board

    if (!isValidRowOrColumn(board) || !board.every(isValidColumn)) {
        throw "Expecting 'getBoard' to return a 2d array where all values match are null or one of the strings 'red' or 'yellow'. Actually received: " + JSON.stringify(board);
    }

    setBoard(board);

    const winner = checkWinner(state);

    if (winner) {
        if (typeof winner !== "string" || !["red", "yellow", "nobody"].includes(winner)) {
            throw "Expecting 'checkWinner' to return null or one of the strings 'red', 'yellow' or 'nobody'. Actually received: " + winner;
        }
        const winnerName = document.getElementById("winner-name");
        winnerName.innerText = winner;
        const winnerDisplay = document.getElementById("winner-display");
        winnerDisplay.style.display = "block";
    }
}

// Bind the click events for the grid.
for (let rowIndex = 0; rowIndex < 7; rowIndex++) {
    for (let columnIndex = 0; columnIndex < 6; columnIndex++) {
        const gridPosition = document.getElementById(`row-${rowIndex}-column-${columnIndex}`);
        gridPosition.addEventListener("click", positionClick.bind(null, rowIndex, columnIndex));
    }
}

if (typeof exports === 'object') {
    console.log("Running in Node")
    module.exports = {
        clearBoard,
        setBoard,
        isValidRowOrColumn,
        isValidColumn,
        positionClick,
    }
} else {
    console.log("Running in Browser")
}
