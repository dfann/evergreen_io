import Joi from 'joi';
import { parseError, sanatize } from '../util/helpers.js';
import { newQuestion } from '../joi_validations/question.js';

const createNewQuestion = async (req, res) => {
    try {
        if (!req.session) {
            throw new Error('No session found');
        }
        const question = await _createQuestionObject(req);
        res.status(200).send(question);
    } catch (err) {
        res.status(400).send(parseError(err));
    }
};

const _createQuestionObject = async (req) => {
    let {
        title,
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
        url,
        isMarkdownDescription,
        description,
        isMarkdownSolution,
        solution,
        isMarkdownNotes,
        notes,
    ] = sanatize([
        title,
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
    const userId = req.session.userId;
    const question = {
        userId,
        title,
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

export { createNewQuestion };
