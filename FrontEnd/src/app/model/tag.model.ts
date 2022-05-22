import { Guid } from "./guid.model";

export interface Tag{
    id: Guid;
    nome: string;
    tipo: string;
}

export class Tipo {
    tipos:string[] = ['Casa','Educação','Eletrônico', 'Lazer', 'Transporte', 'Saúde', 'Serviços', 'Outros']
}