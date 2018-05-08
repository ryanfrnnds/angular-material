import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './/app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { InicioComponent } from './inicio/inicio.component';

import { provedorDatePicker } from './app.const';
import { MdbServico } from './modulos/servicos/mdb-servico';
import { AutenticacaoComponent } from './modulos/seguranca/autenticacao/autenticacao.component';
import { MdbHttpInterceptor } from './modulos/seguranca/interceptador/mdb-http-interceptor';

import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule,
  MatMenuModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
} from "@angular/material";
import { CompartilhadoModule} from '../app/compartilhados/compartilhado.module';
import {AcessoAutenticado } from '../app/modulos/seguranca/guarda-rotas/acesso-autenticado';
import { OutraPaginaComponent } from './inicio/outra-pagina/outra-pagina.component';
import { MdiasAppModule } from '../../public_api';


@NgModule({
  declarations: [
    AppComponent,
    AutenticacaoComponent,
    InicioComponent,
    OutraPaginaComponent,
  ],
  imports: [RouterModule,
            AppRoutingModule,
            BrowserModule,
            CompartilhadoModule,
            BrowserAnimationsModule,
            FormsModule,
            ReactiveFormsModule,
            HttpClientModule,
            MatAutocompleteModule,
            MdiasAppModule
          ],
  providers: [MdbServico, AcessoAutenticado,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MdbHttpInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
