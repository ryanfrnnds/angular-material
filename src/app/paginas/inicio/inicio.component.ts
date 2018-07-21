import { Component, OnInit } from '@angular/core';
import { MDBComponente, MDB } from 'mdias-componentes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {

  public componenteUtil:MDBComponente;
  
  constructor() { 
    this.componenteUtil = new MDBComponente();
  }

  ngOnInit() {}

  irParaOutraPagina(id = 1) {
    MDB.angular().router.navigate(['outra-pagina/listagem'], {queryParams : {id: id}});
  }
}
