import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CadastroCartaoComponent } from './cadastro-cartao/cadastro-cartao.component';
import { CadastroContaCorrenteComponent } from './cadastro-conta-corrente/cadastro-conta-corrente.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from './services/dataService';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransacoesComponent } from './transacoes/transacoes.component';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { AlertaComponent } from './alerta/alerta.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { DetalhesTransacaoComponent } from './detalhes-transacao/detalhes-transacao.component';
import { MatSelectModule } from '@angular/material/select';
import { GerenciamentoContaComponent } from './gerenciamento-conta/gerenciamento-conta.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { DetalhesContaCorrenteDialogComponent } from './detalhes-conta-corrente-dialog/detalhes-conta-corrente-dialog.component';
import { DetalhesCartaoDialogComponent } from './detalhes-cartao-dialog/detalhes-cartao-dialog.component';
import { MensagemComponent } from './mensagem/mensagem.component';
import { SharedService } from './services/shared.service';
import { AdicionaTransacaoComponent } from './adiciona-transacao/adiciona-transacao.component';
import { ConfirmacaoDialogComponent } from './confirmacao-dialog/confirmacao-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroCartaoComponent,
    CadastroContaCorrenteComponent,
    CadastroUsuarioComponent,
    ToolbarComponent,
    DashboardComponent,
    TransacoesComponent,
    AlertaComponent,
    DetalhesTransacaoComponent,
    GerenciamentoContaComponent,
    DetalhesContaCorrenteDialogComponent,
    DetalhesCartaoDialogComponent,
    MensagemComponent,
    AdicionaTransacaoComponent,
    ConfirmacaoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    MatGridListModule,
    MatDividerModule,
    MatTabsModule
  ],
  providers: [DataService,MensagemComponent,SharedService,{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
