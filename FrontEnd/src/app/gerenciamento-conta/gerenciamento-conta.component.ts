import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DetalhesCartaoDialogComponent } from '../detalhes-cartao-dialog/detalhes-cartao-dialog.component';
import { DetalhesContaCorrenteDialogComponent } from '../detalhes-conta-corrente-dialog/detalhes-conta-corrente-dialog.component';
import { Banco } from '../model/banco.model';
import { Cartao } from '../model/cartao.model';

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


@Component({
  selector: 'app-gerenciamento-conta',
  templateUrl: './gerenciamento-conta.component.html',
  styleUrls: ['./gerenciamento-conta.component.css']
})
export class GerenciamentoContaComponent implements OnInit {

  gerenciaConta: FormGroup;

  tabelaCartao: string[] = ['nome','numero','modalidade','detalhes','deletar'];
  dadosCartao = exemploCartao;

  tabelaBanco: string[] = ['banco','agencia','conta','detalhes'];
  dadosBanco = exemploBanco;
  
  constructor(private formBuilder:FormBuilder,public dialog: MatDialog) { 

  }

  ngOnInit(): void {
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