import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Banco } from '../model/banco.model';
import { BancoService } from '../services/banco.service';

@Component({
  selector: 'app-cadastro-conta-corrente',
  templateUrl: './cadastro-conta-corrente.component.html',
  styleUrls: ['./cadastro-conta-corrente.component.css']
})
export class CadastroContaCorrenteComponent implements OnInit {

  cadastroContaCorrente: FormGroup;
  banco: Banco;

  constructor(private formBuilder: FormBuilder, private _bancoService: BancoService) { }

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario(){
    this.cadastroContaCorrente = this.formBuilder.group({
      banco:['', Validators.required],
      agencia:['', Validators.required],
      conta:['', Validators.required],
      titular:['', Validators.required],
      saldo:['', Validators.required]
    })
  }

  salvar(){
    this.banco = this.cadastroContaCorrente.value;
    this._bancoService.cadastraBanco("",this.banco).then(() => {
      alert('Salvo com sucesso!');
    }).catch(erro => console.log('Erro: ' + erro)
    );
  }
}
