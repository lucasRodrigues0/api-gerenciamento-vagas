import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repository/userRepository";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {

    const users = await userRepository.find({
        relations: ["vagas", "habilidades", "candidaturas", "candidaturas.vaga"]
    });

    const filteredUsers = users.map(user => {
        const { vagas, senha, habilidades, candidaturas, ...rest } = user;
        if(user.tipo === 1) {

            let listaHabilidades = habilidades.map(({nome}) =>  nome); //ver se tem como fazer essa lógica sem isso 

            return {...rest, listaHabilidades, candidaturas};
        }

        if(user.tipo === 2) {
            return {...rest, vagas};
        }

        return {...rest};

    });

    res.status(200).json(filteredUsers);

}