import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetalhesContaCorrenteDialogComponent } from '../detalhes-conta-corrente-dialog/detalhes-conta-corrente-dialog.component';
import { Tag } from '../model/tag.model';

@Component({
  selector: 'app-detalhes-tag-dialog',
  templateUrl: './detalhes-tag-dialog.component.html',
  styleUrls: ['./detalhes-tag-dialog.component.css']
})
export class DetalhesTagDialogComponent implements OnInit {
  detalhesForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<DetalhesContaCorrenteDialogComponent>, 
    @Inject(MAT_DIALOG_DATA)public data:Tag,
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
      nome: ['', Validators.required],
      tipo: ['', Validators.required]
    })
  }
}
