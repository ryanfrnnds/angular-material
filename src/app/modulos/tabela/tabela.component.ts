import { Component, OnInit, Input, ContentChildren, QueryList , AfterContentInit, SimpleChanges , Output, EventEmitter, ViewChild} from '@angular/core';
import { ColunaComponent } from './coluna/coluna.component';
import { PageEvent, MatPaginator } from '@angular/material';


@Component({
  selector: 'mdias-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent {

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

  @ContentChildren(ColunaComponent) public colunas: QueryList<ColunaComponent>;

  private chamarEventoLazy: boolean = true;

  private listaRenderizada: any[] = [];
  private _listaCompleta: any[] = [];
  @Input() set lista(value: any[]) {
    this._listaCompleta = value;
    if ( !this._ehLazy && this.ehPaginado ) {
        this.controlarPaginacaoDeListaEstatica(0);
    }
  }
  get lista(): any[] {
    return this.listaRenderizada;
  }

  constructor() {}

  private alterarPagina(event) {
    if (!this._ehLazy) {
      this.controlarPaginacaoDeListaEstatica(event.pageIndex);
    } else {
      this.onLazy.emit(event.pageIndex);
    }
  }

  private controlarPaginacaoDeListaEstatica(numeroPagina) {
    this.itensPorPagina = this.itensPorPagina ? this.itensPorPagina : 5;
    this.totalDeItens = this._listaCompleta.length;
    const inicioPagina = numeroPagina * this.itensPorPagina;
    this.listaRenderizada = this._listaCompleta.slice(inicioPagina, ( inicioPagina + this.itensPorPagina) ) ;

    if ( this.paginador && numeroPagina === 0) {
      this.paginador.firstPage();
    }
  }

  private renderizar(item: any, valorColuna: string) {
    const valoresColuna: string[] = valorColuna.split('.');
    valoresColuna.forEach(valor => {
      item = item[valor];
    });
    return item;
  }

  private getLista(): Array<any> {
    if ( this.ehPaginado && !this._ehLazy) {
      return this.listaRenderizada;
    }
    return this._listaCompleta;
  }
}
