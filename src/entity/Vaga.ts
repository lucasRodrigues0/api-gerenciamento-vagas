import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { fase } from "./enum/enum-fase";
import { Usuario } from "./Usuario";
import { Candidatura } from "./Candidatura";

@Entity()
export class Vaga {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    titulo: string;
    @Column()
    descricao: string;
    @Column({
        type: "enum",
        enum: fase
    })
    fase: fase; //enum fase
    @Column()
    abertura: Date;
    @Column()
    fechamento: Date;
    @ManyToOne(() => Usuario, (usuario) => usuario.vagas, {eager: false})
    @JoinColumn({ name: "aberta_por" })
    abertaPor: Usuario; //referencia usuario
    @OneToMany(() => Candidatura, (candidatura) => candidatura.vaga)
    candidaturas: Candidatura[]
}