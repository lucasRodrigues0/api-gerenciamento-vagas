require('dotenv').config();
import 'express-async-errors';
import express from 'express';
import { connect } from './data-source';
import { userRouter } from './router/user-router';
import { authRouter } from './router/auth-router';
import { ErrorMiddleware } from './middleware/error-middleware';
import { vagaRouter } from './router/vaga-router';

const app = express();

const port = process.env.PORT || 3000;

connect();

app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/vaga', vagaRouter);
app.use(ErrorMiddleware);
app.listen(port, () => {
    console.log(`funcionando na porta: ${port}`);
});