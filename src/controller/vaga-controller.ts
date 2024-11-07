import { Request, Response, NextFunction } from "express";
import { Vaga } from "../entity/Vaga";
import { TipoUsuario } from "../entity/enum/TipoUsuario";
import { BadRequestError, UserNotFoundError } from "../error/api-errors";
import { vagaRepository } from "../repository/vagaRepository";
import { Fase } from "../entity/enum/Fase";
import { userRepository } from "../repository/userRepository";
import { UserType } from "../types/UserType";
import { Candidatura } from "../entity/Candidatura";
import { Like } from "typeorm";

export const createVaga = async (req: Request, res: Response, next: NextFunction) => {

    const { titulo, descricao, usuarioId } = req.body;

    const user: UserType | null = await userRepository.findOne({
        where: {
            id: usuarioId
        }
    });

    if (!user) {
        throw new UserNotFoundError('usuário não encontrado');
    }
    if (user.tipo !== TipoUsuario.RECRUTADOR) {
        throw new BadRequestError('Tipo de usuário não permitido para operação');
    }

    const vaga = new Vaga();
    vaga.titulo = titulo;
    vaga.descricao = descricao;
    vaga.fase = Fase.ABERTA;
    // vaga.abertura = Date.now();
    vaga.abertaPor = usuarioId;

    vagaRepository.save(vaga);

    res.status(201).json({vaga});

}

export const getVagas = async (req: Request, res: Response, next: NextFunction) => {

    const vagas: Vaga[] = await vagaRepository.find({
        relations: ["abertaPor","candidaturas", "candidaturas.usuario"]
    });

    const filteredVagas = vagas.map(vaga => {
        const {abertaPor, candidaturas, ...rest} = vaga;

        const aplicacoes = candidaturas.map(item => {
            return {
                data: item.data,
                usuario: {
                    nome: item.usuario.nome,
                    email: item.usuario.email
                }
            }
        })

        const responsavel = {
            nome: abertaPor.nome,
            email: abertaPor.email
        };

        return {...rest, responsavel, aplicacoes};
    })

    res.status(200).json(filteredVagas);

}

export const searchVagas = async (req: Request, res: Response, next: NextFunction) => {

    const { titulo } = req.params;

    const list: Vaga[] = await vagaRepository.find({where: {
        titulo: Like(`%${titulo}%`)
    }});

    res.status(200).json(list);
}