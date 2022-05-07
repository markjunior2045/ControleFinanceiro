import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transacao } from '../model/transacao.model';

@Component({
  selector: 'app-adiciona-transacao',
  templateUrl: './adiciona-transacao.component.html',
  styleUrls: ['./adiciona-transacao.component.css']
})
export class AdicionaTransacaoComponent implements OnInit {
  adicionaForm: FormGroup;
  metodoPagamento: string[] = ['Dinheiro','Cartão','Boleto','Pix']

  constructor(public dialogRef: MatDialogRef<AdicionaTransacaoComponent>, 
              @Inject(MAT_DIALOG_DATA)public data:Transacao,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.criaForm();
  }

  fechar(){
    this.dialogRef.close();
  }

  salvar(){
    this.dialogRef.close(this.adicionaForm.value);
  }

  criaForm(){
    this.adicionaForm = this.formBuilder.group({
      descricao: ['', Validators.required],
      valor: ['', Validators.required],
      metodo: ['', Validators.required],
      data: ['', Validators.required]
    })
  }
}
