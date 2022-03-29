import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm"

@Entity()
export class Usuario {

    @PrimaryColumn()
    id: string

    @Column()
    email: string

    @Column()
    nome: string

    @Column()
    sobrenome: string

    @Column()
    senha: string

    @Column()
    salario: number

    @Column()
    porcentagem: number

    @Column()
    telefone: number

    @Column()
    datanascimento: Date

    @Column()
    cpf: number

}
