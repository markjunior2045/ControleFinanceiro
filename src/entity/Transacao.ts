import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Banco } from "./Banco";
import { Cartao } from "./Cartao";
import { Parcela } from "./Parcela";
import { Usuario } from "./Usuario";

@Entity()
export class Transacao{

    constructor(descricao:string, valor:number, metodo:string, parcelado:boolean,data:Date,usuario:Usuario){
        this.descricao = descricao;
        this.valor = valor;
        this.metodo = metodo;
        this.parcelado = parcelado;
        this.data = data;
        this.usuario = usuario;
    }

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    descricao:string;

    @Column({type: 'float'})
    valor: number;

    @Column()
    metodo: string;

    @Column()
    parcelado: boolean;

    @Column({type: 'datetime'})
    data: Date;

    @ManyToOne(() => Usuario, Usuario => Usuario.transacoes)
    usuario:Usuario;
    
    @OneToMany(() => Parcela, parcela => parcela.transacao)
    parcela: Parcela[];

    @OneToOne(() => Banco, banco => banco.transacao)
    banco: Banco;

    @OneToOne(() => Cartao, cartao => cartao.transacao)
    cartao: Cartao;
}