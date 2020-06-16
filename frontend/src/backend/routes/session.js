import express from 'express';
import {
    createUserSession,
    destoryUserSession,
    getUserSession,
} from '../controllers/user.js';

const sessionRouter = express.Router();

sessionRouter.post('', createUserSession);

sessionRouter.delete('', destoryUserSession);

sessionRouter.get('', getUserSession);

export default sessionRouter;
