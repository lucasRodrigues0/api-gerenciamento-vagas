import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repository/userRepository";
import { UserType } from "../types/user";
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response, next: NextFunction) => {

    const { nome, email, senha, confSenha, tipo } = req.body;

    // const newUser: UserType = {
    //     nome,
    //     email,
    //     senha: await bcrypt.hash(senha, 10),
    //     tipo
    // }



}