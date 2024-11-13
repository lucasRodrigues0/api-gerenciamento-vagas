import { AppDataSource } from "../data-source";
import { Application } from "../entity/Application";

export const applicationRepository = AppDataSource.getRepository(Application);