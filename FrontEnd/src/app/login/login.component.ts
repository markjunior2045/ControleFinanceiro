import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../model/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup;
  usuario: Usuario;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario(){
    this.login = this.formBuilder.group({
      email: ['', Validators.required],
      senha: ['', Validators.required]
    })
  }

  entrar(){
    this.usuario = this.login.value;
    console.log(this.usuario);
  }
    
}
