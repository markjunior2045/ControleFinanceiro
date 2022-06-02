import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Transacao } from "./Transacao";
import { Usuario } from "./Usuario";

@Entity()
export class Tag{

    constructor(nome:string,tipo:string, usuario:Usuario){
        this.nome = nome;
        this.tipo = tipo;
        this.usuario = usuario;
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column()
    tipo: string;

    @ManyToOne(() => Usuario, usuario => usuario.tag)
    usuario: Usuario;

    @ManyToMany(() => Transacao, transacao => transacao.tag)
    transacao: Transacao[];
}