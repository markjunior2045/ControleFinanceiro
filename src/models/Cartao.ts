import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Banco } from "./Banco";
import { Parcela } from "./Parcela";
import { Transacao } from "./Transacao";
import { Usuario } from "./Usuario";

@Entity()
export class Cartao{
    constructor(nome:string,titular:string, numero:string, modalidade:string, bancoCadastrado: boolean, vencimentoFatura: number, validade:Date, codigo:number, usuario: Usuario){
        this.nome = nome;
        this.titular = titular;
        this.numero = numero;
        this.modalidade = modalidade;
        this.bancoCadastrado = bancoCadastrado;
        this.vencimentoFatura = vencimentoFatura;
        this.validade = validade;
        this.codigo = codigo;
        this.usuario = usuario;
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column()
    titular: string;

    @Column()
    numero: string;

    @Column()
    modalidade: string;

    @Column()
    bancoCadastrado: boolean;

    @Column()
    banco: string;

    @Column()
    vencimentoFatura: number;

    @Column({type: 'date'})
    validade: Date;

    @Column()
    codigo: number;

    @ManyToOne(() => Usuario, usuario => usuario.cartao)
    usuario: Usuario;

    @ManyToOne(() => Banco, banco => banco.cartao)
    bancoCartao: Banco;

    @OneToMany(() => Transacao, transacao => transacao.cartao)
    transacao: Transacao[];
}