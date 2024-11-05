import express from 'express';
import { createVaga } from '../controller/vaga-controller';

export const vagaRouter = express.Router();

//documentar no swagger
vagaRouter.post('/', createVaga);