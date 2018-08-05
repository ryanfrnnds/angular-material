import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { OutraPaginaComponent } from './inicio/outra-pagina/outra-pagina.component';
import { MdbRoutes } from './util/mdb-routes';
import { MdbAutenticacaoServico } from './modulos/seguranca/autenticacao/mdb-autenticacao.servico';
import { MdbAcsServico } from './modulos/acs/servico';


const routes: Routes = [
  ...MdbRoutes.forRoot(),
  { path: 'inicio', component: InicioComponent},
  { path: 'outraPagina', component: OutraPaginaComponent, canActivate: [MdbAutenticacaoServico, MdbAcsServico],
  data: { 
    funcoes: ['MNT0002']
  }},
  { path: '**', redirectTo: 'inicio', pathMatch: 'full'}
];

@NgModule({
  imports: [[RouterModule.forRoot(routes, {useHash: true})]],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
