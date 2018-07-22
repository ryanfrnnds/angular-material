import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mdias-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  @Input() nomeDaPagina:string;
  @Input() rotaBotaoNovo:string;
  @Input() valorBotaoNovo:string;
  @Input() ehCard:boolean=true;

  @Input() icone:string;

  constructor() { }

  ngOnInit() {
  }
}
