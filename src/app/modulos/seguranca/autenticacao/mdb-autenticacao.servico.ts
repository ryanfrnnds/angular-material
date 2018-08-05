import {CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { MDB, MDBLocalStorage } from '../../../util/mdb';
import { MDBHttp } from '../../http/mdb-http';
import { MenuItem } from '../../../modelo/menu-item';
import { SessionSSO } from '../../session-storage/session-storage-sso';
import { SessionOnload } from '../../session-storage/session-storage-onload';

@Injectable()
export class MdbAutenticacaoServico implements CanActivate {

  constructor(
    private rota: Router,
    private sessaoSso: SessionSSO,
    private sessaoOnload: SessionOnload
  ) {}

  public canActivate(): boolean {
      if(MDB)
        if(MDB.contexto().possuiLogin()) {
            return true;
        }
        this.rota.navigateByUrl('/autenticar');
        return false;
    }

    public autenticar(): void {
      if(MDB) {
        MDB.servicos().http.post<any>(new MDBHttp('seguranca/login'), null).subscribe(resposta => {
          MDB.limparLocalStorage();
          this.sessaoOnload.limpar();
          let localStorageMDB: MDBLocalStorage = new MDBLocalStorage();
          localStorageMDB.usuario = resposta.usuario;
          MDB.contexto().localStorage = localStorageMDB;
          MDB.servicos().http.get(new MDBHttp('menu/listar')).subscribe((menus:Array<MenuItem>) => {
            localStorageMDB.menu = menus;
            MDB.contexto().localStorage = localStorageMDB;
            if(this.sessaoSso.possuiReferenciaGuardada()) {
              this.sessaoSso.irParaRotaNaSessao();
            } else {
              MDB.util().irParaInicio();
            }
          });
        })
      };
    };
}
