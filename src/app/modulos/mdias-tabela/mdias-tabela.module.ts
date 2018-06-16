import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdiasTabelaComponent } from './mdias-tabela.component';
import { ColunaComponent } from './coluna/coluna.component';
import { MatTableModule, MatSortModule, MatPaginatorModule, MatTooltipModule, MatCheckboxModule } from '@angular/material';
import { GridModule } from '../grid/grid.module';

@NgModule({
  imports: [
    CommonModule, MatTableModule,MatSortModule, GridModule, MatPaginatorModule, MatTooltipModule, MatCheckboxModule
  ],
  declarations: [MdiasTabelaComponent, ColunaComponent],
  exports: [MdiasTabelaComponent,ColunaComponent]
})
export class MdiasTabelaModule { }
