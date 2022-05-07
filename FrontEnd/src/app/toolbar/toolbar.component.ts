import { Component, OnInit } from '@angular/core';
import { Guid } from '../model/guid.model';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  public idUsuario: Guid = "";

  constructor(private shared: SharedService) {

    this.shared.obs.subscribe((data) => {
      this.idUsuario = data;
    })
  }

  ngOnInit(): void {
  }

}
