// given the row and column selected, update the state of the game
function takeTurn(row, column, state) {

    console.log("takeTurn was called with row: " + row + ", column:" + column)

    let { board, playerID, turnCount, winner } = state

    const lastColumn = board[row].lastIndexOf(null)

    if (winner === null && lastColumn > -1) {

        console.log("Placed is not occupied")

        if (playerID === 1) {

            board[row][lastColumn] = "red"
            console.log("Placed a red")
        } else if (playerID === -1) {
            board[row][lastColumn] = "yellow"
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
        state.winner = winner

        return state
    } else {
        console.log("Column is full or winner has been called.")
        return state
    }
}

function checkWinner(state) {
    console.log("checkWinner was called")

    let { board, playerID, turnCount, winner } = state

    if (winner === null) {
        console.log("Checking columns for winner")
        for (let i = 0; i < 7; i++) {
            // console.log(board[i])
            winner = checkArray(board[i])
            if (winner != null) {
                setState(board, playerID, turnCount, winner)
                return state.winner
            }
        }
        console.log("Winner not found")
    }

    if (winner === null) {
        console.log("Checking rows for winners...")
        for (let i = 0; i < 6; i++) {
            winner = checkArray(board.map(x => x[i]))
            // console.log(board.map(x => x[i]))
            if (winner != null) {
                setState(board, playerID, turnCount, winner)
                return state.winner
            }
        }
        console.log("Winner not found")
    }

    if (turnCount === 42) {
        console.log("Can't play more pieces - DRAW")
        winner = "nobody"
        setState(board, playerID, turnCount, winner)
        return state.winner
    }
}

function checkArray(array) {

    let redCount = 0
    let yellowCount = 0

    for (let i = 0; i < 7; i++) {
        if (array[i] === "red") {
            redCount++
            yellowCount = 0
            // console.log("redCount: ", redCount)
            if (redCount === 4) {
                return "red"
            }
        } else if (array[i] === "yellow") {
            yellowCount++
            redCount = 0
            // console.log("yellowCount: ", yellowCount)
            if (yellowCount === 4) {
                return "yellow"
            }
        } else if (array[i] === null) {
            redCount = 0
            yellowCount = 0
        }
    }

    return null
}

function setState(board, playerID, turnCount, winner) {
    state.board = board
    state.playerID = playerID
    state.turnCount = turnCount
    state.winner = winner
    return state
}


if (typeof exports === 'object') {
    console.log("Running in Node")
    module.exports = {
        takeTurn,
        checkWinner,
        checkArray
    }
} else {
    console.log("Running in Browser")
}
