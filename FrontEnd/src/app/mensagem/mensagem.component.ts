import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertaComponent } from '../alerta/alerta.component';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.css']
})
export class MensagemComponent {

  constructor(private _snackBar: MatSnackBar) { }

  mostraAviso(mensagem: string){
    this._snackBar.openFromComponent(AlertaComponent, {
      data: mensagem
    })
  }
}
