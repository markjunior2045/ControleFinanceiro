import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guid } from '../model/guid.model';
import { qtdTipos } from '../model/tag.model';
import { TagService } from '../services/tag.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  private _accountid: Guid;
  qtdTipos:qtdTipos[];
  loaded:boolean = false;
  tipos:chartData[] = [];
  saleData:chartData[] = [
    { name: "Conta de água", value: 200 },
    { name: "Conta de luz", value: 300 },
    { name: "Internet", value: 100 },
    { name: "Mercado", value: 0 },
    { name: "Farmácia", value: 0 }
  ];

  constructor(private route: ActivatedRoute,private _tagService: TagService) {}

  ngOnInit(): void {
    this._accountid = this.route.snapshot.paramMap.get('id') ?? '';
    this.countTagTipos(this._accountid);
  }
  
  async countTagTipos(idUsuario: Guid){
    await this._tagService.countTipos(idUsuario).then(result => {
      this.qtdTipos = result;
      this.qtdTipos.forEach(tipo => {
        this.tipos.push({name:tipo.tipo,value:tipo.qtd});
      })
      this.loaded = true;
    })
  }
}

interface chartData{
  name: string;
  value:number;
}
