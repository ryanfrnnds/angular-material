import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotaoConfirmacaoComponent, DialogoConfirmacao } from './botao-confirmacao.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { ButtonModule } from '../button.module';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule, 
    MatButtonModule,
    ButtonModule
  ],
  declarations: [BotaoConfirmacaoComponent, DialogoConfirmacao],
  exports: [BotaoConfirmacaoComponent],
  entryComponents: [DialogoConfirmacao]

})
export class BotaoConfirmacaoModule { }
