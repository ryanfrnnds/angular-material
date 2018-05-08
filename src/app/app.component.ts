import { Component, AfterContentInit } from '@angular/core';
import { MenuItem, Usuario } from './modelo/';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Inicializacao } from './modelo/inicializacao';

import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { I18n } from './i18n';
import { Aplicacao } from './modulos/inicializacao/aplicacao';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public usuarioLogado: Usuario;

  constructor(http: HttpClient ) {
    I18n.Instance(http);
    const provedorCalendario = [
      {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
      {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
      {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    ];

    this.usuarioLogado = new Usuario({nome:'Janderson Souza Matias', codigo:'mdb01256'});

    const inicializacao: Inicializacao = new Inicializacao({
        rotaInicio: '/inicio',
        urlServidor: 'http://localhost:8080/gav-rest',
      }
    );
    Aplicacao.incializar(inicializacao);
  }

}
