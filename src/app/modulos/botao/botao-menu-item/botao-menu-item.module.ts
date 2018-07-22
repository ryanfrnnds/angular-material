import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotaoMenuItemComponent } from './botao-menu-item.component';
import { MatMenuModule, MatDialogModule } from '@angular/material';
import { MdiasModalModule } from '../../mdias-modal/mdias-modal.module';
import { DialogoConfirmacao } from './dialogo-confirmacao.component';
import { BotaoModule } from '../botao.module';

@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatDialogModule,
    BotaoModule
  ],
  declarations: [BotaoMenuItemComponent, DialogoConfirmacao],
  exports: [BotaoMenuItemComponent],
  entryComponents: [DialogoConfirmacao]
})
export class BotaoMenuItemModule { }
