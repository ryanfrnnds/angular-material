import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MdbAcsServico, MdbAutenticacaoServico, MdbRoutes } from 'mdias-componentes';

import { InicioComponent } from './paginas/inicio/inicio.component';
import { OutraPaginaListagemComponent } from './paginas/outra-pagina/outra-pagina-listagem/outra-pagina-listagem.component';
import { OutraPaginaFormularioComponent } from './paginas/outra-pagina/outra-pagina-formulario/outra-pagina-formulario.component';
import { TechdayRoutes } from './paginas/techday/techday-routing.module';


/*
  MdbAutenticacaoServico -- Para validar se usuário esta logado em REDE
  MdbAcsServico -- Para validar se usuário possui acesso a pagina via CONF em ACS.
*/
const routes: Routes = [
  ...MdbRoutes.forRoot(),
  { path: 'inicio',  component: InicioComponent},
  { 
    path: 'outra-pagina', canActivate: [MdbAutenticacaoServico, MdbAcsServico],
    data: { 
      funcoes: [''] //Funcao ACS
    } ,
    children: [
      { path: 'listagem', component: OutraPaginaListagemComponent},    
      { path: 'formulario', component: OutraPaginaFormularioComponent},    
    ]
  },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
