import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from './formulario.component';
import { MatCardModule } from '@angular/material';
import { GridModule } from '../../grid/grid.module';
import { BotaoModule } from '../../botao/botao.module';

@NgModule({
  imports: [
    CommonModule, BotaoModule, GridModule
  ],
  declarations: [FormularioComponent],
  exports: [FormularioComponent]
})
export class FormularioModule { }
