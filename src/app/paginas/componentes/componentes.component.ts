import { Component, OnInit } from '@angular/core';
import { MensagensService } from '../../modulos';

@Component({
  selector: 'mdias-componentes',
  templateUrl: './componentes.component.html',
  styleUrls: ['./componentes.component.scss']
})
export class ComponentesComponent implements OnInit {

  componenteSelecionado:string;

  constructor(public mensagensService:MensagensService) { }

  ngOnInit() {
  }

  selecionarComponente(componente:string) {
  	this.componenteSelecionado = componente;
  }

  pesquisar() {
    this.mensagensService.addInformacao("EXEMPLO - Pesquisando")
  }

}
