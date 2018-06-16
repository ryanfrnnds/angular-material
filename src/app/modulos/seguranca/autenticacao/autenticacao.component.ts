import { MdbMensageria } from './../../mensagens/mensagens.service';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { timeout } from 'rxjs/operator/timeout';
import { ISubscription } from 'rxjs/Subscription';

import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { MDB, MDBLocalStorage } from '../../../util/mdb';
import { MDBHttp} from '../../http/mdb-http';
import { ACSPermissoes } from '../../acs/permissoes';
import { MenuItem } from '../../../modelo/menu-item';
import { TipoResposta } from '../../http/tipo-resposta';

@Component({
  selector: 'app-autenticacao',
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.scss']
})

export class AutenticacaoComponent implements OnInit, AfterViewInit {

  constructor(private mensageria: MdbMensageria, private rota: Router) { }


  ngOnInit() {}

  ngAfterViewInit() {
    this.autenticar();
  }

  public autenticar(): void {
    if(MDB) {
        MDB.servico.post<any>(new MDBHttp('seguranca/login',ACSPermissoes.livre), null).subscribe(usuarioAutenticado => {
          let contexto: MDBLocalStorage = new MDBLocalStorage();
          contexto.usuario = usuarioAutenticado.usuario;
          MDB.contexto(contexto);
          MDB.servico.get<Array<MenuItem>>(new MDBHttp('menu/listar',ACSPermissoes.livre, {mostraError : false})).subscribe(menus => {
            contexto.menu = menus;
            MDB.contexto(contexto);
            MDB.irParaInicio(this.rota);
          }, httpError => {
            MDB.contexto(contexto);
            MDB.decidirRota(TipoResposta.SEM_MENU_ACS);
          });
        }, httpError => {
            let contador = 5;
            const subscription: ISubscription = TimerObservable.create(0,1000).subscribe(() => {
              this.mensageria.limparMensagem();
              if(contador > 0){
                this.mensageria.addErro('Falha de autenticação','Reconectando em '+ contador);
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
