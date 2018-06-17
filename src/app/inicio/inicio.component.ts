import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MdiasModalComponent } from '../modulos/mdias-modal/mdias-modal.component';
import { MdbMensageria } from '../modulos/mensagens/mensagens.service';
import * as _moment from 'moment';
import { Router } from '@angular/router';
import { MDBComponente, MDB } from '../../../public_api';
const moment =  _moment;

class ParametroPai {
  constructor(public id: number, public descricao: string) { }
}
class CodigoPai {
  constructor(public id: number, public idPai: number, public descricao: string) { }
}


@Component({
  selector: 'mdias-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent extends MDBComponente implements OnInit, AfterViewInit {

  public lista:any[];

  public item: any;

  public  formulario: FormGroup;

  public headerLista = ['nome', 'criadoPor', 'acoes'];
  public listaTabela: Array<any>;



  onModal:boolean = false;

  listaParametroPai = [
    new ParametroPai(1, 'Parametro 1'),
    new ParametroPai(2, 'Parametro 2'),
    new ParametroPai(3, 'Adc aa')
  ];

  public listaCodigoPai = [];



  constructor() {
    super();
    this.lista = [];
    const geral = MDB.formBuilder.group({
      nome: [null, [Validators.required, Validators.pattern('^[A-Z]+$')]],
      descricao: [null, [Validators.required, Validators.pattern('^[A-Z]+$')]],
      ativo: [true],
      parametroPai: [null, [Validators.required]],
      codigoPai: [null],
    });
    this.formulario = MDB.formBuilder.group({
      geral: geral
    });
  }

  pesquisar() {
    const LISTA_PARAMETROS: any[] = [
      {id: 1, nome: 'Parametro 1', criadoPor: 'ter01205', dataCriacao: new Date('2015-04-01'), atualizadoPor: '', dataAtualizacao: null, ativo: true},
      {id: 2, nome: 'Parametro 2', criadoPor: 'ter01205', dataCriacao: new Date('2015-04-01'), atualizadoPor: 'ter01205', dataAtualizacao: new Date('2018-04-12'), ativo: true},
      {id: 3, nome: 'Parametro 3', criadoPor: 'ter01205', dataCriacao: new Date('2015-04-01'), atualizadoPor: 'ter01205', dataAtualizacao: new Date('2018-04-12'), ativo: false},
    ];
    this.listaTabela = LISTA_PARAMETROS;
  }

  editar(item){
  }

  public teste(event) {
  }

  public parametroPaiSelecionado(parametroPai) {
    const lista = [
      new CodigoPai(1, 1, 'Codigo 1'),
      new CodigoPai(2, 2, 'Codigo 2'),
      new CodigoPai(3, 3, 'Codigo 3')
    ];
    this.listaCodigoPai = lista.filter(option => option.idPai === parametroPai.id);
  }

  ngAfterViewInit() {
  }

  submit(event) {
    event.stopPropagation();
  }


  ngOnInit() {
    setTimeout(() => {this.pesquisar();}, 1000);
  }

  public irPara() {
    MDB.rota.navigateByUrl('/outraPagina');
  }


  carregarItensNaLista() {
    this.lista.push({nome:"Matheus Amaral Teixeira", cpf:"074.072.245-01", nascimento:"13/09/1972", ativo: true});
    this.lista.push({nome:"Gabriel Machado Gomes", cpf:"397.471.268-26", nascimento:"17/01/1970", ativo: true});
    this.lista.push({nome:"Bernardo Gomes Amaral", cpf:"004.032.894-40", nascimento:"03/01/1964", ativo: false});
    this.lista.push({nome:"Mauro Machado Gomes", cpf:"162.312.990-74", nascimento:"01/07/1962", ativo: true});
    this.lista.push({nome:"Davi Ducati Teixeira", cpf:"034.513.544-03", nascimento:"08/10/1958", ativo: true});
    this.lista.push({nome:"Heitor Amaral Teixeira", cpf:"985.146.100-82", nascimento:"02/10/1954", ativo: false});
    this.lista.push({nome:"Guilherme Amaral Teixeira", cpf:"979.146.310-78", nascimento:"08/04/1970", ativo: true});
    this.lista.push({nome:"Lucas Gomes Ducati", cpf:"765.451.137-04", nascimento:"27/01/1994", ativo: false});
    this.lista.push({nome:"Bernardo Gomes Ducati", cpf:"948.091.725-46", nascimento:"17/03/1990", ativo: false});
    this.lista.push({nome:"Heitor Machado Gomes", cpf:"980.470.048-40", nascimento:"11/01/1986", ativo: true});
    this.lista.push({nome:"Mauro Gomes Machado", cpf:"203.246.004-10", nascimento:"21/11/1950", ativo: true});
    this.lista.push({nome:"Lucas Machado Gomes", cpf:"834.486.975-75", nascimento:"28/01/1962", ativo: false});
    this.lista.push({nome:"Carlos Teixeira Amaral", cpf:"304.458.090-00", nascimento:"07/08/1992", ativo: true});
    this.lista.push({nome:"Mauro Amaral Machado", cpf:"676.355.865-13", nascimento:"20/05/1990", ativo: true});
    this.lista.push({nome:"Gabriel Ducati Amaral", cpf:"052.110.411-43", nascimento:"13/02/1974", ativo: false});
  }

  abrirModal() {
    this.onModal = true;
  }

  fecharModal() {
    this.onModal = false;
  }
}
