import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { MDBAutenticacaoComponent } from '../app/modulos/seguranca/autenticacao/mdb-autenticacao.component';
import { OutraPaginaComponent } from './inicio/outra-pagina/outra-pagina.component';
import { MdbAcsServico } from './modulos/acs/servico';
import { MdbAutenticacaoServico } from './modulos/seguranca/autenticacao/mdb-autenticacao.servico';



const routes: Routes = [
  { path: 'autenticar', component: MDBAutenticacaoComponent },
  { path: 'inicio', component: InicioComponent, canActivate: [MdbAutenticacaoServico, MdbAcsServico], data: { 
    funcoes: ['MNT0001','MNT0002']
    }
  },
  { path: 'outraPagina', component: OutraPaginaComponent},
  { path: '**', redirectTo: 'inicio', pathMatch: 'full'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
