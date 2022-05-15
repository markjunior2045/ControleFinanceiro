import { Banco } from "./banco.model";
import { Cartao } from "./cartao.model";
import { Guid } from "./guid.model";

export interface Transacao{
    id: Guid;
    descricao:string;
    entrada:boolean;
    valor:number;
    metodo: string;
    parcelado: boolean;
    quantidadeParcelas: number;
    data: Date;
    banco:Banco;
    cartao:Cartao;
    bancoid?: Guid;
    cartaoid?: Guid;
}