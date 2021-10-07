// initial state
const state = {
    board: Array(7).fill().map(() => Array(6).fill(null, 0, 6)), // generate 2D array of given size
    playerID: 1,
    turnCount: 0,
    winner: null
}
