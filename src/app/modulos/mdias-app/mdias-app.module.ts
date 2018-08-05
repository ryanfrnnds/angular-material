import { MensagensModule } from '../mensagens/mensagens.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatProgressSpinnerModule } from '@angular/material';
import { MdiasAppComponent } from './mdias-app.component';

import{ NavbarModule } from '../navbar/navbar.module';
import{ FooterModule } from '../footer/footer.module';
import { LoadingService } from '../../util/loading.service';
import { SessionOnload } from '../session-storage/session-storage-onload';

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
  providers: [LoadingService, SessionOnload],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MdiasAppModule { }
