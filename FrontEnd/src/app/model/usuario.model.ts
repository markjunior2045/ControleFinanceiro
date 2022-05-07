import { Guid } from "./guid.model";
import { Transacao } from "./transacao.model";

export interface Usuario{
    id: Guid;
    nome: string;
    sobrenome: string;
    email: string;
    salario: number;
    porcentagem: number;
    valorReservado: number;
    senha: string;
    transacoes: Transacao[];
}