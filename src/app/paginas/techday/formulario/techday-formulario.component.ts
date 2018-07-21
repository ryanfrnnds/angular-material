// Arquivo gerado pelo Scaffolding MDB
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

import {MDBComponente,MDB } from 'mdias-componentes';

@Component({
	selector: 'app-techday-formulario',
	templateUrl: './techday-formulario.component.html',
	styleUrls: ['./techday-formulario.component.css']
})
export class TechdayFormularioComponent implements OnInit {
  public restController: string = 'techday';
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
      descricao: [null, [Validators.required]]
    });
  }

  private inciarTela() {
    MDB.angular().activatedRoute.queryParams.subscribe( parametros => {
      if(parametros && parametros.id){
        this.id = parametros.id;
        this.ehEdicao = true;
        this.ehVisualizacao = parametros.ehVisualizacao ? parametros.ehVisualizacao : false;
        MDB.servicos().http.consultarPorId(this.restController,parametros.id).subscribe( (resposta: any) => {
          console.log(resposta);
          this.formulario.get('descricao').setValue(resposta.descricao);
        });
      }
    });
  }

  public salvar(item) {
    const ehEdicao: boolean = item.id ? true: false;
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    console.log(item);
    MDB.servicos().http.salvar(this.restController,ehEdicao,item).subscribe( resposta => {
      MDB.angular().router.navigate(['techdays/listagem']);
    });
  }
}


class Evento {

  constructor(private componente: TechdayFormularioComponent ) {}

  limpar() {
    const componente = this.componente;
    componente.util.resetar(componente.formulario);
  }

  salvar() {
    const componente = this.componente;
    componente.util.onSalvar.subscribe( () => {
      let itemASalvar:any = {
        id: componente.id,
        descricao: componente.formulario.get('descricao').value
      };
      console.log('Construir seu  objeto para salvar!');
      componente.salvar(itemASalvar);
    });
    componente.util.salvar(componente.formulario.value, componente.formulario);
  }

  cancelar() {
    const componente = this.componente;
    MDB.angular().router.navigateByUrl('techdays/listagem');
  }

  itemSelecionado(item) {
    console.log(item);
  }
}

