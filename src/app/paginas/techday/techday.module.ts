//Arquivo gerado pelo Scaffolding MDB
import { NgModule } from '@angular/core';
import { MdbModulo } from 'mdias-componentes';
import {TechdayListagemComponent} from './listagem/techday-listagem.component';
import {TechdayFormularioComponent} from './formulario/techday-formulario.component';

@NgModule({
	imports: [
		MdbModulo.forRoot().exports
	],
	declarations: [
		TechdayListagemComponent,
		TechdayFormularioComponent
	],
	providers: [
		MdbModulo.forRoot().providers
	]
})
export class TechdayModule {}
