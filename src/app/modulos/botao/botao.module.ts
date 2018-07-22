import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotaoComponent } from './botao.component';
import { MdiasModalModule } from '../mdias-modal/mdias-modal.module';
import { GridModule } from '../grid/grid.module';

@NgModule({
  imports: [
    CommonModule,MdiasModalModule, GridModule
    
  ],
  declarations: [BotaoComponent],
  exports: [
    BotaoComponent
  ]
})
export class BotaoModule { }
