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

  urlSair:string = '';

  get nomeDoSistema(): string {
    return MDB.contexto().nomeSistema;
  }

  get nomeUsuario() {
    if(MDB.contexto().browser) {
      return MDB.contexto().browser.usuario.nome;
    }
    return '';
  }

  get codigoUsuario() {
    if( MDB.contexto().browser) {
      return  MDB.contexto().browser.usuario.codigo;
    }
    return '';
  }

  get menu(): MenuItem[] {
    if(MDB.contexto().browser) {
      return MDB.contexto().browser.menu;
    } else {
      return [];
    }
  }

  set menu(menus:MenuItem[]){

  }

  constructor() {}

  ngOnInit() {
    let url:string = window.location.href.split("//")[1];
    if(url.startsWith("local")) {
      this.urlSair = window.location.href;
    } else if(url.startsWith("dev")) {
      this.urlSair = 'https://oamdev.mdb.com.br/oam/server/logout?end_url='+window.location.href;
    } else if(url.startsWith("hom")) {
      this.urlSair = 'https://oamhom.mdb.com.br/oam/server/logout?end_url='+window.location.href;
    } else {
      this.urlSair = 'https://oam.mdb.com.br/oam/server/logout?end_url='+window.location.href;
    }
  }

}
