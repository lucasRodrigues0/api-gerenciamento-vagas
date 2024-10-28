import { TipoUsuario } from "../entity/enum/enum-tipo"

export type UserType = {
    nome: string,
    email: string,
    senha?: string,
    tipo: TipoUsuario
}