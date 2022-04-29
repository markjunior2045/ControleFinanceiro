import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetalhesTransacaoComponent } from '../detalhes-transacao/detalhes-transacao.component';
import { Transacao } from '../model/transacao.model';
import { TransacaoService } from '../services/transacao.service';

const exemploTransacao:Transacao[] = [
  {
    id:'1',
    descricao:'Descrição 1 da Transação',
    metodo: 'Dinheiro',
    parcelado: false,
    quantidadeParcelas: 1,
    valor: 50,
    data: new Date('2020-01-20')
  },
  {
    id:'2',
    descricao:'Descrição 2 da Transação',
    metodo: 'Cartão',
    parcelado: false,
    quantidadeParcelas: 1,
    valor: 150,
    data: new Date('2021-04-15')
  },
  {
    id:'3',
    descricao:'Descrição 3 da Transação',
    metodo: 'Dinheiro',
    parcelado: false,
    quantidadeParcelas: 1,
    valor: 200,
    data: new Date('2022-08-10')
  }
];
@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.component.html',
  styleUrls: ['./transacoes.component.css']
})

export class TransacoesComponent implements OnInit {

  displayedColumns: string[] = ['descricao','valor','metodo','detalhes'];
  dataSource: Transacao[];
  totalGasto: number = 0;

  constructor(public dialog: MatDialog, private _transacaoservice:TransacaoService) { }

  ngOnInit(): void {
    this.getTransacoes();
   }

  openDialog(transacao: Transacao): void{
    const dialogRef = this.dialog.open(DetalhesTransacaoComponent, {
      width: '480px',
      data: { descricao: transacao.descricao, valor: transacao.valor, metodo: transacao.metodo, data: new Date(transacao.data).toISOString().slice(0,10).replace('T',' ')}
    });
  }

  async getTransacoes(){
    await this._transacaoservice.getAllTransacao().then(result => {
      this.dataSource = result;
    })
    this.calculaTotalGasto();
  }

  calculaTotalGasto(){
    this.dataSource.forEach(x => {
      this.totalGasto += x.valor;
    })
  }
}