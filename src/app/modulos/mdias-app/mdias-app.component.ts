import { Component, OnInit, Input } from '@angular/core';
import { MDB } from '../../util/mdb';

@Component({
  selector: 'mdias-app',
  templateUrl: './mdias-app.component.html',
  styleUrls: ['./mdias-app.component.scss']
})
export class MdiasAppComponent {

  @Input() logoImg: string;
  @Input() logoIcone: string;
  @Input() anoReferencia:string;

  public loadding(): boolean {
    return MDB.servicos().mdiasApp.loadding;
  }
    
  constructor() {}

}
