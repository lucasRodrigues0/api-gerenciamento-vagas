import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repository/userRepository";
import { UserType } from "../types/UserType";
import bcrypt from 'bcrypt';
import { BadRequestError } from "../error/api-errors";

export const register = async (req: Request, res: Response, next: NextFunction) => {

    const { name, email, password, confPassword, type } = req.body;

    const existingUser = await userRepository.find({ where: {
        email: email
    }});

    if(existingUser.length > 0) {
        throw new BadRequestError('User already registered');
    }

    if(password !== confPassword) {
        throw new BadRequestError('Passwords dont match');
    }

    const newUser: UserType = {
        name,
        email,
        password: await bcrypt.hash(password, 10),
        type
    }

    userRepository.save(newUser);

    const response = {
        name,
        email
    }

    res.status(201).json(response);

}