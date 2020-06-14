import 'dotenv/config.js';
import {
    createNewUser,
    createUserSession,
    destoryUserSession,
    forgotPassword,
    getUserSession,
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
const testQuestion = { 
    title: 'testTitle',
    url: "http://example.com/",
    isMarkdownDescription: true,
    description: "Test Description",
    isMarkdownSolution: true,
    solution: "Test Solution",
    isMarkdownNotes: false,
    notes: "Test Notes",
   };

describe('createNewQuestion', () => {
    let connection; 
    beforeAll(async () => {
        connection = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should require a title', async () => {
        const question = JSON.parse(JSON.stringify(testQuestion));
        delete question.title;
        

        const requestOptions = {
            body: question,
            session
        };

        const req = mockRequest(requestOptions);
        const res = mockResponse();

        await createNewQuestion(req, res);
    });
    test.todo('It should require a description')
    test.todo('It should require a session in requrest')
    test.todo('It should require title to be unique')
    test.todo('It should require url to be url format')
    test.todo('It should sanatize inputs')    
    test.todo('IT should attach questions to userid of session to question')
    test.todo('It should save question')
   
});