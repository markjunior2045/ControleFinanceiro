import { Guid } from "./guid.model";

export interface Cartao{
    id: string;
    nome: string;
    numero: number;
    modalidade: string;
    bancoCadastrado: boolean;
    banco: string;
    vencimentoFatura: Date;
    validade: Date;
    codigo: number;
}