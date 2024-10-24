import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/User"

export const userRepository = AppDataSource.getRepository(Usuario);