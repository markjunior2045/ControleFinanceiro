import { Guid } from "./guid.model";

export interface Tag{
    id: Guid;
    nome: string;
    tipo: string;
}