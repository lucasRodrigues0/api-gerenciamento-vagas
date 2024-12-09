import { Request, Response, NextFunction } from "express"
import { skillRepository } from "../repository/skillRepository";
import { Skill } from "../entity/Skill";
import { BadRequestError, UnauthorizedError } from "../error/api-errors";
import { UserTypeEnum } from "../entity/enum/UserTypeEnum";

export const createSkill = async (req: Request, res: Response, next: NextFunction) => {

    const loggedUser = req.user;

    const { name } = req.body;
        
    if(loggedUser.type !== UserTypeEnum.ADMIN) {
        throw new UnauthorizedError('User not allowed for this operation');
    }

    const skillAlreadyExists: Skill | null = await skillRepository.findOne({
        where: {
            name: name
        }
    })
    
    if(skillAlreadyExists) {
        throw new BadRequestError('Skill already registered');
    }

    const skill = new Skill();

    skill.name = name;
    
    await skillRepository.save(skill);

    res.status(201).json(skill);
}