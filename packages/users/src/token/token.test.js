const generate = require("./generate")

describe("JWT Tokens", () => {
    test("Generate valid token", async () => {
        const jwt = await generate("ABCDEF");
        expect(jwt).toMatch(/[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+/);
    })

    // test("Decipher token", async () => {
    //     const uid = "ABCDEF";
    //     const jwt = await generate("ABCDEF");
    //     const id = await verify(uid);
    // }) 
})