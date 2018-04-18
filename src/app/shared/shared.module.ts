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
} from '@angular/material';

import {
        ContainerModule,
        GridModule,
        ButtonModule,
        FooterModule,
        MdiasAppModule,
        TabelaModule,
        BotaoConfirmacaoModule,
        MensagensModule,
        BotaoMenuModule,
        BotaoMenuItemModule,
        NavbarModule,
        BotaoIconeModule,
        WizardModule,
        TarjetaModule,
        FiltroModule
} from '../modulos';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularioModule } from '../modulos/componente/formulario';

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
          NavbarModule,
          MatDatepickerModule,
          ContainerModule,
          GridModule,
          ButtonModule,
          FooterModule,
          MdiasAppModule,
          BotaoConfirmacaoModule,
          MensagensModule,
          TabelaModule,
          MatMenuModule,
          BotaoMenuModule,
          BotaoMenuItemModule,
          MatTabsModule,
          BotaoIconeModule,
          TarjetaModule,
          FormsModule,
          ReactiveFormsModule,
          FiltroModule,
          FormularioModule
          ]
  })
  export class SharedModule { }
