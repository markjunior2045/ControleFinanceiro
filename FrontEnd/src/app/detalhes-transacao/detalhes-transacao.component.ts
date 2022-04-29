import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transacao } from '../model/transacao.model';

@Component({
  selector: 'app-detalhes-transacao',
  templateUrl: './detalhes-transacao.component.html',
  styleUrls: ['./detalhes-transacao.component.css']
})
export class DetalhesTransacaoComponent implements OnInit {
  detalhesForm: FormGroup;
  metodoPagamento: string[] = ['Dinheiro','Cartão','Boleto','Pix']

  constructor(public dialogRef: MatDialogRef<DetalhesTransacaoComponent>, 
              @Inject(MAT_DIALOG_DATA)public data:Transacao,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.criaForm();
  }

  fechar(){
    this.dialogRef.close();
  }

  salvar(){
    this.dialogRef.close(this.detalhesForm.value);
  }

  criaForm(){
    this.detalhesForm = this.formBuilder.group({
      descricao: ['', Validators.required],
      valor: ['', Validators.required],
      metodo: ['', Validators.required],
      data: ['', Validators.required]
    })
  }
}
