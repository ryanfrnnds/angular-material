import { Component, Input, HostListener, AfterViewInit } from '@angular/core';
import { MDB } from '../../util/mdb';
import { SessionOnload } from '../session-storage/session-storage-onload';

@Component({
  selector: 'mdias-app',
  templateUrl: './mdias-app.component.html',
  styleUrls: ['./mdias-app.component.scss']
})
export class MdiasAppComponent implements AfterViewInit{

  @Input() logoImg: string;
  @Input() logoIcone: string;
  @Input() anoReferencia:string;

  public loadding(): boolean {
    return MDB.servicos().loading.mostrar;
  }
    
  constructor(private sessionOnload:SessionOnload) {}

  ngAfterViewInit() { 
    if(this.sessionOnload.possuiReferenciaGuardada()) {
      this.sessionOnload.irParaRotaNaSessao();
    }
  }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    this.sessionOnload.guardarNaSessao();
  }
}
