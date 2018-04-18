import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotaoIconeComponent } from './botao-icone.component';
import { MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [BotaoIconeComponent],
  exports: [BotaoIconeComponent]
})
export class BotaoIconeModule { }
