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
<<<<<<< HEAD
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
=======
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
>>>>>>> 99906434c978a31ea73a384804b3392ff3b9b82b
import { DataService } from './services/dataService';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
<<<<<<< HEAD
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransacoesComponent } from './transacoes/transacoes.component';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { AlertaComponent } from './alerta/alerta.component';
=======
import { MatCheckboxModule } from '@angular/material/checkbox';
>>>>>>> 99906434c978a31ea73a384804b3392ff3b9b82b

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
    AlertaComponent
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
<<<<<<< HEAD
    MatTableModule,
    MatSnackBarModule
=======
    MatCheckboxModule
>>>>>>> 99906434c978a31ea73a384804b3392ff3b9b82b
  ],
  providers: [DataService,{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
