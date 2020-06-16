import express from 'express';
import { createNewQuestion } from '../controllers/question.js';

const questionRouter = express.Router();
questionRouter.post('', createNewQuestion);

export default questionRouter;
