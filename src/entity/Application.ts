import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Job } from "./Job";

@Entity({name: "tb_application"})
export class Application {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User, (user) => user.applications)
    @JoinColumn({ name: 'user' })
    user: User;
    @ManyToOne(() => Job, (job) => job.applications)
    @JoinColumn({ name: 'job' })
    job: Job;
    @Column({type: "timestamptz", default: () => "CURRENT_TIMESTAMP"})
    date: Date;
}