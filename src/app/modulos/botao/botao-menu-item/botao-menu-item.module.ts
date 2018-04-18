import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotaoMenuItemComponent } from './botao-menu-item.component';
import { MatButtonModule,  MatIconModule, MatMenuModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [BotaoMenuItemComponent],
  exports: [BotaoMenuItemComponent]
})
export class BotaoMenuItemModule { }
