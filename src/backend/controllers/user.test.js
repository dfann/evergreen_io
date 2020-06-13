import 'dotenv/config.js';
import {
    createNewUser,
    createUserSession,
    destoryUserSession,
    forgotPassword,
} from './user';
import mongoose from 'mongoose';
import User from '../models/user';
import { mockResponse, mockRequest } from '../test_util/mock-req-res.js';
import mail from '../util/mail';

jest.mock('../util/mail');

const testEmail = 'test@email.com';
const testPassword = 'Sup3r@S3cr3t';
const testUsername = 'testUserName';
const userObject = {
    username: 'testUserName',
    email: 'test@email.com',
};
const session = { userId: 'testSession', username: testUsername };

describe('createNewUser', () => {
    let connection;

    beforeAll(async () => {
        connection = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should require a username', async () => {
        const requestOptions = {
            body: { email: testEmail, password: testPassword },
        };
        const req = mockRequest(requestOptions);
        const res = mockResponse();

        await createNewUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        const responseBody = {
            context: { key: 'username', label: 'username' },
            message: '"username" is required',
            path: ['username'],
            type: 'any.required',
        };
        expect(res.send).toHaveBeenCalledWith(responseBody);
    });

    it('should require a email', async () => {
        const requestOptions = {
            body: { username: testUsername, password: testPassword },
        };
        const req = mockRequest(requestOptions);
        const res = mockResponse();

        await createNewUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        const responseBody = {
            context: { key: 'email', label: 'email' },
            message: '"email" is required',
            path: ['email'],
            type: 'any.required',
        };
        expect(res.send).toHaveBeenCalledWith(responseBody);
    });

    it('should require a password', async () => {
        const requestOptions = {
            body: { email: testEmail, username: testUsername },
        };
        const req = mockRequest(requestOptions);
        const res = mockResponse();

        await createNewUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        const responseBody = {
            context: { key: 'password', label: 'password' },
            message: '"password" is required',
            path: ['password'],
            type: 'any.required',
        };
        expect(res.send).toHaveBeenCalledWith(responseBody);
    });

    it('shuold require correct email format', async () => {
        const requestOptions = {
            body: {
                email: 'testEmail',
                username: testUsername,
                password: testPassword,
            },
        };

        const req = mockRequest(requestOptions);
        const res = mockResponse();

        await createNewUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        const responseBody = {
            context: { key: 'email', label: 'email', value: 'testEmail' },
            message: '"email" must be a valid email',
            path: ['email'],
            type: 'string.email',
        };
        expect(res.send).toHaveBeenCalledWith(responseBody);
    });

    it('shuold require correct password format', async () => {
        const requestOptions = {
            body: {
                email: testEmail,
                username: testUsername,
                password: testPassword,
            },
        };
        const responseBody = {
            context: {
                key: 'password',
                label: 'password',
                name: undefined,
                pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                value: 'test-password',
            },
            message:
                '"password" must be between 6-16 characters, have at least one capital letter, one lowercase letter, one digit, and one special character',
            path: ['password'],
            type: 'string.regex.base',
        };
        const req = mockRequest(requestOptions);

        //6-16 characters
        const tooSmall = 'a';
        requestOptions.body.password = tooSmall;
        responseBody.context.value = tooSmall;
        let res = mockResponse();
        await createNewUser(req, res);
        expect(res.send).toHaveBeenCalledWith(responseBody);

        const tooLong = 'abcdefghijklmnopqrstuvwxyz';
        requestOptions.body.password = tooLong;
        responseBody.context.value = tooLong;
        res = mockResponse();
        await createNewUser(req, res);
        expect(res.send).toHaveBeenCalledWith(responseBody);

        //one capital letter
        const lowerCase = 'abcdefghijk';
        requestOptions.body.password = lowerCase;
        responseBody.context.value = lowerCase;
        res = mockResponse();
        await createNewUser(req, res);
        expect(res.send).toHaveBeenCalledWith(responseBody);

        // one lowercase letter
        const upperCase = 'ABCDEFGHIJK';
        requestOptions.body.password = upperCase;
        responseBody.context.value = upperCase;
        res = mockResponse();
        await createNewUser(req, res);
        expect(res.send).toHaveBeenCalledWith(responseBody);

        // one digit
        const allLetters = 'abcdefghijk';
        requestOptions.body.password = allLetters;
        responseBody.context.value = allLetters;
        res = mockResponse();
        await createNewUser(req, res);
        expect(res.send).toHaveBeenCalledWith(responseBody);

        // one special character
        const noSepcialCharacters = 'abcdefghijk';
        requestOptions.body.password = noSepcialCharacters;
        responseBody.context.value = noSepcialCharacters;
        res = mockResponse();
        await createNewUser(req, res);
        expect(res.send).toHaveBeenCalledWith(responseBody);
    });

    describe('saving user', () => {
        afterEach(async () => {
            await User.deleteMany({});
        });

        it('shuold save new user to database', async () => {
            const requestOptions = {
                body: {
                    email: testEmail,
                    username: testUsername,
                    password: testPassword,
                },
                session: {},
            };

            const req = mockRequest(requestOptions);
            const res = mockResponse();

            await createNewUser(req, res);

            const user = await User.find(
                { email: testEmail },
                '-_id username email'
            );

            expect(user).toHaveLength(1);
            expect(user[0].toJSON()).toEqual(userObject);
        });

        it('shuold return session for user', async () => {
            const requestOptions = {
                body: {
                    email: testEmail,
                    username: testUsername,
                    password: testPassword,
                },
                session: { user: 'test' },
            };

            const req = mockRequest(requestOptions);
            const res = mockResponse();

            await createNewUser(req, res);

            const session = req.session.user;
            expect(session).toHaveProperty('userId');
            expect(session).toHaveProperty('username', testUsername);
            expect(res.send).toHaveBeenCalledWith(req.session.user);
        });

        it('should require unique username', async () => {
            const requestOptions = {
                body: {
                    email: testEmail,
                    username: testUsername,
                    password: testPassword,
                },
                session: {},
            };

            let req = mockRequest(requestOptions);
            let res = mockResponse();
            await createNewUser(req, res);

            requestOptions.body.email = 'uniqueEmail@email.com';
            req = mockRequest(requestOptions);
            res = mockResponse();
            await createNewUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({
                message:
                    'User validation failed: username: Username already exists',
            });
        });

        it('should require unique email', async () => {
            const requestOptions = {
                body: {
                    email: testEmail,
                    username: testUsername,
                    password: testPassword,
                },
                session: {},
            };

            let req = mockRequest(requestOptions);
            let res = mockResponse();
            await createNewUser(req, res);

            requestOptions.body.username = 'uniqueUsername';
            req = mockRequest(requestOptions);
            res = mockResponse();
            await createNewUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({
                message: 'User validation failed: email: Email already exists',
            });
        });
    });
});

describe('createUserSession', () => {
    let connection;

    beforeAll(async () => {
        connection = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should require user to exist', async () => {
        const requestOptions = {
            body: {
                email: testEmail,
                password: testPassword,
            },
            session: {},
        };

        const req = mockRequest(requestOptions);
        const res = mockResponse();

        await createUserSession(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith(
            '{"mesage":"Invalid login credentials"}'
        );
    });

    describe('with user', () => {
        afterEach(async () => {
            await User.deleteMany({});
        });

        it('should require password to be correct', async () => {
            let user = await new User({
                username: testUsername,
                email: testEmail,
                password: testPassword,
            });
            await user.save();

            const requestOptions = {
                body: {
                    email: testEmail,
                    password: testPassword + 'w',
                },
                session: {},
            };

            const req = mockRequest(requestOptions);
            const res = mockResponse();

            await createUserSession(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.send).toHaveBeenCalledWith(
                '{"mesage":"Invalid login credentials"}'
            );
        });

        it('should set userSession in request', async () => {
            let user = await new User({
                username: testUsername,
                email: testEmail,
                password: testPassword,
            });
            await user.save();

            const requestOptions = {
                body: {
                    email: testEmail,
                    password: testPassword,
                },
                session: {},
            };

            const req = mockRequest(requestOptions);
            const res = mockResponse();

            await createUserSession(req, res);

            expect(req.session).toHaveProperty('user');
            expect(req.session.user).toHaveProperty('userId');
            expect(req.session.user.username).toEqual(testUsername);
        });

        it('should send userSession', async () => {
            let user = await new User({
                username: testUsername,
                email: testEmail,
                password: testPassword,
            });
            await user.save();

            const requestOptions = {
                body: {
                    email: testEmail,
                    password: testPassword,
                },
                session: {},
            };

            const req = mockRequest(requestOptions);
            const res = mockResponse();

            await createUserSession(req, res);

            expect(res.send).toHaveBeenCalledWith(req.session.user);
        });
    });
});

describe('destoryUserSession', () => {
    it('should require user session to exist', async () => {
        const requestOptions = {};
        const req = mockRequest(requestOptions);
        const res = mockResponse();

        destoryUserSession(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.send).toHaveBeenCalledWith({
            message: 'Something went wrong',
        });
    });

    test.todo('it should destory user session');

    test.todo('it should clear cookies');

    test.todo('it should send userSession');
});

describe('getUserSession', () => {
    test.todo('it should send userSession');
});

describe('forgotPassword', () => {
    let connection;

    beforeAll(async () => {
        connection = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await User.deleteMany({});
    });

    it('it should require user to exist', async () => {
        const requestOptions = { body: { email: testEmail } };
        const req = mockRequest(requestOptions);
        const res = mockResponse();

        await forgotPassword(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            message: 'A reset link has been sent to the given email address.',
        });
    });

    it('it should set reset token and expiry on user', async () => {
        let user = await new User({
            username: testUsername,
            email: testEmail,
            password: testPassword,
        });
        mail.send.mockReturnValueOnce();
        await user.save();

        const requestOptions = { body: { email: testEmail } };
        const req = mockRequest(requestOptions);
        const res = mockResponse();

        await forgotPassword(req, res);

        user = await User.findOne({ email: testEmail });

        expect(user.resetPasswordExpires).not.toBeNull();
        expect(user.resetPasswordToken).not.toBeNull();
    });

    it('it should send an email', async () => {
        let user = await new User({
            username: testUsername,
            email: testEmail,
            password: testPassword,
        });

        mail.send.mockReturnValueOnce();
        await user.save();

        const requestOptions = { body: { email: testEmail } };
        const req = mockRequest(requestOptions);
        const res = mockResponse();

        await forgotPassword(req, res);

        expect(mail.send).toHaveBeenCalled();
    });
});
