import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { MDBLocalStorage, MDB } from '../../util/mdb';
import { MdbMensageria } from '../../modulos/mensagens/mensagens.service';
import { Router } from '@angular/router';
import { MDBHttp } from '../../modulos/http/mdb-http';
import { ACSPermissoes } from '../../modulos/acs/permissoes';

@Component({
  selector: 'mdias-outra-pagina',
  templateUrl: './outra-pagina.component.html',
  styleUrls: ['./outra-pagina.component.scss']
})
export class OutraPaginaComponent implements OnInit {

  public equipes: Array<any> = new Array<any>();

  public formReuniao: FormGroup;

  @Input() public item: any;

  constructor() {
      this.formReuniao = MDB.formBuilder.group({
        equipe: [null, Validators.required],
      });

      MDB.servico.get<Array<any>>
      (
        new MDBHttp('consulta/equipes',ACSPermissoes.incluir)).subscribe(equipes => {
        this.equipes = equipes;
      });
      console.log('SOU GERENTE?')
      console.log(MDB.buscarValor(MDB, 'usuario.parametros.GERENTE'));

    }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['item'] && changes['item'].currentValue ) {
        this.item = changes['item'].currentValue;
        this.formReuniao.patchValue({equipe: this.item});
    }
  }

}
