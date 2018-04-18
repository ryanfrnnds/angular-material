import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mdias-wizard-item',
  templateUrl: './wizard-item.component.html',
  styleUrls: ['./wizard-item.component.scss']
})
export class WizardItemComponent implements OnInit {


  @Input() titulo:string;
  @Input() ativo:boolean = false;
  @Input() valido:boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
