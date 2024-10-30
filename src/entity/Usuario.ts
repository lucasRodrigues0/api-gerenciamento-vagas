import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TipoUsuario } from "./enum/enum-tipo";
import { Vaga } from "./Vaga";
import { Habilidade } from "./Habilidade";
import { Candidatura } from "./Candidatura";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    senha: string;
    
    @Column({
        type: "enum",
        enum: TipoUsuario,
    })
    tipo: TipoUsuario;

    @OneToMany(() => Vaga, (vaga) => vaga.abertaPor)
    vagas: Vaga[];

    @ManyToMany(() => Habilidade, (Habilidade) => Habilidade.usuarios)
    @JoinTable({
        name: 'usuario_habilidade',
        joinColumn: {
            name: 'usuario',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'habilidade',
            referencedColumnName: 'id'
        },
        synchronize: false
    })
    habilidades: Habilidade[];

    @OneToMany(() => Candidatura, (candidatura) => candidatura.usuario)
    candidaturas: Candidatura[];

}