import { Component, OnInit, Input, ContentChild, TemplateRef } from '@angular/core';
import { TabelaComponent } from '../tabela.component';

@Component({
  selector: 'mdias-coluna',
  templateUrl: './coluna.component.html',
  styleUrls: ['./coluna.component.scss']
})
export class ColunaComponent implements OnInit {

  @Input() valor;
  @Input() cabecalho;
  
  @ContentChild(TemplateRef) template: TemplateRef<any>;

  constructor() { 
  }

  ngOnInit() {
  }

}
