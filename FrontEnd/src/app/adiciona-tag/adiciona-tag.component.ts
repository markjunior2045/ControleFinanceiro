import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tag, Tipo } from '../model/tag.model';

@Component({
  selector: 'app-adiciona-tag',
  templateUrl: './adiciona-tag.component.html',
  styleUrls: ['./adiciona-tag.component.css']
})
export class AdicionaTagComponent implements OnInit {
  tagForm: FormGroup;
  tipos: string[];

  constructor(public dialogRef: MatDialogRef<AdicionaTagComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tag,
    tipo:Tipo,
    private formBuilder: FormBuilder) {
      this.tipos = tipo.tipos;
     }

  ngOnInit(): void {
    this.criaForm();
  }

  criaForm(){
    this.tagForm = this.formBuilder.group({
      nome:['', Validators.required],
      tipo:['', Validators.required],
    })
  }

  fechar(){
    this.dialogRef.close();
  }

  salvar(){
    this.dialogRef.close(this.tagForm.value);
  }
}
