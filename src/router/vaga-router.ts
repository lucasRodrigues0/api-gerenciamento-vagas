import express from 'express';
import { createVaga, getVagas, searchVagas } from '../controller/vaga-controller';

export const vagaRouter = express.Router();

//documentar no swagger
vagaRouter.post('/', createVaga);
//documentar no swagger
vagaRouter.get('/vagas', getVagas);
//documentar no swagger
vagaRouter.get('/:titulo', searchVagas);