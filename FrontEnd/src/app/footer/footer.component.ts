import { Component, OnInit } from '@angular/core';
import { Guid } from '../model/guid.model';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {

  public idUsuario: Guid = "";

  constructor(private shared: SharedService) {
    
    this.shared.obs.subscribe((data) => {
      this.idUsuario = data;
    })

   }

  ngOnInit(): void {
  }

}
