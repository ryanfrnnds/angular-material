import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { I18n } from '../../../i18n';

@Component({
  selector: 'mdias-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  @Output() salvar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<any>();
  @Output() limpar = new EventEmitter<any>();

  @Input() nomeSalvar: string;
  @Input() tituloDialogSalvar: string;
  @Input() mensagemDialogSalvar: string;

  @Input() nomeCancelar: string;
  @Input() tituloDialogCancelar: string;
  @Input() mensagemDialogCancelar: string;

  @Input() nomeLimpar: string;

  @Input() desabilitarCancelar: boolean = false;
  @Input() desabilitarSalvar: boolean = false;
  @Input() desabilitarLimpar: boolean = false;

  @Input() mostrarSalvar: boolean = true;
  @Input() mostrarCancelar: boolean = true;
  @Input() mostrarLimpar: boolean = true;

  traducao = I18n.Instance().traducao.mdbComponentes;

  constructor() { }

  ngOnInit() {
    if (!this.nomeSalvar) {
      this.nomeSalvar = this.traducao.botao.salvar;
    }
    if (!this.nomeCancelar) {
      this.nomeCancelar = this.traducao.botao.cancelar;
    }

    if (!this.nomeLimpar) {
      this.nomeLimpar = this.traducao.botao.limpar;
    }
  }

}
