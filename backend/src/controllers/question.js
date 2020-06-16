import Joi from 'joi';
import Question from '../models/Question.js';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;
import { parseError, sanatize } from '../util/helpers.js';
import { newQuestion } from '../joi_validations/question.js';

const createNewQuestion = async (req, res) => {
    try {
        if (!req.session) {
            throw new Error('No session found');
        }
        const question = await _createQuestionObject(req);
        const questionDoc = new Question(question);

        await questionDoc.save();
        const questionModel = questionDoc.toJSON();

        res.status(200).send(questionModel);
    } catch (err) {
        res.status(400).send(parseError(err));
    }
};

const getQuestions = async (req, res) => {
    try {
        if (!req.session) {
            throw new Error('No session found');
        }

        const userId = req.session.user.userId;

        const projection =
            '_id category description isMarkdownDescription isMarkdownNotes isMarkdownSolution notes solution title url userId';
        const questions = await Question.find({ userId }, projection);

        res.status(200).send(questions.map((x) => x.toJSON()));
    } catch (err) {
        res.status(400).send(parseError(err));
    }
};

const updateQuestion = async (req, res) => {
    try {
        if (!req.session) {
            throw new Error('No session found');
        }

        const questionId = req.body._id;

        const questionDoc = await Question.findById(questionId);

        for (const key in req.body) {
            if (key === '_id') {
                continue;
            }
            questionDoc[key] = question[key];
        }

        questionDoc.save();
        res.status(200).send(questionDoc.toJSON());
    } catch (err) {
        res.status(400).send(parseError(err));
    }
};

const _createQuestionObject = async (req) => {
    let {
        title,
        category,
        url,
        isMarkdownDescription,
        description,
        isMarkdownSolution,
        solution,
        isMarkdownNotes,
        notes,
    } = req.body;
    [
        title,
        category,
        url,
        isMarkdownDescription,
        description,
        isMarkdownSolution,
        solution,
        isMarkdownNotes,
        notes,
    ] = sanatize([
        title,
        category,
        url,
        isMarkdownDescription,
        description,
        isMarkdownSolution,
        solution,
        isMarkdownNotes,
        notes,
    ]);
    await Joi.validate(
        {
            title,
            category,
            url,
            isMarkdownDescription,
            description,
            isMarkdownSolution,
            solution,
            isMarkdownNotes,
            notes,
        },
        newQuestion
    );

    const userId = req.session.user.userId;
    const question = {
        userId,
        title,
        category,
        url,
        isMarkdownDescription,
        description,
        isMarkdownSolution,
        solution,
        isMarkdownNotes,
        notes,
    };
    return question;
};

export { createNewQuestion, getQuestions, updateQuestion };
