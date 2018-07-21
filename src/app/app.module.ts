import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {MdbModulo} from "mdias-componentes/";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { InicioComponent } from "./paginas/inicio/inicio.component";
import { OutraPaginaModule } from "./paginas/outra-pagina/outra-pagina.module";

@NgModule({
  declarations: [
    AppComponent, InicioComponent
  ],
  imports: [
    MdbModulo.forRoot().exports,
    AppRoutingModule, OutraPaginaModule
  ],
  providers: [
    MdbModulo.forRoot().providers
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
