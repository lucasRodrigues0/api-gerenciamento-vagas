import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Phase } from "./enum/Phase";
import { User } from "./User";
import { Application } from "./Application";

@Entity({name: "tb_job"})
export class Job {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column({
        type: "enum",
        enum: Phase
    })
    phase: Phase; //enum phase
    @Column({name: "openingdate"})
    openingDate: Date;
    @Column({name: "closingdate"})
    closingDate: Date;
    @ManyToOne(() => User, (user) => user.jobs, {eager: false})
    @JoinColumn({ name: "open_by" })
    openBy: User;
    @OneToMany(() => Application, (application) => application.job)
    applications: Application[]
}