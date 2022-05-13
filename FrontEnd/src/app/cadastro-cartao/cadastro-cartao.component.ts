import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cartao } from '../model/cartao.model';
import { CartaoService } from '../services/cartao.service';

@Component({
  selector: 'app-cadastro-cartao',
  templateUrl: './cadastro-cartao.component.html',
  styleUrls: ['./cadastro-cartao.component.css']
})

export class CadastroCartaoComponent implements OnInit {

  cadastroCartao: FormGroup;
  cartao: Cartao;
  temBanco: boolean = false;
 
  constructor(private formBuilder:FormBuilder, private _cartaoservice: CartaoService) {
    this.cadastroCartao = formBuilder.group({
      bancoCadastrado: false,
    });
   }

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario(){
    this.cadastroCartao = this.formBuilder.group({
      nome:['', Validators.required],
      numero:['', Validators.required],
      modalidade:['', Validators.required],
      bancoCadastrado:[],
      banco:['', Validators.required],
      vencimentoFatura:['', Validators.required],
      validade:['', Validators.required],
      codigo:['', Validators.required],
    })
  }


  salvar(){
    this.cartao = this.cadastroCartao.value;
    this._cartaoservice.cadastraCartao("",this.cartao).then(() => {
      alert('Salvo com sucesso!');
    }).catch(erro => console.log('Erro: ' + erro)
    );
  }
}
