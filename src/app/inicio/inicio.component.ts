import { Component, OnInit, Output } from '@angular/core';
import { MDB } from '../util/mdb';
import { MDBComponente } from '../util/mdb-componente';
import { MDBHttp } from '../modulos/http/mdb-http';
import {Sort} from '@angular/material';

export interface Dessert {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}


@Component({
  selector: 'mdias-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  desserts: Dessert[] = [
    {name: 'Frozen yogurt', calories: 159, fat: 6, carbs: 24, protein: 4},
    {name: 'Ice cream sandwich', calories: 237, fat: 9, carbs: 37, protein: 4},
    {name: 'Eclair', calories: 262, fat: 16, carbs: 24, protein: 6},
    {name: 'Cupcake', calories: 305, fat: 4, carbs: 67, protein: 4},
    {name: 'Gingerbread', calories: 356, fat: 16, carbs: 49, protein: 4},
  ];

  sortedData: Dessert[];

  public listaTabela: Array<any>;
  public util: MDBComponente = new MDBComponente();
  

  constructor() {
    this.sortedData = this.desserts.slice();
  }

  sortData(sort: Sort) {
    console.log(sort);
    const data = this.desserts.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      console.log(a);
      console.log(b);
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'calories': return compare(a.calories, b.calories, isAsc);
        case 'fat': return compare(a.fat, b.fat, isAsc);
        case 'carbs': return compare(a.carbs, b.carbs, isAsc);
        case 'protein': return compare(a.protein, b.protein, isAsc);
        default: return 0;
      }
    });
    this.desserts = this.sortedData;
    console.log(this.desserts);

  }

  pesquisar() {
    const LISTA_PARAMETROS: any[] = [
      {id: 1, selecionado: true, nome: 'Parametro 1', criadoPor: 'ter01205', dataCriacao: new Date('2015-04-01'), atualizadoPor: '', dataAtualizacao: null, ativo: true},
      {id: 2, selecionado: true, nome: 'Parametro 2', criadoPor: 'ter01205', dataCriacao: new Date('2015-04-01'), atualizadoPor: 'ter01205', dataAtualizacao: new Date('2018-04-12'), ativo: true},
      {id: 3, selecionado: true, nome: 'Parametro 3', criadoPor: 'ter01205', dataCriacao: new Date('2015-04-01'), atualizadoPor: 'ter01205', dataAtualizacao: new Date('2018-04-12'), ativo: false},
      {id: 4, selecionado: true, nome: 'Parametro 4', criadoPor: 'ter01205', dataCriacao: new Date('2015-04-01'), atualizadoPor: 'ter01205', dataAtualizacao: new Date('2018-04-12'), ativo: false},
      {id: 5, selecionado: true, nome: 'Parametro 5', criadoPor: 'ter01205', dataCriacao: new Date('2015-04-01'), atualizadoPor: 'ter01205', dataAtualizacao: new Date('2018-04-12'), ativo: false},
      {id: 6, selecionado: true, nome: 'Parametro 6', criadoPor: 'ter01205', dataCriacao: new Date('2015-04-01'), atualizadoPor: 'ter01205', dataAtualizacao: new Date('2018-04-12'), ativo: false},
    ];
    this.listaTabela = LISTA_PARAMETROS;
  }

  teste() {
    MDB.servicos().mensagem.addInformacao('','AAAAAAAAAAAA');
  }
  
  ngOnInit() {
    this.pesquisar();
  }

  public testeUm() {
    // console.log(this.listaTabela);
  }

  public testeTodos() {
  }

  public irPara() {
    MDB.angular().router.navigateByUrl('/outraPagina');
  }

  public editar() {
    let itemASalvar:any = {};
    itemASalvar.nome = 'ABC';
    itemASalvar.descricao = 'ABC';
    itemASalvar.flagAtivo = 'S';
    MDB.servicos().http.post(new MDBHttp('parametro'),itemASalvar).subscribe( resposta => {
      MDB.servicos().mensagem.addSucesso('',MDB.util().traduzir('mdbComponentes.operacao.sucesso.salvar'));
      MDB.angular().router.navigate(['parametro'], {queryParams : {manterEstado : true}});
    });
    /*
    MDB.servicos().http.get(new MDBHttp("parametro/teste")).subscribe(obj => {
    });
    */
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}