import { Request, Response, NextFunction } from "express";
import { NotFoundError, UnauthorizedError } from "../error/api-errors";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from "../entity/User";
import { userRepository } from "../repository/userRepository";

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const { token } = req.cookies;

    if(!token) {
        throw new UnauthorizedError('Unauthorized');
    }

    const { id } = jwt.verify(token, process.env.PRIVATE_KEY ?? '') as JwtPayload;

    const user: User | null = await userRepository.findOne({
        where: {
            id: id
        }
    })

    if(!user) {
        throw new NotFoundError('User not found');
    }

    req.user = user;


    next();
}