import { TagOpenStartToken } from '@angular/compiler/src/ml_parser/tokens';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AdicionaBancoComponent } from '../adiciona-banco/adiciona-banco.component';
import { AdicionaCartaoComponent } from '../adiciona-cartao/adiciona-cartao.component';
import { AdicionaTagComponent } from '../adiciona-tag/adiciona-tag.component';
import { ConfirmacaoDialogComponent } from '../confirmacao-dialog/confirmacao-dialog.component';
import { DetalhesCartaoDialogComponent } from '../detalhes-cartao-dialog/detalhes-cartao-dialog.component';
import { DetalhesContaCorrenteDialogComponent } from '../detalhes-conta-corrente-dialog/detalhes-conta-corrente-dialog.component';
import { DetalhesTagDialogComponent } from '../detalhes-tag-dialog/detalhes-tag-dialog.component';
import { MensagemComponent } from '../mensagem/mensagem.component';
import { Banco } from '../model/banco.model';
import { Cartao } from '../model/cartao.model';
import { Guid } from '../model/guid.model';
import { Tag } from '../model/tag.model';
import { Usuario } from '../model/usuario.model';
import { BancoService } from '../services/banco.service';
import { CartaoService } from '../services/cartao.service';
import { SharedService } from '../services/shared.service';
import { TagService } from '../services/tag.service';
import { TransacaoService } from '../services/transacao.service';
import { UsuarioService } from '../services/usuario.service';

const exemploCartao: Cartao[] = [
  {
    id: '1',
    nome: '-',
    titular: '-',
    numero: 1,
    modalidade: 'Crédito',
    bancoCadastrado: false,
    banco: 'Santander',
    vencimentoFatura: 1,
    validade: new Date(),
    codigo: 123,
    bancoCartao: []
  },
];

const exemploBanco: Banco[] = [
  {
    id: '1',
    banco: '-',
    agencia: 123,
    conta: 292928,
    titular: '-',
    saldo: 0
  },
];

const exemploTag: Tag[] = [
  {
    id: '1',
    nome: '-',
    tipo: '-'
  },
];

const exemploUsuario: Usuario =
{
  id: '1',
  nome: '-',
  sobrenome: '-',
  email: '-',
  porcentagem: 0,
  senha: '-',
  salario: 0,
  valorReservado: 0,
  banco: exemploBanco,
  cartao: exemploCartao,
  tag: exemploTag,
  transacoes: [],
}

@Component({
  selector: 'app-gerenciamento-conta',
  templateUrl: './gerenciamento-conta.component.html',
  styleUrls: ['./gerenciamento-conta.component.css']
})
export class GerenciamentoContaComponent implements OnInit {

  gerenciaConta: FormGroup;
  _accountId: Guid;
  usuario: Usuario = exemploUsuario;
  usuarioUpdate: Usuario;
  reservado: number;
  updateButton: boolean = false;
  temCartao: boolean = false;
  temBanco: boolean = false;
  temTag: boolean = false;

  tabelaCartao: string[] = ['nome', 'titular', 'numero', 'modalidade', 'detalhes', 'deletar'];
  dadosCartao: Cartao[];

  tabelaBanco: string[] = ['banco', 'saldo', 'titular', 'agencia', 'conta', 'detalhes', 'deletar'];
  dadosBanco: Banco[];

  tabelaTag: string[] = ['nome', 'tipo', 'detalhes', 'deletar'];
  dadosTag: Tag[];

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private shared: SharedService,
    private route: ActivatedRoute,
    private _usuarioService: UsuarioService,
    private _bancoService: BancoService,
    private _cartaoService: CartaoService,
    private _tagService: TagService,
    private mensagem: MensagemComponent) {

  }

  ngOnInit(): void {
    this._accountId = this.route.snapshot.paramMap.get('id') ?? '';
    this.shared.send(this._accountId);
    this.getUsuario(this._accountId);
    this.getBancos(this._accountId);
    this.getCartoes(this._accountId);
    this.getTags(this._accountId);
    this.criarFormularioUsuario();
  }

  criarFormularioUsuario() {
    this.gerenciaConta = this.formBuilder.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', Validators.required],
      salario: ['', Validators.required],
      porcentagem: ['', Validators.required],
      valorReservado: [{ value: '', disabled: true }],
      senha: ['', Validators.required]
    })
  }

  calculaPorcentagem() {
    this.reservado = 0;
    this.reservado = (this.gerenciaConta.get('porcentagem')?.value / 100) * this.gerenciaConta.get('salario')?.value;
    this.gerenciaConta.get('valorReservado')?.setValue(this.reservado.toFixed(2));
    this.mostraSalvar();
  }

  async getUsuario(idUsuario: Guid) {
    await this._usuarioService.getUsuario(idUsuario).then(result => {
      this.usuario = result;
    })
  }

  async getBancos(idUsuario: Guid) {
    await this._bancoService.getBancos(idUsuario).then(result => {
      this.dadosBanco = result[0].banco;
      if (this.dadosBanco.length > 0) {
        this.temBanco = true;
      } else {
        this.temBanco = false;
      }
    })
  }

  async getCartoes(idUsuario: Guid) {
    await this._cartaoService.getCartao(idUsuario).then(result => {
      this.dadosCartao = result[0].cartao;
      console.log(result[0].cartao);
      
      if (this.dadosCartao.length > 0) {
        this.temCartao = true;
      } else {
        this.temCartao = false;
      }
    })
  }

  async getTags(idUsuario: Guid) {
    await this._tagService.getTags(idUsuario).then(result => {
      this.dadosTag = result[0].tag;
      if (this.dadosTag.length > 0) {
        this.temTag = true;
      } else {
        this.temTag = false;
      }
    })
  }

  async salvarUsuario() {
    this.usuarioUpdate = this.gerenciaConta.value;
    this.usuarioUpdate.id = this._accountId;
    this.usuarioUpdate.valorReservado = this.reservado;
    await this._usuarioService.updateUsuario(this.usuarioUpdate).then(result => {
      this.usuario = result;
      this.calculaPorcentagem();
      this.mensagem.mostraAviso('Atualizado com sucesso!');
    }).catch(error => {
      this.mensagem.mostraAviso('Erro ao salvar usuário');
      console.log(error);
    })
    this.updateButton = false;
  }

  mostraSalvar() {
    this.updateButton = true;
  }

  //Metodos Banco --------------------------------------------------------------------------

  openAdicionaBanco() {
    const dialogRef = this.dialog.open(AdicionaBancoComponent, {
      width: '480px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.adicionaBanco(this._accountId, result);
      }
    })
  }

  async adicionaBanco(idUsuario: Guid, banco: Banco) {
    await this._bancoService.cadastraBanco(idUsuario, banco).then(result => {
      this.mensagem.mostraAviso('Banco adicionado com sucesso!');
    }).catch(error => {
      console.log(error);
      this.mensagem.mostraAviso('Erro ao adicionar Banco');
    })
    this.getBancos(this._accountId);
  }

  deletarBancoDialog(idBanco: Guid, nomeBanco: string) {
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
      width: '480px',
      data: 'Tem certeza que deseja APAGAR o banco ' + nomeBanco + '?'
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result != undefined && result) {
        const temCartao = await this._bancoService.checkCartao(idBanco);
        if (temCartao) {
          this.mensagem.mostraAviso('Erro: Existe um cartão com esse banco!');
        } else {
          this.deletaBanco(idBanco);
        }
      }
    })
  }

  async deletaBanco(idBanco: Guid) {
    await this._bancoService.deleteBanco(idBanco).then(result => {
      this.mensagem.mostraAviso('Removido com sucesso!');
    }).catch(error => {
      this.mensagem.mostraAviso('Erro ao deletar banco');
    })
    this.getBancos(this._accountId);
  }

  openDetalhesBanco(banco: Banco) {
    const dialogRef = this.dialog.open(DetalhesContaCorrenteDialogComponent, {
      width: '480px',
      data: {
        banco: banco.banco,
        agencia: banco.agencia,
        conta: banco.conta,
        titular: banco.titular,
        saldo: banco.saldo
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        banco.banco = result.banco,
          banco.agencia = result.agencia,
          banco.conta = result.conta,
          banco.titular = result.titular,
          banco.saldo = result.saldo
        this.atualizaBanco(this._accountId, banco);
      }
    })
  }

  async atualizaBanco(idUsuario: Guid, banco: Banco) {
    await this._bancoService.atualizaBanco(idUsuario, banco).then(result => {
      this.mensagem.mostraAviso('Atualizado com sucesso!');
      this.getBancos(this._accountId);
    }).catch(error => {
      console.log(error);
      this.mensagem.mostraAviso('Erro ao atualizar banco');
    })
  }

  //Metodos Cartão --------------------------------------------------------------------------

  openAdicionaCartao() {
    const dialogRef = this.dialog.open(AdicionaCartaoComponent, {
      width: '480px',
      data: this.dadosBanco
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.adicionaCartao(this._accountId, result);
      }
    })
  }

  async adicionaCartao(idUsuario: Guid, cartao: Cartao) {
    console.log(cartao);

    await this._cartaoService.cadastraCartao(idUsuario, cartao).then(result => {
      this.mensagem.mostraAviso('Cartão adicionado com sucesso!');
    }).catch(error => {
      console.log(error);
      this.mensagem.mostraAviso('Erro ao adicionar Cartão');
    })
    this.getCartoes(this._accountId);
  }

  deletarCartaoDialog(idCartao: Guid, nomeCartao: string): void {
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
      width: '480px',
      data: 'Tem certeza que deseja APAGAR ' + nomeCartao + '?'
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result != undefined && result) {
        const temTransacao = await this._cartaoService.checkCartao(idCartao);
        if(temTransacao){
          this.mensagem.mostraAviso('Erro: Existem transações com esse cartão!');
        }else{

        }
        this.deletaCartao(idCartao);
      }
    })
  }

  async deletaCartao(idCartao: Guid) {
    await this._cartaoService.deleteCartao(idCartao).then(result => {
      this.mensagem.mostraAviso('Removido com sucesso!');
    }).catch(error => {
      this.mensagem.mostraAviso('Erro ao deletar cartão');
    })
    this.getCartoes(this._accountId);
  }

  openDetalhesCartao(cartao: Cartao) {
    const dialogRef = this.dialog.open(DetalhesCartaoDialogComponent, {
      width: '480px',
      data: {
        cartao: {
          nome: cartao.nome,
          titular: cartao.titular,
          numero: cartao.numero,
          modalidade: cartao.modalidade,
          bancoCadastrado: cartao.bancoCadastrado,
          banco: cartao.banco,
          bancoid: cartao.bancoCartao,
          vencimentoFatura: cartao.vencimentoFatura,
          validade: new Date(cartao.validade).toISOString().slice(0, 7).replace('T', ' '),
          codigo: cartao.codigo
        },
        bancos: this.dadosBanco
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        cartao.nome = result.nome;
        cartao.titular = result.titular;
        cartao.numero = result.numero;
        cartao.modalidade = result.modalidade;
        cartao.bancoCadastrado = result.bancoCadastrado;
        if (result.bancoCadastrado) {
          cartao.bancoid = result.bancoid;
        }
        cartao.banco = result.banco;
        cartao.vencimentoFatura = result.vencimentoFatura;
        cartao.validade = new Date(result.validade);
        cartao.codigo = result.codigo;
        this.atualizaCartao(this._accountId, cartao);
      }
    })
  }

  async atualizaCartao(idUsuario: Guid, cartao: Cartao) {
    await this._cartaoService.atualizaCartao(idUsuario, cartao).then(result => {
      this.mensagem.mostraAviso('Atualizado com sucesso!');
      this.getCartoes(this._accountId);
    }).catch(error => {
      console.log(error);
      this.mensagem.mostraAviso('Erro ao atualizar cartão');
    })
  }

  //Metodos Tag --------------------------------------------------------------------------

  openAdicionaTag() {
    const dialogRef = this.dialog.open(AdicionaTagComponent, {
      width: '480px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.adicionaTag(this._accountId, result);
      }
    })
  }

  async adicionaTag(idUsuario: Guid, tag: Tag) {
    await this._tagService.cadastraTag(idUsuario, tag).then(result => {
      this.mensagem.mostraAviso('Tag adicionada com sucesso!');
    }).catch(error => {
      console.log(error);
      this.mensagem.mostraAviso('Erro ao adicionar Tag');
    })
    this.getTags(this._accountId);
  }

  deletarTagDialog(idTag: Guid, nomeTag: string): void {
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
      width: '480px',
      data: 'Tem certeza que deseja APAGAR a tag ' + nomeTag + '?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result) {
        this.deletaTag(idTag);
      }
    })
  }

  async deletaTag(idTag: Guid) {
    await this._tagService.deleteTag(idTag).then(result => {
      this.mensagem.mostraAviso('Removido com Sucesso!');
      this.getTags(this._accountId);
    }).catch(error => {
      this.mensagem.mostraAviso('Erro ao deletar Tag');
    })
  }

  openDetalhesTag(tag: Tag) {
    const dialogRef = this.dialog.open(DetalhesTagDialogComponent, {
      width: '480px',
      data: {
        nome: tag.nome,
        tipo: tag.tipo
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        tag.nome = result.nome;
        tag.tipo = result.tipo;
        this.atualizaTag(this._accountId, tag);
      }
    })
  }

  async atualizaTag(idUsuario: Guid, tag: Tag) {
    await this._tagService.atualizaTag(idUsuario, tag).then(result => {
      this.mensagem.mostraAviso('Atualizado com sucesso!');
      this.getTags(this._accountId);
    }).catch(error => {
      console.log(error);
      this.mensagem.mostraAviso('Erro ao atualizar tag');
    })
  }



}
