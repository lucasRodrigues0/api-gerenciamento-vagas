import express from 'express';
import { login, logout, register } from '../controller/auth-controller';

export const authRouter = express.Router();

authRouter.post('/register', register);
//documentar no swagger
authRouter.post('/login', login);
//documentar no swagger
authRouter.post('/logout', logout);