import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { MdbAutenticacaoServico } from './mdb-autenticacao.servico';

@Component({
  selector: 'app-autenticacao',
  templateUrl: './mdb-autenticacao.component.html',
  styleUrls: ['./mdb-autenticacao.component.scss']
})

export class MDBAutenticacaoComponent implements AfterViewInit {

  constructor(private servico: MdbAutenticacaoServico) { }

  ngAfterViewInit() {
    this.servico.autenticar();
  }

}
