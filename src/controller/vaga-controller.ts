import { Request, Response, NextFunction } from "express";
import { Vaga } from "../entity/Vaga";
import { TipoUsuario } from "../entity/enum/TipoUsuario";
import { BadRequestError, UserNotFoundError } from "../error/api-errors";
import { vagaRepository } from "../repository/vagaRepository";
import { Fase } from "../entity/enum/Fase";
import { userRepository } from "../repository/userRepository";
import { UserType } from "../types/UserType";

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
        relations: ["abertaPor","candidaturas"]
    });

    const filteredVagas = vagas.map(vaga => {
        const {abertaPor, ...rest} = vaga;

        const responsavel: UserType = {
            nome: abertaPor.nome,
            email: abertaPor.email,
            tipo: abertaPor.tipo
        };

        return {...rest, responsavel};
    })

    res.status(200).json(filteredVagas);

}