import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { MatToolbarModule, 
         MatIconModule } from '@angular/material';
import { MenuItemModule } from './menu-item/menu-item.module';

import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule, 
    MatIconModule,
    MenuItemModule,
    RouterModule
  ],
  declarations: [NavbarComponent],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
