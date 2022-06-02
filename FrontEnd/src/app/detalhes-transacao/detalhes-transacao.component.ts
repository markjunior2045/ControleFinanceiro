import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensagemComponent } from '../mensagem/mensagem.component';
import { Banco } from '../model/banco.model';
import { Cartao } from '../model/cartao.model';
import { Guid } from '../model/guid.model';
import { Transacao } from '../model/transacao.model';
import { BancoService } from '../services/banco.service';
import { CartaoService } from '../services/cartao.service';

@Component({
  selector: 'app-detalhes-transacao',
  templateUrl: './detalhes-transacao.component.html',
  styleUrls: ['./detalhes-transacao.component.css']
})
export class DetalhesTransacaoComponent implements OnInit {
  detalhesForm: FormGroup;
  metodoPagamento: string[] = ['Dinheiro', 'Cartão', 'Boleto', 'Pix'];
  metodoCartao: boolean;
  metodoBanco: boolean;
  showMetodo: boolean;
  cartoes: Cartao[];
  bancos: Banco[];

  constructor(public dialogRef: MatDialogRef<DetalhesTransacaoComponent>,
    private _bancoService: BancoService,
    private _cartaoService: CartaoService,
    private mensagem: MensagemComponent,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getBancos(this.data.idUsuario);
    this.getCartoes(this.data.idUsuario);
    this.criaForm();
    this.metodoInicial();
    this.entrada();
  }

  fechar() {
    this.dialogRef.close();
  }

  salvar() {
    this.dialogRef.close(this.detalhesForm.value);
  }

  criaForm() {
    this.detalhesForm = this.formBuilder.group({
      descricao: ['', Validators.required],
      entrada: false,
      pago: false,
      parcelado: false,
      quantidadeParcelas: ['',Validators.required],
      valor: ['', Validators.required],
      metodo: ['', Validators.required],
      cartaoid: [''],
      bancoid: [''],
      data: ['', Validators.required]
    })
    this.detalhesForm.controls['quantidadeParcelas'].disable();
  }

  async getCartoes(idUsuario: Guid) {
    await this._cartaoService.getCartao(idUsuario).then(result => {
      if (result != null) {
        this.cartoes = result[0].cartao;
      }
    }).catch(error => {
      console.log(error);
    })
  }

  async getBancos(idUsuario: Guid) {
    await this._bancoService.getBancos(idUsuario).then(result => {
      if (result != null) {
        this.bancos = result[0].banco;
      }
    }).catch(error => {
      console.log(error);
    })
  }

  metodo() {
    switch (this.detalhesForm.controls['metodo'].value) {
      case "Cartão":
        this.metodoCartao = true;
        this.metodoBanco = false;
        this.detalhesForm.controls['cartaoid'].setValidators(Validators.required);
        this.detalhesForm.controls['bancoid'].setValidators(null);
        break;
      case "Pix":
        this.metodoCartao = false;
        this.metodoBanco = true;
        this.detalhesForm.controls['cartaoid'].setValidators(null);
        this.detalhesForm.controls['bancoid'].setValidators(Validators.required);
        break;
      default:
        this.detalhesForm.controls['cartaoid'].clearValidators();
        this.detalhesForm.controls['bancoid'].clearValidators();
        this.metodoCartao = false;
        this.metodoBanco = false;
        break;
    }
    this.detalhesForm.controls['cartaoid'].updateValueAndValidity();
    this.detalhesForm.controls['bancoid'].updateValueAndValidity();
  }

  metodoInicial() {
    switch (this.data.metodo) {
      case "Cartão":
        this.metodoCartao = true;
        this.metodoBanco = false;
        break;
      case "Pix":
        this.metodoCartao = false;
        this.metodoBanco = true;
        break;
      default:
        this.metodoCartao = false;
        this.metodoBanco = false;
        break;
    }
  }

  entrada() {
    if (!this.detalhesForm.controls['entrada'].value == true) {
      this.showMetodo = false;
      this.metodo();
    } else {
      this.showMetodo = true;
      this.metodo();
    }
  }

}
