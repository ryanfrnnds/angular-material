import { Component, OnInit, Input, Output, EventEmitter, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'mdias-botao-confirmacao',
  templateUrl: './botao-confirmacao.component.html',
  styleUrls: ['./botao-confirmacao.component.scss']
})
export class BotaoConfirmacaoComponent implements OnInit {

  @Input() titulo:string;
  @Input() mensagem:string;
  @Input() classe:any[];
  @Input() valor:string;

  @Input() cor:string;
  @Input() background:string;
  @Input() sombra:string;
  
  @Output() sim = new EventEmitter<any>();

  dialogConfirmacao: MatDialogRef<DialogoConfirmacao>;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogoConfirmacao,{
      data: { titulo: this.titulo, mensagem: this.mensagem }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.sim.emit();
      }
    });
  }
}

@Component({
  selector: 'dialogo-confirmacao',
  templateUrl: 'dialogo-confirmacao.html',
  styleUrls: ['./botao-confirmacao.component.scss']
})

export class DialogoConfirmacao {
  titulo:string;
  mensagem:string;

  constructor(public dialogRef: MatDialogRef<DialogoConfirmacao>,
    @Inject(MAT_DIALOG_DATA) data:any) { 
    this.titulo = data.titulo;
    this.mensagem = data.mensagem;
  }
}