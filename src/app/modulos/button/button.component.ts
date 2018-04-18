import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogoConfirmacao } from './botao-confirmacao/botao-confirmacao.component';

@Component({
  selector: 'mdias-botao',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() valor: string;

  @Input() ehDesabilitado: boolean;
  @Input() estilo: string;
  @Input() ngClass: string = 'mat-raised-button';
  @Input() icone: string;

  @Output() clique = new EventEmitter<any>();
  dialogConfirmacao: MatDialogRef<DialogoConfirmacao>;

  @Input() tituloDialog: string;
  @Input() mensagemDialog: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  acaoDoBotao() {
    if (this.tituloDialog || this.mensagemDialog) {
      const dialogRef = this.dialog.open(DialogoConfirmacao, {
        data: { titulo: this.tituloDialog, mensagem: this.mensagemDialog }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.clique.emit();
        }
      });
    } else {
      this.clique.emit();
    }
  }
}
