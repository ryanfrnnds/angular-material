import { MensagensModule } from './../mensagens/mensagens.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatProgressSpinnerModule } from '@angular/material';
import { MdiasAppComponent } from './mdias-app.component';

import{ NavbarModule } from './../navbar/navbar.module';
import{ FooterModule } from './../footer/footer.module';
import { MdiasAppService } from './mdias-app.service';

@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    FooterModule,
    MatSidenavModule,
    MensagensModule,
    MatProgressSpinnerModule
  ],
  declarations: [MdiasAppComponent],
  exports:[MdiasAppComponent],
  providers: [MdiasAppService],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MdiasAppModule { }
