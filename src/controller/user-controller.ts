import { Request, Response, NextFunction } from "express"
import { userRepository } from "../repository/userRepository"
import { UserType } from "../types/user"

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {

    const users = await userRepository.find();

    const filteredUsers: UserType[] = users.map(user => ({
        nome: user.nome,
        email: user.email,
        tipo: user.tipo,
    }))

    res.status(200).json(filteredUsers);

}