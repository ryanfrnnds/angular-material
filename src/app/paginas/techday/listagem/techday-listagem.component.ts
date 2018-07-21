// Arquivo gerado pelo Scaffolding MDB
import { Component, OnInit} from '@angular/core';
import {FormGroup } from '@angular/forms';
import { MDBComponente, MDB } from 'mdias-componentes';

@Component({
	selector: 'app-techday-listagem',
	templateUrl: './techday-listagem.component.html',
	styleUrls: ['./techday-listagem.component.css']
})
export class TechdayListagemComponent implements OnInit {
  public restController: string = 'techday';
	public evento: Evento;
	public formulario: FormGroup;
	public lista: Array<any> = [];
	public util:MDBComponente;

	constructor() {
		this.util = new MDBComponente();
	}

 ngOnInit() {
    this.evento = new Evento(this);
    this.criarFormulario();
  }

  private criarFormulario() {
    this.formulario = MDB.angular().formBuilder.group({
        campo1: [null]
      , campo2: [null]
    });
  }

  public pesquisar() {
    const filtro: any = {};
		MDB.servicos().http.consultarPorObjeto(this.restController,filtro).subscribe( (lista: Array<any>) => {
      if(lista && lista.length === 0) {
        MDB.servicos().mensagem.addInformacao('',MDB.util().traduzir('mensagem.pesquisaNaoEncontrada'));  
      }
      this.lista = lista;
		});
    
  }
}

class Evento {

  constructor(private componente: TechdayListagemComponent ) {}

  limpar() {
    const componente = this.componente;
    componente.util.resetar(componente.formulario);
    componente.lista = [];
  }

  pesquisar() {
    const componente = this.componente;
    componente.util.onPesquisar.subscribe( objeto => {
      componente.pesquisar();
    });
    componente.util.pesquisar(componente.formulario);
  }

  editar(id) {
    const componente = this.componente;
    MDB.angular().router.navigate(['techdays/formulario'], {queryParams : {id: id}});
  }

  deletar(id){
    const componente = this.componente;
    MDB.servicos().http.deletar(componente.restController,id).subscribe(() => {});
  }

  visualizar(id) {
    const componente = this.componente;
    MDB.angular().router.navigate(['techdays/formulario'], {queryParams : {id: id, ehVisualizacao : true}});
  }

}
