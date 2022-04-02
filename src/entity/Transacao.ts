import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToOne(() => Usuario)
    usuario:Usuario;
    
}