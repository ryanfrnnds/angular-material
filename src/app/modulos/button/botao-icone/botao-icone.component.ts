import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mdias-botao-icone',
  templateUrl: './botao-icone.component.html',
  styleUrls: ['./botao-icone.component.scss']
})
export class BotaoIconeComponent implements OnInit {

  @Input() icone:string;
  @Input() mine:boolean;
  @Input() class:any[];
  @Output() clique = new EventEmitter<any>();
  
  @Input() cor:string;
  @Input() background:string;
  @Input() sombra:string;
  
  constructor() { }

  ngOnInit() {
  }

  acaoDoBotao() {
    this.clique.emit();
  }

}
