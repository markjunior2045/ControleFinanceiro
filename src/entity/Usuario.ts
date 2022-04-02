import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm"

@Entity()
export class Usuario {

    constructor(email:string, nome:string, sobrenome:string, senha:string, salario:number, porcentagem:number, telefone:number, datanascimento:string, cpf:string){
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
    cpf: string;

}
