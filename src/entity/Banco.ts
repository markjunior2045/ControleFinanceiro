import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cartao } from "./Cartao";
import { Transacao } from "./Transacao";
import { Usuario } from "./Usuario";

@Entity()
export class Banco{
    constructor(banco: string, saldo: number, conta: string, agencia: string, titular: string, usuario: Usuario){
        this.banco = banco;
        this.saldo = saldo;
        this.conta = conta;
        this.agencia = agencia;
        this.titular = titular;
        this.usuario = usuario;
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    banco: string;

    @Column({type: 'float'})
    saldo: number;

    @Column()
    conta: string;

    @Column()
    agencia: string;

    @Column()
    titular: string;

    @ManyToOne(() => Usuario, usuario => usuario.banco)
    usuario: Usuario;

    @OneToMany(() => Transacao, transacao => transacao.banco)
    transacao: Transacao;

    @OneToMany(() => Cartao, cartao => cartao.banco)
    cartao: Cartao;
}