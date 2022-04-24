import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroCartaoComponent } from './cadastro-cartao/cadastro-cartao.component';
import { CadastroContaCorrenteComponent } from './cadastro-conta-corrente/cadastro-conta-corrente.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { TransacoesComponent } from './transacoes/transacoes.component';

const routes: Routes = [{ path: '', component: LoginComponent },
                        { path: 'dashboard', component: DashboardComponent},
                        { path: 'transacoes', component: TransacoesComponent},
                        { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
                        { path: 'login', component: LoginComponent },
                        { path: 'cadastro-conta-corrente', component: CadastroContaCorrenteComponent },
                        { path: 'cadastro-cartao', component: CadastroCartaoComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
