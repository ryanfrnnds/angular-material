import { Component, OnInit, Input } from '@angular/core';
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
    return MDB.contexto().nomeSistema;
  }

  get nomeUsuario() {
    if(MDB.contexto().localStorage) {
      return MDB.contexto().localStorage.usuario.nome;
    }
    return '';
  }

  get codigoUsuario() {
    if( MDB.contexto().localStorage) {
      return  MDB.contexto().localStorage.usuario.codigo;
    }
    return '';
  }

  get menu(): MenuItem[] {
    if(MDB.contexto().localStorage) {
      return MDB.contexto().localStorage.menu;
    } else {
      return [];
    }
  }

  set menu(menus:MenuItem[]){

  }

  constructor() {}

  ngOnInit() {}

  delogar() {
    MDB.contexto().deslogar();
  }
}
