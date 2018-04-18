import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';
import { Cliente } from '../cliente';
import { Endereco } from '../endereco';
import { MensagensService } from '../../../modulos';

@Component({
  selector: 'mdias-formulario-padrao-form',
  templateUrl: './formulario-padrao-form.component.html',
  styleUrls: ['./formulario-padrao-form.component.scss']
})
export class FormularioPadraoFormComponent implements OnInit {

  cliente: Cliente;

  constructor(public location: Location, public mensagensService: MensagensService) { }

  ngOnInit() {
   this.cliente = new Cliente('', '', '', '');
  }

  // tslint:disable-next-line:member-ordering
  validadorNome = new FormControl('', [Validators.required]);
  // tslint:disable-next-line:member-ordering
  validadorTipo = new FormControl('', [Validators.required]);
  // tslint:disable-next-line:member-ordering
  validadorCPFCNPJ = new FormControl('', [Validators.required]);
  // tslint:disable-next-line:member-ordering
  validadorData = new FormControl('', [Validators.required]);

  getErrorMessage(form: FormControl) {
    return 	form.hasError('required') ? 'You must enter a value' :
            '';
  }

  salvar() {
    this.location.back();
    this.mensagensService.addSucesso('Cliente salvo com sucesso!');
  }

  cancelar() {
    this.location.back();
  }

}
