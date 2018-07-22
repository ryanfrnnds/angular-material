import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColComponent } from './col/col.component';
import { AcoesComponent } from './acoes/acoes.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ColComponent, AcoesComponent],
  exports: [ColComponent, AcoesComponent]
})
export class GridModule { }
