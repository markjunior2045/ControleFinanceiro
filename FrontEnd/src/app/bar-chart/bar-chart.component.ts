import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guid } from '../model/guid.model';
import { TotalMes } from '../model/transacao.model';
import { TransacaoService } from '../services/transacao.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  private _accountid: Guid;
  loaded:boolean = false;
  meses:chartData[] = [];
  totalMeses:TotalMes[];
  nomeMes:string[] = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  saleData = [
    { name: "Janeiro", value: 200 },
    { name: "Fevereiro", value: 900 },
    { name: "MAR", value: 100 },
    { name: "ABR", value: 20 },
    { name: "MAI", value: 10 },
    { name: "JUN", value: 200 },
    { name: "JUL", value: 300 },
    { name: "AGO", value: 100 },
    { name: "SET", value: 20 },
    { name: "OUT", value: 10 },
    { name: "NOV", value: 200 },
    { name: "Dezembro", value: 300 }
  ];
  constructor(private route: ActivatedRoute,private _transacaoService: TransacaoService) { }

  ngOnInit(): void {
    this._accountid = this.route.snapshot.paramMap.get('id') ?? '';
    this.somaTotalMes(this._accountid);
  }

  async somaTotalMes(idUsuario:Guid){
    await this._transacaoService.getSomaMesTransacao(idUsuario).then(result => {
      this.totalMeses = result;
      this.totalMeses.forEach(mes => {
        this.meses.push({name:this.nomeMes[mes.Mes],value:mes.qtd});
      })
      this.loaded = true;
    })
  }
}

interface chartData{
  name: string;
  value:number;
}
