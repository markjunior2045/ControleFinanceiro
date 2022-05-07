import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AdicionaTransacaoComponent } from '../adiciona-transacao/adiciona-transacao.component';
import { ConfirmacaoDialogComponent } from '../confirmacao-dialog/confirmacao-dialog.component';
import { DetalhesTransacaoComponent } from '../detalhes-transacao/detalhes-transacao.component';
import { MensagemComponent } from '../mensagem/mensagem.component';
import { Guid } from '../model/guid.model';
import { Transacao } from '../model/transacao.model';
import { Usuario } from '../model/usuario.model';
import { SharedService } from '../services/shared.service';
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

  displayedColumns: string[] = ['descricao','valor','metodo','detalhes','deletar'];
  dataSource: Transacao[];
  totalGasto: number = 0;
  _accountId: Guid;

  constructor(public dialog: MatDialog, private _transacaoservice:TransacaoService, private shared: SharedService,private route: ActivatedRoute, private mensagem:MensagemComponent) { }

  ngOnInit(): void {
    this._accountId = this.route.snapshot.paramMap.get('id') ?? '';
    this.shared.send(this._accountId);
    this.getTransacoes(this._accountId);
   }

  openDialog(transacao: Transacao): void{
    const dialogRef = this.dialog.open(DetalhesTransacaoComponent, {
      width: '480px',
      data: { descricao: transacao.descricao, valor: transacao.valor, metodo: transacao.metodo, data: new Date(transacao.data).toISOString().slice(0,10).replace('T',' ')}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined){
        transacao.descricao = result.descricao;
        transacao.valor = result.valor;
        transacao.metodo = result.metodo;
        transacao.data = result.data;
        this.atualizar(this._accountId, transacao);
      }
    })
  }

  novaTransacaoDialog(): void{
    const dialogRef = this.dialog.open(AdicionaTransacaoComponent, {
      width: '480px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined){
        this.adicionaTransacao(this._accountId,result);
      }
    })
  }

  deletarTransacaoDialog(idTransacao: Guid, nomeTransacao:string): void{
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent,{
      width: '480px',
      data: 'Tem certeza que deseja APAGAR a transação ' + nomeTransacao + '?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result){
        this.deletaTransacao(idTransacao);
      }
    })
  }

  async getTransacoes(idUsuario: Guid){
    await this._transacaoservice.getTransacoesUsuario(idUsuario).then(result => {
      this.dataSource = result[0].transacoes;
    })
    this.calculaTotalGasto();
  }

  async adicionaTransacao(idUsuario: Guid, transacao: Transacao){
    await this._transacaoservice.adicionaTransacao(idUsuario,transacao).then(result => {
      this.mensagem.mostraAviso('Adicionado com sucesso!');
    }).catch(error => {
      console.log(error);
      this.mensagem.mostraAviso('Erro ao adicionar transação');
    })
    this.getTransacoes(this._accountId);
  }

  async deletaTransacao(idTransacao: Guid){
    await this._transacaoservice.deletaTransacao(idTransacao).then(result => {
      this.mensagem.mostraAviso('Removido com sucesso!');
    }).catch(error => {
      console.log(error);
      this.mensagem.mostraAviso('Erro ao deletar transacao');
    })
    this.getTransacoes(this._accountId);
  }

  async atualizar(idUsuario:Guid,transacao: Transacao){
    await this._transacaoservice.atualizaTransacao(idUsuario,transacao).then(result => {
      this.mensagem.mostraAviso('Atualizado com sucesso!')
      this.getTransacoes(this._accountId);
    }).catch(error => console.log(error));
  }

  calculaTotalGasto(){
    this.totalGasto = 0;
    this.dataSource.forEach(x => {
      this.totalGasto += x.valor;
    })
  }
}