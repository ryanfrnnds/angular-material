import { Component } from '@angular/core';

import { ROTA_INICIO, SERVIDOR, NOME_DA_APLICACAO } from './app.const';
import { MDB } from './util/mdb';
import { Observable } from 'rxjs';
import { DependenciasService } from './util/dependencias.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(dependencias: DependenciasService) {
    MDB.incializar( dependencias.configurar(NOME_DA_APLICACAO,ROTA_INICIO,SERVIDOR));
    MDB.servicos().loading.porRequisicao = false;
  }

  public iniciado(): Observable<boolean> {
    return MDB.inciado;
  }

}
