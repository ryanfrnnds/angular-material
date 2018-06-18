import {CanActivate, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { MDB, MDBLocalStorage } from '../../../util/mdb';
import { MDBHttp } from '../../http/mdb-http';
import { ACSPermissoes } from '../../acs/mdb-acs';
import { MenuItem } from '../../../modelo/menu-item';
import { TipoResposta } from '../../http/tipo-resposta';
import { ISubscription } from 'rxjs/Subscription';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

@Injectable()
export class MdbAutenticacaoServico implements CanActivate {

  constructor(private rota: Router) {}


    public canActivate(): boolean {
      if(MDB)
        if(MDB.contexto.possuiLoguin()) {
            return true;
        }
        this.rota.navigateByUrl('/autenticar');
        return false;
    }

    public autenticar(): void {
        if(MDB) {
            MDB.servicos.http.post<any>(new MDBHttp('seguranca/login',ACSPermissoes.livre), null).subscribe(usuarioAutenticado => {
              let localStorage: MDBLocalStorage = new MDBLocalStorage();
              localStorage.usuario = usuarioAutenticado.usuario;
              MDB.contexto.browser = localStorage;
              MDB.servicos.http.get<Array<MenuItem>>(new MDBHttp('menu/listar',ACSPermissoes.livre, {mostraError : false})).subscribe(menus => {
                localStorage.menu = menus;
                MDB.contexto.browser = localStorage;
                MDB.util.irParaInicio();
              }, httpError => {
                MDB.contexto.browser = localStorage;
                MDB.util.decidirRota(TipoResposta.SEM_MENU_ACS);
              });
            }, httpError => {
                let contador = 5;
                const subscription: ISubscription = TimerObservable.create(0,1000).subscribe(() => {
                  MDB.servicos.mensagem.limparMensagem();
                  if(contador > 0){
                    MDB.servicos.mensagem.addErro('Falha de autenticação','Reconectando em '+ contador);
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

