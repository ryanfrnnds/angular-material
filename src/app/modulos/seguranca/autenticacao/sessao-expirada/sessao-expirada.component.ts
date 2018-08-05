import { Component, OnInit } from '@angular/core';
import { MDB } from '../../../../util/mdb';
import {  SubscriptionLike as ISubscription, timer } from 'rxjs';

@Component({
  selector: 'app-sessao-expirada',
  templateUrl: './sessao-expirada.component.html',
  styleUrls: ['./sessao-expirada.component.scss']
})
export class SessaoExpiradaComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    let contador = 5;
    const subscription: ISubscription = timer(0,1000).subscribe(() => {
      MDB.servicos().mensagem.limparMensagem();
      if(contador > 0){
        MDB.servicos().mensagem.addErro('',MDB.util().traduzir('mdbComponentes.sessaoExpirada.reconectando',{contador:contador}));
      }
      if(contador === 0){
        MDB.contexto().deslogar();
        subscription.unsubscribe();
      }
      contador--;
    });
  }
}
