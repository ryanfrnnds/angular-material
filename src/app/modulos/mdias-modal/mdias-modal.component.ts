import { Component, OnInit, Input } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'mdias-modal',
  templateUrl: './mdias-modal.component.html',
  styleUrls: ['./mdias-modal.component.scss'],
  animations: [
    trigger(
      'modalAnimation', [
        transition(':enter', [
          style({top: '100%', opacity: 0}),
          animate('500ms', style({top: '10%', opacity: 1}))
        ]),
        transition(':leave', [
          style({top: '10%', opacity: 1}),
          animate('300ms', style({top: '-20%', opacity: 0}))
        ])
      ]
    ),
    trigger(
      'sombraAnimation', [
        transition(':enter', [
          style({opacity: 0}),
          animate('500ms', style({opacity: 0.5}))
        ]),
        transition(':leave', [
          style({opacity: 0.5}),
          animate('500ms', style({opacity: 0}))
        ])
      ]
    )

  ]
})
export class MdiasModalComponent implements OnInit {

  @Input() titulo:string = '';
  @Input() ativo:boolean = false;
  @Input() classe:string = '';
  @Input() estilo:string = '';
  
  constructor() { }

  ngOnInit() {
    this.classe = this.classe + ' mdias-modal';
  }

}
