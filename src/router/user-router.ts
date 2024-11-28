import express from 'express';
import { addSkill, getUser, getUsers } from '../controller/user-controller';
import { AuthMiddleware } from '../middleware/auth-middleware';

export const userRouter = express.Router();

//documentar no swagger
userRouter.use(AuthMiddleware);
userRouter.get('/all', getUsers);
userRouter.get('/id/:userId', getUser);
userRouter.patch('/skill/add', addSkill);
