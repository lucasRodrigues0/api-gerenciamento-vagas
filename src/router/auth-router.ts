import express from 'express';
import { register } from '../controller/auth-controller';

export const authRouter = express.Router();

//documentar no swagger
authRouter.post('/register', register);