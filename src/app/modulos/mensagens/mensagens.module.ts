import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagensComponent } from './mensagens.component';
import { MdbMensagemServico } from './mensagens.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MensagensComponent],
  providers: [
    MdbMensagemServico
  ],
  exports: [MensagensComponent]
})

export class MensagensModule { }
