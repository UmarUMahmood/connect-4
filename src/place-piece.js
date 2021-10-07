function isValidRowOrColumn(array) {
    return Array.isArray(array) && (array.length === 7 || array.length === 6);
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

    const winner = checkWinner();

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

// Take the row and column number between 0 and 2 
// (inclusive) and update the game state.
function takeTurn(row, column, state) {

    console.log("takeTurn was called with row: " + row + ", column:" + column)

    board = state.board
    playerID = state.playerID
    turnCount = state.turnCount
    winner = state.winner

    if (board[row][column] === null && winner === null) {

        console.log("Placed is not occupied")

        if (playerID === 1) {

            board[row][column] = "red"
            console.log("Placed a red")
        } else if (playerID === -1) {
            board[row][column] = "yellow"
            console.log("Placed a yellow")
        } else {
            console.log("Something wrong with switching players")
        }

        turnCount += 1
        console.log("Turn has been taken")

        playerID *= -1
        console.log("Switching players...")

        state.board = board
        state.playerID = playerID
        state.turnCount = turnCount

        return state
    } else {
        console.log("Placed is occupied or winner has been called. Reset for a new game.")
        return state
    }
}

// Bind the click events for the grid.
for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
    for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
        const gridPosition = document.getElementById(`row-${rowIndex}-column-${columnIndex}`);
        gridPosition.addEventListener("click", positionClick.bind(null, rowIndex, columnIndex));
    }
}


if (typeof exports === 'object') {
    console.log("Running in Node")
    module.exports = {
        isValidRowOrColumn,
        isValidColumn,
        positionClick,
        takeTurn
    }
} else {
    console.log("Running in Browser")
}
