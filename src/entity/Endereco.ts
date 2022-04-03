import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";

@Entity()
export class Endereco{
    constructor(cep:string, endereco:string, bairro:string, numero:string, usuario:Usuario){
        this.cep = cep;
        this.endereco = endereco;
        this.bairro = bairro;
        this.numero = numero;
        this.usuario = usuario;
    }


    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    cep: string;

    @Column()
    endereco: string;

    @Column()
    bairro: string;

    @Column()
    numero: string;

    @OneToOne(() => Usuario, usuario => usuario.endereco)
    usuario: Usuario;
}