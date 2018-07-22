import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mdias-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss']
})
export class TituloComponent implements OnInit {
  
  @Input() valor:string = "";

  constructor() { }

  ngOnInit() {
  }

}
