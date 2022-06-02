import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AdicionaTransacaoComponent } from '../adiciona-transacao/adiciona-transacao.component';
import { ConfirmacaoDialogComponent } from '../confirmacao-dialog/confirmacao-dialog.component';
import { DetalhesTransacaoComponent } from '../detalhes-transacao/detalhes-transacao.component';
import { MensagemComponent } from '../mensagem/mensagem.component';
import { Guid } from '../model/guid.model';
import { Mes } from '../model/meses.model';
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

  mes: number = new Date().getMonth();
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
  mesTela: string = this.meses[this.mes].nome;
  displayedColumns: string[] = ['descricao','parcelado', 'valor', 'metodo','data', 'tags', 'pago', 'detalhes', 'deletar'];
  dataSource: Transacao[];
  transacoesPagas: Transacao[];
  totalGasto: number = 0;
  totalGanho: number = 0;
  btnFiltrar: boolean = true;
  filtrarValue: number = 0;
  _accountId: Guid;

  constructor(public dialog: MatDialog, private _transacaoservice: TransacaoService, private shared: SharedService, private route: ActivatedRoute, private mensagem: MensagemComponent) { }

  ngOnInit(): void {
    this._accountId = this.route.snapshot.paramMap.get('id') ?? '';
    this.shared.send(this._accountId);
    this.getTransacoesPorMes(this._accountId, this.mes + 1);
  }

  filtrar() {
    if (this.btnFiltrar) {
      if (this.filtrarValue != null && this.filtrarValue != 0) {
        this.btnFiltrar = false;
        this.getTransacoesPorMes(this._accountId, this.filtrarValue)
        this.mesTela = this.meses[this.filtrarValue - 1].nome;
      } else if (this.filtrarValue == 0) {
        this.mensagem.mostraAviso('Selecione um mês!')
      }
    } else {
      this.getTransacoesPorMes(this._accountId, this.mes + 1)
      this.mesTela = this.meses[this.mes].nome
      this.filtrarValue = 0
      this.btnFiltrar = true;
    }
  }

  limpaFiltro(){
    this.getTransacoesPorMes(this._accountId, this.mes + 1)
    this.mesTela = this.meses[this.mes].nome
    this.filtrarValue = 0
    this.btnFiltrar = true;
  }

  openEditarDialog(transacao: Transacao): void {
    const dialogRef = this.dialog.open(DetalhesTransacaoComponent, {
      width: '480px',
      data: {
        idUsuario: this._accountId,
        descricao: transacao.descricao,
        entrada: transacao.entrada,
        pago: transacao.pago,
        valor: transacao.valor,
        metodo: transacao.metodo,
        parcelado: transacao.parcelado,
        quantidadeParcelas: transacao.quantidadeParcelas,
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
        transacao.data = result.data;
        transacao.pago = result.pago;
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

  async getTransacoesPorMes(idUsuario: Guid, mes: number) {
    await this._transacaoservice.getTransacoesPorMes(idUsuario, mes).then(result => {
      this.dataSource = result;
    })
    this.calculaTotalGastoGanho();
  }

  async adicionaTransacao(idUsuario: Guid, transacao: Transacao) {
    if (!transacao.parcelado) {
      transacao.quantidadeParcelas = 1;
    }
    await this._transacaoservice.adicionaTransacao(idUsuario, transacao).then(result => {
      this.mensagem.mostraAviso('Adicionado com sucesso!');
    }).catch(error => {
      console.log(error);
      this.mensagem.mostraAviso('Erro ao adicionar transação');
    })
    await new Promise(f => setTimeout(f, 100));
    this.limpaFiltro()
  }

  async deletaTransacao(idTransacao: Guid) {
    await this._transacaoservice.deletaTransacao(idTransacao).then(result => {
      this.mensagem.mostraAviso('Removido com sucesso!');
    }).catch(error => {
      console.log(error);
      this.mensagem.mostraAviso('Erro ao deletar transacao');
    })
    this.limpaFiltro()
  }

  async atualizar(idUsuario: Guid, transacao: Transacao) {
    await this._transacaoservice.atualizaTransacao(idUsuario, transacao).then(async result => {
      this.mensagem.mostraAviso('Atualizado com sucesso!');
      await new Promise(f => setTimeout(f, 100));
      this.limpaFiltro();
    }).catch(error => console.log(error));
  }

  calculaTotalGastoGanho() {
    this.totalGasto = 0;
    this.totalGanho = 0;
    this.dataSource.forEach(x => {
      if (x.pago) {
        if (!x.entrada) {
          this.totalGasto += x.valor;
        } else {
          this.totalGanho += x.valor;
        }
      }
    })
  }
}