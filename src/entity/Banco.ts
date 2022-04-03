import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Parcela } from "./Parcela";
import { Transacao } from "./Transacao";
import { Usuario } from "./Usuario";

@Entity()
export class Banco{
    constructor(banco: string, nome: string, saldo: number, conta: string, agencia: string, usuario: Usuario){
        this.banco = banco;
        this.nome = nome;
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
    nome: string;

    @Column({type: 'float'})
    saldo: number;

    @Column()
    conta: string;

    @Column()
    agencia: string;

    @ManyToOne(() => Usuario, usuario => usuario.banco)
    usuario: Usuario;

    @OneToOne(() => Transacao, transacao => transacao.banco)
    transacao: Transacao;

    @OneToOne(() => Parcela, parcela => parcela.banco)
    parcela: Parcela;
}