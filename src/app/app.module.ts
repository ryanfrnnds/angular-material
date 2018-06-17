import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

import { InicioComponent } from './inicio/inicio.component';
import { OutraPaginaComponent } from './inicio/outra-pagina/outra-pagina.component';

import { MdbModulo } from './teste/teste';
import { CompartilhadoModule} from '../app/compartilhados/compartilhado.module';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    OutraPaginaComponent,
  ],
  imports: [
    MdbModulo.forRoot().exports
  ],
  providers: [
    MdbModulo.forRoot().providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
