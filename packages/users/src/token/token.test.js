const generate = require("./generate")
const verify = require("./verify")

const user = {
    id:"ABCDEF"
}

describe("JWT Tokens", () => {
    test("Generate valid JWT token", async () => {
        const jwt = await generate(user);
        expect(jwt).toMatch(/[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+/);
    })

    test('Verify valid JWT token', async () => {
        const token = await generate(user);
        const verified = await verify(token);

        expect(verified.payload).toBeDefined();
        expect(verified.payload.id).toBe(user.id);
    })

    test('Reject invalid JWT token', async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
        expect(verify(token)).rejects.toEqual("Verficiation failed");
    })
})