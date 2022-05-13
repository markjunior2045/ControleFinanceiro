import { Banco } from "./banco.model";
import { Guid } from "./guid.model";

export interface Cartao{
    id: Guid;
    nome: string;
    numero: number;
    modalidade: string;
    bancoCadastrado: boolean;
    banco: string;
    vencimentoFatura: Date;
    validade: Date;
    codigo: number;
    bancoid?: Guid;
    bancoCartao:Banco[];
}