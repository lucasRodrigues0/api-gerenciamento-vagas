import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";

@Entity()
export class Habilidade {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nome: string;

    @ManyToMany(() => Usuario, (usuario) => usuario.habilidades)
    usuarios: Usuario[]
}