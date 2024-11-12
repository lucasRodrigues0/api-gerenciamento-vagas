import { Application } from "../entity/Application"
import { UserTypeEnum } from "../entity/enum/UserTypeEnum"
import { Skill } from "../entity/Skill"
import { Job } from "../entity/Job"

export type UserType = {
    name: string,
    email: string,
    password?: string,
    type: UserTypeEnum,
    jobs?: Job[],
    skills?: Skill[],
    applications?: Application[]
}