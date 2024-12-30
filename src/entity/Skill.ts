import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({name: "tb_skill"})
export class Skill {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: false})
    name: string;

    @ManyToMany(() => User, (user) => user.skills)
    users: User[]
}