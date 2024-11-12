import express from 'express';
import { createJob, getJobs, searchJobs } from '../controller/job-controller';

export const jobRouter = express.Router();

//documentar no swagger
jobRouter.post('/', createJob);
//documentar no swagger
jobRouter.get('/jobs', getJobs);
//documentar no swagger
jobRouter.get('/:titulo', searchJobs);