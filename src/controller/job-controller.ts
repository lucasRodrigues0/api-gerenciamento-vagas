import { Request, Response, NextFunction } from "express";
import { Job } from "../entity/Job";
import { UserTypeEnum } from "../entity/enum/UserTypeEnum";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../error/api-errors";
import { jobRepository } from "../repository/jobRepository";
import { Phase } from "../entity/enum/Phase";
import { userRepository } from "../repository/userRepository";
import { Like } from "typeorm";
import { Application } from "../entity/Application";
import { User } from "../entity/User";
import { applicationRepository } from "../repository/applicationRepository";

const formatTitle = (str: string) => {
    const aux = str.split(' ');
    return aux[0].charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const createJob = async (req: Request, res: Response, next: NextFunction) => {

    const loggedUser = req.user;

    const { title, description, salary, location, model } = req.body;

    if (loggedUser.type !== UserTypeEnum.RECRUITER && loggedUser.type !== UserTypeEnum.ADMIN) {
        throw new UnauthorizedError('User not allowed for this operation');
    }

    const user: User | null = await userRepository.findOne({
        where: {
            id: loggedUser.id
        }
    });

    if (!user) {
        throw new NotFoundError('User Not found');
    }

    const job = new Job();
    job.title = formatTitle(title);
    job.description = description;
    job.phase = Phase.OPEN;
    job.model = model;
    job.salary = salary;
    job.openingDate = new Date();
    job.location = location;
    job.openBy = user;

    await jobRepository.save(job);

    res.status(201).json({ message: 'success' });

}

export const getJobs = async (req: Request, res: Response, next: NextFunction) => {

    const loggedUser = req.user;

    const jobs: Job[] = await jobRepository.find({
        relations: ["openBy", "applications", "applications.user"]
    });

    const filteredJobs = jobs.map(job => {
        const { openBy, applications, ...rest } = job;

        const _applications = applications.map(item => {
            return {
                data: item.date,
                user: {
                    name: item.user.name,
                    email: item.user.email
                }
            }
        });

        const responsible = {
            name: openBy.name,
            email: openBy.email
        };

        return loggedUser.type === UserTypeEnum.CANDIDATE ? { ...rest, responsible } : { ...rest, responsible, _applications };
    })

    res.status(200).json(filteredJobs);

}

export const searchJobs = async (req: Request, res: Response, next: NextFunction) => {

    const { title } = req.params;

    const list: Job[] = await jobRepository.find({
        where: {
            title: Like(`%${formatTitle(title)}%`)
        }
    });

    res.status(200).json(list);
}

export const apply = async (req: Request, res: Response, next: NextFunction) => {

    const loggedUser = req.user;

    const { jobId } = req.body;

    if (loggedUser.type !== UserTypeEnum.CANDIDATE) {
        throw new UnauthorizedError('User not allowed for this operation');
    }

    const user: User | null = await userRepository.findOne({
        where: {
            id: loggedUser.id
        }
    });

    if (!user) {
        throw new NotFoundError('User Not found');
    }

    const job: Job | null = await jobRepository.findOne({
        where: {
            id: jobId
        }, relations: ['applications', 'applications.user']
    });

    if (!job) {
        throw new NotFoundError('Job Not found');
    }

    if (job.applications.filter(name => name.user.name === user.name).length > 0) {
        throw new BadRequestError('User already applied for this job');
    }

    if(job.phase !== Phase.OPEN) {
        throw new BadRequestError('No longer possible to apply to this job');
    }

    const application = new Application();

    application.user = user;
    application.job = job;
    application.date = new Date();

    const response = {
        candidate: {
            id: user.id,
            name: user.name,
            email: user.email
        },
        job: {
            id: job.id,
            title: job.title,
            description: job.description,
        },
        date: null
    }

    await applicationRepository.save(application);

    res.status(200).json(response);

}

export const updateJob = async (req: Request, res: Response, next: NextFunction) => {

    const loggedUser = req.user;

    const { id, title, description, model, salary, location } = req.body;

    if (!loggedUser) {
        throw new UnauthorizedError('Unauthorized');
    }

    if (loggedUser.type !== UserTypeEnum.ADMIN && loggedUser.type !== UserTypeEnum.RECRUITER) {
        throw new UnauthorizedError('User not allowed for this operation');
    }

    const job: Job | null = await jobRepository.findOne({
        where: {
            id: id
        }
    });

    if (!job) {
        throw new NotFoundError('Job not found');
    }

    job.title = title;
    job.description = description;
    job.model = model;
    job.salary = salary;
    job.location = location;

    await jobRepository.update(id, job);

    res.status(200).json({
        message: 'success'
    })

}

export const changePhase = async (req: Request, res: Response, next: NextFunction) => {

    const loggedUser = req.user;

    const { jobId, phase } = req.body;

    if(loggedUser.type !== UserTypeEnum.RECRUITER) {
        throw new UnauthorizedError('User not allowed for this operation');
    }

    const job: Job | null = await jobRepository.findOne({
        where: {
            id: jobId
        }
    });

    if(!job) {
        throw new NotFoundError('Job not found');
    }

    job.phase = phase;

    await jobRepository.update(jobId, job);

    res.status(200).json({message: 'success'});

}

export const abandonApplication = async (req: Request, res: Response, next: NextFunction) => {

    const loggedUser = req.user;

    const { jobId } = req.body;

    if (loggedUser.type !== UserTypeEnum.CANDIDATE) {
        throw new UnauthorizedError('User not allowed for this operation');
    }

    const job: Job | null = await jobRepository.findOne({
        where: {
            id: jobId
        }
    })

    if (!job) {
        throw new NotFoundError('Job not found');
    }

    const application: Application | null = await applicationRepository.findOne({
        where: {
            job: job,
            user: loggedUser
        }
    })

    if (!application) {
        throw new NotFoundError('application not found');
    }

    await applicationRepository.delete(application.id);

    res.status(200).json({ message: 'success' });

}

export const deleteJob = async (req: Request, res: Response, next: NextFunction) => {

    const loggedUser = req.user;

    const { jobId } = req.body;

    if (loggedUser.type !== UserTypeEnum.ADMIN) {
        throw new UnauthorizedError('User not allowed for this operation');
    }

    const job: Job | null = await jobRepository.findOne({
        where: {
            id: jobId
        }, relations: ["applications"]
    });

    if (!job) {
        throw new NotFoundError('Job not found');
    }

    if (job.applications.length > 0) {
        throw new BadRequestError('Cannot delete a job once there are candidates applying');
    }

    await jobRepository.delete(jobId);

    res.status(200).json({ message: 'success' });

}