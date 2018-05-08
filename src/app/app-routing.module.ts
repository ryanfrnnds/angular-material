import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { AcessoAutenticado } from './modulos/seguranca/guarda-rotas/acesso-autenticado';
import { AutenticacaoComponent } from '../app/modulos/seguranca/autenticacao/autenticacao.component';
import { OutraPaginaComponent } from './inicio/outra-pagina/outra-pagina.component';



const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'autenticar', component: AutenticacaoComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'outraPagina', component: OutraPaginaComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
