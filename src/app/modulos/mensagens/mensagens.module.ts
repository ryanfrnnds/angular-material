import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagensComponent } from './mensagens.component';
import { MensagensService } from './mensagens.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MensagensComponent],
  providers: [
    MensagensService
  ],
  exports: [MensagensComponent]
})

export class MensagensModule { }
