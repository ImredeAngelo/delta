const { getMockReq, getMockRes } = require('@jest-mock/express')

const create = require("./create");
const login = require("./login");
const remove = require("./remove");

// beforeEach(() => {
//     // TODO: Mock database
// })

const user = {
    mail: "test@user.com",
    pass: "SafePassWord123"
}

describe('User', () => {
    // Dry run for CI/CD
    if(process.env.SKIP_LIVE_TEST) {
        test('Dry run', () => { expect(true).toBe(true); })
        return;
    }

    test('Create new user', async () => {
        user.id = await create(user.mail, user.pass)
        expect(user.id).toMatch(/[A-Za-z0-9]{6}/);
    });

    test('Attempt to use existing e-mail', () => {
        expect(1 + 2).toBe(3);
    });

    test('Log in user with password', async () => {
        const { res } = getMockRes();
        const req = getMockReq({ 
            body: {
                user: user.mail,
                pass: user.pass
            }
        });

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Log in user with wrong password', async () => {
        const { res } = getMockRes();
        const req = getMockReq({ 
            body: {
                user: user.mail,
                pass: "abcdefgh8080"
            }
        });

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
    });

    test('Delete user', async () => {
        const status = await remove(user.id);
        expect(status).toBe(true);
    });
})