import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repository/userRepository";
import bcrypt from 'bcrypt';
import { BadRequestError } from "../error/api-errors";
import { UserRegisterType } from "../types/UserRegisterType";

export const register = async (req: Request, res: Response, next: NextFunction) => {

    const { name, email, password, confPassword, type } = req.body;

    const existingUser = await userRepository.findOne({ where: {
        email: email
    }});

    if(existingUser) {
        throw new BadRequestError('User already registered');
    }

    if(password !== confPassword) {
        throw new BadRequestError('Passwords don\'t match');
    }

    const newUser: UserRegisterType = {
        name,
        email,
        password: await bcrypt.hash(password, 10),
        type
    }

    userRepository.save(newUser);

    res.status(201).json({message: 'success'});

}