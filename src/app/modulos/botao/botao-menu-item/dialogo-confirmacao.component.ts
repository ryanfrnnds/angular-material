import { Component, OnInit, Input, Output, EventEmitter, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'dialogo-confirmacao',
    templateUrl: 'dialogo-confirmacao.html',
    styleUrls: ['./botao-menu-item.component.scss']
})
  
export class DialogoConfirmacao {
    titulo:string;
    mensagem:string;

    constructor(public dialogRef: MatDialogRef<DialogoConfirmacao>,
        @Inject(MAT_DIALOG_DATA) data:any) { 
        this.titulo = data.titulo;
        this.mensagem = data.mensagem;
    }

    sim() {
        this.dialogRef.close(true);
    }

    nao() {
        this.dialogRef.close(false);
    }
}