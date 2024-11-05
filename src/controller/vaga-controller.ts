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