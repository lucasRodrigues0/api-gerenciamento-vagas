import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repository/userRepository";
import { UserTypeEnum } from "../entity/enum/UserTypeEnum";
import { NotFoundError, UnauthorizedError } from "../error/api-errors";
import { User } from "../entity/User";
import { skillRepository } from "../repository/skillRepository";
import { Skill } from "../entity/Skill";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {

    const loggedUser = req.user;

    if(loggedUser.type !== UserTypeEnum.ADMIN) {
        throw new UnauthorizedError('User not allowed for this operation');
    }

    const users: User[] = await userRepository.find({
        relations: ["jobs", "skills", "applications", "applications.job"]
    });

    const filteredUsers = users.map(user => {

        const { jobs, password, skills, applications, ...rest } = user;

        if (user.type === UserTypeEnum.CANDIDATE) {

            let _skills = skills.map(({ name }) => name);

            return { ...rest, _skills, applications };
        }

        if (user.type === UserTypeEnum.RECRUITER) {
            return { ...rest, jobs };
        }

        //user.type === UserTypeEnum.ADMIN
        return { ...rest };

    });

    res.status(200).json(filteredUsers);

}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {

    const { userId } = req.params;

    const user = await userRepository.findOne({
        where: {
            id: Number(userId)
        }, relations: ['applications', 'applications.job', 'jobs', 'skills']
    });

    if (!user) {
        throw new NotFoundError('User not found');
    }

    const { password, jobs, applications, skills, ...rest } = user;

    let filteredUser = {};

    if (user.type === UserTypeEnum.CANDIDATE) {
        let _skills = skills.map(({ name }) => name);
        filteredUser = {
            ...rest, _skills, applications
        }
    }
    else if (user.type === UserTypeEnum.RECRUITER) {
        filteredUser = {
            ...rest, jobs
        }
    }
    else {
        filteredUser = {
            ...rest
        }
    }

    return res.status(200).json(filteredUser);
}

export const addSkill = async (req: Request, res: Response, next: NextFunction) => {

    const loggedUser = req.user;

    const { skillId } = req.body;

    const user: User | null = await userRepository.findOne({
        where: {
            id: loggedUser.id
        },
        relations: ["skills"]
    });

    if (!user) {
        throw new NotFoundError('User not found');
    }

    if (loggedUser.type !== UserTypeEnum.CANDIDATE) {
        throw new UnauthorizedError('User not allowed for this operation');
    }

    const skill: Skill | null = await skillRepository.findOne({
        where: {
            id: skillId
        }
    });

    if (!skill) {
        throw new NotFoundError('Skill not found');
    }

    user.skills.push(skill);

    await userRepository.update(user.id, user);

    res.status(200).json({message: 'success'});

}