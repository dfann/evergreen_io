import 'dotenv/config.js';
import { createNewQuestion } from './question';
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
    url: 'http://example.com/',
    isMarkdownDescription: 'false',
    description: 'Test Description',
    isMarkdownSolution: 'true',
    solution: 'Test Solution',
    isMarkdownNotes: 'true',
    notes: 'Test Notes',
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
            session,
        };

        const req = mockRequest(requestOptions);
        const res = mockResponse();

        await createNewQuestion(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        const responseBody = {
            context: {
                invalids: [''],
                key: 'title',
                label: 'title',
                value: '',
            },
            message: '"title" is not allowed to be empty',
            path: ['title'],
            type: 'any.empty',
        };
        expect(res.send).toHaveBeenCalledWith(responseBody);
    });

    it('should require a description', async () => {
        const question = JSON.parse(JSON.stringify(testQuestion));
        delete question.description;

        const requestOptions = {
            body: question,
            session,
        };

        const req = mockRequest(requestOptions);
        const res = mockResponse();

        await createNewQuestion(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        const responseBody = {
            context: {
                invalids: [''],
                key: 'description',
                label: 'description',
                value: '',
            },
            message: '"description" is not allowed to be empty',
            path: ['description'],
            type: 'any.empty',
        };
        expect(res.send).toHaveBeenCalledWith(responseBody);
    });

    it('should require a session', async () => {
        const question = JSON.parse(JSON.stringify(testQuestion));

        const requestOptions = {
            body: question,
        };

        const req = mockRequest(requestOptions);
        const res = mockResponse();

        await createNewQuestion(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        const responseBody = { message: 'No session found' };
        expect(res.send).toHaveBeenCalledWith(responseBody);
    });

    it('should require url to be a valid uri', async () => {
        const question = JSON.parse(JSON.stringify(testQuestion));
        question.url = 'invalid-url';
        const requestOptions = {
            body: question,
            session,
        };

        const req = mockRequest(requestOptions);
        const res = mockResponse();

        await createNewQuestion(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        const responseBody = {
            context: { key: 'url', label: 'url', value: 'invalid-url' },
            message: '"url" must be a valid uri',
            path: ['url'],
            type: 'string.uri',
        };
        expect(res.send).toHaveBeenCalledWith(responseBody);
    });

    it('should require isMarkdownDescription to be boolean', async () => {
        const question = JSON.parse(JSON.stringify(testQuestion));
        question.isMarkdownDescription = 'string';

        const requestOptions = {
            body: question,
            session,
        };

        const req = mockRequest(requestOptions);
        const res = mockResponse();

        await createNewQuestion(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        const responseBody = {
            context: {
                key: 'isMarkdownDescription',
                label: 'isMarkdownDescription',
                value: 'string',
            },
            message: '"isMarkdownDescription" must be a boolean',
            path: ['isMarkdownDescription'],
            type: 'boolean.base',
        };
        expect(res.send).toHaveBeenCalledWith(responseBody);
    });

    it('should sanatize inputs', async () => {
        const question = JSON.parse(JSON.stringify(testQuestion));

        const requestOptions = {
            body: question,
            session,
        };

        const req = mockRequest(requestOptions);
        const res = mockResponse();

        await createNewQuestion(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(question.title);
    });

    it('should attach userId to question', async () => {
        const question = JSON.parse(JSON.stringify(testQuestion));

        const requestOptions = {
            body: question,
            session,
        };

        const req = mockRequest(requestOptions);
        const res = mockResponse();

        await createNewQuestion(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test.todo('IT should attach questions to userid of session to question');

    test.todo('It should require title to be unique');
    test.todo('It should save question');
});
