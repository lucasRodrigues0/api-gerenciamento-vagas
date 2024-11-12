import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repository/userRepository";
import { UserTypeEnum } from "../entity/enum/UserTypeEnum";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {

    const users = await userRepository.find({
        relations: ["jobs", "skills", "candidaturas", "candidaturas.job"]
    });

    const filteredUsers = users.map(user => {

        const { jobs, password, skills, applications, ...rest } = user;
        
        if(user.type === UserTypeEnum.CANDIDATE) {

            let skillList = skills.map(({name}) =>  name);

            return {...rest, skillList, applications};
        }

        if(user.type === UserTypeEnum.RECRUITER) {
            return {...rest, jobs};
        }

        //user.type === UserTypeEnum.ADMIN
        return {...rest};

    });

    res.status(200).json(filteredUsers);

}