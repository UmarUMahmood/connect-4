const { takeTurn } = require("../src/app")

describe("When we place a piece...", () => {
    test("in an empty column, it's placed at the bottom", () => {

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

    test("in a column where a piece has been placed, the new piece is placed above", () => {
        const state = {
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

        const row = 0
        const column = 0

        const expected = {
            board: [
                [null, null, null, null, "yellow", "red"],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null]
            ],
            playerID: 1,
            turnCount: 2,
            winner: null
        }

        const actual = takeTurn(row, column, state)

        expect(actual).toStrictEqual(expected)
    })

    test("in a full column, nothing changes to the state", () => {
        const state = {
            board: [
                ["yellow", "red", "yellow", "red", "yellow", "red"],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null]
            ],
            playerID: 1,
            turnCount: 6,
            winner: null
        }

        const row = 0
        const column = 0

        const expected = {
            board: [
                ["yellow", "red", "yellow", "red", "yellow", "red"],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null]
            ],
            playerID: 1,
            turnCount: 6,
            winner: null
        }

        const actual = takeTurn(row, column, state)

        expect(actual).toStrictEqual(expected)
    })

    test("after a winner has already been declared, the state is not changed", () => {
        const state = {
            board: [
                [null, null, "red", "red", "red", "red"],
                [null, null, null, "yellow", "yellow", "yellow"],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null]
            ],
            playerID: -1,
            turnCount: 7,
            winner: "red"
        }

        const row = 0
        const column = 0

        const expected = {
            board: [
                [null, null, "red", "red", "red", "red"],
                [null, null, null, "yellow", "yellow", "yellow"],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null]
            ],
            playerID: -1,
            turnCount: 7,
            winner: "red"
        }

        const actual = takeTurn(row, column, state)

        expect(actual).toStrictEqual(expected)
    })
})
