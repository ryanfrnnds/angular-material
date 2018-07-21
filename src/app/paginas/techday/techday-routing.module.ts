// Arquivo gerado pelo Scaffolding MDB
import { Routes } from '@angular/router';
import { MdbAcsServico, MdbAutenticacaoServico } from 'mdias-componentes';
import {TechdayListagemComponent} from './listagem/techday-listagem.component';
import {TechdayFormularioComponent} from './formulario/techday-formulario.component';

export const TechdayRoutes: Routes = [
	{ 
		path: 'techdays', canActivate: [],
		children: [
			{ path: 'listagem', component: TechdayListagemComponent},    
			{ path: 'formulario', component: TechdayFormularioComponent}    
		]
  	}
];
