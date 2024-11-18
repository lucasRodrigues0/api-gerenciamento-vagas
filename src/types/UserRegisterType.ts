import { UserTypeEnum } from "../entity/enum/UserTypeEnum";

export type UserRegisterType = {
    name: string,
    email: string,
    password: string,
    type: UserTypeEnum,
}