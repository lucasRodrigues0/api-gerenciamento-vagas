import { AppDataSource } from "../data-source";
import { Job } from "../entity/Job";

export const jobRepository = AppDataSource.getRepository(Job);