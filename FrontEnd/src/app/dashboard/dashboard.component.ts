import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guid } from '../model/guid.model';
import { SharedService } from '../services/shared.service';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Banco } from '../model/banco.model';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../model/usuario.model';
import { BancoService } from '../services/banco.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  exemploUsuario: Usuario =
    {
      id: '1',
      nome: '-',
      sobrenome: '-',
      email: '-',
      porcentagem: 0,
      senha: '-',
      salario: 10,
      valorReservado: 10,
      banco: [],
      cartao: [],
      tag: [],
      transacoes: [],
    }

  private _accountid: Guid;
  usuario: Usuario;
  saldoTotal: number = 0;
  dadosBancoCarregados:boolean = false;
  dadosUsuarioCarregados:boolean = false;

  bancos: Banco[]
  // [{
  //   id: 1,
  //   agencia: 190,
  //   banco: "Santander",
  //   conta: 111122,
  //   saldo: 900.50,
  //   titular: "Lucas"
  // }, {
  //   id: 2,
  //   agencia: 120,
  //   banco: "Caixa",
  //   conta: 3903,
  //   saldo: 8000.38,
  //   titular: "Marcos"
  // }]

  getCards(){
    
  }

  cards1 = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Saldo atual total', cols: 1, rows: 1, content: "R$ " + this.saldoTotal.toFixed(2), msg: "Soma dos saldos de todos os bancos" },
          { title: 'Salário mensal', cols: 1, rows: 1, content: "R$ " + this.usuario.valorReservado.toFixed(2), msg: "Valor entrada mensal com base no salário" },
          { title: 'Reserva por mês', cols: 1, rows: 1, content: "R$ " + this.usuario.valorReservado.toFixed(2), msg: "Valor a ser reservado do salário" }
        ];
      }

      return [
        { title: 'Saldo atual total', cols: 1, rows: 1, content: "R$ " + this.saldoTotal.toFixed(2), msg: "Soma dos saldos de todos os bancos" },
        { title: 'Salário mensal', cols: 1, rows: 1, content: "R$ " + this.usuario.salario.toFixed(2), msg: "Valor entrada mensal com base no salário" },
        { title: 'Reserva por mês', cols: 1, rows: 1, content: "R$ " + this.usuario.valorReservado.toFixed(2), msg: "Valor a ser reservado do salário" }
      ];
    })
  );

  cards2 = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { id: 1, title: 'Gráfico de despezas por categoria', cols: 1, rows: 1},
          { id: 2, title: 'Gráfico de despezas totais por mês', cols: 1, rows: 1 }
        ];
      }

      return [
        { id: 1, title: 'Gráfico de despezas por categoria', cols: 1, rows: 1},
        { id: 2, title: 'Gráfico de despezas totais por mês', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private route: ActivatedRoute,
    private shared: SharedService,
    private breakpointObserver: BreakpointObserver,
    private _usuarioService: UsuarioService,
    private _bancoService: BancoService) { }

  ngOnInit(): void {
    this._accountid = this.route.snapshot.paramMap.get('id') ?? '';
    this.shared.send(this._accountid);
    this.getUsuario(this._accountid);
    this.getBancos(this._accountid);
  }

  async getUsuario(idUsuario: Guid) {
    await this._usuarioService.getUsuario(idUsuario).then(result => {
      this.usuario = result;
      this.dadosUsuarioCarregados = true;
    })
  }

  async getBancos(idUsuario: Guid) {
    await this._bancoService.getBancos(idUsuario).then(result => {
      this.bancos = result[0].banco;
      this.bancos.forEach(banco => {
        this.saldoTotal += banco.saldo;
      })
      this.dadosBancoCarregados = true
    })
  }
}
