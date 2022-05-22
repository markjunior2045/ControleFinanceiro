import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensagemComponent } from '../mensagem/mensagem.component';
import { Banco } from '../model/banco.model';
import { Cartao } from '../model/cartao.model';
import { Guid } from '../model/guid.model';
import { Tag } from '../model/tag.model';
import { Transacao } from '../model/transacao.model';
import { BancoService } from '../services/banco.service';
import { CartaoService } from '../services/cartao.service';
import { TagService } from '../services/tag.service';

@Component({
  selector: 'app-adiciona-transacao',
  templateUrl: './adiciona-transacao.component.html',
  styleUrls: ['./adiciona-transacao.component.css']
})
export class AdicionaTransacaoComponent implements OnInit {
  adicionaForm: FormGroup;
  metodoPagamento: string[] = ['Dinheiro', 'Cartão', 'Boleto', 'Pix'];
  metodoCartao: boolean;
  metodoBanco: boolean;
  cartoes: Cartao[];
  bancos: Banco[];
  tags: Tag[];

  constructor(public dialogRef: MatDialogRef<AdicionaTransacaoComponent>,
    private _bancoService: BancoService,
    private _cartaoService: CartaoService,
    private _tagService: TagService,
    private mensagem: MensagemComponent,
    @Inject(MAT_DIALOG_DATA) public data: Guid,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getBancos(this.data);
    this.getCartoes(this.data);
    this.getTags(this.data);
    this.criaForm();
  }

  fechar() {
    this.dialogRef.close();
  }

  salvar() {
    if (this.adicionaForm.valid) {
      this.dialogRef.close(this.adicionaForm.value);
    } else {
      this.mensagem.mostraAviso('Erro: Preencha os campos corretamente!');
    }

  }

  criaForm() {
    this.adicionaForm = this.formBuilder.group({
      descricao: ['', Validators.required],
      entrada: false,
      valor: ['', Validators.required],
      metodo: ['', Validators.required],
      cartaoid: [''],
      bancoid: [''],
      tags: [],
      data: [new Date().toISOString().slice(0, 10).replace('T', ' '), Validators.required]
    })
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

  async getTags(idUsuario: Guid) {
    await this._tagService.getTags(idUsuario).then(result => {
      if (result != null) {
        this.tags = result[0].tag;
      }
    }).catch(error => {
      console.log(error);
    })
  }

  metodo() {
    switch (this.adicionaForm.controls['metodo'].value) {
      case "Cartão":
        this.metodoCartao = true;
        this.metodoBanco = false;
        this.adicionaForm.controls['cartaoid'].setValidators(Validators.required);
        this.adicionaForm.controls['bancoid'].setValidators(null);
        break;
      case "Pix":
        this.metodoCartao = false;
        this.metodoBanco = true;
        this.adicionaForm.controls['cartaoid'].setValidators(null);
        this.adicionaForm.controls['bancoid'].setValidators(Validators.required);
        break;
      default:
        this.adicionaForm.controls['cartaoid'].clearValidators();
        this.adicionaForm.controls['bancoid'].clearValidators();
        this.metodoCartao = false;
        this.metodoBanco = false;
        break;
    }
    this.adicionaForm.controls['cartaoid'].updateValueAndValidity();
    this.adicionaForm.controls['bancoid'].updateValueAndValidity();
  }


}
