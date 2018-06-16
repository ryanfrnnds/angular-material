import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagensComponent } from './mensagens.component';
import { MdbMensageria } from './mensagens.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MensagensComponent],
  providers: [
    MdbMensageria
  ],
  exports: [MensagensComponent]
})

export class MensagensModule { }
