import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Phase } from "./enum/Phase";
import { User } from "./User";
import { Application } from "./Application";
import { Model } from "./enum/Model";

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
    @Column({
        type: "enum",
        enum: Model
    })
    model: Model;
    @Column()
    salary: string;
    @Column()
    location: string;
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