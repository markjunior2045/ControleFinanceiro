import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guid } from '../model/guid.model';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private _accountid:Guid;

  constructor(private route: ActivatedRoute, private shared: SharedService) { }

  ngOnInit(): void {
    this._accountid = this.route.snapshot.paramMap.get('id') ?? '';
    this.shared.send(this._accountid);
  }

}
