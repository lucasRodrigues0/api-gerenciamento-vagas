import { Application } from "../entity/Application"
import { UserTypeEnum } from "../entity/enum/UserTypeEnum"
import { Skill } from "../entity/Skill"
import { Job } from "../entity/Job"

export type UserType = {
    id?: number,
    name: string,
    email: string,
    type: UserTypeEnum,
    jobs?: Job[],
    skills?: Skill[],
    applications?: Application[]
}