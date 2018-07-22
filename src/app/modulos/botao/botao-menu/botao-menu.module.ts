import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotaoMenuComponent } from './botao-menu.component';
import { MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [BotaoMenuComponent],
  exports:[BotaoMenuComponent]
})
export class BotaoMenuModule { }
