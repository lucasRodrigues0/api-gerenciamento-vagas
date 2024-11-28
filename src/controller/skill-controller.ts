import { Request, Response, NextFunction } from "express"
import { skillRepository } from "../repository/skillRepository";
import { Skill } from "../entity/Skill";
import { userRepository } from "../repository/userRepository";
import { User } from "../entity/User";
import { BadRequestError, NotFoundError } from "../error/api-errors";


export const createSkill = async (req: Request, res: Response, next: NextFunction) => {

    const { name, userId } = req.body;

    const user: User | null = await userRepository.findOne({
        where: {
            id: userId
        }
    });

    const skillAlreadyExists: Skill | null = await skillRepository.findOne({
        where: {
            name: name
        }
    })
    
    if(!user) {
        throw new NotFoundError('User not found');
    }
    
    if(user.type !== 'admin') {
        throw new BadRequestError('User not allowed for this operation');
    }
    
    if(skillAlreadyExists) {
        throw new BadRequestError('Skill already registered');
    }

    const skill = new Skill();

    skill.name = name;
    
    await skillRepository.save(skill);

    res.status(201).json(skill);
}