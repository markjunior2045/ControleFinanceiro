import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

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
  constructor() { }

  ngOnInit(): void {
  }

}
