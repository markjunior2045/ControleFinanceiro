import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Banco } from '../model/banco.model';
import { Cartao } from '../model/cartao.model';

const exemploCartao:Cartao[] = [
  {
    id: '1',
    nome: 'Lucas',
    numero: 1234567890100101,
    modalidade: 'crédito',
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

  tabelaCartao: string[] = ['nome','numero','modalidade','detalhes'];
  dadosCartao = exemploCartao;

  tabelaBanco: string[] = ['banco','agencia','conta','detalhes'];
  dadosBanco = exemploBanco;
  
  constructor(private formBuilder:FormBuilder) { 

  }

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario(){
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

}
