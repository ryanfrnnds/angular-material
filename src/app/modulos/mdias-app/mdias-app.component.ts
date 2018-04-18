import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from '../../modelo';

@Component({
  selector: 'mdias-app',
  templateUrl: './mdias-app.component.html',
  styleUrls: ['./mdias-app.component.scss']
})
export class MdiasAppComponent implements OnInit {

  @Input() nomeDoSistema: string;
  @Input() logoImg: string;
  @Input() logoIcone: string;
  @Input() menu: MenuItem[];
  @Input() anoReferencia:string;
  @Input() usuarioLogado:any;

  constructor() { }

  ngOnInit() {
  }

}
