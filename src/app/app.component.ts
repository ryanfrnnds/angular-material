import { Component, AfterContentInit } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ROTA_INICIO, SERVIDOR } from './app.const';
import { MDB } from './util/mdb';
import { MdbMensagemServico } from './modulos/mensagens/mensagens.service';
import { MdbHttpServico } from './modulos/http/mdb-http.servico';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(httpClient: HttpClient, mdbHttpServico: MdbHttpServico, mensageria: MdbMensagemServico , router: Router, activatedRoute: ActivatedRoute, formBuild:FormBuilder) {
    MDB.incializar(
      {
         contexto:{
          rotaInicio: ROTA_INICIO, 
          urlServidor: SERVIDOR, 
          nomeSistema: 'NOVOS TEMPOS'
        },angular:{
          router:router, 
          activatedRoute:activatedRoute, 
          formBuilder:formBuild,
        },servicos:{
          mensagem:mensageria, 
          http:mdbHttpServico
        }
      }, httpClient);
  }

  public iniciado(): Observable<boolean> {
    return MDB.iniciado();
  }

}
