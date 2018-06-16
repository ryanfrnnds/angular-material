import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mdias-app',
  templateUrl: './mdias-app.component.html',
  styleUrls: ['./mdias-app.component.scss']
})
export class MdiasAppComponent implements OnInit {

  @Input() logoImg: string;
  @Input() logoIcone: string;
  @Input() anoReferencia:string;

  constructor() { }

  ngOnInit() {
  }

}
