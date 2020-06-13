import express from 'express';
import { createNewUser } from '../controllers/user.js';
const userRouter = express.Router();
userRouter.post('', createNewUser);
export default userRouter;
