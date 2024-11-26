import express from 'express';
import { createSkill } from '../controller/skill-controller';

export const skillRouter = express.Router();

skillRouter.post('/create', createSkill);