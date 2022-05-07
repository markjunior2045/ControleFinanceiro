import { TagOpenStartToken } from '@angular/compiler/src/ml_parser/tokens';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DetalhesCartaoDialogComponent } from '../detalhes-cartao-dialog/detalhes-cartao-dialog.component';
import { DetalhesContaCorrenteDialogComponent } from '../detalhes-conta-corrente-dialog/detalhes-conta-corrente-dialog.component';
import { MensagemComponent } from '../mensagem/mensagem.component';
import { Banco } from '../model/banco.model';
import { Cartao } from '../model/cartao.model';
import { Guid } from '../model/guid.model';
import { Tag } from '../model/tag.model';
import { Usuario } from '../model/usuario.model';
import { SharedService } from '../services/shared.service';
import { TransacaoService } from '../services/transacao.service';
import { UsuarioService } from '../services/usuario.service';

const exemploCartao:Cartao[] = [
  {
    id: '1',
    nome: 'Lucas',
    numero: 1234567890100101,
    modalidade: 'Crédito',
    bancoCadastrado: true,
    banco: 'Santander',
    vencimentoFatura: new Date(),
    validade: new Date(),
    codigo: 123
  },
];

const exemploBanco:Banco[] = [
  {
    id: '1',
    banco: 'Santander',
    agencia: 123,
    conta: 292928,
    titular: 'Lucas Caires',
    saldo: 1230.00
  },
];

const exemploTag:Tag[] = [
  {
    id: '1',
    nome: 'Conta de Luz',
    tipo: 'Casa'
  },
];


@Component({
  selector: 'app-gerenciamento-conta',
  templateUrl: './gerenciamento-conta.component.html',
  styleUrls: ['./gerenciamento-conta.component.css']
})
export class GerenciamentoContaComponent implements OnInit {

  gerenciaConta: FormGroup;
  _accountId: Guid;
  usuario: Usuario;
  usuarioUpdate: Usuario;
  reservado: number;
  updateButton: boolean = false;

  tabelaCartao: string[] = ['nome','numero','modalidade','detalhes','deletar'];
  dadosCartao = exemploCartao;

  tabelaBanco: string[] = ['banco','agencia','conta','detalhes','deletar'];
  dadosBanco = exemploBanco;

  tabelaTag: string[] = ['nome', 'tipo'];
  dadosTag = exemploTag;
  
  constructor(private formBuilder:FormBuilder,public dialog: MatDialog, private shared: SharedService,private route: ActivatedRoute, private _usuarioService:UsuarioService, private mensagem: MensagemComponent) { 

  }

  ngOnInit(): void {
    this._accountId = this.route.snapshot.paramMap.get('id') ?? '';
    this.shared.send(this._accountId);
    this.getUsuario(this._accountId);
    this.criarFormularioUsuario();
  }

  criarFormularioUsuario(){
    this.gerenciaConta = this.formBuilder.group({
      nome:['', Validators.required],
      sobrenome:['', Validators.required],
      email:['', Validators.required],
      salario:['', Validators.required],
      porcentagem:['', Validators.required],
      valorReservado:[{value: '', disabled:true}],
      senha:['', Validators.required]
    })
  }

  calculaPorcentagem(){
    this.reservado = 0;
    this.reservado = (this.gerenciaConta.get('porcentagem')?.value / 100) * this.gerenciaConta.get('salario')?.value;
    this.gerenciaConta.get('valorReservado')?.setValue(this.reservado.toFixed(2));
    this.mostraSalvar();
  }

  async getUsuario(idUsuario: Guid){
    await this._usuarioService.getUsuario(idUsuario).then(result =>{
      this.usuario = result;
    })
  }

  async salvar(){
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
  }

  mostraSalvar(){
    this.updateButton = true;
  }

  openDetalhesBanco(banco: Banco){
    const dialogRef = this.dialog.open(DetalhesContaCorrenteDialogComponent,{
      width: '480px',
      data: {
        banco: banco.banco,
        agencia: banco.agencia,
        conta: banco.conta,
        titular: banco.titular,
        saldo: banco.saldo
      }
    })
  }

  openDetalhesCartao(cartao: Cartao){
    const dialogRef = this.dialog.open(DetalhesCartaoDialogComponent,{
      width: '480px',
      data: {
          nome: cartao.nome,
          numero: cartao.numero,
          modalidade: cartao.modalidade,
          bancoCadastrado: cartao.bancoCadastrado,
          banco: cartao.banco,
          vencimentoFatura: new Date(cartao.vencimentoFatura).toISOString().slice(0,10).replace('T',' '),
          validade: new Date(cartao.validade).toISOString().slice(0,7).replace('T',' '),
          codigo: cartao.codigo     
      }
    })
  }
}
