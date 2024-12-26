import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repository/userRepository";
import bcrypt from 'bcrypt';
import { BadRequestError, NotFoundError } from "../error/api-errors";
import { UserRegisterType } from "../types/UserRegisterType";
import { User } from "../entity/User";
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response, next: NextFunction) => {

    const { name, email, password, confPassword, type } = req.body;

    const existingUser = await userRepository.findOne({
        where: {
            email: email
        }
    });

    if (existingUser) {
        throw new BadRequestError('User already registered');
    }

    if (password !== confPassword) {
        throw new BadRequestError('Passwords don\'t match');
    }

    const newUser: UserRegisterType = {
        name,
        email,
        password: await bcrypt.hash(password, 10),
        type
    }

    userRepository.save(newUser);

    res.status(201).json({ message: 'success' });

}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user: User | null = await userRepository.findOne({
        where: {
            email: email
        }
    })

    if (!user) {
        throw new NotFoundError('User Not found');
    }

    const verify: boolean = await bcrypt.compare(password, user.password);

    if (!verify) {
        throw new BadRequestError('Wrong password!');
    }

    const token = jwt.sign(
        { id: user.id },
        process.env.PRIVATE_KEY ?? '',
        { expiresIn: '1w' }
    );

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 4 * 60 * 60 * 1000,
        sameSite: 'strict'
    });

    res.status(200).json({ message: 'success!' });
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: false,
        maxAge: 0,
        sameSite: 'strict'
    });

    res.status(204).send();
}

export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    res.status(204).send();
}