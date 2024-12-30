import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Phase } from "./enum/Phase";
import { User } from "./User";
import { Application } from "./Application";
import { Model } from "./enum/Model";

@Entity({name: "tb_job"})
export class Job {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: false})
    title: string;
    @Column({nullable: false})
    description: string;
    @Column({
        type: "enum",
        enum: Phase,
        nullable: false
    })
    phase: Phase; //enum phase
    @Column({
        type: "enum",
        enum: Model,
        nullable: false
    })
    model: Model;
    @Column({nullable: false})
    salary: string;
    @Column({nullable: false})
    location: string;
    @Column({name: "openingdate", type: "timestamptz", default: () => "CURRENT_TIMESTAMP"})
    openingDate: Date;
    @Column({name: "closingdate", type: "timestamptz"})
    closingDate: Date;
    @ManyToOne(() => User, (user) => user.jobs, {eager: false})
    @JoinColumn({ name: "open_by" })
    openBy: User;
    @OneToMany(() => Application, (application) => application.job)
    applications: Application[]
}