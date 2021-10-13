const { checkArray } = require("../src/app")

describe("When we check an array for a winner", () => {
    test("can find red won", () => {

        const array = [null, null, "red", "red", "red", "red"]

        const expected = "red"

        const actual = checkArray(array)

        expect(actual).toBe(expected)
    })

    test("can find yellow won", () => {

        const array = [null, null, "yellow", "yellow", "yellow", "yellow"]

        const expected = "yellow"

        const actual = checkArray(array)

        expect(actual).toBe(expected)
    })

    test("can recognise when there's a gap between 4 in a row", () => {

        const array = [null, "red", "red", null, "red", "red"]

        const expected = null

        const actual = checkArray(array)

        expect(actual).toBe(expected)
    })
})
