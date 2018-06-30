import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { OutraPaginaComponent } from './inicio/outra-pagina/outra-pagina.component';
import { MdbRoutes } from './util/mdb-routes';


const routes: Routes = [
  ...MdbRoutes.forRoot(),
  { path: 'inicio', component: InicioComponent},
  { path: 'outraPagina', component: OutraPaginaComponent},
  { path: '**', redirectTo: 'inicio', pathMatch: 'full'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
