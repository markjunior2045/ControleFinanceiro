import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensagemComponent } from '../mensagem/mensagem.component';
import { Banco } from '../model/banco.model';

@Component({
  selector: 'app-adiciona-banco',
  templateUrl: './adiciona-banco.component.html',
  styleUrls: ['./adiciona-banco.component.css']
})
export class AdicionaBancoComponent implements OnInit {
  bancoForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AdicionaBancoComponent>,
    private mensagem:MensagemComponent,
    @Inject(MAT_DIALOG_DATA) public data: Banco,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.criaForm();
  }

  fechar(){
    this.dialogRef.close();
  }

  salvar(){
    if(this.bancoForm.valid){
      this.dialogRef.close(this.bancoForm.value);
    }else{
      this.mensagem.mostraAviso('Erro: Preencha os campos corretamente!');
    }
  }

  criaForm(){
    this.bancoForm = this.formBuilder.group({
      banco:['', Validators.required],
      agencia:['', Validators.required],
      conta:['', Validators.required],
      titular:['', Validators.required],
      saldo:['', Validators.required]
    })
  }

}
