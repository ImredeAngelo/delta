const generate = require("./generate")

describe("JWT Tokens", () => {
    test("Generate valid token", () => {
        expect(generate("ABCDEF").then(jwt => jwt.toBe({})));
    })
})