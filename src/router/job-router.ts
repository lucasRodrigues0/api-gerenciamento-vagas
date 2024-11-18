import express from 'express';
import { apply, createJob, getJobs, searchJobs } from '../controller/job-controller';

export const jobRouter = express.Router();

//documentar no swagger
jobRouter.post('/create', createJob);
//documentar no swagger
jobRouter.get('/all', getJobs);
//documentar no swagger
jobRouter.get('/:title', searchJobs);
//documentar no swagger
jobRouter.post('/apply', apply);