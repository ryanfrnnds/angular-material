import { NgModule } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MdbModulo } from 'mdias-componentes';
import { OutraPaginaListagemComponent } from './outra-pagina-listagem/outra-pagina-listagem.component';
import { OutraPaginaFormularioComponent } from './outra-pagina-formulario/outra-pagina-formulario.component';
import { OutraPaginaService } from './outra-pagina.service';

@NgModule({
  imports: [
    MdbModulo.forRoot().exports
  ]
  , declarations: [OutraPaginaListagemComponent, OutraPaginaFormularioComponent]
  , exports: [
    OutraPaginaListagemComponent, OutraPaginaFormularioComponent
  ]
  , providers: [ OutraPaginaService ]
})
export class OutraPaginaModule { }
