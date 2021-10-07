// initial state
const state = {
    board: Array(6).fill().map(() => Array(7).fill(null, 0, 7)), // generate 2D array of given size
    playerID: 1,
    turnCount: 0,
    winner: null
}
