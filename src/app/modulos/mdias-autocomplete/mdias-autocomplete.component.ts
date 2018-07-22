import { Component, OnInit, Input, EventEmitter, Output, ViewChild, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';

import {Observable, SubscriptionLike as ISubscription} from 'rxjs';
import {startWith, map} from 'rxjs/operators';

import { MatInput, MatAutocompleteTrigger, MatAutocompleteSelectedEvent } from '@angular/material';
import { I18n } from '../../i18n';
import { MDB } from '../../util/mdb';

@Component({
  selector: 'mdias-autocomplete',
  templateUrl: './mdias-autocomplete.component.html',
  styleUrls: ['./mdias-autocomplete.component.scss']
})
export class MdiasAutocompleteComponent implements OnInit {
  public evento: Evento;

  public _controle: AbstractControl = new FormControl();

  @ViewChild( MatAutocompleteTrigger)
  autoTrigger: MatAutocompleteTrigger;

  @ViewChild( 'input')
  input: MatInput;

  @Input() set controle(valorControle) {
    this._controle = valorControle;
  }
  get controle() {
    return this._controle;
  }

  @Input() public atributoDisplay: string;
  @Input() public label: string;
  @Input() readonly: boolean = false;

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

  @Input() public dependentes: Array<AbstractControl>;
  public opcoes: Observable<any[]>;

  @Output() itemSelecionado: EventEmitter<any> = new EventEmitter();
  @Output() focusout: EventEmitter<any> = new EventEmitter();

  constructor() {}
  ngOnInit() {
    this.evento = new Evento(this);
    if(this.ehObrigatorio) {
      this._controle.clearValidators();
      this._controle.setValidators([Validators.required, this.possuiValor()]);
    } else {
      this._controle.clearValidators();
      this._controle.setValidators([this.possuiValor()]);
    }

  }

  public mostrarError(control: AbstractControl) {
    const traducao = I18n.Instance().traducao;
    const obrigatorio = MDB.util().buscarValor(traducao, 'mdbComponentes.erro.obrigatoriedade');
    const semValor = MDB.util().buscarValor(traducao, 'mdbComponentes.erro.semValorSelecionado');
   
    if(control.hasError('required')) {
      return obrigatorio;
    } else {
      if(this.controle.value && typeof this.controle.value === 'string' && this.controle.value != '' && control.hasError('naoPossuiValor')) {
        return semValor;
      }
    }
    return null;
  }

  private possuiValor(): ValidatorFn {
    return (control: AbstractControl) => {
      return (typeof control.value === 'string' && control.value != '' ) ? {'naoPossuiValor': true} : null;
    };
  }

  public carregarOpcoes(lista) {
    if (!this.readonly && this._controle) {
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
          map(item => typeof item === 'string' ? item : item ? MDB.util().buscarValor(item, this.atributoDisplay) : '')
          , map( (texto: string) => texto ? this.filtro(lista, texto) : this.filtro(lista,  MDB.util().buscarValor(this._controle.value, this.atributoDisplay) ))
          , map( (lista: any[]) => {
            lista.forEach((element: any) => {
              element.display = element[this.atributoDisplay];
            });
            return lista;
          })
        );
    }
  }

  public display(opcao?: any): string | undefined {
    return opcao ? opcao.display : undefined;
  }

  public valorQuandoReadyOnly() {
    if(this.controle && this.controle.value){
      return MDB.util().buscarValor(this.controle.value,this.atributoDisplay)
    }
    return '';
  }

  public filtro<T>(lista, comparacao: string): T[] {
    if (comparacao) {
      return lista.filter(option =>
        MDB.util().buscarValor(option, this.atributoDisplay).toLowerCase().includes(comparacao.toLowerCase()));
    } else {
      return lista.slice();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    
    if (changes['controle'] && changes['controle'].currentValue) {
      this._controle = changes['controle'].currentValue;
      const subscription: ISubscription = this._controle.valueChanges.subscribe(alteracao => {
        if (alteracao && typeof alteracao != 'string' && !this._itemInicial) {
          this._itemInicial = this._controle.value;
          subscription.unsubscribe();
        }
      })
    }
    if (changes['lista'] && changes['lista'].currentValue) {
      this._lista = changes['lista'].currentValue;
      if (this._itemInicial){
        const itensFiltrados = this._lista.filter(option =>
        MDB.util().buscarValor(option, this.atributoDisplay, '').toLowerCase().includes(MDB.util().buscarValor(this._itemInicial, this.atributoDisplay, '').toLowerCase()));
        const item = itensFiltrados.length === 1 ? itensFiltrados[0] : null;
        this._itemInicial = null;
        this._controle.setValue(item);
      }
    }
  }
}

export class Evento {

  constructor(public componente: MdiasAutocompleteComponent ) {}

  focusout (event) {
    const componente: MdiasAutocompleteComponent = this.componente;
    if(componente.controle.value && typeof componente.controle.value === 'string' && componente.controle.value.trim() === '' ) {
      componente.controle.reset();
    }
    componente.focusout.emit(componente.controle.value);
  }

  itemSelecionado( event: MatAutocompleteSelectedEvent) {
    const componente: MdiasAutocompleteComponent = this.componente;
    componente.itemSelecionado.emit(event.option.value);
  }

  focus(event) {
    const componente: MdiasAutocompleteComponent = this.componente;
    componente.autoTrigger.openPanel();
  }
}
