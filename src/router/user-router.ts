import express from 'express';
import { getUser, getUsers } from '../controller/user-controller';

export const userRouter = express.Router();

//documentar no swagger
userRouter.get('/all', getUsers);
userRouter.get('/id/:userId', getUser);