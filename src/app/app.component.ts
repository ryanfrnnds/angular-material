import { Component, AfterContentInit } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Inicializacao } from './modelo/inicializacao';

import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { I18n } from './i18n';
import { ROTA_INICIO, SERVIDOR } from './app.const';
import { MDB } from './util/mdb';
import { MdbMensageria } from './modulos/mensagens/mensagens.service';
import { MdbHttpServico } from './modulos/http/mdb-http.servico';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(http: HttpClient, mdbHttpServico: MdbHttpServico, mensageria: MdbMensageria , rota: Router, rotaAtiva: ActivatedRoute, formBuild:FormBuilder) {
    MDB.incializar(
      {
         contexto:{
          rotaInicio: ROTA_INICIO, 
          urlServidor: SERVIDOR, 
          nomeSistema: 'NOVOS TEMPOS'
        },angular:{
          rota:rota, 
          rotaAtiva:rotaAtiva, 
          formBuilder:formBuild,
          http: http
        },servicos:{
          mensageria:mensageria, 
          mdbHttp:mdbHttpServico
        }});
  }

  public iniciado(): Observable<boolean> {
    return MDB.iniciado();
  }

}
