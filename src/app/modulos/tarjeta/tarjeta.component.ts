import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mdias-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.scss']
})
export class TarjetaComponent implements OnInit {
  
  @Input() valor:string;

  constructor() { }

  ngOnInit() {
  }

}
