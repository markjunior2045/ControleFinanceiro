export interface Mes {
    id: number,
    nome: string
}

export class Meses {
    meses: Mes[] = [
        { id: 1, nome: 'Janeiro' },
        { id: 2, nome: 'Fevereiro' },
        { id: 3, nome: 'Março' },
        { id: 4, nome: 'Abril' },
        { id: 5, nome: 'Maio' },
        { id: 6, nome: 'Junho' },
        { id: 7, nome: 'Julho' },
        { id: 8, nome: 'Agosto' },
        { id: 9, nome: 'Setembro' },
        { id: 10, nome: 'Outubro' },
        { id: 11, nome: 'Novembro' },
        { id: 12, nome: 'Dezembro' }
    ]
}