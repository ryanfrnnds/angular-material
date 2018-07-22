import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mdias-botao-menu',
  templateUrl: './botao-menu.component.html',
  styleUrls: ['./botao-menu.component.scss']
})
export class BotaoMenuComponent implements OnInit {

  constructor() { }

  @Input() cor: string;
  @Input() background: string;
  @Input() sombra: string;

  ngOnInit() {
  }

}
