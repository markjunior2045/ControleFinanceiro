import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  saleData = [
    { name: "Conta de água", value: 200 },
    { name: "Conta de luz", value: 300 },
    { name: "Internet", value: 100 },
    { name: "Mercado", value: 0 },
    { name: "Farmácia", value: 0 }
  ];

  constructor() {}

  ngOnInit(): void {
  }
 
}
