import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder} from '@angular/forms';
import { LoadingService } from './loading.service';
import { MdbMensagemServico } from '../modulos/mensagens/mensagens.service';
import { MdbHttpService } from '../../../publico/modulos/http';

@Injectable({providedIn: 'root'})
export class DependenciasService  {
    rotaInicio: string;
    urlServidor: string;
    nomeSistema: string;
    confI18n?: string;

	constructor(
        public httpClient: HttpClient, 
        public loadingService:LoadingService,
        public mdbHttpServico: MdbHttpService, 
        public mensageria: MdbMensagemServico , 
        public router: Router, 
        public activatedRoute: ActivatedRoute, 
        public formBuilder:FormBuilder, 
        public location: Location
		) {}
		
		public configurar (
			nomeSistema: string, 
			rotaInicio: string , 
			urlServidor: string , 
			confI18n?: string
		): DependenciasService {
			this.nomeSistema = nomeSistema;
			this.rotaInicio = rotaInicio;
			this.urlServidor = urlServidor;
			this.confI18n = confI18n ? confI18n : 'pt-BR';
			return this;
		}
}
