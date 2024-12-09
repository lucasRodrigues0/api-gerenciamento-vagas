import express from 'express';
import { abandonApplication, apply, changePhase, createJob, deleteJob, getJobs, searchJobs, updateJob } from '../controller/job-controller';
import { AuthMiddleware } from '../middleware/auth-middleware';

export const jobRouter = express.Router();

jobRouter.use(AuthMiddleware);
jobRouter.post('/create', createJob);
jobRouter.get('/all', getJobs);
jobRouter.get('/:title', searchJobs);
jobRouter.post('/apply', apply);
jobRouter.put('/edit', updateJob);
jobRouter.patch('/phase', changePhase);
jobRouter.post('/abandon', abandonApplication);
jobRouter.delete('/delete', deleteJob);