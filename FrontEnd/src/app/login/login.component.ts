import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensagemComponent } from '../mensagem/mensagem.component';
import { Guid } from '../model/guid.model';
import { Usuario } from '../model/usuario.model';
import { SharedService } from '../services/shared.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup;
  usuario: Usuario;
  idUsuario: Guid;

  constructor(private formBuilder: FormBuilder, private router: Router, private _usuarioService: UsuarioService, private mensagem: MensagemComponent) { }

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario() {
    this.login = this.formBuilder.group({
      email: ['', Validators.required],
      senha: ['', Validators.required]
    })
  }

  async entrar() {
    this.idUsuario = '';
    this.usuario = this.login.value;
    await this._usuarioService.login(this.usuario).then(result => {
      if (result != null) {
        this.idUsuario = result;
        if (this.idUsuario != null || this.idUsuario != '') {
          this.router.navigate(['/dashboard', { id: this.idUsuario}]);
        }
      } else {
        this.mensagem.mostraAviso('Email ou Senha incorretos!')
      }
    }).catch(error => {
      console.log(error);
      this.mensagem.mostraAviso('Erro ao tentar fazer login')
    });
  }
}
