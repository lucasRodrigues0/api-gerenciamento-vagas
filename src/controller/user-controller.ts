import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repository/userRepository";
import { TipoUsuario } from "../entity/enum/TipoUsuario";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {

    const users = await userRepository.find({
        relations: ["vagas", "habilidades", "candidaturas", "candidaturas.vaga"]
    });

    const filteredUsers = users.map(user => {
        const { vagas, senha, habilidades, candidaturas, ...rest } = user;
        if(user.tipo === TipoUsuario.CANDIDATO) {

            let listaHabilidades = habilidades.map(({nome}) =>  nome);

            return {...rest, listaHabilidades, candidaturas};
        }

        if(user.tipo === TipoUsuario.RECRUTADOR) {
            return {...rest, vagas};
        }

        //user.tipo === TipoUsuario.ADMIN
        return {...rest};

    });

    res.status(200).json(filteredUsers);

}