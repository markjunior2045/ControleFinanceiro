import { Component, OnInit } from '@angular/core';
import { Transacao } from '../model/transacao.model';

const exemploTransacao:Transacao[] = [
  {
    id:'1',
    descricao:'Descrição 1 da Transação',
    metodo: 'Dinheiro',
    parcelado: false,
    quantidadeParcelas: 1,
    valor: 50,
    data: new Date()
  },
  {
    id:'2',
    descricao:'Descrição 2 da Transação',
    metodo: 'Cartão',
    parcelado: false,
    quantidadeParcelas: 1,
    valor: 150,
    data: new Date()
  },
  {
    id:'3',
    descricao:'Descrição 3 da Transação',
    metodo: 'Dinheiro',
    parcelado: false,
    quantidadeParcelas: 1,
    valor: 200,
    data: new Date()
  }
];

@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.component.html',
  styleUrls: ['./transacoes.component.css']
})

export class TransacoesComponent implements OnInit {

  displayedColumns: string[] = ['descricao','valor','metodo','detalhes'];
  dataSource = exemploTransacao;

  constructor() { }

  ngOnInit(): void { }
}
