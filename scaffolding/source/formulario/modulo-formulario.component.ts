/*#// Arquivo gerado pelo Scaffolding MDB
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

import {MDBComponente,MDB } from 'mdias-componentes';

@Component({
	selector: 'app-#MODULO#-formulario',
	templateUrl: './#MODULO#-formulario.component.html',
	styleUrls: ['./#MODULO#-formulario.component.css']
})
export class #MODULO_CAP#FormularioComponent implements OnInit {
  public restController: string = '#MODULO#';
	public formulario: FormGroup;
  public evento: Evento;
  public util:MDBComponente;

  public id: number;
  public ehEdicao: boolean = false;
  public ehVisualizacao: boolean = false;

	listaAutoComplete = [
		{'chave': 1 , 'valor': 'Valor 1' },
		{'chave': 2 , 'valor': 'Valor 2' },
		{'chave': 3 , 'valor': 'Valor 3' }
  ];

  constructor() {
    this.util = new MDBComponente();
    this.evento = new Evento(this);
  }


  ngOnInit() {
    this.criarFormulario();
    this.inciarTela();
  }
  
  private criarFormulario() {
    this.formulario = MDB.angular().formBuilder.group({
      autoComplete: [null, [Validators.required]],
      campo1: [null, [Validators.required]]
    });
  }

  private inciarTela() {
    MDB.angular().activatedRoute.queryParams.subscribe( parametros => {
      if(parametros && parametros.id){
        this.id = parametros.id;
        this.ehEdicao = true;
        this.ehVisualizacao = parametros.ehVisualizacao ? parametros.ehVisualizacao : false;
        MDB.servicos().http.consultarPorId(this.restController,parametros.id).subscribe( resposta => {
          this.formulario.setValue(resposta);
        });
      }
    });
  }

  public salvar(item) {
    const ehEdicao: boolean = item.id ? true: false;
    MDB.servicos().http.salvar(this.restController,ehEdicao,item).subscribe( resposta => {
      MDB.angular().router.navigate(['#MODULO_PLURAL#/listagem']);
    });
  }
}


class Evento {

  constructor(private componente: #MODULO_CAP#FormularioComponent ) {}

  limpar() {
    const componente = this.componente;
    componente.util.resetar(componente.formulario);
  }

  salvar() {
    const componente = this.componente;
    componente.util.onSalvar.subscribe( () => {
      let itemASalvar:any = {};
      console.log('Construir seu  objeto para salvar!');
      componente.salvar(itemASalvar);
    });
    componente.util.salvar(componente.formulario.value, componente.formulario);
  }

  cancelar() {
    const componente = this.componente;
    MDB.angular().router.navigateByUrl('#MODULO_PLURAL#/listagem');
  }

  itemSelecionado(item) {
    console.log(item);
  }
}

#*/