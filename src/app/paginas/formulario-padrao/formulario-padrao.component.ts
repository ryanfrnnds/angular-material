import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'mdias-formulario-padrao',
  templateUrl: './formulario-padrao.component.html',
  styleUrls: ['./formulario-padrao.component.scss']
})
export class FormularioPadraoComponent implements OnInit {

  cliente:Cliente;
  clientes:Cliente[];

  validadorNome = new FormControl('', [Validators.required]);
  validadorTipo = new FormControl('', [Validators.required]);
  validadorCPFCNPJ = new FormControl('', [Validators.required]);
  validadorData = new FormControl('', [Validators.required]);

  ehCarregando:boolean = false;

  constructor() { }

  ngOnInit() {
  	this.cliente = new Cliente('','','','');
  }

  pesquisar() {
    this.ehCarregando = true;
    setTimeout(() =>  {
      this.clientes = [];
      this.clientes.push( new Cliente('Janderson Souza', 'Física', '000.000.000-00', '10/02/1994'),
                          new Cliente('SouzaSoftware', 'Jurídica', '000.000.000-00', '22/09/2015'),
                          new Cliente('Thaio Fernandes', 'Física', '000.000.000-00', '24/05/1979'));
      this.ehCarregando = false;
    }, 3000);
  	
  }

  limpar() {
  	this.cliente = new Cliente('','','','');
    this.clientes = null;
  }
}
