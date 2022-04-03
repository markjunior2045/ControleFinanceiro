import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany, OneToOne } from "typeorm"
import { Banco } from "./Banco";
import { Cartao } from "./Cartao";
import { Endereco } from "./Endereco";
import { Parcela } from "./Parcela";
import { Transacao } from "./Transacao";

@Entity()
export class Usuario {

    constructor(email:string, nome:string, sobrenome:string, senha:string, salario:number, porcentagem:number, telefone:number, datanascimento:string, cpf:number){
        this.nome = nome;
        this.email = email;
        this.sobrenome = sobrenome;
        this.senha = senha;
        this.salario = salario;
        this.porcentagem = porcentagem;
        this.telefone = telefone;
        this.datanascimento = datanascimento;
        this.cpf = cpf;
    }

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
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

    @Column()
    telefone: number;

    @Column()
    datanascimento: string;

    @Column()
    cpf: number;

    @OneToMany(() => Transacao, transacao => transacao.usuario)
    transacoes: Transacao[];
    
    @OneToOne(() => Endereco, endereco => endereco.usuario)
    endereco: Endereco;

    @OneToMany(() => Parcela, parcela => parcela.usuario)
    parcela: Parcela;

    @OneToMany(() => Banco, banco => banco.usuario)
    banco: Banco;

    @OneToMany(() => Cartao, cartao => cartao.usuario)
    cartao: Cartao;
}
