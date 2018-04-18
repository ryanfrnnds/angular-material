import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabelaComponent } from './tabela.component';
import { GridModule } from '../grid/grid.module';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material';
import { ColunaComponent } from './coluna/coluna.component';
import { MatPaginatorInternacionalizado } from './MatPaginatorInternacionalizado';

@NgModule({
  imports: [
    CommonModule,
    GridModule,
    MatPaginatorModule
  ],
  declarations: [TabelaComponent, ColunaComponent],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorInternacionalizado}],
  exports: [TabelaComponent, ColunaComponent]
})
export class TabelaModule {
}
