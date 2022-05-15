import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { TransacoesComponent } from './transacoes/transacoes.component';
import { GerenciamentoContaComponent } from './gerenciamento-conta/gerenciamento-conta.component';

const routes: Routes = [{ path: '', component: LoginComponent },
                        { path: 'dashboard', component: DashboardComponent},
                        { path: 'transacoes', component: TransacoesComponent},
                        { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
                        { path: 'login', component: LoginComponent },
                        { path: 'gerenciamento-conta', component: GerenciamentoContaComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
