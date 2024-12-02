import express from 'express';
import { abandonApplication, apply, createJob, deleteJob, getJobs, searchJobs, updateJob } from '../controller/job-controller';
import { AuthMiddleware } from '../middleware/auth-middleware';

export const jobRouter = express.Router();

jobRouter.use(AuthMiddleware);
//documentar no swagger
jobRouter.post('/create', createJob);
//documentar no swagger
jobRouter.get('/all', getJobs);
//documentar no swagger
jobRouter.get('/:title', searchJobs);
//documentar no swagger
jobRouter.post('/apply', apply);
//documentar no swagger
jobRouter.put('/edit', updateJob);
//documentar no swagger
//verificar o tipo que essa request deve ser
jobRouter.post('/abandon', abandonApplication);
//documentar no swagger
jobRouter.post('/delete', deleteJob);