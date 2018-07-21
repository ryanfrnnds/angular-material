import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MDBComponente, MDB } from 'mdias-componentes';
import {FormGroup } from '@angular/forms';
import { OutraPagina } from '../entidade/outra-pagina';
import { OutraPaginaService } from '../outra-pagina.service';


@Component({
  selector: 'app-outra-pagina-listagem',
  templateUrl: './outra-pagina-listagem.component.html',
  styleUrls: ['./outra-pagina-listagem.component.scss']
})
export class OutraPaginaListagemComponent implements OnInit {

  public evento: Evento;
  public lista: Array<OutraPagina> = [];

  public  formulario: FormGroup;

  public mdbComponenteUtil:MDBComponente;

  constructor(public servico: OutraPaginaService) {
    this.mdbComponenteUtil = new MDBComponente();
  }

  ngOnInit() {
    this.evento = new Evento(this);
    this.criarFormulario();
  }

  
  private criarFormulario() {
   // Criar formulário reativo
  }

  public pesquisar() {
    // Metodo que realiza pesquisa
  }
}
//Eventos da tela
class Evento {

  constructor(private componente: OutraPaginaListagemComponent ) {}

  limpar() {
    const componente = this.componente;
    componente.mdbComponenteUtil.resetar(componente.formulario);
    componente.lista = [];
  }

  pesquisar() {
    const componente = this.componente;
    componente.mdbComponenteUtil.onPesquisar.subscribe( objeto => {
      componente.pesquisar();
    });
    componente.mdbComponenteUtil.pesquisar();
  }

  editar(id) {
    const componente = this.componente;
    // MDB.angular.router.navigate(['path'], {queryParams : {id: id}});
  }

  visualizar(id) {
    const componente = this.componente;
    // MDB.angular.router.navigate(['path'], {queryParams : {id: id, ehVisualizacao : true}});
  }

}
