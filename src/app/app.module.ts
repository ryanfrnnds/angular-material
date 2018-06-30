import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
    MdbModulo.forRoot().exports,
    AppRoutingModule
  ],
  providers: [
    MdbModulo.forRoot().providers
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
