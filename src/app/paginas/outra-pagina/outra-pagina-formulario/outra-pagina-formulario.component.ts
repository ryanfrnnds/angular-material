import { Component, OnInit} from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import {MDBComponente} from 'mdias-componentes';
import { OutraPaginaService } from '../outra-pagina.service';


@Component({
  selector: 'app-outra-pagina-formulario',
  templateUrl: './outra-pagina-formulario.component.html',
  styleUrls: ['./outra-pagina-formulario.component.scss']
})
export class OutraPaginaFormularioComponent implements OnInit {

  public  formulario: FormGroup;
  public evento: Evento;

  public mdbComponenteUtil:MDBComponente;
  
  constructor(public servico: OutraPaginaService) {
    this.mdbComponenteUtil = new MDBComponente();
    this.evento = new Evento(this);
  }

  ngOnInit() {
    this.criarFormulario();
    this.carregarDadosDaTela();
  }

  private criarFormulario() {}
    // Criar  o formulario REATIVO
  private carregarDadosDaTela() {
    // Realizar consultas para carregar o que for preciso na tela para que o usuário utilize.
  }
}
// Eventos da tela
class Evento {

  constructor(private componente: OutraPaginaFormularioComponent ) {}

  salvar() {}

  limpar(controle: AbstractControl = null) {
    if (controle) {
      controle.reset();
    }
  }

  cancelar() {
    // MDB.angular.router.navigateByUrl('parametro/listagem');
  }
}
