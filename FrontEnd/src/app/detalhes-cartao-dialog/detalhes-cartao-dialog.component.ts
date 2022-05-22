import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensagemComponent } from '../mensagem/mensagem.component';
import { Cartao } from '../model/cartao.model';

@Component({
  selector: 'app-detalhes-cartao-dialog',
  templateUrl: './detalhes-cartao-dialog.component.html',
  styleUrls: ['./detalhes-cartao-dialog.component.css']
})
export class DetalhesCartaoDialogComponent implements OnInit {
  cadastroCartao: FormGroup;
  temBanco: boolean = false;
  qtdBanco: boolean = false;
  modalidadeCartao: string[] = ['Crédito', 'Débito'];

  constructor(public dialogRef: MatDialogRef<DetalhesCartaoDialogComponent>, 
    private mensagem: MensagemComponent,
    @Inject(MAT_DIALOG_DATA)public data:any,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.checkBanco()
    this.criarFormulario();
    this.temBanco = this.data.cartao.bancoCadastrado;
  }

  criarFormulario(){
    this.cadastroCartao = this.formBuilder.group({
      nome:['', Validators.required],
      titular:['', Validators.required],
      numero:['', Validators.required],
      modalidade:['', Validators.required],
      bancoCadastrado:[],
      banco:['', Validators.required],
      bancoid:['', Validators.required],
      vencimentoFatura:['', Validators.required],
      validade:['', Validators.required],
      codigo:['', Validators.required],
    })
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

  checkBanco(){
    if(this.data.bancos.length > 0){
      this.qtdBanco = true;
    }else{
      this.qtdBanco = false;
    }
  }

}
