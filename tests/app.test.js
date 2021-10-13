const { takeTurn } = require("../src/app")

describe("When a turn is taken...", () => {
    test("We want a new piece to be placed at the bottom of the board", () => {

        const state = {
            board: Array(7).fill().map(() => Array(6).fill(null, 0, 6)),
            playerID: 1,
            turnCount: 0,
            winner: null
        }

        const row = 0
        const column = 0

        const expected = {
            board: [
                [null, null, null, null, null, "red"],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null]
            ],
            playerID: -1,
            turnCount: 1,
            winner: null
        }

        const actual = takeTurn(row, column, state)

        expect(actual).toStrictEqual(expected)
    })
})
