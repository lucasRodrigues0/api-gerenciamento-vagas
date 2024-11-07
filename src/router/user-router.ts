import express from 'express';
import { getUsers } from '../controller/user-controller';

export const userRouter = express.Router();

//documentar no swagger
userRouter.get('/', getUsers);