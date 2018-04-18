import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemComponent } from './menu-item.component';
import { MatButtonModule } from '@angular/material';

import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule
  ],
  declarations: [MenuItemComponent],
  exports: [
    MenuItemComponent
  ]
})

export class MenuItemModule { }
