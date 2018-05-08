import { Component, OnInit, Input, ContentChildren, ViewChild, QueryList, Renderer, Renderer2, Output, EventEmitter } from '@angular/core';

import { ColunaComponent } from './coluna/coluna.component';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ObjetoUtilitario } from '../../util/objeto-utilitario';
import { Renderer3 } from '@angular/core/src/render3/renderer';

@Component({
  selector: 'mdias-tabela',
  templateUrl: './mdias-tabela.component.html',
  styleUrls: ['./mdias-tabela.component.scss']
})
export class MdiasTabelaComponent implements OnInit {

  private listaRenderizada: MatTableDataSource<any> = new MatTableDataSource<any>();
  private _listaCompleta: MatTableDataSource<any> = new MatTableDataSource<any>();
  @Input() public set lista(value: any[]) {
    this._listaCompleta = new MatTableDataSource(value);
    this._listaCompleta.sort = this.sort ;
    if ( !this._ehLazy && this.ehPaginado ) {
        this.controlarPaginacaoDeListaEstatica(0);
    }
  }

  public get lista() {
    return this.getLista().data;
  }

  @ContentChildren(ColunaComponent, { descendants: true }) public colunas: QueryList<ColunaComponent> = new QueryList<ColunaComponent>();

  @ViewChild(MatSort) sort: MatSort;

  @Input() public ehPaginado: boolean = false;
  private _ehLazy: boolean = false;
  @Input() set ehLazy(value: boolean) {
    if (this.ehPaginado) {
        this._ehLazy = value;
    }
  }
  get ehLazy(): boolean {
    return this._ehLazy ;
  }

  @Input() public itensPorPagina: number;

  public _numeroPagina: number;
  @Input() set numeroPagina(value: number) {
    if ( this.ehPaginado ) {
      this._numeroPagina = value;
    }
  }
  get numeroPagina(): number {
    return this._numeroPagina;
  }

  @ViewChild('paginador') private paginador: MatPaginator;

  @Input() public totalDeItens: number;

  @Output() onLazy: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _renderer: Renderer2) { }

  ngOnInit() {}

  private listaCabecalho() {
    const listaCabecalho = [];
    this.colunas.forEach(coluna => {
      listaCabecalho.push(coluna.atributo);
    });
    return listaCabecalho;
  }

  private alterarPagina(event) {
    if (!this._ehLazy) {
      this.controlarPaginacaoDeListaEstatica(event.pageIndex);
    } else {
      this.onLazy.emit(event.pageIndex);
    }
  }

  private controlarPaginacaoDeListaEstatica(numeroPagina) {
    this.itensPorPagina = this.itensPorPagina ? this.itensPorPagina : 5;
    this.totalDeItens = this._listaCompleta.data.length;
    const inicioPagina = numeroPagina * this.itensPorPagina;

    this.listaRenderizada = new MatTableDataSource(this._listaCompleta.data.slice(inicioPagina, ( inicioPagina + this.itensPorPagina) ));
    this._listaCompleta.sort = this.sort;

    if ( this.paginador && numeroPagina === 0) {
      this.paginador.firstPage();
    }
  }

  private getLista(): MatTableDataSource<any> {
    if ( this.ehPaginado && !this._ehLazy) {
      return this.listaRenderizada;
    }
    return this._listaCompleta;
  }

  private buscarValor(item: any, atributo: string) {
    return ObjetoUtilitario.Instance().buscarValor(item, atributo);
  }

}
