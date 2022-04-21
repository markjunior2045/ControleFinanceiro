import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cartao } from "./Cartao";
import { Transacao } from "./Transacao";
import { Usuario } from "./Usuario";

@Entity()
export class Banco{
    constructor(banco: string, titular: string, saldo: number, conta: string, agencia: string, usuario: Usuario){
        this.banco = banco;
        this.titular = titular;
        this.saldo = saldo;
        this.conta = conta;
        this.agencia = agencia;
        this.usuario = usuario;
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    banco: string;

    @Column()
    titular: string;

    @Column({type: 'float'})
    saldo: number;

    @Column()
    conta: string;

    @Column()
    agencia: string;

    @ManyToOne(() => Usuario, usuario => usuario.banco)
    usuario: Usuario;

    @OneToMany(() => Transacao, transacao => transacao.banco)
    transacao: Transacao;

    @OneToMany(() => Cartao, cartao => cartao.banco)
    cartao: Cartao;
}