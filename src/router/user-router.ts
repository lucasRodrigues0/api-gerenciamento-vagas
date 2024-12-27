import express from 'express';
import { addSkill, getUser, getUsers, loadUser } from '../controller/user-controller';
import { AuthMiddleware } from '../middleware/auth-middleware';

export const userRouter = express.Router();

userRouter.use(AuthMiddleware);
// incluir no swagger
userRouter.get('/', loadUser);
userRouter.get('/all', getUsers);
userRouter.get('/id/:userId', getUser);
userRouter.patch('/skill/add', addSkill);
