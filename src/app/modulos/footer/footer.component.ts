import { Component, OnInit, Input } from '@angular/core';
import { MatBadge } from '@angular/material';
import { MDB } from '../../util/mdb';

@Component({
  selector: 'mdias-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public logoFooter:string = "assets/img/logo-footer.png";

  @Input() anoReferencia:string;
  constructor() {}

  ngOnInit() {}

  public get versao(): string {
    return MDB.contexto().versao;
  }
}
