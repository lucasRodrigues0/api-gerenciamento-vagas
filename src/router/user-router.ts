import express, { NextFunction, Request, Response } from 'express';
import { userRepository } from '../repository/userRepository';
import { UserType } from '../types/user';

export const userRouter = express.Router();

userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {

    const users: UserType[]= await userRepository.find({where: {
        "tipo": 1
    }});

    res.status(200).json(users);
});