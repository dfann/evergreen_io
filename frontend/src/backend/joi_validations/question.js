import Joi from 'joi';
const title = Joi.string().required();
const category = Joi.string().required();
const url = Joi.string().allow('').uri();
const isMarkdownDescription = Joi.boolean();
const description = Joi.string().required();
const isMarkdownSolution = Joi.boolean();
const solution = Joi.string().allow('');
const isMarkdownNotes = Joi.boolean();
const notes = Joi.string().allow('');
export const newQuestion = Joi.object().keys({
    title,
    category,
    url,
    isMarkdownDescription,
    description,
    isMarkdownSolution,
    solution,
    isMarkdownNotes,
    notes,
});
