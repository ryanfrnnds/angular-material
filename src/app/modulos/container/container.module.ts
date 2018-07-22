import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';
import { RouterModule } from '@angular/router';
import { MatIconModule, 
          } from '@angular/material';

import { GridModule } from '../grid/grid.module';
import { TituloComponent } from './titulo/titulo.component';
import { CardModule } from '../card/card.module';
import { BotaoModule } from '../botao/botao.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    GridModule,
    CardModule,
    BotaoModule
  ],
  declarations: [ContainerComponent, TituloComponent],
  exports: [
    ContainerComponent,
    TituloComponent
  ]
})
export class ContainerModule { }
