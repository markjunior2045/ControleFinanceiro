import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Parcela } from "./Parcela";
import { Transacao } from "./Transacao";
import { Usuario } from "./Usuario";

@Entity()
export class Cartao{
    constructor(nome:string, numero:string, banco:string, validade:string, codigo:string, usuario: Usuario){
        this.nome = nome;
        this.numero = numero;
        this.banco = banco;
        this.validade = validade;
        this.codigo = codigo;
        this.usuario = usuario;
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column()
    numero: string;

    @Column()
    banco: string;

    @Column()
    validade: string;

    @Column()
    codigo: string;

    @ManyToOne(() => Usuario, usuario => usuario.cartao)
    usuario: Usuario;

    @OneToMany(() => Parcela, parcela => parcela.cartao)
    parcela: Parcela;

    @OneToOne(() => Transacao, transacao => transacao.cartao)
    transacao: Transacao;
}