import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private formBuilder:FormBuilder, private _usuarioservice: UsuarioService) { }

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario(){
    this.cadastroUsuario = this.formBuilder.group({
      nome:['', Validators.required],
      sobrenome:['', Validators.required],
      email:['', Validators.required],
      salario:['', Validators.required],
      porcentagem:['', Validators.required],
      senha:['', Validators.required]
    })
  }

  salvar(){
    this.usuario = this.cadastroUsuario.value;
    this.usuario.valorReservado = (this.usuario.porcentagem / 100) * this.usuario.salario;
    this._usuarioservice.cadastraUsuario(this.usuario).then(() => {
      alert('Salvo com sucesso!');
    }).catch(erro => console.log('Erro: ' + erro)
    );
  }
}
