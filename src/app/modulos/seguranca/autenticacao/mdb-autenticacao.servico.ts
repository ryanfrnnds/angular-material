import {CanActivate, Router } from '@angular/router';

import { Injectable } from '@angular/core';

import { timer } from 'rxjs';



import { MDB, MDBLocalStorage } from '../../../util/mdb';
import { MDBHttp } from '../../http/mdb-http';
import { MenuItem } from '../../../modelo/menu-item';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { Usuario } from '../../../modelo/usuario';

@Injectable()
export class MdbAutenticacaoServico implements CanActivate {

  constructor(private rota: Router) {}


    public canActivate(): boolean {
      if(MDB)
        if(MDB.contexto().possuiLoguin()) {
            return true;
        }
        this.rota.navigateByUrl('/autenticar');
        return false;
    }

    public autenticar(): void {
        if(MDB) {
            MDB.servicos().http.post<any>(new MDBHttp('seguranca/login'), null).subscribe(resposta => {
              let localStorage: MDBLocalStorage = new MDBLocalStorage();
              localStorage.usuario = resposta.usuario;
              MDB.contexto().browser = localStorage;
              MDB.servicos().http.get(new MDBHttp('menu/listar')).subscribe((menus:Array<MenuItem>) => {
                localStorage.menu = menus;
                MDB.contexto().browser = localStorage;
                MDB.util().irParaInicio();
              });
            }, () => {
                let contador = 5;
                const subscription: ISubscription = timer(0,1000).subscribe(() => {
                  MDB.servicos().mensagem.limparMensagem();
                  if(contador > 0){
                    MDB.servicos().mensagem.addErro(MDB.util().traduzir('mdbComponentes.autenticacao.titulo'),MDB.util().traduzir('mdbComponentes.autenticacao.reconectando',{contador:contador}));
                  }
                  if(contador === -1){
                    subscription.unsubscribe();
                    this.autenticar();
                  }
                  contador--;
                });
              });
          }
        }
}
