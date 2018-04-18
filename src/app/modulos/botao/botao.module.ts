import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatIconModule } from '@angular/material';
import { BotaoComponent } from '.';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [BotaoComponent],
  exports: [
    BotaoComponent
  ]
})
export class BotaoModule { }
