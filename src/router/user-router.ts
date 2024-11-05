import express from 'express';
import { getUsers } from '../controller/user-controller';

export const userRouter = express.Router();

userRouter.get('/', getUsers);