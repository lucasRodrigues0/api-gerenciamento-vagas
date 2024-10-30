import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario"

export const userRepository = AppDataSource.getRepository(Usuario);