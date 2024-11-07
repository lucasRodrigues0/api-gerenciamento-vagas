import express from 'express';
import { createVaga, getVagas, searchVagas } from '../controller/vaga-controller';

export const vagaRouter = express.Router();

//documentar no swagger
vagaRouter.post('/', createVaga);
vagaRouter.get('/vagas', getVagas);
vagaRouter.get('/:titulo', searchVagas);