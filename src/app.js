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

    if (winner === null) {
        console.log("Checking diagonals for winners...")
        diagonals = getDiagonals(board)
        // console.log(diagonals)
        for (let i = 0; i < 12; i++) {
            winner = checkArray(diagonals[i])
            if (winner != null) {
                return winner
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

function getDiagonals(board) {

    // this array will hold all the different diagonal lines
    const diagonals = []

    for (let initialRow = 0; initialRow < 4; initialRow++) {
        // console.log("Starting on row: ", initialRow)

        // this array will be used for each single diagonal line
        let diagonal = []

        for (let rowIndex = initialRow, columnIndex = 0; rowIndex < 7; rowIndex++, columnIndex++) {
            // console.log("I found piece: ", `${rowIndex}-${columnIndex}`)
            let piece = board[rowIndex][columnIndex]
            if (typeof piece !== "undefined") {
                diagonal.push(piece)
            }
        }
        // console.log(diagonal)
        diagonals.push(diagonal)
    }

    for (let initialColumn = 2; initialColumn > 0; initialColumn--) {
        // console.log("Starting on column: ", initialColumn)
        let diagonal = []

        for (let rowIndex = 0, columnIndex = initialColumn; rowIndex < 6; rowIndex++, columnIndex++) {
            // console.log("I found piece: ", `${rowIndex}-${columnIndex}`)
            let piece = board[rowIndex][columnIndex]
            if (typeof piece !== "undefined") {
                diagonal.push(piece)
            }
        }
        // console.log(diagonal)
        diagonals.push(diagonal)
    }

    for (let initialRow = 3; initialRow < 6; initialRow++) {
        // console.log("Starting on row: ", initialRow)
        let diagonal = []

        for (let rowIndex = initialRow, columnIndex = 0; columnIndex < (initialRow + 1); rowIndex--, columnIndex++) {
            // console.log("I found piece: ", `${rowIndex}-${columnIndex}`)
            let piece = board[rowIndex][columnIndex]
            if (typeof piece !== "undefined") {
                diagonal.push(piece)
            }
        }
        // console.log(diagonal)
        diagonals.push(diagonal)
    }

    for (let initialColumn = 0; initialColumn < 3; initialColumn++) {
        // console.log("Starting on column: ", initialColumn)
        let diagonal = []

        for (let rowIndex = 6, columnIndex = initialColumn; columnIndex < 6; rowIndex--, columnIndex++) {
            // console.log("I found piece: ", `${rowIndex}-${columnIndex}`)
            let piece = board[rowIndex][columnIndex]
            if (typeof piece !== "undefined") {
                diagonal.push(piece)
            }
        }
        // console.log(diagonal)
        diagonals.push(diagonal)
    }

    return diagonals
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
        checkArray,
        setState
    }
} else {
    console.log("Running in Browser")
}
