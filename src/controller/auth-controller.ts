import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repository/userRepository";
import { UserType } from "../types/user";
import bcrypt from 'bcrypt';
import { BadRequestError } from "../error/api-errors";

export const register = async (req: Request, res: Response, next: NextFunction) => {

    const { nome, email, senha, confSenha, tipo } = req.body;

    const existingUser = await userRepository.find({ where: {
        email: email
    }});

    if(existingUser.length > 0) {
        throw new BadRequestError('Usuário já existe');
    }

    if(senha !== confSenha) {
        throw new BadRequestError('Senhas não coincidem');
    }

    const newUser: UserType = {
        nome,
        email,
        senha: await bcrypt.hash(senha, 10),
        tipo
    }

    userRepository.save(newUser);

    const response = {
        nome,
        email
    }

    res.status(201).json(response);

}