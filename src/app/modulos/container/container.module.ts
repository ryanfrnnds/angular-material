import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';
import { RouterModule } from '@angular/router';
import { MatIconModule, 
         MatButtonModule, 
         MatCardModule,
         MatInputModule,
          } from '@angular/material';

import { GridModule } from '../grid/grid.module';
import { TituloComponent } from './titulo/titulo.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    GridModule
  ],
  declarations: [ContainerComponent, TituloComponent],
  exports: [
    ContainerComponent,
    TituloComponent
  ]
})
export class ContainerModule { }
