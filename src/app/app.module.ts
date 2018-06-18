import { NgModule } from '@angular/core';

import { InicioComponent } from './inicio/inicio.component';
import { OutraPaginaComponent } from './inicio/outra-pagina/outra-pagina.component';
import { MdbModulo } from './util/mdb-modulo';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    OutraPaginaComponent,
  ],
  imports: [
    MdbModulo.forRoot().exports.concat(AppRoutingModule)
          ],
  providers: [
    MdbModulo.forRoot().providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
