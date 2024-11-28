import express from 'express';
import { createSkill } from '../controller/skill-controller';
import { AuthMiddleware } from '../middleware/auth-middleware';

export const skillRouter = express.Router();

skillRouter.use(AuthMiddleware);
skillRouter.post('/create', createSkill);