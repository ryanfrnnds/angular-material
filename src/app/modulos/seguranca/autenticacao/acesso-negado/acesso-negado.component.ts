import { Component, OnInit } from '@angular/core';
import { MDB } from '../../../../util/mdb';

@Component({
  selector: 'app-acesso-negado',
  templateUrl: './acesso-negado.component.html',
  styleUrls: ['./acesso-negado.component.scss']
})
export class AcessoNegadoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  rotaInicio() {
    MDB.angular().router.navigateByUrl("/inicio");
  }

}
