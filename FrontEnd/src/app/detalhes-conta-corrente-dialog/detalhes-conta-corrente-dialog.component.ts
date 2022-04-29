import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Banco } from '../model/banco.model';

@Component({
  selector: 'app-detalhes-conta-corrente-dialog',
  templateUrl: './detalhes-conta-corrente-dialog.component.html',
  styleUrls: ['./detalhes-conta-corrente-dialog.component.css']
})
export class DetalhesContaCorrenteDialogComponent implements OnInit {
  detalhesForm: FormGroup;
  
  constructor(public dialogRef: MatDialogRef<DetalhesContaCorrenteDialogComponent>, 
    @Inject(MAT_DIALOG_DATA)public data:Banco,
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
      banco: ['', Validators.required],
      agencia: ['', Validators.required],
      conta: ['', Validators.required],
      titular: ['', Validators.required],
      saldo: ['', Validators.required]
    })
  }
}
