import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  modalidadeCartao: string[] = ['Crédito', 'Débito'];

  constructor(public dialogRef: MatDialogRef<AdicionaCartaoComponent>, 
    @Inject(MAT_DIALOG_DATA)public data:Banco[],
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.criarFormulario();
    this.temBanco = false;
  }

  criarFormulario(){
    this.cadastroCartao = this.formBuilder.group({
      nome:['', Validators.required],
      numero:['', Validators.required],
      modalidade:['', Validators.required],
      bancoCadastrado: false,
      banco:['', Validators.required],
      bancoid:['', Validators.required],
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
