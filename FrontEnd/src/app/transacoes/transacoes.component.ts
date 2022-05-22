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
@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.component.html',
  styleUrls: ['./transacoes.component.css']
})

export class TransacoesComponent implements OnInit {

  displayedColumns: string[] = ['descricao', 'valor', 'metodo', 'detalhes', 'deletar'];
  dataSource: Transacao[];
  totalGasto: number = 0;
  totalGanho: number = 0;
  _accountId: Guid;

  constructor(public dialog: MatDialog, private _transacaoservice: TransacaoService, private shared: SharedService, private route: ActivatedRoute, private mensagem: MensagemComponent) { }

  ngOnInit(): void {
    this._accountId = this.route.snapshot.paramMap.get('id') ?? '';
    this.shared.send(this._accountId);
    this.getTransacoes(this._accountId);
  }

  openEditarDialog(transacao: Transacao): void {
    const dialogRef = this.dialog.open(DetalhesTransacaoComponent, {
      width: '480px',
      data: {
        idUsuario: this._accountId,
        descricao: transacao.descricao,
        entrada: transacao.entrada,
        valor: transacao.valor,
        metodo: transacao.metodo,
        data: new Date(transacao.data).toISOString().slice(0, 10).replace('T', ' '),
        cartao: transacao.cartao,
        banco: transacao.banco,
        tag: transacao.tag
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        transacao.descricao = result.descricao;
        transacao.entrada = result.entrada;
        transacao.valor = result.valor;
        transacao.metodo = result.metodo;
        transacao.data = result.data;
        if (result.bancoid != '' && result.bancoid != null && result.bancoid != undefined) {
          transacao.bancoid = result.bancoid
        }
        if (result.cartaoid != '' && result.cartaoid != null && result.cartaoid != undefined) {
          transacao.cartaoid = result.cartaoid
        }
        this.atualizar(this._accountId, transacao);
      }
    })
  }

  novaTransacaoDialog(): void {
    const dialogRef = this.dialog.open(AdicionaTransacaoComponent, {
      width: '480px',
      data: this._accountId
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.adicionaTransacao(this._accountId, result);
      }
    })
  }

  deletarTransacaoDialog(idTransacao: Guid, nomeTransacao: string): void {
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
      width: '480px',
      data: 'Tem certeza que deseja APAGAR a transação ' + nomeTransacao + '?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result) {
        this.deletaTransacao(idTransacao);
      }
    })
  }

  async getTransacoes(idUsuario: Guid) {
    await this._transacaoservice.getTransacoesUsuario(idUsuario).then(result => {
      this.dataSource = result[0].transacoes;
      console.log(result[0].transacoes);
    })
    this.calculaTotalGastoGanho();
  }

  async adicionaTransacao(idUsuario: Guid, transacao: Transacao) {
    await this._transacaoservice.adicionaTransacao(idUsuario, transacao).then(result => {
      this.mensagem.mostraAviso('Adicionado com sucesso!');
    }).catch(error => {
      console.log(error);
      this.mensagem.mostraAviso('Erro ao adicionar transação');
    })
    this.getTransacoes(this._accountId);
  }

  async deletaTransacao(idTransacao: Guid) {
    await this._transacaoservice.deletaTransacao(idTransacao).then(result => {
      this.mensagem.mostraAviso('Removido com sucesso!');
    }).catch(error => {
      console.log(error);
      this.mensagem.mostraAviso('Erro ao deletar transacao');
    })
    this.getTransacoes(this._accountId);
  }

  async atualizar(idUsuario: Guid, transacao: Transacao) {
    await this._transacaoservice.atualizaTransacao(idUsuario, transacao).then(result => {
      this.mensagem.mostraAviso('Atualizado com sucesso!')
      this.getTransacoes(this._accountId);
    }).catch(error => console.log(error));
  }

  calculaTotalGastoGanho() {
    this.totalGasto = 0;
    this.totalGanho = 0;
    this.dataSource.forEach(x => {
      if (!x.entrada) {
        this.totalGasto += x.valor;
      } else {
        this.totalGanho += x.valor;
      }
    })
  }
}