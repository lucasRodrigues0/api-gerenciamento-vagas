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
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json';

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => {
    console.log(`working on port: ${port}`);
});