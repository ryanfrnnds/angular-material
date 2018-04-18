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
  @Input() ehCarregando:Boolean = false;
  @Input() ehCard:boolean=true;

  @Input() icone:string;

  constructor() { }

  ngOnInit() {
  }

  exibirCarregando():boolean {
    if(this.ehCarregando == true || this.ehCarregando == undefined) {
      return true;
    }
    return false;
  } 

}
