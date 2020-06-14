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
    category: 'testCategory',
    url: 'http://example.com/',
    isMarkdownDescription: true,
    description: 'Test Description',
    isMarkdownSolution: true,
    solution: 'Test Solution',
    isMarkdownNotes: false,
    notes: 'Test Notes',
};

const testQuestionModel = {"category": "testCategory","description": "Test Description", "isMarkdownDescription": true, "isMarkdownNotes": false, "isMarkdownSolution": true, "notes": "Test Notes", "solution": "Test Solution", "title": "testTitle", "url": "http://example.com/", "userId": "testSession"}

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
        const responseBody = {"context": {"key": "title", "label": "title"}, "message": "\"title\" is required", "path": ["title"], "type": "any.required"}
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
        expect(res.send).toHaveBeenCalledWith({"context": {"key": "description", "label": "description"}, "message": "\"description\" is required", "path": ["description"], "type": "any.required"});
    });

    it('should require a category', async () => {
        const question = JSON.parse(JSON.stringify(testQuestion));
        delete question.category;

        const requestOptions = {
            body: question,
            session,
        };

        const req = mockRequest(requestOptions);
        const res = mockResponse();

        await createNewQuestion(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        const responseBody = {"context": {"key": "category", "label": "category"}, "message": "\"category\" is required", "path": ["category"], "type": "any.required"};
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

    it('should attach userId to question', async () => {
        const question = JSON.parse(JSON.stringify(testQuestion));

        const requestOptions = {
            body: question,
            session,
        };

        const req = mockRequest(requestOptions);
        const res = mockResponse();

        await createNewQuestion(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(testQuestionModel)
    });    

    describe('saving question', () => {
        afterEach(async () => {
            await User.deleteMany({});
        });

        it('should sanatize inputs', async () => {
            const question = JSON.parse(JSON.stringify(testQuestion));
            question.title = '<img src=x onerror=alert(1)//>';
    
            const requestOptions = {
                body: question,
                session,
            };
    
            const req = mockRequest(requestOptions);
            const res = mockResponse();
    
            await createNewQuestion(req, res);
    
            const questionModel = JSON.parse(JSON.stringify(testQuestionModel));
            questionModel.title = "<img src=\"x\">"
            expect(res.send).toHaveBeenCalledWith(questionModel);
            expect(res.status).toHaveBeenCalledWith(200);
            
        });

        test.todo('It should require title to be unique');
        test.todo('It should save question');
    });

    
});
