import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";
import { Vaga } from "./Vaga";

@Entity()
export class Candidatura {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Usuario, (usuario) => usuario.candidaturas)
    @JoinColumn({name: 'usuario'})
    usuario: Usuario;
    @ManyToOne(() => Vaga, (vaga) => vaga.candidaturas)
    @JoinColumn({name: 'vaga'})
    vaga: Vaga;
    @Column()
    data: Date;
}