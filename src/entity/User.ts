import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserTypeEnum } from "./enum/UserTypeEnum";
import { Job } from "./Job";
import { Skill } from "./Skill";
import { Application } from "./Application";

@Entity({name: "tb_user"})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    email: string;

    @Column({nullable: false})
    password: string;
    
    @Column({
        type: "enum",
        enum: UserTypeEnum,
        nullable: false
    })
    type: UserTypeEnum;

    @OneToMany(() => Job, (job) => job.openBy)
    jobs: Job[];

    @ManyToMany(() => Skill, (skill) => skill.users)
    @JoinTable({
        name: 'tb_user_skill',
        joinColumn: {
            name: 'user',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'skill',
            referencedColumnName: 'id'
        },
        synchronize: false
    })
    skills: Skill[];

    @OneToMany(() => Application, (application) => application.user)
    applications: Application[];

}