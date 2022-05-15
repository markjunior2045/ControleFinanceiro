import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertaComponent } from '../alerta/alerta.component';
import { MensagemComponent } from '../mensagem/mensagem.component';
import { Usuario } from '../model/usuario.model';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  cadastroUsuario: FormGroup;
  usuario: Usuario;
  reservado: number;

  constructor(private formBuilder: FormBuilder, private _usuarioservice: UsuarioService, private mensagem: MensagemComponent, private router: Router) { }

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario() {
    this.cadastroUsuario = this.formBuilder.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', Validators.required,Validators.email],
      salario: ['', Validators.required],
      porcentagem: ['', Validators.required],
      valorReservado: [{ value: '', disabled: true }, Validators.required],
      senha: ['', Validators.required]
    })
  }

  calculaPorcentagem() {
    this.reservado = 0;
    this.reservado = (this.cadastroUsuario.get('porcentagem')?.value / 100) * this.cadastroUsuario.get('salario')?.value;
    this.cadastroUsuario.get('valorReservado')?.setValue(this.reservado.toFixed(2))
  }

  async salvar() {
    if (this.cadastroUsuario.valid) {
      this.usuario = this.cadastroUsuario.value;
      await this._usuarioservice.checkEmail(this.usuario.email).then(async result => {
        if (result != null) {
          if (result) {
            this.mensagem.mostraAviso('Erro: Email já cadastrado!');
          } else {
            this.usuario.valorReservado = (this.usuario.porcentagem / 100) * this.usuario.salario;
            await this._usuarioservice.cadastraUsuario(this.usuario).then(() => {
              this.mensagem.mostraAviso('Cadastrado com Sucesso!');
              this.router.navigate(['/']);
            }).catch(error => this.mensagem.mostraAviso('Erro ao Cadastrar'));
          }
        } else {
          this.mensagem.mostraAviso('Erro ao Cadastrar');
        }
      })
    } else {
      this.mensagem.mostraAviso('Preencha todos os campos corretamente!');
    }
  }


}
