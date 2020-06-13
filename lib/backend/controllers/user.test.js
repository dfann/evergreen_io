import { createNewUser } from './user';
import mongoose from 'mongoose';
import User from '../models/user';
import { mockResponse, mockRequest } from '../test_util/mock-req-res';
import mail from '../util/mail';
jest.mock('../util/mail');
const testEmail = 'test@email.com';
const testPassword = 'Sup3r@S3cr3t';
const testUsername = 'testUserName';
const userObject = {
    username: 'testUserName',
    email: 'test@email.com',
};
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
            body: {
                email: testEmail,
                password: testPassword,
            },
        };
        const req = mockRequest(requestOptions);
        const res = mockResponse();
        await createNewUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        const responseBody = {
            context: {
                key: 'username',
                label: 'username',
            },
            message: '"username" is required',
            path: ['username'],
            type: 'any.required',
        };
        expect(res.send).toHaveBeenCalledWith(responseBody);
    });
});
