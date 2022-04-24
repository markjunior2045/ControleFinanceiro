import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css']
})
export class AlertaComponent implements OnInit {
  message: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data:string) { }

  ngOnInit(): void {
    this.message = this.data;
  }

}
