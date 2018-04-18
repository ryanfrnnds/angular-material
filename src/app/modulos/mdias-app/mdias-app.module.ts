import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material';
import { MdiasAppComponent } from './mdias-app.component';

import{ NavbarModule } from './../navbar/navbar.module';
import{ FooterModule } from './../footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    NavbarModule, 
    FooterModule,
    MatSidenavModule
  ],
  declarations: [MdiasAppComponent],
  exports:[MdiasAppComponent]
})
export class MdiasAppModule { }
