import { AppDataSource } from "../data-source";
import { Vaga } from "../entity/Vaga";

export const vagaRepository = AppDataSource.getRepository(Vaga);