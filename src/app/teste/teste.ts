import { NgModule } from "@angular/core";
import { MdbHttpServico, MdbAcsServico, AcessoAutenticado, MdbHttpInterceptor, AutenticaoModule, MdiasAppModule, MdiasTabelaModule, MdiasAutocompleteModule, CardModule, FormularioModule, FiltroModule, BotaoMenuItemModule, BotaoMenuModule, MensagensModule, FooterModule, BotaoModule, GridModule, ContainerModule, MdiasModalModule } from "../../../public_api";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { MatAutocompleteModule, MatTabsModule, MatMenuModule, MatDatepickerModule, MatDialogModule, MatSortModule, MatPaginatorModule, MatTableModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule, MatIconModule, MatToolbarModule, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "../app-routing.module";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { TarjetaModule } from "../modulos/tarjeta/tarjeta.module";

export class MdbModulo {
    static forRoot(): NgModule {
        return {
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
                  ],
            providers: [ 
                MdbAcsServico,
                MdbHttpServico,
                AcessoAutenticado,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: MdbHttpInterceptor,
                    multi: true
                },
                [
                    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
                    {provide: DateAdapter, useClass: NativeDateAdapter, deps: [MAT_DATE_LOCALE]},
                    {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS}
                ]
            ]
        };
    }
}