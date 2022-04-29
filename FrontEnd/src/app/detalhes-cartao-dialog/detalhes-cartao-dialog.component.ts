import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cartao } from '../model/cartao.model';

@Component({
  selector: 'app-detalhes-cartao-dialog',
  templateUrl: './detalhes-cartao-dialog.component.html',
  styleUrls: ['./detalhes-cartao-dialog.component.css']
})
export class DetalhesCartaoDialogComponent implements OnInit {
  cadastroCartao: FormGroup;
  temBanco: boolean = false;
  modalidadeCartao: string[] = ['Crédito', 'Débito'];

  constructor(public dialogRef: MatDialogRef<DetalhesCartaoDialogComponent>, 
    @Inject(MAT_DIALOG_DATA)public data:Cartao,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.criarFormulario();
    this.temBanco = this.data.bancoCadastrado;
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

  fechar(){
    this.dialogRef.close();
  }

  salvar(){
    this.dialogRef.close(this.cadastroCartao.value);
  }

}
