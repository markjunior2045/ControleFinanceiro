import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertaComponent } from '../alerta/alerta.component';
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

  constructor(private formBuilder:FormBuilder, private _usuarioservice: UsuarioService, private _snackBar: MatSnackBar) { }

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
      valorReservado:[{ value:'', disabled:true}],
      senha:['', Validators.required]
    })
  }

  calculaPorcentagem(){
    this.reservado = 0;
    this.reservado = (this.cadastroUsuario.get('porcentagem')?.value / 100) * this.cadastroUsuario.get('salario')?.value;
    this.cadastroUsuario.get('valorReservado')?.setValue(this.reservado.toFixed(2))
  }

  salvar(){
    this.usuario = this.cadastroUsuario.value;
    this.usuario.valorReservado = (this.usuario.porcentagem / 100) * this.usuario.salario;
    this._usuarioservice.cadastraUsuario(this.usuario).then(() => {
      this.mostraAviso('Cadastrado com Sucesso!')
    }).catch(error => this.mostraAviso('Erro ao Cadastrar'));
  }

  mostraAviso(mensagem: string){
    this._snackBar.openFromComponent(AlertaComponent, {
      data: mensagem
    })
  }
}
