import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from '../../modelo';

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
  @Input() usuarioLogado:any;

  constructor() { 
  }

  ngOnInit() {
  }

}
