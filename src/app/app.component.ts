import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { ROTA_INICIO, SERVIDOR, NOME_DA_APLICACAO } from './app.const';
import { MDB } from './util/mdb';
import { MdbMensagemServico } from './modulos/mensagens/mensagens.service';
import { MdbHttpServico } from './modulos/http/mdb-http.servico';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { MdiasAppService } from './modulos/mdias-app/mdias-app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(httpClient: HttpClient, mdiasApp:MdiasAppService,mdbHttpServico: MdbHttpServico, mensageria: MdbMensagemServico , router: Router, activatedRoute: ActivatedRoute, formBuild:FormBuilder, location: Location) {
    MDB.incializar(
      {
         contexto:{
          rotaInicio: ROTA_INICIO,
          urlServidor: SERVIDOR,
          nomeSistema: NOME_DA_APLICACAO
        },angular:{
          router:router,
          activatedRoute:activatedRoute,
          formBuilder:formBuild,
          location: location
        },servicos:{
          mensagem:mensageria,
          http:mdbHttpServico,
          mdiasApp: mdiasApp
        }
      }, httpClient);
  }

  public iniciado(): Observable<boolean> {
    return MDB.inciado;
  }

}
