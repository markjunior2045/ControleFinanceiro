import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacao-dialog',
  templateUrl: './confirmacao-dialog.component.html',
  styleUrls: ['./confirmacao-dialog.component.css']
})
export class ConfirmacaoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmacaoDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  confirm() {
    this.dialogRef.close(true);
  }

}
