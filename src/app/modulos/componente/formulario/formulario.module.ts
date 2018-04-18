import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from './formulario.component';
import { ContainerModule, ButtonModule, GridModule, BotaoConfirmacaoModule } from '../..';
import { MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule, ButtonModule, BotaoConfirmacaoModule, GridModule
  ],
  declarations: [FormularioComponent],
  exports: [FormularioComponent]
})
export class FormularioModule { }
