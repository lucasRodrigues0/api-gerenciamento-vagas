import { Candidatura } from "../entity/Candidatura"
import { TipoUsuario } from "../entity/enum/TipoUsuario"
import { Habilidade } from "../entity/Habilidade"
import { Vaga } from "../entity/Vaga"

export type UserType = {
    nome: string,
    email: string,
    senha?: string,
    tipo: TipoUsuario,
    vagas?: Vaga[],
    habilidades?: Habilidade[],
    candidaturas?: Candidatura[]
}