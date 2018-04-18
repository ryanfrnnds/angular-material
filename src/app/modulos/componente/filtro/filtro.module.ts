import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroComponent } from './filtro.component';
import { ButtonModule, GridModule } from '../..';

@NgModule({
  imports: [
    CommonModule, ButtonModule, GridModule
  ],
  declarations: [FiltroComponent],
  exports: [FiltroComponent]
})
export class FiltroModule { }
