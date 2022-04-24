import { Guid } from "./guid.model";

export interface Banco{
    id: Guid;
    banco: string;
    agencia: number;
    conta: number;
    titular: string;
    saldo: number;
}