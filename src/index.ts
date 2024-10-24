require('dotenv').config();
import 'express-async-errors';
import express from 'express';
import { connect } from './data-source';
import { userRouter } from './router/user-router';

const app = express();

const port = process.env.PORT || 3000;

connect();

app.use(express.json());
app.use('/api/user', userRouter)

app.listen(port, () => {
    console.log(`funcionando na porta: ${port}`);
});