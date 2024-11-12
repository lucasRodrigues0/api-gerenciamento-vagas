import { Request, Response, NextFunction } from "express";
import { Job } from "../entity/Job";
import { UserTypeEnum } from "../entity/enum/UserTypeEnum";
import { BadRequestError, UserNotFoundError } from "../error/api-errors";
import { jobRepository } from "../repository/jobRepository";
import { Phase } from "../entity/enum/Phase";
import { userRepository } from "../repository/userRepository";
import { UserType } from "../types/UserType";
import { Like } from "typeorm";

const formatTitle = (str: string) => {
    const aux = str.split(' ');
    return aux[0].charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const createJob = async (req: Request, res: Response, next: NextFunction) => {

    const { title, description, userId } = req.body;

    const user: UserType | null = await userRepository.findOne({
        where: {
            id: userId
        }
    });

    if (!user) {
        throw new UserNotFoundError('User Not found');
    }

    if (user.type !== UserTypeEnum.RECRUITER) {
        throw new BadRequestError('User not allowed for this operation');
    }

    const job = new Job();
    job.title = formatTitle(title);
    job.description = description;
    job.phase = Phase.OPEN;
    // job.abertura = Date.now();
    job.openBy = userId;

    jobRepository.save(job);

    res.status(201).json({...job});

}

export const getJobs = async (req: Request, res: Response, next: NextFunction) => {

    const jobs: Job[] = await jobRepository.find({
        relations: ["openBy","applications", "applications.user"]
    });

    const filteredJobs = jobs.map(job => {
        const {openBy, applications, ...rest} = job;

        const _applications = applications.map(item => {
            return {
                data: item.date,
                user: {
                    name: item.user.name,
                    email: item.user.email
                }
            }
        })

        const responsible = {
            name: openBy.name,
            email: openBy.email
        };

        return {...rest, responsible, _applications};
    })

    res.status(200).json(filteredJobs);

}

export const searchJobs = async (req: Request, res: Response, next: NextFunction) => {

    const { title } = req.params;

    const list: Job[] = await jobRepository.find({where: {
        title: Like(`%${title}%`)
    }});

    res.status(200).json(list);
}