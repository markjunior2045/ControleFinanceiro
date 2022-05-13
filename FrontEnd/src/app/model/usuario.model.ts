import { Banco } from "./banco.model";
import { Cartao } from "./cartao.model";
import { Guid } from "./guid.model";
import { Tag } from "./tag.model";
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
    banco: Banco[];
    cartao: Cartao[];
    tag: Tag[];
}