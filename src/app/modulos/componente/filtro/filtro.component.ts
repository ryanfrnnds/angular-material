import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { I18n } from '../..';

@Component({
  selector: 'mdias-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {

  @Output() pesquisar = new EventEmitter<any>();
  @Output() limpar = new EventEmitter<any>();

  @Input() nomePesquisar: string;
  @Input() nomeLimpar: string;

  @Input() desabilitarPesquisar: boolean = false;
  @Input() desabilitarLimpar: boolean = false;

  @Input() mostrarPesquisar: boolean = true;
  @Input() mostrarLimpar: boolean = true;

  traducao = I18n.Instance().traducao.mdbComponentes;

  constructor() {}

  ngOnInit() {
    if (!this.nomePesquisar) {
      this.nomePesquisar = this.traducao.botao.pesquisar;
    }
    if (!this.nomeLimpar) {
      this.nomeLimpar = this.traducao.botao.limpar;
    }
  }
}
