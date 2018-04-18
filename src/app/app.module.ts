import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './/app-routing.module';
import { RouterModule } from '@angular/router';
import { ComponentesComponent } from './paginas/componentes/componentes.component';
import { PadroesComponent } from './paginas/padroes/padroes.component';
import { QuickStartComponent } from './paginas/quick-start/quick-start.component';
import { FormularioPadraoComponent } from './paginas/formulario-padrao/formulario-padrao.component';
import { FormularioPadraoFormComponent } from './paginas/formulario-padrao/formulario-padrao-form/formulario-padrao-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { InicioComponent } from './inicio/inicio.component';

import { AutenticacaoComponent, MdbServico, AcessoAutenticado, MdbHttpInterceptor } from './modulos';
import { provedorDatePicker } from './app.const';


@NgModule({
  declarations: [
    AppComponent,
    ComponentesComponent,
    PadroesComponent,
    QuickStartComponent,
    FormularioPadraoComponent,
    FormularioPadraoFormComponent,
    AutenticacaoComponent,
    InicioComponent
  ],
  imports: [RouterModule,
            AppRoutingModule,
            BrowserModule,
            SharedModule,
            BrowserAnimationsModule,
            FormsModule,
            ReactiveFormsModule,
            HttpClientModule],
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
