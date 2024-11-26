import { AppDataSource } from "../data-source";
import { Skill } from "../entity/Skill";

export const skillRepository = AppDataSource.getRepository(Skill);