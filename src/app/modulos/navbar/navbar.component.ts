import { Component, OnInit, Input } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { ISubscription } from 'rxjs/Subscription';
import { MDB } from '../../util/mdb';
import { MenuItem } from '../../modelo/menu-item';


@Component({
  selector: 'mdias-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() logoImg:string;
  @Input() icone: string;

  get nomeDoSistema(): string {
    return MDB.nomeSistema;
  }

  get nomeUsuario() {
    if(MDB.usuario) {
      return MDB.usuario.nome;
    }
    return '';
  }

  get codigoUsuario() {
    if(MDB.usuario) {
      return MDB.usuario.codigo;
    }
    return '';
  }

  get menu(): MenuItem[] {
    if(MDB.menu) {
      return MDB.menu;
    } else {
      return [];
    }
  }

  set menu(menus:MenuItem[]){

  }

  constructor() {}

  ngOnInit() {}

}
