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


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(httpClient: HttpClient, mdbHttpServico: MdbHttpServico, mensageria: MdbMensagemServico , router: Router, activatedRoute: ActivatedRoute, formBuild:FormBuilder, location: Location) {
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
          http:mdbHttpServico
        }
      }, httpClient);
  }

  public iniciado(): Observable<boolean> {
    return MDB.inciado;
  }

}
