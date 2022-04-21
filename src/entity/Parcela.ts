import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Transacao } from "./Transacao";

@Entity()
export class Parcela{

    constructor(valorParcela:number, numero:number, dataParcela:Date, transacao:Transacao){
        this.valorParcela = valorParcela;
        this.numero = numero;
        this.dataParcela = dataParcela;
        this.transacao = transacao;
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'float'})
    valorParcela: number;

    @Column()
    numero: number;

    @Column({type: 'datetime'})
    dataParcela: Date;

    @ManyToOne(() => Transacao, transacao => transacao.parcela)
    transacao: Transacao;
}