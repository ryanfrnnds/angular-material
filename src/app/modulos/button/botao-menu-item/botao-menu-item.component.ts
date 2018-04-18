import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogoConfirmacao } from '../botao-confirmacao/botao-confirmacao.component';
@Component({
  selector: 'mdias-botao-menu-item',
  templateUrl: './botao-menu-item.component.html',
  styleUrls: ['./botao-menu-item.component.scss']
})
export class BotaoMenuItemComponent implements OnInit {

  @Input() valor: string = 'Item';
  @Input() icone: string = 'add';
  @Input() confirmacao: boolean = false;
  @Input() titulo: string = '';
  @Input() mensagem: string = '';

  @Output() clique = new EventEmitter<any>();

  dialogConfirmacao: MatDialogRef<DialogoConfirmacao>;

  constructor(public dialog: MatDialog) { }
  ngOnInit() {
  }

  acaoDoBotao() {
    this.clique.emit();
  }

  openDialog(): void {
  const dialogRef = this.dialog.open(DialogoConfirmacao, {
    data: { titulo: this.titulo, mensagem: this.mensagem }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.clique.emit();
    }
  });
  }
}
