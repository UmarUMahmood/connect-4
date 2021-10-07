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

        return state
    } else {
        console.log("Column is full or winner has been called.")
        return state
    }
}




if (typeof exports === 'object') {
    console.log("Running in Node")
    module.exports = {
        takeTurn
    }
} else {
    console.log("Running in Browser")
}
