require('dotenv').config();
import 'express-async-errors';
import express from 'express';
import { connect } from './data-source';
import { userRouter } from './router/user-router';
import { authRouter } from './router/auth-router';
import { ErrorMiddleware } from './middleware/error-middleware';
import { jobRouter } from './router/job-router';
import { skillRouter } from './router/skill-router';
import cookieParser from 'cookie-parser';

const app = express();

const port = process.env.PORT || 3000;

connect();

app.use(cookieParser());
app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/job', jobRouter);
app.use('/api/skill', skillRouter);
app.use(ErrorMiddleware);
app.listen(port, () => {
    console.log(`working on port: ${port}`);
});