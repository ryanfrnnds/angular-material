import { Component, OnInit, Input, ContentChild, TemplateRef } from '@angular/core';
import { MatColumnDef, MatHeaderCellDef, MatCellDef } from '@angular/material';

@Component({
  selector: 'mdias-coluna',
  templateUrl: './coluna.component.html',
  styleUrls: ['./coluna.component.scss']
})
export class ColunaComponent implements OnInit {

  @Input() atributo: string;
  @Input() valorCabecalho: string;
  @Input() ordenavel: boolean = false;
  @Input() tooltip: boolean = false;  
  @Input() ehCheckbox: boolean = false;

  @ContentChild(TemplateRef) template: TemplateRef<any>;
  

  constructor() { }

  ngOnInit() {}

}
