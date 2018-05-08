import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'mdias-botao',
  templateUrl: './botao.component.html',
  styleUrls: ['./botao.component.scss']
})
export class BotaoComponent implements OnInit {

  @Input() valor: string;
  @Input() icone: string;
  @Input() mini: boolean;
  @Input() estilo: string = '';
  @Input() classe: string = '';

  @Input() rota: string;
  @Input() ehDesabilitado: boolean;

  @Output() clique = new EventEmitter<any>();

  @Input() tituloDialog: string;
  @Input() mensagemDialog: string;

  private modalConfirmacaoAtivo: boolean = false;

  constructor(public router: Router) { }

  ngOnInit() {
    if (this.icone) {
      this.valor = '';
      this.classe = this.classe + ' mdias-icone';
    if (this.mini) {
        this.classe = this.classe + ' mdias-mini';
      }
    }
  }

  acaoDoBotao() {
    if (this.rota) {
      this.router.navigateByUrl(this.rota);
    } else if (this.tituloDialog || this.mensagemDialog) {
      this.modalConfirmacaoAtivo = true;
    } else {
      this.clique.emit();
    }
  }

  public sim() {
    this.modalConfirmacaoAtivo = false;
    this.clique.emit();
  }

  public nao() {
    this.modalConfirmacaoAtivo = false;
  }
}
