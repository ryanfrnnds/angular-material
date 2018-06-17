import { NgModule } from '@angular/core';

import {MatToolbarModule,
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
        MatTabsModule,
        MatDatepickerModule,
        MatAutocompleteModule,
} from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from '../modulos/card/card.module';
import { FiltroModule } from '../modulos/componente/filtro/filtro.module';
import { FormularioModule } from '../modulos/componente/formulario/formulario.module';
import { MdiasModalModule } from '../modulos/mdias-modal/mdias-modal.module';
import { ContainerModule } from '../modulos/container/container.module';
import { GridModule } from '../modulos/grid/grid.module';
import { FooterModule } from '../modulos/footer/footer.module';
import { MensagensModule } from '../modulos/mensagens/mensagens.module';
import { TarjetaModule } from '../modulos/tarjeta/tarjeta.module';
import { BotaoModule } from './../modulos/botao/botao.module';
import { BotaoMenuModule } from './../modulos/botao/botao-menu/botao-menu.module';
import { BotaoMenuItemModule } from './../modulos/botao/botao-menu-item/botao-menu-item.module';
import { MdiasAutocompleteModule } from '../modulos/mdias-autocomplete/mdias-autocomplete.module';
import { MdiasTabelaModule } from '../modulos/mdias-tabela/mdias-tabela.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MdiasAppModule, AutenticaoModule } from '../../../public_api';

  @NgModule({
    exports: [
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
          MatDatepickerModule,
          MdiasModalModule,
          MatMenuModule,
          MatTabsModule,
          //
          ContainerModule,
          GridModule,
          BotaoModule,
          FooterModule,
          MensagensModule,
          BotaoMenuModule,
          BotaoMenuItemModule,
          TarjetaModule,
          FormsModule,
          ReactiveFormsModule,
          FiltroModule,
          FormularioModule,
          CardModule,
          MdiasAutocompleteModule, 
          MdiasTabelaModule,
          RouterModule,
          AppRoutingModule,
          BrowserModule,
          BrowserAnimationsModule,
          HttpClientModule,
          MatAutocompleteModule,
          MdiasAppModule,
          AutenticaoModule
          ]
  })
  export class CompartilhadoModule { }
