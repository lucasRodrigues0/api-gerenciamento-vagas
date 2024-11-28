import { User } from "../entity/User";

declare global {
    namespace Express {
        export interface Request {
            user: Partial<User>
        }
    }
}