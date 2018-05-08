import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroComponent } from './filtro.component';
import { GridModule } from '../../grid/grid.module';
import { BotaoModule } from '../../botao/botao.module';

@NgModule({
  imports: [
    CommonModule, BotaoModule, GridModule
  ],
  declarations: [FiltroComponent],
  exports: [FiltroComponent]
})
export class FiltroModule { }
