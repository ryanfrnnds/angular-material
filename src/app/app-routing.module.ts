import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ComponentesComponent } from './paginas/componentes/componentes.component';
import { PadroesComponent } from './paginas/padroes/padroes.component';
import { QuickStartComponent } from './paginas/quick-start/quick-start.component';
import { FormularioPadraoComponent } from './paginas/formulario-padrao/formulario-padrao.component';
import { FormularioPadraoFormComponent } from './paginas/formulario-padrao/formulario-padrao-form/formulario-padrao-form.component';

import { InicioComponent } from './inicio/inicio.component';
import { AutenticacaoComponent } from './modulos/seguranca/autenticacao';
import { AcessoAutenticado } from './modulos/seguranca/guarda-rotas/acesso-autenticado';



const routes: Routes = [
  { path: '', redirectTo: 'autenticar', pathMatch: 'full' },
  { path: 'autenticar', component: AutenticacaoComponent },
  { path: 'inicio', component: InicioComponent, },
  { path: 'componentes', component: ComponentesComponent},
  { path: 'padroes', component: PadroesComponent},
  { path: 'quickstart', component: QuickStartComponent},
  { path: 'formulario-padrao', component: FormularioPadraoComponent},
  { path: 'formulario-padrao/form', component: FormularioPadraoFormComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
