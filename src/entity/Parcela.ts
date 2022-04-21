import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Banco } from "./Banco";
import { Cartao } from "./Cartao";
import { Transacao } from "./Transacao";
import { Usuario } from "./Usuario";

@Entity()
export class Parcela{

    constructor(descricao: string, valortotal:number, valor:number, metodo:string, numero:number, data:Date, usuario:Usuario, transacao:Transacao){
        this.descricao = descricao;
        this.valortotal = valortotal;
        this.valor = valor;
        this.metodo = metodo;
        this.data = data;
        this.transacao = transacao;
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    descricao: string;

    @Column({type: 'float'})
    valortotal: number;

    @Column({type: 'float'})
    valor: number;

    @Column()
    metodo: string;

    @Column()
    numero: number;

    @Column({type: 'datetime'})
    data: Date;

    @ManyToOne(() => Transacao, transacao => transacao.parcela)
    transacao: Transacao;

    @OneToOne(() => Banco, banco => banco.parcela)
    banco: Banco;

    @ManyToOne(() => Cartao, cartao => cartao.parcela)
    cartao: Cartao;
}