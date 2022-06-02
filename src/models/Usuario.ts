import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany, OneToOne } from "typeorm"
import { Banco } from "./Banco";
import { Cartao } from "./Cartao";
import { Tag } from "./Tag";
import { Transacao } from "./Transacao";

@Entity()
export class Usuario {

    constructor(email:string, nome:string, sobrenome:string, senha:string, salario:number, porcentagem:number, valorReservado: number){
        this.nome = nome;
        this.email = email;
        this.sobrenome = sobrenome;
        this.senha = senha;
        this.salario = salario;
        this.porcentagem = porcentagem;
        this.valorReservado = valorReservado;
    }

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true})
    email: string;

    @Column()
    nome: string;

    @Column()
    sobrenome: string;

    @Column()
    senha: string;

    @Column({type: 'float'})
    salario: number;

    @Column()
    porcentagem: number;

    @Column({type: 'float'})
    valorReservado: number;

    @OneToMany(() => Transacao, transacao => transacao.usuario)
    transacoes: Transacao[];

    @OneToMany(() => Banco, banco => banco.usuario)
    banco: Banco[];

    @OneToMany(() => Cartao, cartao => cartao.usuario)
    cartao: Cartao[];

    @OneToMany(() => Tag, tag => tag.usuario)
    tag: Tag[];
}
