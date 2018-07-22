import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';

import { MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatDatepickerModule, MatMenuModule, MatTabsModule, MatAutocompleteModule, MatCheckboxModule, MatNativeDateModule, MatTooltipModule, MatPaginatorIntl, MAT_DATE_LOCALE } from "@angular/material";

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
import { WizardModule } from "../modulos/wizard/wizard.module";
import { MdiasProvedorPaginacao } from "../modulos/provedores/mdias-provedor-paginacao";
import { MdiasAppService } from "../modulos/mdias-app/mdias-app.service";


export class MdbModulo {
	static forRoot(confi18n: string = 'pt-BR'): NgModule {
		return {
			exports: [
				RouterModule,
				BrowserModule,
				BrowserAnimationsModule,
				HttpClientModule,
				CommonModule,
				FormsModule,
				ReactiveFormsModule,

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
				MatCheckboxModule,
				MatNativeDateModule,

				MdiasModalModule,
				ContainerModule,
				GridModule,
				BotaoModule,
				FooterModule,
				MensagensModule,
				BotaoMenuModule,
				BotaoMenuItemModule,
				TarjetaModule,
				FiltroModule,
				FormularioModule,
				CardModule,
				MdiasAutocompleteModule,
				MdiasTabelaModule,
				MdiasAppModule,
				MDBAutenticaoModule,
				WizardModule
			],
			providers: [
				MdbAcsServico,
				MdbHttpServico,
				MdbAutenticacaoServico,
				MdbMensagemServico,
				MdiasAppService,
				CookieService,
				{
					provide: HTTP_INTERCEPTORS,
					useClass: MdbHttpInterceptor,
					multi: true
				},
				{
					provide: MAT_DATE_LOCALE, 
					useValue: confi18n
				},
				{ 
					provide: MatPaginatorIntl,
					useClass: MdiasProvedorPaginacao
				}
			]
		};
	}
}
