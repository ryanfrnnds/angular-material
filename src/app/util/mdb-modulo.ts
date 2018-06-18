import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatDatepickerModule, MatMenuModule, MatTabsModule, MatAutocompleteModule, MatCheckboxModule, MatNativeDateModule, MatTooltipModule } from "@angular/material";

import { GridModule } from "../modulos/grid/grid.module";
import { BotaoModule } from "../modulos/botao/botao.module";
import { FooterModule } from "../modulos/footer/footer.module";
import { TarjetaModule } from "../modulos/tarjeta/tarjeta.module";
import { MdiasModalModule } from "../modulos/mdias-modal/mdias-modal.module";
import { MdiasTabelaModule } from "../modulos/mdias-tabela/mdias-tabela.module";
import { ContainerModule } from "../modulos/container/container.module";
import { MensagensModule } from "../modulos/mensagens/mensagens.module";
import { BotaoMenuModule } from "../modulos/botao/botao-menu/botao-menu.module";
import { BotaoMenuItemModule } from "../modulos/botao/botao-menu-item/botao-menu-item.module";
import { CardModule } from "../modulos/card/card.module";
import { FiltroModule } from "../modulos/componente/filtro/filtro.module";
import { FormularioModule } from "../modulos/componente/formulario/formulario.module";
import { MdbAcsServico } from "../modulos/acs/servico";
import { MdbHttpInterceptor } from "../modulos/seguranca/interceptador/mdb-http-interceptor";
import { MdiasAutocompleteModule } from "../modulos/mdias-autocomplete/mdias-autocomplete.module";
import { MdiasAppModule } from "../modulos/mdias-app/mdias-app.module";
import { MDBAutenticaoModule } from "../modulos/seguranca/autenticacao/mdb-autenticacao.module";
import { MdbHttpServico } from "../modulos/http/mdb-http.servico";
import { MdbAutenticacaoServico } from "../modulos/seguranca/autenticacao/mdb-autenticacao.servico";
import { MdbMensagemServico } from "../modulos/mensagens/mensagens.service";


export class MdbModulo {
    static forRoot(): NgModule {
        return {
            exports: [
                RouterModule,
                BrowserModule,
                BrowserAnimationsModule,
                HttpClientModule,
                CommonModule,
                
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
                MatMenuModule,
                MatTabsModule,
                MatAutocompleteModule,
                MatTooltipModule,
                
                MdiasModalModule,
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
                MdiasAppModule,
                MDBAutenticaoModule,
                MatCheckboxModule,
                MatNativeDateModule,
            ],
            providers: [ 
                MdbAcsServico,
                MdbHttpServico,
                MdbAutenticacaoServico,
                MdbMensagemServico,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: MdbHttpInterceptor,
                    multi: true
                },
            ]
        };
    }
}