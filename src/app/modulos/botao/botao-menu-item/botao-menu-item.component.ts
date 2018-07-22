import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogoConfirmacao } from './dialogo-confirmacao.component';

@Component({
  selector: 'mdias-botao-menu-item',
  templateUrl: './botao-menu-item.component.html',
  styleUrls: ['./botao-menu-item.component.scss']
})
export class BotaoMenuItemComponent implements OnInit {

  @Input() valor: string = 'Item';
  @Input() icone: string = 'add';
  @Input() confirmacao: boolean = false;
  @Input() tituloDialog: string = "Confirma esta ação?";
  @Input() mensagemDialog:string;
  @Input() modalConfirmacaoAtivo: boolean;

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
    data: { titulo: this.tituloDialog, mensagem: this.mensagemDialog }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.clique.emit();
    }
  });
  }
}