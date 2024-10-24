import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TipoUsuario } from "./enum/enum-tipo";

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

}