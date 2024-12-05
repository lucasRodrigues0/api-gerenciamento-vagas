import express from 'express';
import { abandonApplication, apply, changePhase, createJob, deleteJob, getJobs, searchJobs, updateJob } from '../controller/job-controller';
import { AuthMiddleware } from '../middleware/auth-middleware';

export const jobRouter = express.Router();

jobRouter.use(AuthMiddleware);
jobRouter.post('/create', createJob);
jobRouter.get('/all', getJobs);
//documentar no swagger
jobRouter.get('/:title', searchJobs);
//documentar no swagger
jobRouter.post('/apply', apply);
//documentar no swagger
jobRouter.put('/edit', updateJob);
//documentar no swagger
jobRouter.patch('/phase', changePhase);
//documentar no swagger
//verificar o tipo que essa request deve ser
jobRouter.post('/abandon', abandonApplication);
//documentar no swagger
jobRouter.delete('/delete', deleteJob);