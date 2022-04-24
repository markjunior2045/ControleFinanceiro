import { Guid } from "./guid.model";

export interface Transacao{
    id: Guid;
    descricao:string;
    valor:number;
    metodo: string;
    parcelado: boolean;
    quantidadeParcelas: number;
    data: Date;
}