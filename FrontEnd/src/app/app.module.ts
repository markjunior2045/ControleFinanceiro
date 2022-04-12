import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CadastroCartaoComponent } from './cadastro-cartao/cadastro-cartao.component';
import { CadastroContaCorrenteComponent } from './cadastro-conta-corrente/cadastro-conta-corrente.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroCartaoComponent,
    CadastroContaCorrenteComponent,
    CadastroUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
