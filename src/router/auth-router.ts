import express from 'express';
import { checkToken, login, logout, register } from '../controller/auth-controller';
import { AuthMiddleware } from '../middleware/auth-middleware';

export const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/checkToken', AuthMiddleware, checkToken);
