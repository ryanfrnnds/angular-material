import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'mdias-botao-menu-item',
  templateUrl: './botao-menu-item.component.html',
  styleUrls: ['./botao-menu-item.component.scss']
})
export class BotaoMenuItemComponent implements OnInit {

  @Input() valor: string;
  @Input() icone: string;
  @Input() tituloDialog: string = '';
  @Input() mensagemDialog: string = '';


  @Output() clique = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  _clique() {
      this.clique.emit();
  }
}
