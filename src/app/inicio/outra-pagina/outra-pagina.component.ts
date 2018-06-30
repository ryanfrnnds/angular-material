import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { MDB } from '../../util/mdb';
import { MdbMensagemServico } from '../../modulos/mensagens/mensagens.service';
import { Router } from '@angular/router';
import { MDBHttp } from '../../modulos/http/mdb-http';

@Component({
  selector: 'mdias-outra-pagina',
  templateUrl: './outra-pagina.component.html',
  styleUrls: ['./outra-pagina.component.scss']
})
export class OutraPaginaComponent implements OnInit {

  public equipes: Array<any> = new Array<any>();

  public formReuniao: FormGroup;

  @Input() public item: any;

  constructor(formBuilder: FormBuilder
  , private mensageria: MdbMensagemServico
  , private rota: Router) {
      this.formReuniao = formBuilder.group({
        equipe: [null, Validators.required],
      });

      MDB.servicos().http.get
      (
        new MDBHttp('consulta/equipes')).subscribe(equipes => {
        // this.equipes = equipes;
      });
      console.log('SOU GERENTE?')
      console.log(MDB.util().buscarValor(MDB, 'usuario.parametros.GERENTE'));

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
