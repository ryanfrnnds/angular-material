import { Component, OnInit, Input } from '@angular/core';
import { MenuItem, Usuario } from '../../modelo';
import {Observable} from 'rxjs/Rx';
import { ISubscription } from 'rxjs/Subscription';
import { Aplicacao } from '../inicializacao/aplicacao';
import { MdbServico } from '../servicos/mdb-servico';


@Component({
  selector: 'mdias-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  @Input() logoImg:string;
  @Input() icone: string;
  @Input() nomeDoSistema: string;
  @Input() menu: MenuItem[];

  constructor( public servico: MdbServico) { 
  }

  ngOnInit() {}

}
