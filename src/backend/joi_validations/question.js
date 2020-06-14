import Joi from 'joi';
const title = Joi.string().required();
const url = Joi.string().uri();
const isMarkdownDescription = Joi.boolean();
const description = Joi.string().required();
const isMarkdownSolution = Joi.boolean();
const solution = Joi.string();
const isMarkdownNotes = Joi.boolean();
const notes = Joi.string();
export const newQuestion = Joi.object().keys({
    title,
    url,
    isMarkdownDescription,
    description,
    isMarkdownSolution,
    solution,
    isMarkdownNotes,
    notes,
});
