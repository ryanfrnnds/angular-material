import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MdiasModalComponent } from '../modulos/mdias-modal/mdias-modal.component';
import { MdbMensagemServico } from '../modulos/mensagens/mensagens.service';
import * as _moment from 'moment';
import { Router } from '@angular/router';
import { MDB } from '../util/mdb';
const moment =  _moment;

@Component({
  selector: 'mdias-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  public listaTabela: Array<any>;



  constructor() {}

  pesquisar() {
    const LISTA_PARAMETROS: any[] = [
      {id: 1, nome: 'Parametro 1', criadoPor: 'ter01205', dataCriacao: new Date('2015-04-01'), atualizadoPor: '', dataAtualizacao: null, ativo: true},
      {id: 2, nome: 'Parametro 2', criadoPor: 'ter01205', dataCriacao: new Date('2015-04-01'), atualizadoPor: 'ter01205', dataAtualizacao: new Date('2018-04-12'), ativo: true},
      {id: 3, nome: 'Parametro 3', criadoPor: 'ter01205', dataCriacao: new Date('2015-04-01'), atualizadoPor: 'ter01205', dataAtualizacao: new Date('2018-04-12'), ativo: false},
    ];
    this.listaTabela = LISTA_PARAMETROS;
  }

  ngOnInit() {
    setTimeout(() => {this.pesquisar();}, 1000);
  }

  public irPara() {
    MDB.angular.router.navigateByUrl('/outraPagina');
  }
}
