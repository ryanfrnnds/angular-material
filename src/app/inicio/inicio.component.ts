import { Component, OnInit, Output } from '@angular/core';
import { MDB } from '../util/mdb';
import { MDBComponente } from '../util/mdb-componente';

@Component({
  selector: 'mdias-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  public listaTabela: Array<any>;
  public util: MDBComponente = new MDBComponente();
  

  constructor() {}

  pesquisar() {
    const LISTA_PARAMETROS: any[] = [
      {id: 1, selecionado: true, nome: 'Parametro 1', criadoPor: 'ter01205', dataCriacao: new Date('2015-04-01'), atualizadoPor: '', dataAtualizacao: null, ativo: true},
      {id: 2, selecionado: true, nome: 'Parametro 2', criadoPor: 'ter01205', dataCriacao: new Date('2015-04-01'), atualizadoPor: 'ter01205', dataAtualizacao: new Date('2018-04-12'), ativo: true},
      {id: 3, selecionado: true, nome: 'Parametro 3', criadoPor: 'ter01205', dataCriacao: new Date('2015-04-01'), atualizadoPor: 'ter01205', dataAtualizacao: new Date('2018-04-12'), ativo: false},
    ];
    this.listaTabela = LISTA_PARAMETROS;
  }
  
  ngOnInit() {
    console.log(this.util.traduzir('titulo.ti.t'));
    console.log(this.util.traducao());
    setTimeout(() => {this.pesquisar();}, 1000);
  }

  public testeUm() {
    console.log("teste Um");
  }

  public testeTodos() {
    console.log("teste Todos");
  }

  public irPara() {
    MDB.angular().router.navigateByUrl('/outraPagina');
  }
}
