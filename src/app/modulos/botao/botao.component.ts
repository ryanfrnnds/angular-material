import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



@Component({
  selector: 'mdias-botao',
  templateUrl: './botao.component.html',
  styleUrls: ['./botao.component.scss']
})
export class BotaoComponent implements OnInit {

  @Input() valor: string;

  @Input() ehDesabilitado: boolean;
  @Input() icone: string;

  @Input() estilo: string;
  @Input() ngClass: string = 'mat-raised-button';


  @Output() clique = new EventEmitter<any>();
  // dialogConfirmacao: MatDialogRef<DialogoConfirmacao>;

  @Input() tituloDialog: string;
  @Input() mensagemDialog: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {}

  acaoDoBotao() {
    /*
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
*/
    this.clique.emit();
  }
}
