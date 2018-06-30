import { Component, OnInit, Input, ContentChildren, ViewChild, QueryList, Renderer2, Output, EventEmitter } from '@angular/core';

import { ColunaComponent } from './coluna/coluna.component';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MDB } from '../../util/mdb';

@Component({
  selector: 'mdias-tabela',
  templateUrl: './mdias-tabela.component.html',
  styleUrls: ['./mdias-tabela.component.scss']
})
export class MdiasTabelaComponent implements OnInit {

  private listaRenderizada: MatTableDataSource<any> = new MatTableDataSource<any>();
  private _listaCompleta: MatTableDataSource<any> = new MatTableDataSource<any>();
  public _numeroPagina: number;
  private _ehLazy: boolean = false;

  @Input() public totalDeItens: number;

  @Input() public ehPaginado: boolean = false;

  @Input() public itensPorPagina: number;

  @Input() public set lista(value: any[]) {
    this._listaCompleta = new MatTableDataSource(value ? value : []);
    this._listaCompleta.sort = this.sort ;
    
    if ( !this._ehLazy && this.ehPaginado ) {
      const pagina = this.paginador ? this.paginador._pageIndex : 0;
      this.controlarPaginacaoDeListaEstatica(pagina);
    }
    
    this.colunas.forEach(coluna => {
      if(coluna.ehCheckbox == true) {
        this.lista.forEach(item => {
          if(item[coluna.atributo] == true) {
            this.selecionados.select(item);
          }
        });
      }
    }); 

  }
  public get lista() {
    return this.getLista().data;
  }

  @Input() set ehLazy(value: boolean) {
    if (this.ehPaginado) {
        this._ehLazy = value;
    }
  }
  get ehLazy(): boolean {
    return this._ehLazy ;
  }

  @Input() set numeroPagina(value: number) {
    if ( this.ehPaginado ) {
      this._numeroPagina = value;
    }
  }
  get numeroPagina(): number {
    return this._numeroPagina;
  }

  @Output() onLazy: EventEmitter<any> = new EventEmitter<any>();

  @Output() selecionarUm = new EventEmitter<any>();

  @Output() selecionarTodos = new EventEmitter<any>();

  @ViewChild('paginador') private paginador: MatPaginator;

  @ContentChildren(ColunaComponent, { descendants: true }) public colunas: QueryList<ColunaComponent> = new QueryList<ColunaComponent>();

  @ViewChild(MatSort) sort: MatSort;

  selecionados = new SelectionModel<Element>(true, []);
  
  constructor(private _renderer: Renderer2) { }

  ngOnInit() {

    if ( !this._ehLazy && this.ehPaginado ) {
      this.controlarPaginacaoDeListaEstatica(0);
    }
  }

  public listaCabecalho() {
    const listaCabecalho = [];
    this.colunas.forEach(coluna => {
      listaCabecalho.push(coluna.atributo);
    });
    return listaCabecalho;
  }

  public alterarPagina(event) {
    if (!this._ehLazy) {
      this.controlarPaginacaoDeListaEstatica(event.pageIndex);
    } else {
      this.onLazy.emit(event.pageIndex);
    }
  }

  public mudarValorDoItem(item, atributo) {
    this.selecionarUm.emit();
    this.selecionados.toggle(item);
    item[atributo] = !item[atributo];
  }

  public mudarValorDeTodos(atributo) {
    this.selecionarTodos.emit();
    this.heTodosSelecionado() ? this.desmarcarTodosItens(atributo) : this.marcarTodosItens(atributo);
  }

  private desmarcarTodosItens(atributo) {
    this.selecionados.clear();
    this.lista.forEach(item => {
      item[atributo] = false;
    });
  }

  private marcarTodosItens(atributo) {
    this.lista.forEach(item => {
      item[atributo] = true;
      this.selecionados.select(item);
    });
  }

  public heTodosSelecionado():boolean {
      const numSelecionados = this.selecionados.selected.length;
      const numLinhas = this.lista.length;
      return numSelecionados === numLinhas;
  }

  private controlarPaginacaoDeListaEstatica(numeroPagina) {
    this.itensPorPagina = this.itensPorPagina ? this.itensPorPagina : 5;
    this.totalDeItens = this._listaCompleta.data.length;
    const inicioPagina = numeroPagina * this.itensPorPagina;

    this.listaRenderizada = new MatTableDataSource(this._listaCompleta.data.slice(inicioPagina, ( inicioPagina + this.itensPorPagina) ));

    this.listaRenderizada.sort = this.sort;
    this._listaCompleta.sort = this.sort;

    if ( this.paginador && numeroPagina === 0) {
      this.paginador.firstPage();
    }
  }

  public getLista(): MatTableDataSource<any> {
    if ( this.ehPaginado && !this._ehLazy) {
      return this.listaRenderizada;
    }
    return this._listaCompleta;
  }

  public buscarValor(item: any, atributo: string) {
    return MDB.util().buscarValor(item, atributo);
  }

}
