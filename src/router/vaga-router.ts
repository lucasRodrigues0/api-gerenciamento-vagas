import express from 'express';
import { createVaga, getVagas } from '../controller/vaga-controller';

export const vagaRouter = express.Router();

//documentar no swagger
vagaRouter.post('/', createVaga);
vagaRouter.get('/vagas', getVagas);