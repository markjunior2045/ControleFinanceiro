import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensagemComponent } from '../mensagem/mensagem.component';
import { Banco } from '../model/banco.model';
import { Cartao } from '../model/cartao.model';

@Component({
  selector: 'app-adiciona-cartao',
  templateUrl: './adiciona-cartao.component.html',
  styleUrls: ['./adiciona-cartao.component.css']
})
export class AdicionaCartaoComponent implements OnInit {
  cadastroCartao: FormGroup;
  temBanco: boolean = false;
  qtdBanco: boolean = false;
  modalidadeCartao: string[] = ['Crédito', 'Débito'];

  constructor(public dialogRef: MatDialogRef<AdicionaCartaoComponent>, 
    private mensagem: MensagemComponent,
    @Inject(MAT_DIALOG_DATA)public data:Banco[],
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.checkBanco();
    this.criarFormulario();
    this.temBanco = false;
  }

  criarFormulario(){
    this.cadastroCartao = this.formBuilder.group({
      nome:['', Validators.required],
      titular:['', Validators.required],
      numero:['', Validators.required],
      modalidade:['', Validators.required],
      bancoCadastrado: false,
      banco:['', Validators.required],
      bancoid:[''],
      vencimentoFatura:['', Validators.required],
      validade:['', Validators.required],
      codigo:['', Validators.required],
    })
  }

  checkBanco(){
    if(this.data.length > 0){
      this.qtdBanco = true;
    }else{
      this.qtdBanco = false;
    }
  }

  validaBanco(){
    if(this.cadastroCartao.controls['bancoCadastrado'].value){
      this.cadastroCartao.controls['banco'].setValidators(null);
      this.cadastroCartao.controls['bancoid'].setValidators(Validators.required);
    }else{
      this.cadastroCartao.controls['banco'].setValidators(Validators.required);
      this.cadastroCartao.controls['bancoid'].setValidators(null);
    }
    this.cadastroCartao.controls['banco'].setValue('');
    this.cadastroCartao.controls['bancoid'].setValue('');
    this.cadastroCartao.controls['banco'].updateValueAndValidity();
    this.cadastroCartao.controls['bancoid'].updateValueAndValidity();
  }

  fechar(){
    this.dialogRef.close();
  }

  salvar(){
    if(this.cadastroCartao.valid){
      this.dialogRef.close(this.cadastroCartao.value);
    }else{
      this.mensagem.mostraAviso('Erro: Preencha os campos corretamente');
    }
  }

}
