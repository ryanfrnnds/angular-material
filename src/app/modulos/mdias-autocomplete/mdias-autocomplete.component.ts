import { Component, OnInit, SimpleChanges, Input, OnChanges, EventEmitter, Output, ViewChildren, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl } from '@angular/forms';

import {Observable} from 'rxjs/Rx';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

import {ObjetoUtilitario} from '../../util/objeto-utilitario';
import { MatAutocomplete, MatInput, MatAutocompleteSelectedEvent } from '@angular/material';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { I18n } from '../../i18n';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'mdias-autocomplete',
  templateUrl: './mdias-autocomplete.component.html',
  styleUrls: ['./mdias-autocomplete.component.scss']
})
export class MdiasAutocompleteComponent {
   private _controle: AbstractControl = new FormControl();
  @Input() set controle(valorControle) {
    this._controle = valorControle;
  }
  get controle() {
    return this._controle;
  }

  @Input() public atributoDisplay: string;
  @Input() public label: string;

  private _lista: Array<any>;
  @Input() set lista(lista) {
    if (lista && lista.length > 0){
      this._lista = lista;
      this.carregarOpcoes(lista);
    }
  }
  get lista() {
    return this._lista;
  }

  @Input() public ehObrigatorio: boolean = false;
  private _itemInicial: any;

  private subscription: ISubscription;


  @Input() public dependentes: Array<AbstractControl>;
  public opcoes: Observable<any[]>;

  @Output() itemSelecionado: EventEmitter<any> = new EventEmitter();

  constructor() {}

  private errosAutoComplete(control: AbstractControl, error: string = 'required', msgError: string = 'mdbComponentes.erro.obrigatoriedade') {
    return control.hasError(error) ? this.traduzir(msgError) : '';
  }

  private traduzir(chave: string , parametros: any = null): string {
    if (chave) {
      let texto: string = ObjetoUtilitario.Instance().buscarValor(I18n.Instance().traducao,chave);
      if (parametros) {
        for (const key in parametros) {
          if (parametros.hasOwnProperty(key)) {
            const item = parametros[key];
            texto = texto.replace(new RegExp('{{' + key + '}}', 'g'), item);
          }
        }
      }
      return texto;
    }
    return '';
  }

  private carregarOpcoes(lista) {
    if (this._controle) {
      if (this.dependentes && this.dependentes.length > 0) {
        this.dependentes.forEach(dependente => {
            dependente.valueChanges.subscribe( digitado => {
              if (this._controle.touched && this._controle.value) {
                  this._controle.reset();
              }

              if (typeof digitado === 'string') {
                this.opcoes = undefined;
              }
            });
        });
      }
      this.opcoes = this._controle.valueChanges.pipe( startWith<any>(''),
          map(item => typeof item === 'string' ? item : item ? ObjetoUtilitario.Instance().buscarValor(item, this.atributoDisplay) : '')
          , map( (texto: string) => texto ? this.filtro(lista, texto) : this.filtro(lista,  ObjetoUtilitario.Instance().buscarValor(this._controle.value, this.atributoDisplay) ))
          , map( (lista: any[]) => {
            lista.forEach((element: any) => {
              element.display = element[this.atributoDisplay];
            });
            return lista;
          })
        );
    }
  }

  private limparSeNaoPossuirSelecao () {
    if (this._controle) {
      setTimeout( () => {
        const valor = this._controle.value;
        if (typeof valor === 'string') {
            this._controle.setValue(undefined);
        }
      },500)
    }
  }

  private _itemSelecionado( event: MatAutocompleteSelectedEvent) {
    this.itemSelecionado.emit(event.option.value);
  }

  private display(opcao?: any): string | undefined {
    return opcao ? opcao.display : undefined;
  }

  private filtro<T>(lista, comparacao: string): T[] {
    if (comparacao) {
      return lista.filter(option =>
          ObjetoUtilitario.Instance().buscarValor(option, this.atributoDisplay).toLowerCase().includes(comparacao.toLowerCase()));
    } else {
      return lista.slice();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    
    if (changes['controle'] && changes['controle'].currentValue) {
      this._controle = changes['controle'].currentValue;
      this.subscription = this._controle.valueChanges.subscribe(alteracao => {
        if (alteracao && typeof alteracao != 'string' && !this._itemInicial) {
          this._itemInicial = this._controle.value;
          this.subscription.unsubscribe();
        }
      })
    }
    if (changes['lista'] && changes['lista'].currentValue) {
      this._lista = changes['lista'].currentValue;
      if (this._itemInicial){
        const itensFiltrados = this._lista.filter(option =>
          ObjetoUtilitario.Instance().buscarValor(option, this.atributoDisplay, '').toLowerCase().includes(ObjetoUtilitario.Instance().buscarValor(this._itemInicial, this.atributoDisplay, '').toLowerCase()));
        const item = itensFiltrados.length === 1 ? itensFiltrados[0] : null;
        this._itemInicial = null;
        this._controle.setValue(item);
      }
    }
  }
}
